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
    <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4 md:mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] rounded-[8px] transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-[#808191] dark:text-[#92939e]" />
        </button>
        <div className="flex-1">
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{property.name}</h1>
          <div className="flex items-center gap-2 text-[#808191] dark:text-[#92939e] mt-1">
            <MapPin className="w-4 h-4" />
            <span className="text-[13px]">{property.address}</span>
          </div>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] text-[#808191] dark:text-[#92939e] rounded-[8px] hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] transition-all font-medium text-[14px]"
        >
          <Edit className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Edit Property</span>
        </button>
      </div>

      {/* Property Image */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] overflow-hidden mb-4 md:mb-6 transition-colors">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30] transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">Property Type</p>
              <p className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{property.type}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30] transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">Occupancy</p>
              <p className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{property.occupiedUnits}/{property.totalUnits}</p>
              <p className="text-[11px] text-[#7fba7a] font-semibold">{occupancyRate}% Occupied</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30] transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">Monthly Income</p>
              <p className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">${property.monthlyIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30] transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffce73]/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-[#ffce73]" />
            </div>
            <div>
              <p className="text-[12px] md:text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">Available Units</p>
              <p className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{property.availableUnits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 mb-4 md:mb-6 transition-colors">
        <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-3 transition-colors">Description & Amenities</h2>
        <p className="text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">{property.description}</p>
      </div>

      {/* Units List */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 transition-colors">
        <div className="mb-4 md:mb-6">
          <h2 className="text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Units & Tenants</h2>
          <p className="text-[13px] text-[#808191] dark:text-[#92939e] mt-1 transition-colors">
            All rental units in this property. Edit property to add or remove units.
          </p>
        </div>

        <div className="space-y-4">
          {property.units.map((unit) => (
            <div
              key={unit.id}
              className="border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] p-4 md:p-5 hover:shadow-md transition-all bg-[#f4f4f4] dark:bg-[#111315]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Unit Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{unit.unitNumber}</h3>
                    <span className={`px-3 py-1 text-[11px] font-semibold rounded-full flex items-center gap-1 ${
                      unit.isOccupied
                        ? 'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8]'
                        : 'bg-[#7fba7a]/10 text-[#7fba7a]'
                    }`}>
                      {unit.isOccupied ? (
                        <>
                          <XCircle className="w-3 h-3" />
                          Occupied
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-[13px] text-[#808191] dark:text-[#92939e] mb-3 transition-colors">{unit.type}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[13px]">
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
                      <span className="ml-1 font-bold text-[#7fba7a]">${unit.rent}/mo</span>
                    </div>
                  </div>
                </div>

                {/* Tenant Info */}
                {unit.tenant ? (
                  <div 
                    onClick={() => onViewTenant?.(unit.tenant.id)}
                    className="lg:w-80 p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[10px] border border-[#475be8]/20 dark:border-[#6c7ce8]/20 cursor-pointer hover:bg-[#475be8]/15 dark:hover:bg-[#6c7ce8]/15 transition-all"
                  >
                    <p className="text-[11px] font-semibold text-[#475be8] dark:text-[#6c7ce8] uppercase mb-2 transition-colors">Current Tenant</p>
                    <p className="font-bold text-[#11142d] dark:text-[#efefef] mb-2 text-[15px] transition-colors">{unit.tenant.name}</p>
                    <div className="space-y-1 text-[13px]">
                      <div className="flex items-center gap-2 text-[#808191] dark:text-[#92939e]">
                        <Mail className="w-4 h-4" />
                        <span>{unit.tenant.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#808191] dark:text-[#92939e]">
                        <Phone className="w-4 h-4" />
                        <span>{unit.tenant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#808191] dark:text-[#92939e]">
                        <Calendar className="w-4 h-4" />
                        <span>Lease ends: {unit.tenant.leaseEnd}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#475be8]/20 dark:border-[#6c7ce8]/20">
                      <span className="text-[12px] text-[#475be8] dark:text-[#6c7ce8] font-medium">Click to view details →</span>
                    </div>
                  </div>
                ) : (
                  <div className="lg:w-80 p-4 bg-[#7fba7a]/10 rounded-[10px] border border-[#7fba7a]/20">
                    <p className="text-[13px] text-[#7fba7a] font-medium mb-2">
                      ✓ Ready to rent
                    </p>
                    <button
                      onClick={() => onAssignTenant?.(unit.id)}
                      className="w-full px-4 py-2 bg-[#7fba7a] text-white rounded-[8px] hover:bg-[#6fa969] transition-all font-medium text-[14px]"
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
