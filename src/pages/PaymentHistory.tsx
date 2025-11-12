import { Search, Download, Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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
  const [showDateRangeMenu, setShowDateRangeMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Payment History</h1>
            <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Review all your past and upcoming payments.</p>
          </div>
          <button 
            onClick={() => {
              alert('Downloading payment history report...');
              console.log('Download report');
            }}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all duration-200 text-[12px] md:text-[13px] font-semibold"
          >
            <Download className="w-4 h-4 md:w-5 md:h-5" />
            <span>Download Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-all duration-300">
            <h3 className="text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Total Paid</h3>
            <div className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">$15,600.00</div>
          </div>

          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-all duration-300">
            <h3 className="text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Last Payment Date</h3>
            <div className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">July 1, 2024</div>
          </div>

          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-all duration-300">
            <h3 className="text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Next Payment Due</h3>
            <div className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">$1,300.00</div>
            <div className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] font-medium">on Aug 1, 2024</div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
              <input
                type="text"
                placeholder="Search by Transaction ID..."
                className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
              />
            </div>
            <button 
              onClick={() => setShowDateRangeMenu(!showDateRangeMenu)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] transition-colors relative text-[12px] md:text-[13px]"
            >
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
              <span className="font-medium text-[#11142d] dark:text-[#efefef]">Date Range</span>
              
              {showDateRangeMenu && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] shadow-lg border border-[#e4e8ef] dark:border-[#272b30] p-4 z-10">
                  <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[13px] md:text-[14px]">Select Date Range</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[12px] md:text-[13px] font-medium text-[#808191] dark:text-[#92939e] mb-1">From</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] md:text-[13px] font-medium text-[#808191] dark:text-[#92939e] mb-1">To</label>
                      <input 
                        type="date" 
                        className="w-full px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                      />
                    </div>
                    <button 
                      onClick={() => setShowDateRangeMenu(false)}
                      className="w-full px-3 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:opacity-90 transition-colors text-[12px] md:text-[13px] font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </button>
            <button 
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] transition-colors relative text-[12px] md:text-[13px]"
            >
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
              <span className="font-medium text-[#11142d] dark:text-[#efefef]">Status: All</span>
              
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] shadow-lg border border-[#e4e8ef] dark:border-[#272b30] p-4 z-10">
                  <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[13px] md:text-[14px]">Filter by Status</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="text-[#475be8]" defaultChecked />
                      <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">All</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="text-[#475be8]" />
                      <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Successful</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="text-[#475be8]" />
                      <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Pending</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="status" className="text-[#475be8]" />
                      <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Failed</span>
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
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-[11px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-[11px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-[11px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-[11px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 md:px-6 py-3 md:py-4 text-left text-[10px] md:text-[11px] font-semibold text-[#808191] dark:text-[#92939e] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e4e8ef] dark:divide-[#272b30]">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors">
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-[12px] md:text-[13px] font-medium text-[#11142d] dark:text-[#efefef]">{transaction.date}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] font-mono">{transaction.transactionId}</div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <div className="text-[12px] md:text-[13px] font-bold text-[#11142d] dark:text-[#efefef]">
                        ${transaction.amount.toLocaleString()}.00
                      </div>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <span className={`
                        inline-flex items-center gap-1.5 px-2 md:px-3 py-1 text-[10px] md:text-[11px] font-semibold rounded-full
                        ${transaction.status === 'successful' ? 'bg-[#7fba7a]/10 text-[#7fba7a]' :
                          transaction.status === 'pending' ? 'bg-[#ffce73]/10 text-[#ffce73]' :
                          'bg-[#f45252]/10 text-[#f45252]'
                        }
                      `}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          transaction.status === 'successful' ? 'bg-[#7fba7a]' :
                          transaction.status === 'pending' ? 'bg-[#ffce73]' :
                          'bg-[#f45252]'
                        }`} />
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                      <button 
                        onClick={() => {
                          alert(`Downloading receipt for ${transaction.transactionId}`);
                          console.log('Download receipt:', transaction);
                        }}
                        className="text-[#475be8] dark:text-[#6c7ce8] hover:opacity-80 font-medium text-[11px] md:text-[12px]"
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
            <button 
              onClick={() => alert('Previous page')}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-[#11142d] dark:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] rounded-[8px] transition-colors text-[12px] md:text-[13px]"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-medium">Previous</span>
            </button>

            <div className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">
              Page <span className="font-semibold text-[#11142d] dark:text-[#efefef]">1</span> of{' '}
              <span className="font-semibold text-[#11142d] dark:text-[#efefef]">10</span>
            </div>

            <button 
              onClick={() => alert('Next page')}
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-[#11142d] dark:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] rounded-[8px] transition-colors text-[12px] md:text-[13px]"
            >
              <span className="font-medium">Next</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
