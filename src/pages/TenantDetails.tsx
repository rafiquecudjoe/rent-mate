import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, FileText, Home, CreditCard, AlertCircle, CheckCircle, MessageSquare, Send, X, RefreshCw, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import LeaseRenewalModal, { RenewalData } from '../components/LeaseRenewalModal';

interface TenantDetailsProps {
  tenantId: number;
  onBack: () => void;
}

export default function TenantDetails({ tenantId, onBack }: TenantDetailsProps) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [showRenewalModal, setShowRenewalModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp' | 'both'>('email');
  const [leaseTemplate, setLeaseTemplate] = useState('Standard Residential Lease');
  const [isFromRenewal, setIsFromRenewal] = useState(false);

  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, '');
  };

  // Format lease document name: name_lease_MM_YY_MM_YY
  const formatLeaseDocumentName = (name: string, startDate: string, endDate: string) => {
    // Convert name to lowercase and replace spaces with underscores
    const formattedName = name.toLowerCase().replace(/\s+/g, '_');
    
    // Parse dates and format as MM_YY
    const formatDate = (dateStr: string) => {
      // Parse "Jan 15, 2024" format
      const date = new Date(dateStr);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(-2);
      return `${month}_${year}`;
    };
    
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);
    
    return `${formattedName}_lease_${formattedStartDate}_${formattedEndDate}.pdf`;
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
              onClick={() => setShowRenewalModal(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Renew/Extend
            </button>
            <button
              onClick={() => {
                // Auto-detect which lease template to use based on tenant status
                if (tenant.lease.status === 'active') {
                  // For active leases, default to standard residential
                  setLeaseTemplate('Standard Residential Lease');
                }
                setShowLeaseModal(true);
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Send Document
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
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Send Lease Document</h2>
              <p className="text-sm text-gray-600 mt-1">
                Sending to: <span className="font-semibold text-gray-900">{tenant.name}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setShowLeaseModal(false);
                setIsFromRenewal(false);
                setLeaseTemplate('Standard Residential Lease');
              }}
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

          {isFromRenewal && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Lease Renewed Successfully!</p>
                  <p className="text-sm text-green-700 mt-1">
                    The lease renewal has been created. Now send the updated lease agreement to your tenant.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info banner when NOT from renewal */}
          {!isFromRenewal && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900">Current Lease Information</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Tenant: {tenant.name} • {tenant.property.unit} at {tenant.property.name}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Lease Period: {tenant.lease.startDate} - {tenant.lease.endDate}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* Document Name Preview */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Name
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                <p className="text-sm font-mono text-gray-900">
                  {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate)}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Format: name_lease_MM_YY_MM_YY.pdf (start and end dates)
              </p>
            </div>

            {/* Document Type - Read-only display */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Document Type
              </label>
              <div className={`w-full px-4 py-3 rounded-xl flex items-center justify-between ${
                isFromRenewal 
                  ? 'bg-blue-50 border-2 border-blue-300' 
                  : 'bg-gray-50 border border-gray-200'
              }`}>
                <span className={`font-semibold ${
                  isFromRenewal ? 'text-blue-900' : 'text-gray-900'
                }`}>
                  {isFromRenewal ? 'Lease Renewal' : 'Current Lease Agreement'}
                </span>
                {isFromRenewal && (
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
                    Auto-selected
                  </span>
                )}
              </div>
              <p className={`text-xs mt-2 ${
                isFromRenewal ? 'text-blue-600' : 'text-gray-500'
              }`}>
                {isFromRenewal 
                  ? 'Sending new lease renewal agreement' 
                  : 'Sending current lease agreement to tenant'}
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
                defaultValue={
                  isFromRenewal
                    ? `Hi ${tenant.name.split(' ')[0]},\n\nGreat news! Your lease renewal for ${tenant.property.unit} at ${tenant.property.name} has been processed.\n\nPlease find attached your new lease agreement with the updated terms. The document is ready for your review and signature.\n\nDocument: ${formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate)}\n\nPlease review and let me know if you have any questions.\n\nBest regards`
                    : `Hi ${tenant.name.split(' ')[0]},\n\nPlease find attached your personalized lease agreement for ${tenant.property.unit} at ${tenant.property.name}. All tenant and property details have been filled in for your convenience.\n\nPlease review and let me know if you have any questions.\n\nBest regards`
                }
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowLeaseModal(false);
                setIsFromRenewal(false);
                setLeaseTemplate('Standard Residential Lease');
              }}
              className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium flex items-center gap-2"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
            <button
              onClick={() => {
                // In a real app, this would send the email
                const documentName = formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate);
                const deliveryText = deliveryMethod === 'both' ? 'email and WhatsApp' : deliveryMethod;
                const message = isFromRenewal 
                  ? `Lease renewal sent!\n\nDocument: ${documentName}\nSent to: ${tenant.email}\nDelivery: ${deliveryText}` 
                  : `Lease agreement sent!\n\nDocument: ${documentName}\nSent to: ${tenant.email}\nDelivery: ${deliveryText}`;
                alert(message);
                setShowLeaseModal(false);
                setIsFromRenewal(false);
                setLeaseTemplate('Standard Residential Lease');
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

    {/* Lease Renewal/Extension Modal */}
    <LeaseRenewalModal
      isOpen={showRenewalModal}
      onClose={() => setShowRenewalModal(false)}
      onSubmit={(renewalData: RenewalData) => {
        console.log('Renewal/Extension Data:', renewalData);
        alert(`Lease ${renewalData.type} created successfully!\nNew end date: ${renewalData.newEndDate}\nNew rent: $${renewalData.newMonthlyRent}`);
        setShowRenewalModal(false);
      }}
      onSendLease={() => {
        // Open the send lease modal after renewal is created
        setIsFromRenewal(true);
        setLeaseTemplate('Lease Renewal');
        setShowLeaseModal(true);
      }}
      tenant={{
        id: tenant.id.toString(),
        name: tenant.name,
        email: tenant.email
      }}
      currentLease={{
        id: '1',
        propertyName: tenant.property.name,
        unitNumber: tenant.property.unit,
        monthlyRent: tenant.lease.monthlyRent,
        startDate: tenant.lease.startDate,
        endDate: tenant.lease.endDate
      }}
    />

    {/* Lease Preview Modal */}
    {showPreviewModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[60] p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <FileText className="w-6 h-6" />
              <div>
                <h2 className="text-xl font-bold">Lease Agreement Preview</h2>
                <p className="text-sm text-blue-100">
                  {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Download functionality would be implemented here')}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto p-12 font-serif">
              {/* Document Header */}
              <div className="text-center mb-8 border-b-2 border-gray-800 pb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {isFromRenewal ? 'LEASE RENEWAL AGREEMENT' : leaseTemplate.toUpperCase()}
                </h1>
                <p className="text-sm text-gray-600">
                  Document ID: {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate).replace('.pdf', '')}
                </p>
              </div>

              {/* Parties */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">PARTIES TO THIS AGREEMENT</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Landlord/Property Manager:</strong> Property Management Company</p>
                  <p><strong>Tenant:</strong> {tenant.name}</p>
                  <p><strong>Email:</strong> {tenant.email}</p>
                  <p><strong>Phone:</strong> {tenant.phone}</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">PROPERTY DETAILS</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Property Address:</strong> {tenant.property.address}</p>
                  <p><strong>Property Name:</strong> {tenant.property.name}</p>
                  <p><strong>Unit:</strong> {tenant.property.unit}</p>
                </div>
              </div>

              {/* Lease Terms */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">LEASE TERMS</h2>
                <div className="space-y-3 text-gray-700">
                  <p><strong>Lease Start Date:</strong> {tenant.lease.startDate}</p>
                  <p><strong>Lease End Date:</strong> {tenant.lease.endDate}</p>
                  <p><strong>Monthly Rent:</strong> ${tenant.lease.monthlyRent.toLocaleString()}</p>
                  <p><strong>Security Deposit:</strong> ${tenant.lease.securityDeposit.toLocaleString()}</p>
                  <p><strong>Lease Status:</strong> <span className="text-green-600 font-semibold">{tenant.lease.status}</span></p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">TERMS AND CONDITIONS</h2>
                <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                  <p><strong>1. RENT PAYMENT:</strong> Tenant agrees to pay rent on or before the 1st day of each month. Late payments may incur additional fees as specified in the lease agreement.</p>
                  
                  <p><strong>2. SECURITY DEPOSIT:</strong> The security deposit will be held for the duration of the lease and returned within 30 days of lease termination, minus any deductions for damages beyond normal wear and tear.</p>
                  
                  <p><strong>3. MAINTENANCE:</strong> Tenant is responsible for maintaining the property in good condition and reporting any maintenance issues promptly.</p>
                  
                  <p><strong>4. UTILITIES:</strong> Tenant is responsible for all utilities unless otherwise specified in writing.</p>
                  
                  <p><strong>5. TERMINATION:</strong> Either party may terminate this lease with 60 days written notice, subject to the terms outlined in the full lease agreement.</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-12 pt-8 border-t-2 border-gray-300">
                <h2 className="text-xl font-bold text-gray-900 mb-6">SIGNATURES</h2>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="border-b-2 border-gray-400 mb-2 pb-8"></div>
                    <p className="text-sm text-gray-700 font-semibold">Landlord/Property Manager</p>
                    <p className="text-xs text-gray-500">Date: _______________</p>
                  </div>
                  <div>
                    <div className="border-b-2 border-gray-400 mb-2 pb-8"></div>
                    <p className="text-sm text-gray-700 font-semibold">Tenant: {tenant.name}</p>
                    <p className="text-xs text-gray-500">Date: _______________</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
                <p>This is a preview of the lease agreement. The actual document will be generated with complete legal terms and conditions.</p>
                <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                setShowPreviewModal(false);
                // Send modal is still open in background
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Proceed to Send
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
