import { DollarSign, Home, Calendar, AlertCircle, FileText, MessageSquare, CreditCard, Clock } from 'lucide-react';

interface TenantDashboardProps {
  onNavigate?: (page: string) => void;
}

export default function TenantDashboard({ onNavigate }: TenantDashboardProps) {
  // Mock tenant data - would come from API
  const tenantData = {
    name: 'Sarah Johnson',
    property: 'Sunset Apartments',
    unit: 'Unit 3B',
    address: '123 Main Street, Apt 3B',
    rentAmount: 1500,
    rentDue: '2025-11-01',
    daysUntilDue: 5,
    paymentStatus: 'pending',
    leaseExpiry: '2026-04-30',
    landlord: {
      name: 'John Smith',
      email: 'john@rentmate.com',
      phone: '+1 (555) 123-4567',
    },
  };

  const recentPayments = [
    { id: 1, date: '2025-10-01', amount: 1500, status: 'paid', method: 'Credit Card' },
    { id: 2, date: '2025-09-01', amount: 1500, status: 'paid', method: 'Bank Transfer' },
    { id: 3, date: '2025-08-01', amount: 1500, status: 'paid', method: 'Credit Card' },
  ];

  const maintenanceRequests = [
    { id: 1, title: 'Leaking faucet in kitchen', status: 'in-progress', date: '2025-10-20', priority: 'medium' },
    { id: 2, title: 'AC not cooling properly', status: 'completed', date: '2025-10-15', priority: 'high' },
  ];

  const announcements = [
    { id: 1, title: 'Building maintenance scheduled', date: '2025-10-25', message: 'Water will be shut off from 9 AM to 12 PM' },
    { id: 2, title: 'New recycling guidelines', date: '2025-10-22', message: 'Please review the updated recycling procedures' },
  ];

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#7fba7a] to-[#7fba7a]/90 rounded-[15px] md:rounded-[20px] p-6 md:p-8 text-white shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-[22px] md:text-[28px] font-bold mb-2">Welcome back, {tenantData.name.split(' ')[0]}! 👋</h1>
              <div className="flex items-center gap-2 text-white/90 mb-4">
                <Home className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[14px] md:text-[16px]">{tenantData.property} - {tenantData.unit}</span>
              </div>
              <p className="text-white/90 text-[12px] md:text-[13px]">{tenantData.address}</p>
            </div>
          </div>
        </div>

        {/* Rent Payment Alert */}
        {tenantData.daysUntilDue <= 7 && tenantData.paymentStatus === 'pending' && (
          <div className="bg-[#ffce73]/10 border-l-4 border-[#ffce73] rounded-[10px] md:rounded-[15px] p-4 md:p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#ffce73] flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-[14px] md:text-[16px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Rent Payment Due Soon</h3>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] mb-3">
                  Your rent of <strong>${tenantData.rentAmount.toLocaleString()}</strong> is due on{' '}
                  <strong>{new Date(tenantData.rentDue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>{' '}
                  ({tenantData.daysUntilDue} days from now)
                </p>
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-3">
                  Contact your landlord to arrange payment. Payments are recorded manually by the property manager.
                </p>
                <button 
                  onClick={() => onNavigate && onNavigate('payments')}
                  className="px-4 md:px-6 py-2 md:py-2.5 bg-[#ffce73] text-white font-semibold text-[12px] md:text-[13px] rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all duration-200"
                >
                  View Payment Info
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          {/* Rent Due */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#475be8] dark:bg-[#6c7ce8] rounded-[8px] md:rounded-[10px] flex items-center justify-center">
                <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <span className={`px-2 md:px-3 py-1 rounded-full text-[10px] md:text-[11px] font-semibold ${
                tenantData.paymentStatus === 'paid' 
                  ? 'bg-[#7fba7a]/10 text-[#7fba7a]' 
                  : 'bg-[#ffce73]/10 text-[#ffce73]'
              }`}>
                {tenantData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
              </span>
            </div>
            <h3 className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] font-medium mb-1">Current Rent</h3>
            <p className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-2">${tenantData.rentAmount.toLocaleString()}</p>
            <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">Due: {new Date(tenantData.rentDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
          </div>

          {/* Lease Info */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7c5dfa] rounded-[8px] md:rounded-[10px] flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <h3 className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] font-medium mb-1">Lease Expires</h3>
            <p className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-2">
              {Math.ceil((new Date(tenantData.leaseExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
            </p>
            <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{new Date(tenantData.leaseExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
          </div>

          {/* Maintenance */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30] hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffce73] rounded-[8px] md:rounded-[10px] flex items-center justify-center">
                <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
            </div>
            <h3 className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] font-medium mb-1">Active Requests</h3>
            <p className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-2">
              {maintenanceRequests.filter(r => r.status !== 'completed').length}
            </p>
            <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">Maintenance requests</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
          <h2 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            <button 
              onClick={() => onNavigate && onNavigate('payments')}
              className="flex items-center gap-3 p-3 md:p-4 rounded-[8px] md:rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:border-[#7fba7a] hover:bg-[#7fba7a]/5 transition-all group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7fba7a]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center group-hover:bg-[#7fba7a] transition-colors">
                <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#7fba7a] group-hover:text-white" />
              </div>
              <span className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">View Payments</span>
            </button>

            <button 
              onClick={() => onNavigate && onNavigate('maintenance')}
              className="flex items-center gap-3 p-3 md:p-4 rounded-[8px] md:rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:border-[#ffce73] hover:bg-[#ffce73]/5 transition-all group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffce73]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center group-hover:bg-[#ffce73] transition-colors">
                <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#ffce73] group-hover:text-white" />
              </div>
              <span className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Submit Request</span>
            </button>

            <button 
              onClick={() => onNavigate && onNavigate('lease')}
              className="flex items-center gap-3 p-3 md:p-4 rounded-[8px] md:rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] hover:bg-[#475be8]/5 transition-all group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#475be8]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center group-hover:bg-[#475be8] dark:group-hover:bg-[#6c7ce8] transition-colors">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8] group-hover:text-white" />
              </div>
              <span className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">View Lease</span>
            </button>

            <button 
              onClick={() => onNavigate && onNavigate('profile')}
              className="flex items-center gap-3 p-3 md:p-4 rounded-[8px] md:rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:border-[#7c5dfa] hover:bg-[#7c5dfa]/5 transition-all group"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7c5dfa]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center group-hover:bg-[#7c5dfa] transition-colors">
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-[#7c5dfa] group-hover:text-white" />
              </div>
              <span className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">My Profile</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Payments */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef]">Recent Payments</h2>
              <button 
                onClick={() => onNavigate && onNavigate('payments')}
                className="text-[12px] md:text-[13px] font-semibold text-[#7fba7a] hover:opacity-80"
              >
                View All
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-3 md:p-4 rounded-[8px] md:rounded-[10px] bg-[#f4f4f4] dark:bg-[#111315] hover:bg-[#e4e8ef] dark:hover:bg-[#272b30] transition-colors">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7fba7a]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center">
                      <CreditCard className="w-4 h-4 md:w-5 md:h-5 text-[#7fba7a]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">${payment.amount.toLocaleString()}</p>
                      <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{payment.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 md:px-3 py-1 bg-[#7fba7a]/10 text-[#7fba7a] rounded-full text-[10px] md:text-[11px] font-semibold mb-1">
                      {payment.status}
                    </span>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance Requests */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef]">Maintenance Requests</h2>
              <button 
                onClick={() => onNavigate && onNavigate('maintenance')}
                className="text-[12px] md:text-[13px] font-semibold text-[#7fba7a] hover:opacity-80"
              >
                View All
              </button>
            </div>
            <div className="space-y-3 md:space-y-4">
              {maintenanceRequests.map((request) => (
                <div key={request.id} className="p-3 md:p-4 rounded-[8px] md:rounded-[10px] bg-[#f4f4f4] dark:bg-[#111315] hover:bg-[#e4e8ef] dark:hover:bg-[#272b30] transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{request.title}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-[10px] md:text-[11px] font-semibold ${
                      request.status === 'completed' 
                        ? 'bg-[#7fba7a]/10 text-[#7fba7a]' 
                        : request.status === 'in-progress'
                        ? 'bg-[#475be8]/10 text-[#475be8] dark:text-[#6c7ce8]'
                        : 'bg-[#e4e8ef] dark:bg-[#272b30] text-[#808191] dark:text-[#92939e]'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 md:w-4 md:h-4" />
                      {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] md:text-[11px] ${
                      request.priority === 'high' 
                        ? 'bg-[#f45252]/10 text-[#f45252]' 
                        : request.priority === 'medium'
                        ? 'bg-[#ffce73]/10 text-[#ffce73]'
                        : 'bg-[#e4e8ef] dark:bg-[#272b30] text-[#808191] dark:text-[#92939e]'
                    }`}>
                      {request.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
          <h2 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Property Announcements</h2>
          <div className="space-y-3">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="p-3 md:p-4 rounded-[8px] md:rounded-[10px] bg-[#475be8]/5 border border-[#475be8]/20">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{announcement.title}</h3>
                  <span className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                </div>
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{announcement.message}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Landlord Contact */}
        <div className="bg-gradient-to-br from-[#11142d] to-[#11142d]/90 dark:from-[#1a1d1f] dark:to-[#1a1d1f]/90 rounded-[10px] md:rounded-[15px] p-4 md:p-6 text-white border border-[#272b30]">
          <h2 className="text-[16px] md:text-[18px] font-bold mb-4">Need Help?</h2>
          <p className="text-white/70 text-[12px] md:text-[13px] mb-4">Contact your property manager</p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="font-semibold text-[13px] md:text-[14px]">{tenantData.landlord.name}</span>
            </p>
            <p className="text-white/70 text-[12px] md:text-[13px]">{tenantData.landlord.phone}</p>
            <p className="text-white/70 text-[12px] md:text-[13px]">{tenantData.landlord.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
