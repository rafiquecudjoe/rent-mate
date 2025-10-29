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
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-green-600/20">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {tenantData.name.split(' ')[0]}! 👋</h1>
            <div className="flex items-center gap-2 text-green-100 mb-4">
              <Home className="w-5 h-5" />
              <span className="text-lg">{tenantData.property} - {tenantData.unit}</span>
            </div>
            <p className="text-green-100">{tenantData.address}</p>
          </div>
        </div>
      </div>

      {/* Rent Payment Alert */}
      {tenantData.daysUntilDue <= 7 && tenantData.paymentStatus === 'pending' && (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-500 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Rent Payment Due Soon</h3>
              <p className="text-gray-700 mb-3">
                Your rent of <strong>${tenantData.rentAmount.toLocaleString()}</strong> is due on{' '}
                <strong>{new Date(tenantData.rentDue).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>{' '}
                ({tenantData.daysUntilDue} days from now)
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Contact your landlord to arrange payment. Payments are recorded manually by the property manager.
              </p>
              <button 
                onClick={() => onNavigate && onNavigate('payments')}
                className="px-6 py-2.5 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-lg shadow-orange-600/30"
              >
                View Payment Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Rent Due */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              tenantData.paymentStatus === 'paid' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-orange-100 text-orange-700'
            }`}>
              {tenantData.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
            </span>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Current Rent</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">${tenantData.rentAmount.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Due: {new Date(tenantData.rentDue).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>

        {/* Lease Info */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Lease Expires</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {Math.ceil((new Date(tenantData.leaseExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
          </p>
          <p className="text-sm text-gray-500">{new Date(tenantData.leaseExpiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Active Requests</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">
            {maintenanceRequests.filter(r => r.status !== 'completed').length}
          </p>
          <p className="text-sm text-gray-500">Maintenance requests</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => onNavigate && onNavigate('payments')}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-500 transition-colors">
              <CreditCard className="w-5 h-5 text-green-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-gray-900">View Payments</span>
          </button>

          <button 
            onClick={() => onNavigate && onNavigate('maintenance')}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <AlertCircle className="w-5 h-5 text-orange-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-gray-900">Submit Request</span>
          </button>

          <button 
            onClick={() => onNavigate && onNavigate('lease')}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
              <FileText className="w-5 h-5 text-blue-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-gray-900">View Lease</span>
          </button>

          <button 
            onClick={() => onNavigate && onNavigate('profile')}
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-500 transition-colors">
              <MessageSquare className="w-5 h-5 text-purple-600 group-hover:text-white" />
            </div>
            <span className="font-semibold text-gray-900">My Profile</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Payments</h2>
            <button 
              onClick={() => onNavigate && onNavigate('payments')}
              className="text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mb-1">
                    {payment.status}
                  </span>
                  <p className="text-sm text-gray-500">{new Date(payment.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Requests */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Maintenance Requests</h2>
            <button 
              onClick={() => onNavigate && onNavigate('maintenance')}
              className="text-sm font-semibold text-green-600 hover:text-green-700"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {maintenanceRequests.map((request) => (
              <div key={request.id} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-semibold text-gray-900">{request.title}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                    request.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : request.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {request.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                  <span className={`px-2 py-0.5 rounded ${
                    request.priority === 'high' 
                      ? 'bg-red-100 text-red-700' 
                      : request.priority === 'medium'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-gray-100 text-gray-700'
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
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Property Announcements</h2>
        <div className="space-y-3">
          {announcements.map((announcement) => (
            <div key={announcement.id} className="p-4 rounded-xl bg-blue-50 border border-blue-100">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                <span className="text-sm text-gray-500">{new Date(announcement.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>
              <p className="text-gray-700">{announcement.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Landlord Contact */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-xl">
        <h2 className="text-xl font-bold mb-4">Need Help?</h2>
        <p className="text-gray-300 mb-4">Contact your property manager</p>
        <div className="space-y-2">
          <p className="flex items-center gap-2">
            <span className="font-semibold">{tenantData.landlord.name}</span>
          </p>
          <p className="text-gray-300">{tenantData.landlord.phone}</p>
          <p className="text-gray-300">{tenantData.landlord.email}</p>
        </div>
      </div>
    </div>
  );
}
