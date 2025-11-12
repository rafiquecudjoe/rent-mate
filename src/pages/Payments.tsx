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
      <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef]">Payments</h1>
            <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Track and manage rent payments</p>
          </div>
          <div className="flex gap-2 md:gap-3">
            <button 
              onClick={() => setShowRecordPaymentModal(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7fba7a] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#6da968] transition-all text-[13px] md:text-[14px] font-semibold shadow-lg shadow-[#7fba7a]/30 hover:shadow-xl"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Record Payment</span>
            </button>
            <button 
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-all text-[13px] md:text-[14px] font-semibold shadow-lg shadow-[#475be8]/30 dark:shadow-[#6c7ce8]/30 hover:shadow-xl"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

      {onViewHistory && (
        <div className="bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px] md:rounded-[15px] p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-[14px] md:text-[16px] text-[#475be8] dark:text-[#6c7ce8] mb-1">View Complete Payment History</h3>
            <p className="text-[12px] md:text-[13px] text-[#475be8]/80 dark:text-[#6c7ce8]/80">See all your past transactions and payment records</p>
          </div>
          <button
            onClick={onViewHistory}
            className="px-4 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-all font-medium text-[13px] md:text-[14px]"
          >
            View History
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2.5 md:p-3 rounded-[8px] ${
                stat.color === 'green' ? 'bg-[#7fba7a]/10' :
                stat.color === 'yellow' ? 'bg-[#ffce73]/10' :
                stat.color === 'red' ? 'bg-[#f45252]/10' :
                'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
              }`}>
                <stat.icon className={`w-5 h-5 md:w-6 md:h-6 ${
                  stat.color === 'green' ? 'text-[#7fba7a]' :
                  stat.color === 'yellow' ? 'text-[#ffce73]' :
                  stat.color === 'red' ? 'text-[#f45252]' :
                  'text-[#475be8] dark:text-[#6c7ce8]'
                }`} />
              </div>
            </div>
            <h3 className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1">{stat.label}</h3>
            <div className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">{stat.value}</div>
            <div className="text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e]">{stat.change}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            <input
              type="text"
              placeholder="Search payments..."
              className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px] md:text-[14px]"
            />
          </div>
          <button 
            onClick={() => setShowDateRangeMenu(!showDateRangeMenu)}
            className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors relative text-[13px] md:text-[14px]"
          >
            <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            <span className="font-medium text-[#11142d] dark:text-[#efefef]">Date Range</span>
            
            {showDateRangeMenu && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] shadow-xl border border-[#e4e8ef] dark:border-[#272b30] p-4 z-10">
                <h3 className="font-semibold text-[14px] md:text-[16px] text-[#11142d] dark:text-[#efefef] mb-3">Select Date Range</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1">From</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1">To</label>
                    <input 
                      type="date" 
                      className="w-full px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => setShowDateRangeMenu(false)}
                      className="flex-1 px-3 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors text-[12px] md:text-[13px] font-medium"
                    >
                      Apply
                    </button>
                    <button 
                      onClick={() => setShowDateRangeMenu(false)}
                      className="px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[12px] md:text-[13px] font-medium text-[#11142d] dark:text-[#efefef]"
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
            className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors relative text-[13px] md:text-[14px]"
          >
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            <span className="font-medium text-[#11142d] dark:text-[#efefef]">Filters</span>
            
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] shadow-xl border border-[#e4e8ef] dark:border-[#272b30] p-4 z-10">
                <h3 className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef] mb-3">Filter by Status</h3>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Paid</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Pending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Overdue</span>
                  </label>
                </div>
                <h3 className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef] mb-3">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Bank Transfer</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Credit Card</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30]" defaultChecked />
                    <span className="text-[13px] text-[#11142d] dark:text-[#efefef]">Check</span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#f4f4f4] dark:bg-[#111315] border-b border-[#e4e8ef] dark:border-[#272b30]">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Tenant
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Property
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Method
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e8ef] dark:divide-[#272b30]">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors">
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef]">{payment.tenant}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4">
                    <div className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">{payment.property}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-[13px] md:text-[14px] font-bold text-[#11142d] dark:text-[#efefef]">${payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">{new Date(payment.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <div className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">{payment.method}</div>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 text-[11px] md:text-[12px] font-semibold rounded-[6px] md:rounded-[8px]
                      ${payment.status === 'paid' ? 'bg-[#7fba7a]/10 text-[#7fba7a]' :
                        payment.status === 'pending' ? 'bg-[#ffce73]/10 text-[#ffce73]' :
                        'bg-[#f45252]/10 text-[#f45252]'
                      }
                    `}>
                      {payment.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                      {payment.status === 'pending' && <Clock className="w-3 h-3" />}
                      {payment.status === 'overdue' && <XCircle className="w-3 h-3" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                    <button 
                      onClick={() => {
                        alert(`Viewing receipt for ${payment.tenant}\nAmount: $${payment.amount.toLocaleString()}\nDate: ${payment.date}\nMethod: ${payment.method}`);
                        console.log('View receipt:', payment);
                      }}
                      className="text-[#475be8] dark:text-[#6c7ce8] hover:text-[#3d4fc7] dark:hover:text-[#5d6dd7] font-medium text-[13px] md:text-[14px]"
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
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#e4e8ef] dark:border-[#272b30]">
          {/* Modal Header */}
          <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px]">
                <Download className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
              </div>
              <div>
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef]">Export Payment Report</h2>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Generate a comprehensive payment report</p>
              </div>
            </div>
            <button
              onClick={() => setShowExportModal(false)}
              className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 md:p-6">
            {/* Summary Statistics */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px]">
              <div className="text-center">
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Total Payments</p>
                <p className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">127</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Total Amount</p>
                <p className="text-[18px] md:text-[22px] font-bold text-[#7fba7a]">$45,600</p>
              </div>
              <div className="text-center">
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Avg. Payment</p>
                <p className="text-[18px] md:text-[22px] font-bold text-[#475be8] dark:text-[#6c7ce8]">$359</p>
              </div>
            </div>

            <form className="space-y-5">
              {/* Date Range */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                    From Date
                  </label>
                  <input
                    type="date"
                    value={exportForm.dateFrom}
                    onChange={(e) => setExportForm({ ...exportForm, dateFrom: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                    To Date
                  </label>
                  <input
                    type="date"
                    value={exportForm.dateTo}
                    onChange={(e) => setExportForm({ ...exportForm, dateTo: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
                  />
                </div>
              </div>

              {/* Quick Date Ranges */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Quick Select
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                    className="px-3 py-2 text-[12px] md:text-[13px] border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors text-[#11142d] dark:text-[#efefef]"
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
                    className="px-3 py-2 text-[12px] md:text-[13px] border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors text-[#11142d] dark:text-[#efefef]"
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
                    className="px-3 py-2 text-[12px] md:text-[13px] border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors text-[#11142d] dark:text-[#efefef]"
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
                    className="px-3 py-2 text-[12px] md:text-[13px] border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors text-[#11142d] dark:text-[#efefef]"
                  >
                    This Year
                  </button>
                </div>
              </div>

              {/* Filter Options */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Filter By
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <select
                    value={exportForm.filterBy}
                    onChange={(e) => setExportForm({ ...exportForm, filterBy: e.target.value, filterValue: '' })}
                    className="px-3 md:px-4 py-2 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
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
                      className="px-3 md:px-4 py-2 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
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
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'pdf' })}
                    className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                      exportForm.format === 'pdf'
                        ? 'border-[#475be8] dark:border-[#6c7ce8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]'
                    }`}
                  >
                    <FileText className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${
                      exportForm.format === 'pdf' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <p className={`text-[12px] md:text-[13px] font-semibold ${
                      exportForm.format === 'pdf' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`}>
                      PDF
                    </p>
                    <p className="text-[10px] md:text-[11px] text-[#808191] dark:text-[#92939e] mt-1">Professional report</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'excel' })}
                    className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                      exportForm.format === 'excel'
                        ? 'border-[#7fba7a] bg-[#7fba7a]/10'
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#7fba7a]'
                    }`}
                  >
                    <FileSpreadsheet className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${
                      exportForm.format === 'excel' ? 'text-[#7fba7a]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <p className={`text-[12px] md:text-[13px] font-semibold ${
                      exportForm.format === 'excel' ? 'text-[#7fba7a]' : 'text-[#808191] dark:text-[#92939e]'
                    }`}>
                      Excel
                    </p>
                    <p className="text-[10px] md:text-[11px] text-[#808191] dark:text-[#92939e] mt-1">Detailed analysis</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setExportForm({ ...exportForm, format: 'csv' })}
                    className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                      exportForm.format === 'csv'
                        ? 'border-[#475be8] dark:border-[#6c7ce8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]'
                    }`}
                  >
                    <FileSpreadsheet className={`w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 ${
                      exportForm.format === 'csv' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <p className={`text-[12px] md:text-[13px] font-semibold ${
                      exportForm.format === 'csv' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`}>
                      CSV
                    </p>
                    <p className="text-[10px] md:text-[11px] text-[#808191] dark:text-[#92939e] mt-1">Data export</p>
                  </button>
                </div>
              </div>

              {/* Report Preview Info */}
              <div className="p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px]">
                <h3 className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef] mb-2">Report Will Include:</h3>
                <ul className="space-y-1 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#475be8] dark:bg-[#6c7ce8] rounded-full"></div>
                    Payment transaction details
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#475be8] dark:bg-[#6c7ce8] rounded-full"></div>
                    Tenant and property information
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#475be8] dark:bg-[#6c7ce8] rounded-full"></div>
                    Payment methods and status
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#475be8] dark:bg-[#6c7ce8] rounded-full"></div>
                    Summary statistics and totals
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#475be8] dark:bg-[#6c7ce8] rounded-full"></div>
                    Date range and filter criteria
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:gap-3 pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                <button
                  type="button"
                  onClick={() => setShowExportModal(false)}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors font-medium text-[13px] md:text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleExportReport}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors font-medium flex items-center justify-center gap-2 text-[13px] md:text-[14px]"
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
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
