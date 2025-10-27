import { Search, Download, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

const transactions = [
  {
    id: 1,
    date: 'July 1, 2024',
    transactionId: 'TXN789012345',
    amount: 1300,
    status: 'successful',
  },
  {
    id: 2,
    date: 'June 1, 2024',
    transactionId: 'TXN678901234',
    amount: 1300,
    status: 'successful',
  },
  {
    id: 3,
    date: 'May 1, 2024',
    transactionId: 'TXN567890123',
    amount: 1300,
    status: 'successful',
  },
  {
    id: 4,
    date: 'April 1, 2024',
    transactionId: 'TXN456789012',
    amount: 1300,
    status: 'failed',
  },
  {
    id: 5,
    date: 'March 1, 2024',
    transactionId: 'TXN345678901',
    amount: 1300,
    status: 'pending',
  },
];

export default function PaymentHistory() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment History</h1>
          <p className="text-gray-600">Review all your past and upcoming payments.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5">
          <Download className="w-5 h-5" />
          <span className="font-semibold">Download Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Total Paid</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">$15,600.00</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Last Payment Date</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">July 1, 2024</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Next Payment Due</h3>
          <div className="text-3xl font-bold text-gray-900 mb-1">$1,300.00</div>
          <div className="text-sm text-gray-500 font-medium">on Aug 1, 2024</div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Transaction ID..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Date Range</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Status: All</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Amount
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
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600 font-mono">{transaction.transactionId}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      ${transaction.amount.toLocaleString()}.00
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full
                      ${transaction.status === 'successful' ? 'bg-green-100 text-green-700' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }
                    `}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        transaction.status === 'successful' ? 'bg-green-600' :
                        transaction.status === 'pending' ? 'bg-yellow-600' :
                        'bg-red-600'
                      }`} />
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
            <span className="font-medium">Previous</span>
          </button>

          <div className="text-sm text-gray-600">
            Page <span className="font-semibold text-gray-900">1</span> of{' '}
            <span className="font-semibold text-gray-900">10</span>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="font-medium">Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
