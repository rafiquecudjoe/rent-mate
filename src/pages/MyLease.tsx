import { FileText, Download, Calendar, DollarSign, User, Home, Phone, Mail } from 'lucide-react';

export default function MyLease() {
  const leaseData = {
    property: 'Sunset Apartments',
    unit: 'Unit 3B',
    address: '123 Main Street, Apt 3B, New York, NY 10001',
    startDate: '2025-05-01',
    endDate: '2026-04-30',
    monthlyRent: 1500,
    securityDeposit: 1500,
    leaseType: 'Fixed Term',
    status: 'Active',
    tenant: {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+1 (555) 123-4567',
    },
    landlord: {
      name: 'John Smith',
      email: 'john@rentmate.com',
      phone: '+1 (555) 123-4567',
      company: 'RentMate Management',
    },
  };

  const leaseTerms = [
    { title: 'Rent Payment', description: 'Rent is due on the 1st of each month. Late fees apply after the 5th.' },
    { title: 'Security Deposit', description: '$1,500 security deposit held for damages and unpaid rent.' },
    { title: 'Utilities', description: 'Tenant responsible for electricity and internet. Water and gas included.' },
    { title: 'Maintenance', description: 'Landlord handles major repairs. Tenant responsible for minor maintenance.' },
    { title: 'Pets', description: 'No pets allowed without written permission. Pet deposit may be required.' },
    { title: 'Smoking', description: 'Smoking is strictly prohibited inside the unit and common areas.' },
    { title: 'Notice Period', description: '60 days written notice required before moving out.' },
  ];

  const documents = [
    { id: 1, name: 'Lease Agreement.pdf', size: '2.4 MB', date: '2025-05-01' },
    { id: 2, name: 'Move-In Inspection Report.pdf', size: '1.8 MB', date: '2025-05-01' },
    { id: 3, name: 'Property Rules & Regulations.pdf', size: '856 KB', date: '2025-05-01' },
  ];

  const getDaysRemaining = () => {
    const today = new Date();
    const endDate = new Date(leaseData.endDate);
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Lease</h1>
        <p className="text-gray-600 mt-1">View your lease agreement and important documents</p>
      </div>

      {/* Lease Status Card */}
      <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-8 text-white shadow-xl shadow-green-600/20">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              {leaseData.status}
            </div>
            <h2 className="text-3xl font-bold mb-2">{leaseData.property}</h2>
            <p className="text-xl text-green-100">{leaseData.unit}</p>
            <p className="text-green-100 mt-1">{leaseData.address}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
          <div>
            <p className="text-green-100 text-sm mb-1">Lease Duration</p>
            <p className="text-2xl font-bold">{leaseData.leaseType}</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Days Remaining</p>
            <p className="text-2xl font-bold">{getDaysRemaining()} days</p>
          </div>
          <div>
            <p className="text-green-100 text-sm mb-1">Monthly Rent</p>
            <p className="text-2xl font-bold">${leaseData.monthlyRent.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Lease Details */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Lease Information */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Lease Information</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Lease Period</p>
                <p className="font-semibold text-gray-900">
                  {new Date(leaseData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' → '}
                  {new Date(leaseData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Monthly Rent</p>
                <p className="font-semibold text-gray-900">${leaseData.monthlyRent.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Security Deposit</p>
                <p className="font-semibold text-gray-900">${leaseData.securityDeposit.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Property Type</p>
                <p className="font-semibold text-gray-900">Apartment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Tenant Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tenant Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="text-gray-900">{leaseData.tenant.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{leaseData.tenant.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{leaseData.tenant.phone}</span>
              </div>
            </div>
          </div>

          {/* Landlord Info */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Landlord Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-900 font-medium">{leaseData.landlord.name}</p>
                  <p className="text-sm text-gray-600">{leaseData.landlord.company}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{leaseData.landlord.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <span className="text-gray-700">{leaseData.landlord.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lease Terms */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Lease Terms</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {leaseTerms.map((term, index) => (
            <div key={index} className="p-4 rounded-xl bg-gray-50 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-2">{term.title}</h4>
              <p className="text-sm text-gray-700">{term.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Lease Documents</h3>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{doc.name}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{new Date(doc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Renewal Notice */}
      {getDaysRemaining() <= 90 && (
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Lease Renewal</h3>
          <p className="text-gray-700 mb-4">
            Your lease expires in {getDaysRemaining()} days. Would you like to renew your lease?
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all">
              Request Renewal
            </button>
            <button className="px-6 py-2.5 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
              Contact Landlord
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
