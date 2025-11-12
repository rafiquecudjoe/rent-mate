import { useState } from 'react';
import { ArrowLeft, Upload, ChevronDown, Plus, Trash2, Home, DollarSign } from 'lucide-react';

interface AddPropertyProps {
  onBack: () => void;
  onSave: (property: PropertyData) => void;
  initialData?: PropertyData;
  isEditMode?: boolean;
}

export interface Unit {
  id: string | number;
  unitNumber: string;
  apartmentType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: string | number;
  monthlyRent: string | number;
  securityDeposit: string | number;
  isAvailable: boolean;
}

export interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  description: string;
  photos: File[] | string[];
  units: Unit[];
}

const propertyTypes = ['Apartment Building', 'House', 'Condo', 'Townhouse', 'Commercial', 'Other'];

const apartmentTypes = [
  'Single Room (Shared Bathroom)',
  'Single Self-Contain (Private Bathroom)',
  '1 Bedroom Self-Contain (Chamber & Hall)',
  '2 Bedroom (1 Bathroom)',
  '2 Bedroom (2 Bathrooms)',
  '3 Bedroom (1 Bathroom)',
  '3 Bedroom (2 Bathrooms)',
  '4+ Bedroom',
  'Studio',
  'Penthouse',
  'Other',
];

export default function AddProperty({ onBack, onSave, initialData, isEditMode = false }: AddPropertyProps) {
  const [formData, setFormData] = useState<PropertyData>(initialData || {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'Apartment Building',
    description: '',
    photos: [],
    units: [],
  });

  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const handleInputChange = (field: keyof PropertyData, value: string | Unit[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddUnit = (unit: Unit) => {
    setFormData(prev => ({
      ...prev,
      units: [...prev.units, unit],
    }));
    setShowAddUnitModal(false);
  };

  const handleDeleteUnit = (unitId: string) => {
    setFormData(prev => ({
      ...prev,
      units: prev.units.filter(u => u.id !== unitId),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.units.length === 0) {
      alert('Please add at least one unit/apartment to the property');
      return;
    }
    onSave(formData);
  };

  const totalMonthlyIncome = formData.units.reduce((sum, unit) => 
    sum + (parseFloat(String(unit.monthlyRent)) || 0), 0
  );

  return (
    <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] rounded-[8px] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#808191] dark:text-[#92939e]" />
        </button>
        <div>
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">
            {isEditMode ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1 transition-colors">
            {isEditMode ? 'Update property details and manage rental units' : 'Add property details and define rental units'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
        {/* Basic Property Information */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 transition-colors">
          <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 transition-colors">Property Information</h2>

          <div className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Property Address *
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="Boston"
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                  State *
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="MA"
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange('zipCode', e.target.value)}
                  placeholder="02101"
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Property Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPropertyTypeDropdown(!showPropertyTypeDropdown)}
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] text-left flex items-center justify-between hover:border-[#475be8] dark:hover:border-[#6c7ce8] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] transition-colors text-[14px]"
                >
                  <span className="text-[#11142d] dark:text-[#efefef]">{formData.propertyType}</span>
                  <ChevronDown className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                </button>

                {showPropertyTypeDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-[#fcfcfc] dark:bg-[#1a1d1f] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] shadow-lg max-h-60 overflow-y-auto">
                    {propertyTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          handleInputChange('propertyType', type);
                          setShowPropertyTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[14px] text-[#11142d] dark:text-[#efefef]"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Description & Amenities
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the property, parking, security, nearby facilities, etc."
                rows={3}
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] resize-none text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Units/Apartments Section */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 transition-colors">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Units / Apartments</h2>
              <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1 transition-colors">
                Add all rental units in this property
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAddUnitModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[#7fba7a] text-white rounded-[8px] hover:bg-[#6fa969] transition-all font-medium text-[14px]"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">Add Unit</span>
            </button>
          </div>

          {formData.units.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-[#e4e8ef] dark:border-[#272b30] rounded-[10px]">
              <Home className="w-12 h-12 text-[#808191] dark:text-[#92939e] mx-auto mb-3" />
              <p className="text-[#808191] dark:text-[#92939e] mb-4 text-[14px]">No units added yet</p>
              <button
                type="button"
                onClick={() => setShowAddUnitModal(true)}
                className="px-6 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] hover:bg-[#3f51d7] dark:hover:bg-[#5d6dd8] transition-all font-medium text-[14px]"
              >
                Add Your First Unit
              </button>
            </div>
          ) : (
            <div className="space-y-3 md:space-y-4">
              {formData.units.map((unit) => (
                <div
                  key={unit.id}
                  className="border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] p-4 hover:shadow-md transition-all bg-[#f4f4f4] dark:bg-[#111315]"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-[#11142d] dark:text-[#efefef] text-[15px]">{unit.unitNumber}</h3>
                        <span className={`px-2 py-1 text-[11px] font-semibold rounded-full ${
                          unit.isAvailable 
                            ? 'bg-[#7fba7a]/10 text-[#7fba7a]' 
                            : 'bg-[#f45252]/10 text-[#f45252]'
                        }`}>
                          {unit.isAvailable ? 'Available' : 'Occupied'}
                        </span>
                      </div>
                      <p className="text-[13px] text-[#808191] dark:text-[#92939e] mb-3">{unit.apartmentType}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[13px]">
                        <div>
                          <span className="text-[#808191] dark:text-[#92939e]">Bedrooms:</span>
                          <span className="ml-1 font-semibold text-[#11142d] dark:text-[#efefef]">{unit.bedrooms}</span>
                        </div>
                        <div>
                          <span className="text-[#808191] dark:text-[#92939e]">Bathrooms:</span>
                          <span className="ml-1 font-semibold text-[#11142d] dark:text-[#efefef]">{unit.bathrooms}</span>
                        </div>
                        <div>
                          <span className="text-[#808191] dark:text-[#92939e]">Size:</span>
                          <span className="ml-1 font-semibold text-[#11142d] dark:text-[#efefef]">{unit.squareFootage} sqft</span>
                        </div>
                        <div>
                          <span className="text-[#808191] dark:text-[#92939e]">Rent:</span>
                          <span className="ml-1 font-bold text-[#7fba7a]">${parseFloat(String(unit.monthlyRent)).toLocaleString()}/mo</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteUnit(String(unit.id))}
                      className="p-2 text-[#f45252] hover:bg-[#f45252]/10 rounded-[8px] transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Summary Card */}
              <div className="bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/20 dark:border-[#6c7ce8]/20 rounded-[10px] p-4 mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-[13px] text-[#475be8] dark:text-[#6c7ce8] font-medium">Total Units</p>
                    <p className="text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">{formData.units.length}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#475be8] dark:text-[#6c7ce8] font-medium">Total Monthly Income</p>
                    <p className="text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">${totalMonthlyIncome.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#475be8] dark:text-[#6c7ce8] font-medium">Available Units</p>
                    <p className="text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">
                      {formData.units.filter(u => u.isAvailable).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Photos */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 transition-colors">
          <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 transition-colors">Property Photos</h2>

          <div className="border-2 border-dashed border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] p-8 text-center hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors">
            <Upload className="w-10 h-10 text-[#808191] dark:text-[#92939e] mx-auto mb-3" />
            <p className="text-[#11142d] dark:text-[#efefef] font-medium mb-1 text-[14px]">
              Click to upload <span className="text-[#808191] dark:text-[#92939e]">or drag and drop</span>
            </p>
            <p className="text-[13px] text-[#808191] dark:text-[#92939e] mb-4">
              PNG, JPG or JPEG (MAX. 5MB each)
            </p>
            <input
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-block px-6 py-2 bg-[#f4f4f4] dark:bg-[#111315] text-[#11142d] dark:text-[#efefef] font-medium rounded-[8px] hover:bg-[#e4e8ef] dark:hover:bg-[#272b30] cursor-pointer transition-colors text-[14px]"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] text-[#808191] dark:text-[#92939e] font-semibold rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-all text-[14px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white font-semibold rounded-[10px] hover:bg-[#3f51d7] dark:hover:bg-[#5d6dd8] transition-all duration-200 text-[14px]"
          >
            Save Property
          </button>
        </div>
      </form>

      {/* Add Unit Modal */}
      {showAddUnitModal && (
        <AddUnitModal
          onClose={() => setShowAddUnitModal(false)}
          onAdd={handleAddUnit}
        />
      )}
    </div>
  );
}

// Add Unit Modal Component
interface AddUnitModalProps {
  onClose: () => void;
  onAdd: (unit: Unit) => void;
}

function AddUnitModal({ onClose, onAdd }: AddUnitModalProps) {
  const [unitData, setUnitData] = useState<Partial<Unit>>({
    unitNumber: '',
    apartmentType: apartmentTypes[0],
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: '',
    monthlyRent: '',
    securityDeposit: '',
    isAvailable: true,
  });

  const [showApartmentTypeDropdown, setShowApartmentTypeDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUnit: Unit = {
      id: Date.now().toString(),
      unitNumber: unitData.unitNumber!,
      apartmentType: unitData.apartmentType!,
      bedrooms: unitData.bedrooms!,
      bathrooms: unitData.bathrooms!,
      squareFootage: unitData.squareFootage!,
      monthlyRent: unitData.monthlyRent!,
      securityDeposit: unitData.securityDeposit!,
      isAvailable: unitData.isAvailable!,
    };
    onAdd(newUnit);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-colors">
        <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
          <h2 className="text-[20px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Add Unit / Apartment</h2>
          <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1 transition-colors">Enter the details for this rental unit</p>
        </div>

        <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Unit Number / Name *
              </label>
              <input
                type="text"
                value={unitData.unitNumber}
                onChange={(e) => setUnitData(prev => ({ ...prev, unitNumber: e.target.value }))}
                placeholder="e.g., Unit 4B, Apt 101, Room 5"
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Apartment Type *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowApartmentTypeDropdown(!showApartmentTypeDropdown)}
                  className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] text-left flex items-center justify-between hover:border-[#475be8] dark:hover:border-[#6c7ce8] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] transition-colors"
                >
                  <span className="text-[#11142d] dark:text-[#efefef] text-[13px] truncate">{unitData.apartmentType}</span>
                  <ChevronDown className="w-5 h-5 text-[#808191] dark:text-[#92939e] flex-shrink-0 ml-2" />
                </button>

                {showApartmentTypeDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-[#fcfcfc] dark:bg-[#1a1d1f] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] shadow-lg max-h-60 overflow-y-auto">
                    {apartmentTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => {
                          setUnitData(prev => ({ ...prev, apartmentType: type }));
                          setShowApartmentTypeDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-[13px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[#11142d] dark:text-[#efefef]"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Bedrooms *
              </label>
              <input
                type="number"
                value={unitData.bedrooms}
                onChange={(e) => setUnitData(prev => ({ ...prev, bedrooms: parseInt(e.target.value) }))}
                min="0"
                max="10"
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Bathrooms *
              </label>
              <input
                type="number"
                value={unitData.bathrooms}
                onChange={(e) => setUnitData(prev => ({ ...prev, bathrooms: parseFloat(e.target.value) }))}
                min="0"
                max="5"
                step="0.5"
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Square Footage *
              </label>
              <input
                type="number"
                value={unitData.squareFootage}
                onChange={(e) => setUnitData(prev => ({ ...prev, squareFootage: e.target.value }))}
                placeholder="800"
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Monthly Rent *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                <input
                  type="number"
                  value={unitData.monthlyRent}
                  onChange={(e) => setUnitData(prev => ({ ...prev, monthlyRent: e.target.value }))}
                  placeholder="1500"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Security Deposit *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                <input
                  type="number"
                  value={unitData.securityDeposit}
                  onChange={(e) => setUnitData(prev => ({ ...prev, securityDeposit: e.target.value }))}
                  placeholder="3000"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] placeholder:text-[#808191] dark:placeholder:text-[#92939e] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">
                Availability Status *
              </label>
              <select
                value={unitData.isAvailable ? 'available' : 'occupied'}
                onChange={(e) => setUnitData(prev => ({ ...prev, isAvailable: e.target.value === 'available' }))}
                className="w-full px-4 py-2.5 bg-[#f4f4f4] dark:bg-[#111315] border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[14px] text-[#11142d] dark:text-[#efefef] transition-colors"
              >
                <option value="available">Available for Rent</option>
                <option value="occupied">Currently Occupied</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] text-[#808191] dark:text-[#92939e] font-semibold rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-all text-[14px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white font-semibold rounded-[10px] hover:bg-[#3f51d7] dark:hover:bg-[#5d6dd8] transition-all duration-200 text-[14px]"
            >
              Add Unit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
