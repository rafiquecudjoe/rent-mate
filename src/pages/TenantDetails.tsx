import { ArrowLeft, Mail, Phone, MapPin, Calendar, DollarSign, FileText, Home, CreditCard, AlertCircle, CheckCircle, MessageSquare, Send, X, RefreshCw, Eye, Download, Wrench } from 'lucide-react';
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
      <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4 md:mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] rounded-[8px] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
          </button>
          <div className="flex-1">
            <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Tenant Details</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowContactModal(true)}
              className="px-3 md:px-4 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3d4ec7] dark:hover:bg-[#5a6dd6] transition-all font-semibold flex items-center gap-2 text-[13px] md:text-[14px]"
            >
              <Phone className="w-4 h-4" />
              Contact
            </button>
            <button
              onClick={() => setShowRenewalModal(true)}
              className="px-3 md:px-4 py-2 bg-[#7fba7a] text-white rounded-[8px] hover:bg-[#6fa969] transition-all font-semibold flex items-center gap-2 text-[13px] md:text-[14px]"
            >
              <RefreshCw className="w-4 h-4" />
              Renew/Extend
            </button>
            <button
              onClick={() => {
                if (tenant.lease.status === 'active') {
                  setLeaseTemplate('Standard Residential Lease');
                }
                setShowLeaseModal(true);
              }}
              className="px-3 md:px-4 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3d4ec7] dark:hover:bg-[#5a6dd6] transition-all font-semibold flex items-center gap-2 text-[13px] md:text-[14px]"
            >
              <FileText className="w-4 h-4" />
              Send Document
            </button>
          </div>
        </div>

      {/* Tenant Profile Card */}
      <div className="bg-[#475be8] dark:bg-[#6c7ce8] rounded-[10px] md:rounded-[15px] p-6 md:p-8 text-white transition-colors border border-[#475be8] dark:border-[#6c7ce8]">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <img
            src={tenant.photo}
            alt={tenant.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-[10px] border-4 border-white shadow-lg object-cover"
          />
          <div className="flex-1">
            <h2 className="text-[22px] md:text-[28px] font-bold mb-2 md:mb-3">{tenant.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-white/90 text-[13px] md:text-[14px]">
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
          <div className="text-left md:text-right">
            <span className={`inline-flex px-3 md:px-4 py-1.5 md:py-2 rounded-[8px] text-[12px] md:text-[13px] font-semibold ${
              tenant.lease.status === 'active' 
                ? 'bg-white text-[#475be8] dark:text-[#6c7ce8]' 
                : 'bg-[#ffce73]/20 text-[#ffce73]'
            }`}>
              {tenant.lease.status === 'active' ? 'Active Lease' : 'Lease Expiring'}
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e]">Monthly Rent</p>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">${tenant.lease.monthlyRent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 flex items-center justify-center">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e]">Total Paid</p>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e]">Payment Rate</p>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">{paymentRate}%</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffce73]/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#ffce73]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e]">Lease Ends</p>
              <p className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef]">{tenant.lease.endDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Lease Information */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            Lease Information
          </h2>
          <div className="space-y-3 md:space-y-4">
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-[#e4e8ef] dark:border-[#272b30]">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Property</span>
              <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{tenant.property.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-[#e4e8ef] dark:border-[#272b30]">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Unit</span>
              <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{tenant.property.unit}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-[#e4e8ef] dark:border-[#272b30]">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Lease Start</span>
              <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{tenant.lease.startDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-[#e4e8ef] dark:border-[#272b30]">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Lease End</span>
              <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{tenant.lease.endDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3 border-b border-[#e4e8ef] dark:border-[#272b30]">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Monthly Rent</span>
              <span className="font-bold text-[13px] md:text-[14px] text-[#7fba7a]">${tenant.lease.monthlyRent.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center py-2 md:py-3">
              <span className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Security Deposit</span>
              <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">${tenant.lease.securityDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            Documents
          </h2>
          <div className="space-y-3">
            {tenant.documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] hover:bg-[#e4e8ef] dark:hover:bg-[#1a1d1f] transition-colors cursor-pointer border border-[#e4e8ef] dark:border-[#272b30]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px]">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{doc.name}</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{doc.size} • {doc.uploadDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    alert(`Opening ${doc.name}`);
                    console.log('View document:', doc);
                  }}
                  className="px-3 md:px-4 py-1.5 md:py-2 text-[12px] md:text-[13px] font-semibold text-[#475be8] dark:text-[#6c7ce8] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 rounded-[8px] transition-colors"
                >
                  View
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
        <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
          <DollarSign className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
          Payment History
        </h2>
        <div className="space-y-3">
          {tenant.paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:bg-[#e4e8ef] dark:hover:bg-[#1a1d1f] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-[8px] ${
                  payment.status === 'Paid' 
                    ? 'bg-[#7fba7a]/10' 
                    : payment.status === 'Pending'
                    ? 'bg-[#ffce73]/10'
                    : 'bg-[#f45252]/10'
                }`}>
                  <DollarSign className={`w-4 h-4 md:w-5 md:h-5 ${
                    payment.status === 'Paid' 
                      ? 'text-[#7fba7a]' 
                      : payment.status === 'Pending'
                      ? 'text-[#ffce73]'
                      : 'text-[#f45252]'
                  }`} />
                </div>
                <div>
                  <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">${payment.amount.toLocaleString()}</p>
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{payment.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-[8px] text-[11px] md:text-[12px] font-semibold ${
                payment.status === 'Paid' 
                  ? 'bg-[#7fba7a]/10 text-[#7fba7a]' 
                  : payment.status === 'Pending'
                  ? 'bg-[#ffce73]/10 text-[#ffce73]'
                  : 'bg-[#f45252]/10 text-[#f45252]'
              }`}>
                {payment.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Maintenance Requests */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
        <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
          <Wrench className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
          Maintenance Requests
        </h2>
        <div className="space-y-3">
          {tenant.maintenanceRequests.map((request) => (
            <div
              key={request.id}
              className="p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] border border-[#e4e8ef] dark:border-[#272b30] hover:bg-[#e4e8ef] dark:hover:bg-[#1a1d1f] transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{request.issue}</h3>
                <div className="flex gap-2">
                  <span className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold ${
                    request.priority === 'High' 
                      ? 'bg-[#f45252]/10 text-[#f45252]'
                      : request.priority === 'Medium'
                      ? 'bg-[#ffce73]/10 text-[#ffce73]'
                      : 'bg-[#7fba7a]/10 text-[#7fba7a]'
                  }`}>
                    {request.priority}
                  </span>
                  <span className={`px-2 py-0.5 rounded-[6px] text-[11px] font-semibold ${
                    request.status === 'Open' 
                      ? 'bg-[#475be8]/10 text-[#475be8] dark:bg-[#6c7ce8]/10 dark:text-[#6c7ce8]'
                      : request.status === 'In Progress'
                      ? 'bg-[#ffce73]/10 text-[#ffce73]'
                      : 'bg-[#7fba7a]/10 text-[#7fba7a]'
                  }`}>
                    {request.status}
                  </span>
                </div>
              </div>
              <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{request.date}</p>
            </div>
          ))}
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
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 p-4">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] shadow-xl max-w-md w-full p-6 md:p-8 border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Contact {tenant.name}</h2>
            <button
              onClick={() => setShowContactModal(false)}
              className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Phone */}
            <a
              href={`tel:${tenant.phone}`}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 transition-colors group border border-transparent hover:border-[#475be8] dark:hover:border-[#6c7ce8]"
            >
              <div className="p-2.5 md:p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] group-hover:bg-[#475be8] dark:group-hover:bg-[#6c7ce8] transition-colors">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">Call</p>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{tenant.phone}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${tenant.email}`}
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 transition-colors group border border-transparent hover:border-[#475be8] dark:hover:border-[#6c7ce8]"
            >
              <div className="p-2.5 md:p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] group-hover:bg-[#475be8] dark:group-hover:bg-[#6c7ce8] transition-colors">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">Email</p>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{tenant.email}</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${formatPhoneForWhatsApp(tenant.phone)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] hover:bg-[#7fba7a]/10 transition-colors group border border-transparent hover:border-[#7fba7a]"
            >
              <div className="p-2.5 md:p-3 bg-[#7fba7a]/10 rounded-[8px] group-hover:bg-[#7fba7a] transition-colors">
                <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">WhatsApp</p>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Send message</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    )}

    {/* Send Lease Agreement Modal */}
    {showLeaseModal && (
      <div className="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] shadow-xl max-w-lg w-full p-6 md:p-8 my-8 border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Send Lease Document</h2>
              <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mt-1">
                Sending to: <span className="font-semibold text-[#11142d] dark:text-[#efefef]">{tenant.name}</span>
              </p>
            </div>
            <button
              onClick={() => {
                setShowLeaseModal(false);
                setIsFromRenewal(false);
                setLeaseTemplate('Standard Residential Lease');
              }}
              className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
            >
              <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px] border border-[#475be8]/20 dark:border-[#6c7ce8]/20">
              <img
                src={tenant.photo}
                alt={tenant.name}
                className="w-10 h-10 md:w-12 md:h-12 rounded-[8px]"
              />
              <div>
                <p className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{tenant.name}</p>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{tenant.email}</p>
              </div>
            </div>
          </div>

          {isFromRenewal && (
            <div className="mb-4 p-3 md:p-4 bg-[#7fba7a]/10 border border-[#7fba7a]/30 rounded-[10px]">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5 text-[#7fba7a] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[13px] md:text-[14px] text-[#7fba7a]">Lease Renewed Successfully!</p>
                  <p className="text-[12px] md:text-[13px] text-[#7fba7a]/90 mt-1">
                    The lease renewal has been created. Now send the updated lease agreement to your tenant.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Info banner when NOT from renewal */}
          {!isFromRenewal && (
            <div className="mb-4 p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px]">
              <div className="flex items-start gap-3">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[13px] md:text-[14px] text-[#475be8] dark:text-[#6c7ce8]">Current Lease Information</p>
                  <p className="text-[12px] md:text-[13px] text-[#475be8]/90 dark:text-[#6c7ce8]/90 mt-1">
                    {tenant.name} • {tenant.property.unit} at {tenant.property.name}
                  </p>
                  <p className="text-[11px] md:text-[12px] text-[#475be8]/80 dark:text-[#6c7ce8]/80 mt-1">
                    Lease Period: {tenant.lease.startDate} - {tenant.lease.endDate}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4 mb-6">
            {/* Document Name Preview */}
            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Document Name
              </label>
              <div className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px]">
                <p className="text-[12px] md:text-[13px] font-mono text-[#11142d] dark:text-[#efefef]">
                  {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate)}
                </p>
              </div>
              <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-2">
                Format: name_lease_MM_YY_MM_YY.pdf
              </p>
            </div>

            {/* Document Type - Read-only display */}
            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Document Type
              </label>
              <div className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-[10px] flex items-center justify-between ${
                isFromRenewal 
                  ? 'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border-2 border-[#475be8] dark:border-[#6c7ce8]' 
                  : 'bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30]'
              }`}>
                <span className={`font-semibold text-[13px] md:text-[14px] ${
                  isFromRenewal ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#11142d] dark:text-[#efefef]'
                }`}>
                  {isFromRenewal ? 'Lease Renewal' : 'Current Lease Agreement'}
                </span>
                {isFromRenewal && (
                  <span className="px-2 py-0.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white text-[11px] font-semibold rounded-[6px]">
                    Auto-selected
                  </span>
                )}
              </div>
              <p className={`text-[11px] md:text-[12px] mt-2 ${
                isFromRenewal ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
              }`}>
                {isFromRenewal 
                  ? 'Sending new lease renewal agreement' 
                  : 'Sending current lease agreement to tenant'}
              </p>
            </div>

            {/* Delivery Method */}
            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">
                How would you like to send?
              </label>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('email')}
                  className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                    deliveryMethod === 'email'
                      ? 'border-[#475be8] dark:border-[#6c7ce8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                      : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]'
                  }`}
                >
                  <Mail className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${
                    deliveryMethod === 'email' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                  }`} />
                  <p className={`text-[12px] md:text-[13px] font-semibold ${
                    deliveryMethod === 'email' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                  }`}>
                    Email
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('whatsapp')}
                  className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                    deliveryMethod === 'whatsapp'
                      ? 'border-[#7fba7a] bg-[#7fba7a]/10'
                      : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#7fba7a]'
                  }`}
                >
                  <MessageSquare className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${
                    deliveryMethod === 'whatsapp' ? 'text-[#7fba7a]' : 'text-[#808191] dark:text-[#92939e]'
                  }`} />
                  <p className={`text-[12px] md:text-[13px] font-semibold ${
                    deliveryMethod === 'whatsapp' ? 'text-[#7fba7a]' : 'text-[#808191] dark:text-[#92939e]'
                  }`}>
                    WhatsApp
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMethod('both')}
                  className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                    deliveryMethod === 'both'
                      ? 'border-[#475be8] dark:border-[#6c7ce8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                      : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]'
                  }`}
                >
                  <div className="flex justify-center gap-1 mb-2">
                    <Mail className={`w-4 h-4 md:w-5 md:h-5 ${
                      deliveryMethod === 'both' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <MessageSquare className={`w-4 h-4 md:w-5 md:h-5 ${
                      deliveryMethod === 'both' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                  </div>
                  <p className={`text-[12px] md:text-[13px] font-semibold ${
                    deliveryMethod === 'both' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                  }`}>
                    Both
                  </p>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Message (Optional)
              </label>
              <textarea
                rows={4}
                placeholder="Add a personal message..."
                className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] focus:border-transparent resize-none text-[13px] md:text-[14px]"
                defaultValue={
                  isFromRenewal
                    ? `Hi ${tenant.name.split(' ')[0]},\n\nGreat news! Your lease renewal for ${tenant.property.unit} at ${tenant.property.name} has been processed.\n\nPlease find attached your new lease agreement.\n\nBest regards`
                    : `Hi ${tenant.name.split(' ')[0]},\n\nPlease find attached your lease agreement for ${tenant.property.unit} at ${tenant.property.name}.\n\nBest regards`
                }
              />
            </div>
          </div>

          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => {
                setShowLeaseModal(false);
                setIsFromRenewal(false);
                setLeaseTemplate('Standard Residential Lease');
              }}
              className="px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors font-medium text-[13px] md:text-[14px]"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-4 md:px-6 py-2.5 md:py-3 border-2 border-[#475be8] dark:border-[#6c7ce8] text-[#475be8] dark:text-[#6c7ce8] rounded-[10px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 transition-colors font-medium flex items-center gap-2 text-[13px] md:text-[14px]"
            >
              <Eye className="w-4 h-4 md:w-5 md:h-5" />
              Preview
            </button>
            <button
              onClick={() => {
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
              className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors font-medium flex items-center justify-center gap-2 text-[13px] md:text-[14px]"
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
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
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-[60] p-4">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-[#e4e8ef] dark:border-[#272b30]">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#475be8] to-[#3d4fc7] dark:from-[#6c7ce8] dark:to-[#5d6dd7] px-4 md:px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 md:w-6 md:h-6" />
              <div>
                <h2 className="text-[18px] md:text-[20px] font-bold">Lease Agreement Preview</h2>
                <p className="text-[12px] md:text-[13px] text-white/90">
                  {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Download functionality would be implemented here')}
                className="p-2 hover:bg-white/20 rounded-[8px] transition-colors"
                title="Download PDF"
              >
                <Download className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-white/20 rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Document Preview */}
          <div className="flex-1 overflow-y-auto bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
            <div className="bg-white dark:bg-[#1a1d1f] rounded-[10px] shadow-lg max-w-3xl mx-auto p-8 md:p-12 font-serif">
              {/* Document Header */}
              <div className="text-center mb-8 border-b-2 border-[#11142d] dark:border-[#efefef] pb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-[#11142d] dark:text-[#efefef] mb-2">
                  {isFromRenewal ? 'LEASE RENEWAL AGREEMENT' : leaseTemplate.toUpperCase()}
                </h1>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  Document ID: {formatLeaseDocumentName(tenant.name, tenant.lease.startDate, tenant.lease.endDate).replace('.pdf', '')}
                </p>
              </div>

              {/* Parties */}
              <div className="mb-8">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">PARTIES TO THIS AGREEMENT</h2>
                <div className="space-y-3 text-[#11142d] dark:text-[#efefef] text-[13px] md:text-[14px]">
                  <p><strong>Landlord/Property Manager:</strong> Property Management Company</p>
                  <p><strong>Tenant:</strong> {tenant.name}</p>
                  <p><strong>Email:</strong> {tenant.email}</p>
                  <p><strong>Phone:</strong> {tenant.phone}</p>
                </div>
              </div>

              {/* Property Details */}
              <div className="mb-8">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">PROPERTY DETAILS</h2>
                <div className="space-y-3 text-[#11142d] dark:text-[#efefef] text-[13px] md:text-[14px]">
                  <p><strong>Property Address:</strong> {tenant.property.address}</p>
                  <p><strong>Property Name:</strong> {tenant.property.name}</p>
                  <p><strong>Unit:</strong> {tenant.property.unit}</p>
                </div>
              </div>

              {/* Lease Terms */}
              <div className="mb-8">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">LEASE TERMS</h2>
                <div className="space-y-3 text-[#11142d] dark:text-[#efefef] text-[13px] md:text-[14px]">
                  <p><strong>Lease Start Date:</strong> {tenant.lease.startDate}</p>
                  <p><strong>Lease End Date:</strong> {tenant.lease.endDate}</p>
                  <p><strong>Monthly Rent:</strong> ${tenant.lease.monthlyRent.toLocaleString()}</p>
                  <p><strong>Security Deposit:</strong> ${tenant.lease.securityDeposit.toLocaleString()}</p>
                  <p><strong>Lease Status:</strong> <span className="text-[#7fba7a] font-semibold">{tenant.lease.status}</span></p>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="mb-8">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">TERMS AND CONDITIONS</h2>
                <div className="space-y-4 text-[#11142d] dark:text-[#efefef] text-[12px] md:text-[13px] leading-relaxed">
                  <p><strong>1. RENT PAYMENT:</strong> Tenant agrees to pay rent on or before the 1st day of each month. Late payments may incur additional fees.</p>
                  
                  <p><strong>2. SECURITY DEPOSIT:</strong> The security deposit will be held for the duration of the lease and returned within 30 days of lease termination.</p>
                  
                  <p><strong>3. MAINTENANCE:</strong> Tenant is responsible for maintaining the property in good condition and reporting any maintenance issues promptly.</p>
                  
                  <p><strong>4. UTILITIES:</strong> Tenant is responsible for all utilities unless otherwise specified in writing.</p>
                  
                  <p><strong>5. TERMINATION:</strong> Either party may terminate this lease with 60 days written notice.</p>
                </div>
              </div>

              {/* Signatures */}
              <div className="mt-12 pt-8 border-t-2 border-[#e4e8ef] dark:border-[#272b30]">
                <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef] mb-6">SIGNATURES</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="border-b-2 border-[#808191] dark:border-[#92939e] mb-2 pb-8"></div>
                    <p className="text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef] font-semibold">Landlord/Property Manager</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">Date: _______________</p>
                  </div>
                  <div>
                    <div className="border-b-2 border-[#808191] dark:border-[#92939e] mb-2 pb-8"></div>
                    <p className="text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef] font-semibold">Tenant: {tenant.name}</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">Date: _______________</p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 text-center text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] border-t border-[#e4e8ef] dark:border-[#272b30] pt-4">
                <p>This is a preview of the lease agreement. The actual document will be generated with complete legal terms.</p>
                <p className="mt-1">Generated on {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="bg-[#f4f4f4] dark:bg-[#111315] px-4 md:px-6 py-4 border-t border-[#e4e8ef] dark:border-[#272b30] flex justify-end gap-2 md:gap-3">
            <button
              onClick={() => setShowPreviewModal(false)}
              className="px-4 md:px-6 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[8px] hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] transition-colors font-medium text-[13px] md:text-[14px]"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                setShowPreviewModal(false);
              }}
              className="px-4 md:px-6 py-2 md:py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors font-medium flex items-center gap-2 text-[13px] md:text-[14px]"
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
