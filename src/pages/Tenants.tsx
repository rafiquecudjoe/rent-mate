import { Search, Filter, Mail, Phone, MapPin, Calendar, Plus, MoreVertical, MessageSquare, Send, X, FileText, Users, TrendingUp, Eye, UserMinus } from 'lucide-react';
import { useState } from 'react';

const tenants = [
  {
    id: 1,
    name: 'Alice Johnson',
    email: 'alice.johnson@email.com',
    phone: '(555) 123-4567',
    property: '123 Maple St, Unit 4B',
    leaseStart: 'Jan 15, 2024',
    leaseEnd: 'Oct 15, 2024',
    rent: 1500,
    status: 'active',
    photo: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 2,
    name: 'Bob Williams',
    email: 'bob.williams@email.com',
    phone: '(555) 234-5678',
    property: '789 Oak Ave, Apt 2',
    leaseStart: 'Mar 1, 2024',
    leaseEnd: 'Oct 28, 2024',
    rent: 1200,
    status: 'active',
    photo: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    email: 'charlie.brown@email.com',
    phone: '(555) 345-6789',
    property: '456 Pine Ln, House',
    leaseStart: 'Feb 5, 2024',
    leaseEnd: 'Nov 5, 2024',
    rent: 2400,
    status: 'active',
    photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
  {
    id: 4,
    name: 'Diana Miller',
    email: 'diana.miller@email.com',
    phone: '(555) 456-7890',
    property: '321 Birch Rd, Unit 10',
    leaseStart: 'Jan 12, 2024',
    leaseEnd: 'Nov 12, 2024',
    rent: 1800,
    status: 'active',
    photo: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
  },
];

interface TenantsProps {
  onAddTenant?: () => void;
  onViewTenant?: (tenantId: number) => void;
}

export default function Tenants({ onAddTenant, onViewTenant }: TenantsProps = {}) {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLeaseModal, setShowLeaseModal] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [selectedTenant, setSelectedTenant] = useState<typeof tenants[0] | null>(null);
  const [selectedTenantForLease, setSelectedTenantForLease] = useState<typeof tenants[0] | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'whatsapp' | 'both'>('email');

  const formatPhoneForWhatsApp = (phone: string) => {
    // Remove all non-numeric characters
    return phone.replace(/\D/g, '');
  };

  // Calculate tenant stats
  const totalTenants = tenants.length;
  const activeTenants = tenants.filter(t => t.status === 'active').length;
  const totalMonthlyRent = tenants.reduce((sum, t) => sum + t.rent, 0);

  return (
    <>
      <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
        <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Tenants</h1>
        <button
          onClick={onAddTenant}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7fba7a] text-white rounded-[10px] hover:bg-[#6fa969] transition-all duration-200 text-[14px] font-semibold"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Tenant</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Total Tenants</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{totalTenants}</p>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Active Leases</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{activeTenants}</p>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Monthly Rent</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">${totalMonthlyRent.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 mb-4 md:mb-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
            <input
              type="text"
              placeholder="Search tenants..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
            />
          </div>
          <button 
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors relative text-[14px] font-medium text-[#11142d] dark:text-[#efefef]"
          >
            <Filter className="w-5 h-5" />
            <span>Filters</span>
            
            {showFilterMenu && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] shadow-lg border border-[#e4e8ef] dark:border-[#272b30] p-4 z-10">
                <h3 className="text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" defaultChecked />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Pending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Overdue</span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Tenant Cards */}
            {/* Tenant Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {tenants.map((tenant) => (
          <div
            key={tenant.id}
            className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors border border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <img
                  src={tenant.photo}
                  alt={tenant.name}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-[10px] object-cover border-2 border-[#e4e8ef] dark:border-[#272b30]"
                />
                <div>
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-1 transition-colors">{tenant.name}</h3>
                  <span className={`
                    inline-flex items-center px-2.5 py-1 rounded-[6px] text-[11px] md:text-[12px] font-semibold
                    ${tenant.status === 'active' ? 'bg-[#7fba7a]/10 text-[#7fba7a]' : ''}
                    ${tenant.status === 'pending' ? 'bg-[#ffce73]/10 text-[#ffce73]' : ''}
                    ${tenant.status === 'overdue' ? 'bg-[#f45252]/10 text-[#f45252]' : ''}
                  `}>
                    {tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1)}
                  </span>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={() => setActiveMenu(activeMenu === tenant.id ? null : tenant.id)}
                  className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                </button>
                
                {activeMenu === tenant.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] shadow-lg border border-[#e4e8ef] dark:border-[#272b30] z-10 overflow-hidden">
                    <button 
                      onClick={() => {
                        if (onViewTenant) onViewTenant(tenant.id);
                        setActiveMenu(null);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#11142d] dark:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button 
                      onClick={() => {
                        setActiveMenu(null);
                        setSelectedTenantForLease(tenant);
                        setShowLeaseModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#11142d] dark:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Send Lease</span>
                    </button>
                    <button 
                      onClick={() => {
                        setActiveMenu(null);
                        setSelectedTenant(tenant);
                        setShowContactModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#11142d] dark:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Contact</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#f45252] hover:bg-[#f45252]/10 transition-colors">
                      <UserMinus className="w-4 h-4" />
                      <span>Remove Tenant</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-2.5 text-[#808191] dark:text-[#92939e]">
                <Mail className="w-4 h-4 text-[#475be8] dark:text-[#6c7ce8]" />
                <span className="text-[13px]">{tenant.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#808191] dark:text-[#92939e]">
                <Phone className="w-4 h-4 text-[#475be8] dark:text-[#6c7ce8]" />
                <span className="text-[13px]">{tenant.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#808191] dark:text-[#92939e]">
                <MapPin className="w-4 h-4 text-[#475be8] dark:text-[#6c7ce8]" />
                <span className="text-[13px]">{tenant.property}</span>
              </div>
            </div>

            <div className="bg-[#475be8]/5 dark:bg-[#6c7ce8]/10 rounded-[10px] p-3.5 mb-4 border border-[#475be8]/10 dark:border-[#6c7ce8]/20">
              <div className="flex items-center gap-2 text-[#475be8] dark:text-[#6c7ce8] mb-2">
                <Calendar className="w-4 h-4" />
                <span className="font-semibold text-[13px]">Lease Period</span>
              </div>
              <p className="text-[#11142d] dark:text-[#efefef] text-[14px] font-medium mb-2">{tenant.leaseStart} - {tenant.leaseEnd}</p>
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-[#808191] dark:text-[#92939e]">Monthly Rent</span>
                <span className="text-[16px] md:text-[18px] font-bold text-[#475be8] dark:text-[#6c7ce8]">${tenant.rent.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => { if (onViewTenant) onViewTenant(tenant.id); }}
                className="flex-1 px-4 py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] hover:bg-[#3d4ec7] dark:hover:bg-[#5a6dd6] transition-all duration-200 font-semibold text-[14px]"
              >
                View Details
              </button>
              <button
                onClick={() => {
                  setSelectedTenant(tenant);
                  setShowContactModal(true);
                }}
                className="px-4 py-2.5 border-2 border-[#475be8] dark:border-[#6c7ce8] text-[#475be8] dark:text-[#6c7ce8] rounded-[10px] hover:bg-[#475be8]/5 dark:hover:bg-[#6c7ce8]/10 transition-all duration-200 font-semibold text-[14px]"
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>

            {/* Contact Modal */}
      {showContactModal && selectedTenant && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] shadow-2xl max-w-lg w-full p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Contact {selectedTenant.name}</h2>
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
                href={`tel:${selectedTenant.phone}`}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px] hover:bg-[#475be8]/15 dark:hover:bg-[#6c7ce8]/15 transition-all border border-[#475be8]/20 dark:border-[#6c7ce8]/20 group"
              >
                <div className="p-2.5 md:p-3 bg-[#475be8] dark:bg-[#6c7ce8] rounded-[8px] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">Call</p>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e]">{selectedTenant.phone}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${selectedTenant.email}`}
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px] hover:bg-[#475be8]/15 dark:hover:bg-[#6c7ce8]/15 transition-all border border-[#475be8]/20 dark:border-[#6c7ce8]/20 group"
              >
                <div className="p-2.5 md:p-3 bg-[#475be8] dark:bg-[#6c7ce8] rounded-[8px] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">Email</p>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e]">{selectedTenant.email}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${formatPhoneForWhatsApp(selectedTenant.phone)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#7fba7a]/10 rounded-[10px] hover:bg-[#7fba7a]/15 transition-all border border-[#7fba7a]/20 group"
              >
                <div className="p-2.5 md:p-3 bg-[#7fba7a] rounded-[8px] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">WhatsApp</p>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e]">Send message via WhatsApp</p>
                </div>
              </a>

              {/* Send Lease Agreement */}
              <button
                onClick={() => {
                  setShowContactModal(false);
                  setSelectedTenantForLease(selectedTenant);
                  setShowLeaseModal(true);
                }}
                className="w-full flex items-center gap-3 md:gap-4 p-3 md:p-4 bg-[#ffce73]/10 rounded-[10px] hover:bg-[#ffce73]/15 transition-all border border-[#ffce73]/20 group"
              >
                <div className="p-2.5 md:p-3 bg-[#ffce73] rounded-[8px] group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">Send Lease Agreement</p>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e]">Email lease document</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Lease Agreement Modal */}
      {showLeaseModal && selectedTenantForLease && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] shadow-2xl max-w-lg w-full p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-[20px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Send Lease Agreement</h2>
              <button
                onClick={() => setShowLeaseModal(false)}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-3 p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px] border border-[#475be8]/20 dark:border-[#6c7ce8]/20">
                <img
                  src={selectedTenantForLease.photo}
                  alt={selectedTenantForLease.name}
                  className="w-12 h-12 rounded-[8px] object-cover"
                />
                <div>
                  <p className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">{selectedTenantForLease.name}</p>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e]">{selectedTenantForLease.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Select Template
                </label>
                <select className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef]">
                  <option>Standard Residential Lease</option>
                  <option>Month-to-Month Agreement</option>
                  <option>Commercial Lease</option>
                  <option>Lease Renewal</option>
                  <option>Lease Amendment</option>
                </select>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">
                  How would you like to send?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod('email')}
                    className={`p-3 md:p-4 border-2 rounded-[10px] transition-all ${
                      deliveryMethod === 'email'
                        ? 'border-[#475be8] dark:border-[#6c7ce8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8]/50 dark:hover:border-[#6c7ce8]/50'
                    }`}
                  >
                    <Mail className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${
                      deliveryMethod === 'email' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <p className={`text-[13px] font-semibold ${
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
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#7fba7a]/50'
                    }`}
                  >
                    <MessageSquare className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${
                      deliveryMethod === 'whatsapp' ? 'text-[#7fba7a]' : 'text-[#808191] dark:text-[#92939e]'
                    }`} />
                    <p className={`text-[13px] font-semibold ${
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
                        : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8]/50 dark:hover:border-[#6c7ce8]/50'
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
                    <p className={`text-[13px] font-semibold ${
                      deliveryMethod === 'both' ? 'text-[#475be8] dark:text-[#6c7ce8]' : 'text-[#808191] dark:text-[#92939e]'
                    }`}>
                      Both
                    </p>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Message (Optional)
                </label>
                <textarea
                  rows={4}
                  placeholder="Add a personal message..."
                  className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] resize-none text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                  defaultValue={`Hi ${selectedTenantForLease.name.split(' ')[0]},\n\nPlease find attached your personalized lease agreement for ${selectedTenantForLease.property}.\n\nBest regards`}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowLeaseModal(false)}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors font-semibold text-[14px]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Lease agreement sent to ${selectedTenantForLease.email}`);
                  setShowLeaseModal(false);
                }}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] hover:bg-[#3d4ec7] dark:hover:bg-[#5a6dd6] transition-colors font-semibold text-[14px] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5" />
                Send Agreement
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
