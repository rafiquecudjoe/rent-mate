import { ArrowLeft, MapPin, Home, DollarSign, Users, Edit, Phone, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

interface PropertyDetailsProps {
  propertyId: number;
  onBack: () => void;
  onEdit: () => void;
  onAssignTenant?: (unitId: number) => void;
  onViewTenant?: (tenantId: number) => void;
}

export default function PropertyDetails({ propertyId, onBack, onEdit, onAssignTenant, onViewTenant }: PropertyDetailsProps) {
  // Mock data - in real app, this would come from API/state based on propertyId
  const property = {
    id: propertyId,
    name: '123 Maple Street',
    address: '123 Maple St, Boston, MA 02101',
    type: 'Apartment Building',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=400',
    description: 'Modern apartment building with secure parking, 24/7 security, elevator access, and nearby public transportation.',
    totalUnits: 4,
    occupiedUnits: 3,
    availableUnits: 1,
    monthlyIncome: 4800,
    units: [
      {
        id: 1,
        unitNumber: 'Unit 4B',
        type: '2 Bedroom (1 Bathroom)',
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 950,
        rent: 1500,
        deposit: 3000,
        isOccupied: true,
        tenant: {
          id: 1,
          name: 'Alice Johnson',
          email: 'alice.johnson@email.com',
          phone: '(555) 123-4567',
          leaseEnd: 'Oct 15, 2025',
        },
      },
      {
        id: 2,
        unitNumber: 'Unit 2A',
        type: 'Single Self-Contain (Private Bathroom)',
        bedrooms: 0,
        bathrooms: 1,
        squareFootage: 400,
        rent: 800,
        deposit: 1600,
        isOccupied: true,
        tenant: {
          id: 2,
          name: 'Bob Williams',
          email: 'bob.williams@email.com',
          phone: '(555) 234-5678',
          leaseEnd: 'Dec 20, 2025',
        },
      },
      {
        id: 3,
        unitNumber: 'Unit 5C',
        type: '1 Bedroom Self-Contain (Chamber & Hall)',
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 750,
        rent: 1200,
        deposit: 2400,
        isOccupied: true,
        tenant: {
          id: 3,
          name: 'Charlie Brown',
          email: 'charlie.brown@email.com',
          phone: '(555) 345-6789',
          leaseEnd: 'Nov 5, 2025',
        },
      },
      {
        id: 4,
        unitNumber: 'Unit 1A',
        type: '2 Bedroom (2 Bathrooms)',
        bedrooms: 2,
        bathrooms: 2,
        squareFootage: 1100,
        rent: 1800,
        deposit: 3600,
        isOccupied: false,
        tenant: null,
      },
    ],
  };

  const occupancyRate = Math.round((property.occupiedUnits / property.totalUnits) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.name}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{property.address}</span>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
        >
          <Edit className="w-5 h-5" />
          <span className="hidden sm:inline">Edit Property</span>
        </button>
      </div>

      {/* Property Image */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Home className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Property Type</p>
              <p className="text-lg font-bold text-gray-900">{property.type}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupancy</p>
              <p className="text-lg font-bold text-gray-900">{property.occupiedUnits}/{property.totalUnits}</p>
              <p className="text-xs text-green-600 font-semibold">{occupancyRate}% Occupied</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Income</p>
              <p className="text-lg font-bold text-gray-900">${property.monthlyIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Home className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Available Units</p>
              <p className="text-lg font-bold text-gray-900">{property.availableUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-3">Description & Amenities</h2>
        <p className="text-gray-600">{property.description}</p>
      </div>

      {/* Units List */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Units & Tenants</h2>
          <p className="text-sm text-gray-600 mt-1">
            All rental units in this property. Edit property to add or remove units.
          </p>
        </div>

        <div className="space-y-4">
          {property.units.map((unit) => (
            <div
              key={unit.id}
              className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Unit Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{unit.unitNumber}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      unit.isOccupied
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {unit.isOccupied ? (
                        <span className="flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          Occupied
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{unit.type}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Bedrooms:</span>
                      <span className="ml-1 font-semibold text-gray-900">{unit.bedrooms}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Bathrooms:</span>
                      <span className="ml-1 font-semibold text-gray-900">{unit.bathrooms}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Size:</span>
                      <span className="ml-1 font-semibold text-gray-900">{unit.squareFootage} sqft</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Rent:</span>
                      <span className="ml-1 font-bold text-green-600">${unit.rent}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Tenant Info */}
                {unit.tenant ? (
                  <div 
                    onClick={() => onViewTenant?.(unit.tenant.id)}
                    className="lg:w-80 p-4 bg-blue-50 rounded-lg border border-blue-200 cursor-pointer hover:bg-blue-100 hover:border-blue-300 transition-all"
                  >
                    <p className="text-xs font-semibold text-blue-700 uppercase mb-2">Current Tenant</p>
                    <p className="font-bold text-gray-900 mb-2">{unit.tenant.name}</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{unit.tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{unit.tenant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Lease ends: {unit.tenant.leaseEnd}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-blue-200">
                      <span className="text-xs text-blue-600 font-medium">Click to view details →</span>
                    </div>
                  </div>
                ) : (
                  <div className="lg:w-80 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-700 font-medium mb-2">
                      ✓ Ready to rent
                    </p>
                    <button
                      onClick={() => onAssignTenant?.(unit.id)}
                      className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-medium text-sm"
                    >
                      Assign Tenant
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
