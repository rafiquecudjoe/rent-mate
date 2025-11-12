import { Search, Filter, Download, Calendar, DollarSign, CheckCircle, Clock, XCircle, TrendingUp, Plus, X, FileText, FileSpreadsheet } from 'lucide-react';
import { useState } from 'react';
import RecordPaymentModal, { PaymentData } from '../components/RecordPaymentModal';

const stats = [
  { label: 'Total Collected', value: '$45,600', change: '+12%', icon: DollarSign, color: 'green' },
  { label: 'Pending', value: '$3,200', change: '4 payments', icon: Clock, color: 'yellow' },
  { label: 'Overdue', value: '$1,800', change: '2 tenants', icon: XCircle, color: 'red' },
  { label: 'This Month', value: '$15,200', change: '+8%', icon: TrendingUp, color: 'blue' },
];

const payments = [
  {
    id: 1,
    tenant: 'Alice Johnson',
    property: '123 Maple St, Unit 4B',
    amount: 1500,
    date: '2024-10-01',
    status: 'paid',
    method: 'Bank Transfer',
  },
  {
    id: 2,
    tenant: 'Bob Williams',
    property: '789 Oak Ave, Apt 2',
    amount: 1200,
    date: '2024-10-05',
    status: 'paid',
    method: 'Credit Card',
  },
  {
    id: 3,
    tenant: 'Charlie Brown',
    property: '456 Pine Ln, House',
    amount: 2400,
    date: '2024-10-15',
    status: 'pending',
    method: 'Bank Transfer',
  },
  {
    id: 4,
    tenant: 'Diana Miller',
    property: '321 Birch Rd, Unit 10',
    amount: 1800,
    date: '2024-09-28',
    status: 'overdue',
    method: 'Check',
  },
  {
    id: 5,
    tenant: 'Emma Davis',
    property: '555 Cedar Ave, Unit 3',
    amount: 1600,
    date: '2024-10-03',
    status: 'paid',
    method: 'Bank Transfer',
  },
];

interface PaymentsProps {
  onViewHistory?: () => void;
}

export default function Payments({ onViewHistory }: PaymentsProps) {
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDateRangeMenu, setShowDateRangeMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

  const [exportForm, setExportForm] = useState({
    dateFrom: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    dateTo: new Date().toISOString().split('T')[0],
    format: 'pdf',
    filterBy: 'all',
    filterValue: '',
  });

  // Mock tenants data - in real app, this would come from API/state
  const tenants = [
    { id: 1, name: 'Alice Johnson', property: '123 Maple St, Unit 4B', rent: 1500 },
    { id: 2, name: 'Bob Williams', property: '789 Oak Ave, Apt 2', rent: 1200 },
    { id: 3, name: 'Charlie Brown', property: '456 Pine Ln, House', rent: 2400 },
    { id: 4, name: 'Diana Miller', property: '321 Birch Rd, Unit 10', rent: 1800 },
    { id: 5, name: 'Emma Davis', property: '555 Cedar Ave, Unit 3', rent: 1600 },
  ];

  const handleRecordPayment = (payment: PaymentData) => {
    // In real app, this would save to database
    console.log('Recording payment:', payment);
    alert('Payment recorded successfully!');
    setShowRecordPaymentModal(false);
  };

  const handleExportReport = () => {
    // In a real app, this would generate and download the report
    console.log('Exporting report with:', exportForm);
    alert(`Exporting ${exportForm.format.toUpperCase()} report from ${exportForm.dateFrom} to ${exportForm.dateTo}`);
    setShowExportModal(false);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payments</h1>
            <p className="text-gray-600">Track and manage rent payments</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setShowRecordPaymentModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Record Payment</span>
            </button>
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">Export Report</span>
            </button>
          </div>
        </div>

      {onViewHistory && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">View Complete Payment History</h3>
            <p className="text-sm text-blue-700">See all your past transactions and payment records</p>
          </div>
          <button
            onClick={onViewHistory}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium"
          >
            View History
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-3 rounded-xl bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-semibold text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
            onClick={() => setShowDateRangeMenu(!showDateRangeMenu)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors relative"
          >
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Date Range</span>
            
            {showDateRangeMenu && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                <h3 className="font-semibold text-gray-900 mb-3">Select Date Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setShowDateRangeMenu(false)}
                      className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Apply
                    </button>
                    <button 
                      onClick={() => setShowDateRangeMenu(false)}
                      className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>
            )}
          </button>
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors relative"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filters</span>
            
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-10">
                <h3 className="font-semibold text-gray-900 mb-3">Filter by Status</h3>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Paid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Pending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Overdue</span>
                  </label>
                </div>
                <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Credit Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                    <span className="text-sm text-gray-700">Check</span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{payment.tenant}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{payment.property}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">${payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{new Date(payment.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">{payment.method}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full
                      ${payment.status === 'paid' ? 'bg-green-100 text-green-700' :
                        payment.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }
                    `}>
                      {payment.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                      {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                      {payment.status === 'overdue' && <XCircle className="w-3 h-3" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button 
                      onClick={() => {
                        alert(`Viewing receipt for ${payment.tenant}\nAmount: $${payment.amount.toLocaleString()}\nDate: ${payment.date}\nMethod: ${payment.method}`);
                        console.log('View receipt:', payment);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    {/* Record Payment Modal */}
    <RecordPaymentModal
      isOpen={showRecordPaymentModal}
      onClose={() => setShowRecordPaymentModal(false)}
      onSubmit={handleRecordPayment}
    />

    {/* Export Report Modal */}
    {showExportModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Export Payment Report</h2>
                <p className="text-sm text-gray-600">Generate a comprehensive payment report</p>
              </div>
            </div>
            <button
              onClick={() => setShowExportModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-blue-50 rounded-xl">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">$45,600</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Avg. Payment</p>
                <p className="text-2xl font-bold text-blue-600">$359</p>
              </div>
            </div>

            <form className="space-y-5">
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={exportForm.dateFrom}
                    onChange={(e) => setExportForm({ ...exportForm, dateFrom: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={exportForm.dateTo}
                    onChange={(e) => setExportForm({ ...exportForm, dateTo: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Quick Date Ranges */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      setExportForm({
                        ...exportForm,
                        dateFrom: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
                        dateTo: new Date().toISOString().split('T')[0],
                      });
                    }}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    This Month
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      setExportForm({
                        ...exportForm,
                        dateFrom: new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString().split('T')[0],
                        dateTo: new Date(today.getFullYear(), today.getMonth(), 0).toISOString().split('T')[0],
                      });
                    }}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    Last Month
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      const quarterStart = new Date(today.getFullYear(), Math.floor(today.getMonth() / 3) * 3, 1);
                      setExportForm({
                        ...exportForm,
                        dateFrom: quarterStart.toISOString().split('T')[0],
                        dateTo: new Date().toISOString().split('T')[0],
                      });
                    }}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    This Quarter
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const today = new Date();
                      setExportForm({
                        ...exportForm,
                        dateFrom: new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0],
                        dateTo: new Date().toISOString().split('T')[0],
                      });
                    }}
                    className="px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    This Year
                  </button>
                </div>
              </div>

              {/* Filter Options */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter By
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={exportForm.filterBy}
                    onChange={(e) => setExportForm({ ...exportForm, filterBy: e.target.value, filterValue: '' })}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Payments</option>
                    <option value="tenant">Specific Tenant</option>
                    <option value="property">Specific Property</option>
                    <option value="status">Payment Status</option>
                    <option value="method">Payment Method</option>
                  </select>

                  {exportForm.filterBy !== 'all' && (
                    <select
                      value={exportForm.filterValue}
                      onChange={(e) => setExportForm({ ...exportForm, filterValue: e.target.value })}
                      className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select {exportForm.filterBy}...</option>
                      {exportForm.filterBy === 'tenant' && (
                        <>
                          {tenants.map((tenant) => (
                            <option key={tenant.id} value={tenant.name}>
                              {tenant.name}
                            </option>
                          ))}
                        </>
                      )}
                      {exportForm.filterBy === 'property' && (
                        <>
                          {tenants.map((tenant) => (
                            <option key={tenant.id} value={tenant.property}>
                              {tenant.property}
                            </option>
                          ))}
                        </>
                      )}
                      {exportForm.filterBy === 'status' && (
                        <>
                          <option value="paid">Paid</option>
                          <option value="pending">Pending</option>
                          <option value="overdue">Overdue</option>
                        </>
                      )}
                      {exportForm.filterBy === 'method' && (
                        <>
                          <option value="Bank Transfer">Bank Transfer</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Cash">Cash</option>
                          <option value="Check">Check</option>
                          <option value="Mobile Money">Mobile Money</option>
                        </>
                      )}
                    </select>
                  )}
                </div>
              </div>

              {/* Export Format */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'pdf' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      exportForm.format === 'pdf'
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <FileText className={`w-8 h-8 mx-auto mb-2 ${
                      exportForm.format === 'pdf' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      exportForm.format === 'pdf' ? 'text-blue-600' : 'text-gray-600'
                    }`}>
                      PDF
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Professional report</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'excel' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      exportForm.format === 'excel'
                        ? 'border-green-600 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <FileSpreadsheet className={`w-8 h-8 mx-auto mb-2 ${
                      exportForm.format === 'excel' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      exportForm.format === 'excel' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      Excel
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Detailed analysis</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'csv' })}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      exportForm.format === 'csv'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <FileSpreadsheet className={`w-8 h-8 mx-auto mb-2 ${
                      exportForm.format === 'csv' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <p className={`text-sm font-semibold ${
                      exportForm.format === 'csv' ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      CSV
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Data export</p>
                  </button>
                </div>
              </div>

              {/* Report Preview Info */}
              <div className="p-4 bg-gray-50 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-2">Report Will Include:</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Payment transaction details
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Tenant and property information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Payment methods and status
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Summary statistics and totals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    Date range and filter criteria
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExportReport}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export {exportForm.format.toUpperCase()}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
