import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, FileText, Home, CreditCard, AlertCircle, CheckCircle, MessageSquare, Send, X } from 'lucide-react';
import { useState } from 'react';

interface TenantDetailsProps {
  tenantId: number;
  onBack: () => void;
}

export default function TenantDetails({ tenantId, onBack }: TenantDetailsProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp' | 'both'>('email');

  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, '');
  };

  // Mock data - in real app, this would come from API/state based on tenantId
  const tenant = {
    id: tenantId,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '(555) 123-4567',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
    property: {
      name: '123 Maple Street',
      unit: 'Unit 4B',
      address: '123 Maple St, Boston, MA 02101',
    },
    lease: {
      startDate: 'Jan 15, 2024',
      endDate: 'Oct 15, 2025',
      monthlyRent: 1500,
      securityDeposit: 3000,
      status: 'active',
    },
    paymentHistory: [
      { id: 1, date: 'Oct 1, 2025', amount: 1500, status: 'paid', method: 'Bank Transfer' },
      { id: 2, date: 'Sep 1, 2025', amount: 1500, status: 'paid', method: 'Bank Transfer' },
      { id: 3, date: 'Aug 1, 2025', amount: 1500, status: 'paid', method: 'Credit Card' },
      { id: 4, date: 'Jul 1, 2025', amount: 1500, status: 'paid', method: 'Bank Transfer' },
      { id: 5, date: 'Jun 1, 2025', amount: 1500, status: 'paid', method: 'Check' },
    ],
    maintenanceRequests: [
      { id: 1, date: 'Oct 15, 2025', issue: 'Leaking faucet in kitchen', status: 'in-progress', priority: 'medium' },
      { id: 2, date: 'Sep 10, 2025', issue: 'AC not cooling properly', status: 'completed', priority: 'high' },
      { id: 3, date: 'Aug 5, 2025', issue: 'Broken door lock', status: 'completed', priority: 'high' },
    ],
    documents: [
      { id: 1, name: 'Lease Agreement.pdf', uploadDate: 'Jan 15, 2024', size: '2.4 MB' },
      { id: 2, name: 'ID Copy.pdf', uploadDate: 'Jan 15, 2024', size: '1.2 MB' },
      { id: 3, name: 'Proof of Income.pdf', uploadDate: 'Jan 15, 2024', size: '850 KB' },
    ],
  };

  const totalPaid = tenant.paymentHistory.reduce((sum, payment) => sum + payment.amount, 0);
  const onTimePayments = tenant.paymentHistory.filter(p => p.status === 'paid').length;
  const paymentRate = Math.round((onTimePayments / tenant.paymentHistory.length) * 100);

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Tenant Details</h1>
            <p className="text-gray-600 mt-1">Complete tenant information and history</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowContactModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact
            </button>
            <button
              onClick={() => setShowLeaseModal(true)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Send Lease
            </button>
          </div>
        </div>

      {/* Tenant Profile Card */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={tenant.photo}
            alt={tenant.name}
            className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">{tenant.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-blue-50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{tenant.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                <span>{tenant.property.unit}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{tenant.property.address}</span>
              </div>
            </div>
          </div>
          <div className="text-center md:text-right">
            <span className={`inline-flex px-4 py-2 rounded-full text-sm font-semibold ${
              tenant.lease.status === 'active' 
                ? 'bg-white text-blue-600' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {tenant.lease.status === 'active' ? 'Active Lease' : 'Lease Expiring'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Rent</p>
              <p className="text-2xl font-bold text-gray-900">${tenant.lease.monthlyRent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-2xl font-bold text-gray-900">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Payment Rate</p>
              <p className="text-2xl font-bold text-gray-900">{paymentRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Lease Ends</p>
              <p className="text-lg font-bold text-gray-900">{tenant.lease.endDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lease Information */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Lease Information
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Property</span>
              <span className="font-semibold text-gray-900">{tenant.property.name}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Unit</span>
              <span className="font-semibold text-gray-900">{tenant.property.unit}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Lease Start</span>
              <span className="font-semibold text-gray-900">{tenant.lease.startDate}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Lease End</span>
              <span className="font-semibold text-gray-900">{tenant.lease.endDate}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-600">Monthly Rent</span>
              <span className="font-bold text-green-600">${tenant.lease.monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Security Deposit</span>
              <span className="font-semibold text-gray-900">${tenant.lease.securityDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <FileText className="w-6 h-6 text-blue-600" />
            Documents
          </h2>
          <div className="space-y-3">
            {tenant.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{doc.name}</p>
                    <p className="text-sm text-gray-500">{doc.size} • {doc.uploadDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    // In production, this would open the document
                    alert(`Opening ${doc.name}`);
                    console.log('View document:', doc);
                  }}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <CreditCard className="w-6 h-6 text-blue-600" />
          Payment History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Method</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenant.paymentHistory.map((payment) => (
                <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-gray-900">{payment.date}</td>
                  <td className="py-4 px-4 font-semibold text-gray-900">${payment.amount.toLocaleString()}</td>
                  <td className="py-4 px-4 text-gray-600">{payment.method}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {payment.status === 'paid' && <CheckCircle className="w-3 h-3" />}
                      {payment.status === 'pending' && <AlertCircle className="w-3 h-3" />}
                      {payment.status === 'overdue' && <AlertCircle className="w-3 h-3" />}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-blue-600" />
          Maintenance Requests
        </h2>
        <div className="space-y-3">
          {tenant.maintenanceRequests.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-gray-900">{request.issue}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    request.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : request.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="text-sm text-gray-500">Submitted: {request.date}</p>
              </div>
              <span className={`px-4 py-2 text-sm font-semibold rounded-lg ${
                request.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : request.status === 'in-progress'
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {request.status === 'completed' && 'Completed'}
                {request.status === 'in-progress' && 'In Progress'}
                {request.status === 'pending' && 'Pending'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Contact Modal */}
    {showContactModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact {tenant.name}</h2>
            <button
              onClick={() => setShowContactModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="space-y-4">
            {/* Phone */}
            <a
              href={`tel:${tenant.phone}`}
              className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all border border-blue-200 group"
            >
              <div className="p-3 bg-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Call</p>
                <p className="text-sm text-gray-600">{tenant.phone}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${tenant.email}`}
              className="flex items-center gap-4 p-4 bg-purple-50 rounded-xl hover:bg-purple-100 transition-all border border-purple-200 group"
            >
              <div className="p-3 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Email</p>
                <p className="text-sm text-gray-600">{tenant.email}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${formatPhoneForWhatsApp(tenant.phone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-green-50 rounded-xl hover:bg-green-100 transition-all border border-green-200 group"
            >
              <div className="p-3 bg-green-600 rounded-lg group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-600">Send message via WhatsApp</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    )}

    {/* Send Lease Agreement Modal */}
    {showLeaseModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Send Lease Agreement</h2>
            <button
              onClick={() => setShowLeaseModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <img
                src={tenant.photo}
                alt={tenant.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{tenant.name}</p>
                <p className="text-sm text-gray-600">{tenant.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Template
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Standard Residential Lease</option>
                <option>Month-to-Month Agreement</option>
                <option>Commercial Lease</option>
                <option>Lease Renewal</option>
                <option>Lease Amendment</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">
                Template will be auto-filled with tenant and property details
              </p>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                How would you like to send?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('email')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    deliveryMethod === 'email'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <Mail className={`w-6 h-6 mx-auto mb-2 ${
                    deliveryMethod === 'email' ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm font-semibold ${
                    deliveryMethod === 'email' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    Email
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('whatsapp')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    deliveryMethod === 'whatsapp'
                      ? 'border-green-600 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <MessageSquare className={`w-6 h-6 mx-auto mb-2 ${
                    deliveryMethod === 'whatsapp' ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <p className={`text-sm font-semibold ${
                    deliveryMethod === 'whatsapp' ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    WhatsApp
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('both')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    deliveryMethod === 'both'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <div className="flex justify-center gap-1 mb-2">
                    <Mail className={`w-5 h-5 ${
                      deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                    <MessageSquare className={`w-5 h-5 ${
                      deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-400'
                    }`} />
                  </div>
                  <p className={`text-sm font-semibold ${
                    deliveryMethod === 'both' ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    Both
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Add a personal message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                defaultValue={`Hi ${tenant.name.split(' ')[0]},\n\nPlease find attached your personalized lease agreement for ${tenant.property.unit} at ${tenant.property.name}. All tenant and property details have been filled in for your convenience.\n\nPlease review and let me know if you have any questions.\n\nBest regards`}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowLeaseModal(false)}
              className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // In a real app, this would send the email
                alert(`Lease agreement sent to ${tenant.email}`);
                setShowLeaseModal(false);
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send Agreement
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
