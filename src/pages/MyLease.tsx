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
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef]">My Lease</h1>
          <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mt-1">View your lease agreement and important documents</p>
        </div>

        {/* Lease Status Card */}
        <div className="bg-gradient-to-br from-[#7fba7a] to-[#7fba7a]/90 rounded-[15px] md:rounded-[20px] p-6 md:p-8 text-white shadow-lg">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-[11px] md:text-[12px] font-semibold mb-4">
                {leaseData.status}
              </div>
              <h2 className="text-[22px] md:text-[28px] font-bold mb-2">{leaseData.property}</h2>
              <p className="text-[16px] md:text-[18px] text-white/90">{leaseData.unit}</p>
              <p className="text-white/90 mt-1 text-[12px] md:text-[13px]">{leaseData.address}</p>
            </div>
            <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-[12px] md:rounded-[15px] flex items-center justify-center">
              <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div>
              <p className="text-white/90 text-[11px] md:text-[12px] mb-1">Lease Duration</p>
              <p className="text-[18px] md:text-[20px] font-bold">{leaseData.leaseType}</p>
            </div>
            <div>
              <p className="text-white/90 text-[11px] md:text-[12px] mb-1">Days Remaining</p>
              <p className="text-[18px] md:text-[20px] font-bold">{getDaysRemaining()} days</p>
            </div>
            <div>
              <p className="text-white/90 text-[11px] md:text-[12px] mb-1">Monthly Rent</p>
              <p className="text-[18px] md:text-[20px] font-bold">${leaseData.monthlyRent.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Lease Details */}
        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Lease Information */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Lease Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Lease Period</p>
                  <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">
                    {new Date(leaseData.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    {' → '}
                    {new Date(leaseData.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7fba7a]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#7fba7a]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Monthly Rent</p>
                  <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">${leaseData.monthlyRent.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#7c5dfa]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-[#7c5dfa]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Security Deposit</p>
                  <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">${leaseData.securityDeposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-[#ffce73]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                  <Home className="w-4 h-4 md:w-5 md:h-5 text-[#ffce73]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Property Type</p>
                  <p className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Apartment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4 md:space-y-6">
            {/* Tenant Info */}
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Tenant Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{leaseData.tenant.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{leaseData.tenant.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{leaseData.tenant.phone}</span>
                </div>
              </div>
            </div>

            {/* Landlord Info */}
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
              <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Landlord Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <div>
                    <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] font-medium">{leaseData.landlord.name}</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{leaseData.landlord.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{leaseData.landlord.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{leaseData.landlord.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Terms */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
          <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Key Lease Terms</h3>
          <div className="grid md:grid-cols-2 gap-3 md:gap-4">
            {leaseTerms.map((term, index) => (
              <div key={index} className="bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px] p-3 md:p-4">
                <h4 className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] mb-1">{term.title}</h4>
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] leading-relaxed">{term.description}</p>
              </div>
            ))}
          </div>
        </div>

      {/* Documents */}
              {/* Lease Documents */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
          <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4">Lease Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px] hover:bg-[#e4e8ef] dark:hover:bg-[#272b30] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[6px] md:rounded-[8px] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{doc.name}</h4>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">
                      {doc.size} • Added {doc.date}
                    </p>
                  </div>
                </div>
                <button className="px-3 md:px-4 py-1.5 md:py-2 bg-[#7fba7a] hover:bg-[#6fa869] text-white text-[11px] md:text-[12px] font-medium rounded-[6px] md:rounded-[8px] flex items-center gap-2 transition-colors">
                  <Download className="w-3 h-3 md:w-4 md:h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Lease Renewal Notice */}
        {getDaysRemaining() <= 90 && (
          <div className="bg-[#475be8]/5 dark:bg-[#6c7ce8]/10 border border-[#475be8]/20 dark:border-[#6c7ce8]/20 rounded-[10px] md:rounded-[15px] p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-[14px] md:text-[16px] font-bold text-[#11142d] dark:text-[#efefef] mb-2">Lease Renewal</h3>
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  Your lease expires in {getDaysRemaining()} days. Would you like to renew your lease?
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 md:px-6 py-2 md:py-2.5 bg-[#475be8] hover:bg-[#3d4ec4] dark:bg-[#6c7ce8] dark:hover:bg-[#5a6dd4] text-white text-[12px] md:text-[13px] font-medium rounded-[8px] md:rounded-[10px] transition-colors">
                  Request Renewal
                </button>
                <button className="px-4 md:px-6 py-2 md:py-2.5 border-2 border-[#475be8] dark:border-[#6c7ce8] text-[#475be8] dark:text-[#6c7ce8] hover:bg-[#475be8]/5 dark:hover:bg-[#6c7ce8]/10 text-[12px] md:text-[13px] font-medium rounded-[8px] md:rounded-[10px] transition-colors">
                  Contact Landlord
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
