import { Search, Filter, Download, Calendar, DollarSign, CheckCircle, Clock, XCircle, TrendingUp } from 'lucide-react';

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

export default function Payments({ onViewHistory }: PaymentsProps = {}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Payments</h1>
          <p className="text-gray-600">Track and manage rent payments</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5">
          <Download className="w-5 h-5" />
          <span className="font-semibold">Export Report</span>
        </button>
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
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Filters</span>
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
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
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
  );
}
