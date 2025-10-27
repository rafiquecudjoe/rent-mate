import { useState } from 'react';
import { ArrowLeft, Upload, ChevronDown } from 'lucide-react';

interface AddPropertyProps {
  onBack: () => void;
  onSave: (property: PropertyData) => void;
}

export interface PropertyData {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  squareFootage: string;
  description: string;
  monthlyRent: string;
  securityDeposit: string;
  photos: File[];
}

const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Studio', 'Other'];

export default function AddProperty({ onBack, onSave }: AddPropertyProps) {
  const [formData, setFormData] = useState<PropertyData>({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'Apartment',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    description: '',
    monthlyRent: '',
    securityDeposit: '',
    photos: [],
  });

  const [showPropertyTypeDropdown, setShowPropertyTypeDropdown] = useState(false);

  const handleInputChange = (field: keyof PropertyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span>Properties</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">Add New</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900">Add New Property</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Property Information</h2>

            <div className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-semibold text-gray-900 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter street address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="city" className="block text-sm font-semibold text-gray-900 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="e.g., San Francisco"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-semibold text-gray-900 mb-2">
                    State / Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    placeholder="e.g., California"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-semibold text-gray-900 mb-2">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange('zipCode', e.target.value)}
                    placeholder="Enter ZIP code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Property Type
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPropertyTypeDropdown(!showPropertyTypeDropdown)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <span className="text-gray-900">{formData.propertyType}</span>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>

                    {showPropertyTypeDropdown && (
                      <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg">
                        {propertyTypes.map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => {
                              handleInputChange('propertyType', type);
                              setShowPropertyTypeDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-xl last:rounded-b-xl"
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Property Details</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-900 mb-2">
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    id="bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                    placeholder="e.g., 3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="bathrooms" className="block text-sm font-semibold text-gray-900 mb-2">
                    Bathrooms
                  </label>
                  <input
                    type="number"
                    id="bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                    placeholder="e.g., 2"
                    step="0.5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="squareFootage" className="block text-sm font-semibold text-gray-900 mb-2">
                    Square Footage (sqft)
                  </label>
                  <input
                    type="number"
                    id="squareFootage"
                    value={formData.squareFootage}
                    onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                    placeholder="e.g., 1200"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-900 mb-2">
                  Description & Amenities
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the property, including key features like a modern kitchen, balcony, in-unit laundry, etc."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Rental & Financials</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="monthlyRent" className="block text-sm font-semibold text-gray-900 mb-2">
                  Monthly Rent Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    id="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={(e) => handleInputChange('monthlyRent', e.target.value)}
                    placeholder="2500"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="securityDeposit" className="block text-sm font-semibold text-gray-900 mb-2">
                  Security Deposit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                    $
                  </span>
                  <input
                    type="number"
                    id="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                    placeholder="2500"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Photos</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-700 font-medium mb-1">
                Click to upload <span className="text-gray-500">or drag and drop</span>
              </p>
              <p className="text-sm text-gray-500">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
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
                className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 cursor-pointer transition-colors"
              >
                Choose Files
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pb-8">
            <button
              type="button"
              onClick={onBack}
              className="px-8 py-3 text-gray-700 font-semibold hover:bg-gray-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Save Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
