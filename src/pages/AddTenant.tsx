import { ArrowLeft, Mail, Phone, MapPin, Calendar, Home, Send, User, FileText } from 'lucide-react';
import { useState } from 'react';

interface AddTenantProps {
  onBack: () => void;
  onSave: () => void;
}

export default function AddTenant({ onBack, onSave }: AddTenantProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    property: '',
    unit: '',
    unitType: '',
    leaseStart: '',
    leaseEnd: '',
    rent: '',
    deposit: '',
    sendInvitation: true,
    sendLeaseAgreement: true,
  });

  // Mock properties with units - in real app, this would come from API/state
  const properties = [
    {
      id: '123-maple',
      name: '123 Maple Street',
      units: [
        { id: 'unit-1', number: 'Unit 4B', type: '2 Bedroom (1 Bathroom)', rent: '1500', available: true },
        { id: 'unit-2', number: 'Unit 2A', type: 'Single Self-Contain (Private Bathroom)', rent: '800', available: true },
        { id: 'unit-3', number: 'Unit 5C', type: '1 Bedroom Self-Contain (Chamber & Hall)', rent: '1200', available: false },
      ],
    },
    {
      id: '789-oak',
      name: '789 Oak Avenue',
      units: [
        { id: 'unit-4', number: 'Apt 101', type: '3 Bedroom (2 Bathrooms)', rent: '2000', available: true },
        { id: 'unit-5', number: 'Apt 205', type: '2 Bedroom (2 Bathrooms)', rent: '1800', available: true },
      ],
    },
    {
      id: '456-pine',
      name: '456 Pine Lane',
      units: [
        { id: 'unit-6', number: 'House', type: '4+ Bedroom', rent: '2400', available: true },
      ],
    },
  ];

  const selectedProperty = properties.find(p => p.id === formData.property);
  const availableUnits = selectedProperty?.units.filter(u => u.available) || [];
  const selectedUnit = availableUnits.find(u => u.id === formData.unit);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Tenant data:', formData);
    onSave();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] rounded-[8px] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
        </button>
        <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Add New Tenant</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Personal Information */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px]">
              <User className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                placeholder="Enter last name"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  placeholder="tenant@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Phone Number *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Property Assignment */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 bg-[#7fba7a]/10 rounded-[8px]">
              <Home className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
            </div>
            <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Property Assignment</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Property *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e] pointer-events-none z-10" />
                <select
                  name="property"
                  value={formData.property}
                  onChange={(e) => {
                    handleChange(e);
                    setFormData(prev => ({ ...prev, unit: '', unitType: '', rent: '' }));
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] appearance-none text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
                >
                  <option value="">Select a property</option>
                  {properties.map(property => (
                    <option key={property.id} value={property.id}>
                      {property.name} ({property.units.filter(u => u.available).length} available units)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Unit/Apartment *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={(e) => {
                  handleChange(e);
                  const unit = availableUnits.find(u => u.id === e.target.value);
                  if (unit) {
                    setFormData(prev => ({
                      ...prev,
                      unitType: unit.type,
                      rent: unit.rent,
                    }));
                  }
                }}
                required
                disabled={!formData.property}
                className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] appearance-none text-[14px] text-[#11142d] dark:text-[#efefef] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <option value="">
                  {formData.property ? 'Select a unit' : 'Select property first'}
                </option>
                {availableUnits.map(unit => (
                  <option key={unit.id} value={unit.id}>
                    {unit.number} - {unit.type} (${unit.rent}/mo)
                  </option>
                ))}
              </select>
              {selectedUnit && (
                <p className="mt-2 text-[13px] text-[#7fba7a] font-medium">
                  ✓ {selectedUnit.type} • ${selectedUnit.rent}/month
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Lease Details */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 transition-colors border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px]">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Lease Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Lease Start Date *
              </label>
              <input
                type="date"
                name="leaseStart"
                value={formData.leaseStart}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Lease End Date *
              </label>
              <input
                type="date"
                name="leaseEnd"
                value={formData.leaseEnd}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Monthly Rent *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808191] dark:text-[#92939e] font-semibold text-[14px]">
                  $
                </span>
                <input
                  type="number"
                  name="rent"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                  readOnly={!!selectedUnit}
                  className="w-full pl-8 pr-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] read-only:opacity-70 transition-colors"
                  placeholder="Auto-filled from unit"
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                Security Deposit *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#808191] dark:text-[#92939e] font-semibold text-[14px]">
                  $
                </span>
                <input
                  type="number"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleChange}
                  required
                  className="w-full pl-8 pr-4 py-3 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  placeholder="3000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Invitation Option */}
        <div className="bg-[#475be8]/5 dark:bg-[#6c7ce8]/10 rounded-[10px] md:rounded-[15px] border border-[#475be8]/20 dark:border-[#6c7ce8]/20 p-4 md:p-6 transition-colors">
          <div className="space-y-4">
            <div className="flex items-start gap-3 md:gap-4">
              <input
                type="checkbox"
                id="sendInvitation"
                checked={formData.sendInvitation}
                onChange={(e) => setFormData((prev) => ({ ...prev, sendInvitation: e.target.checked }))}
                className="w-4 h-4 md:w-5 md:h-5 mt-1 text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30] rounded focus:ring-[#475be8] dark:focus:ring-[#6c7ce8]"
              />
              <div className="flex-1">
                <label htmlFor="sendInvitation" className="flex items-center gap-2 cursor-pointer">
                  <Send className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8]" />
                  <span className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">Send Invitation Email</span>
                </label>
                <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1">
                  Tenant will receive an email with login credentials to access their portal.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 md:gap-4 pt-4 border-t border-[#475be8]/10 dark:border-[#6c7ce8]/20">
              <input
                type="checkbox"
                id="sendLeaseAgreement"
                checked={formData.sendLeaseAgreement}
                onChange={(e) => setFormData((prev) => ({ ...prev, sendLeaseAgreement: e.target.checked }))}
                className="w-4 h-4 md:w-5 md:h-5 mt-1 text-[#475be8] dark:text-[#6c7ce8] border-[#e4e8ef] dark:border-[#272b30] rounded focus:ring-[#475be8] dark:focus:ring-[#6c7ce8]"
              />
              <div className="flex-1">
                <label htmlFor="sendLeaseAgreement" className="flex items-center gap-2 cursor-pointer">
                  <FileText className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8]" />
                  <span className="font-semibold text-[14px] text-[#11142d] dark:text-[#efefef]">Send Lease Agreement</span>
                </label>
                <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1">
                  Auto-send personalized lease agreement to tenant's email.
                </p>
                
                {formData.sendLeaseAgreement && (
                  <div className="mt-3">
                    <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                      Select Lease Template
                    </label>
                    <select className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef]">
                      <option>Standard Residential Lease</option>
                      <option>Month-to-Month Agreement</option>
                      <option>Commercial Lease</option>
                      <option>Student Housing Lease</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] font-semibold rounded-[10px] hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] transition-all duration-200 text-[14px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white font-semibold rounded-[10px] hover:bg-[#3d4ec7] dark:hover:bg-[#5a6dd6] transition-all duration-200 text-[14px]"
          >
            Add Tenant & Send Invitation
          </button>
        </div>
      </form>
    </div>
  );
}
