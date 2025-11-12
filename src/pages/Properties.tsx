import { Search, Filter, MapPin, Home, DollarSign, Users, Plus, MoreVertical, Building2, Percent, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const properties = [
  {
    id: 1,
    name: '123 Maple Street',
    image: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    type: 'Apartment Building',
    units: 4,
    occupied: 3,
    monthlyIncome: 4800,
    address: '123 Maple St, Boston, MA',
    status: 'active',
  },
  {
    id: 2,
    name: '789 Oak Avenue',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    type: 'Apartment Building',
    units: 6,
    occupied: 5,
    monthlyIncome: 7200,
    address: '789 Oak Ave, Boston, MA',
    status: 'active',
  },
  {
    id: 3,
    name: '456 Pine Lane',
    image: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    type: 'House',
    units: 1,
    occupied: 1,
    monthlyIncome: 2400,
    address: '456 Pine Ln, Cambridge, MA',
    status: 'active',
  },
  {
    id: 4,
    name: '321 Birch Road',
    image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400&h=300',
    type: 'Condo',
    units: 1,
    occupied: 0,
    monthlyIncome: 0,
    address: '321 Birch Rd, Somerville, MA',
    status: 'vacant',
  },
];

interface PropertiesProps {
  onAddProperty?: () => void;
  onViewProperty?: (propertyId: number) => void;
  onEditProperty?: (propertyId: number) => void;
}

export default function Properties({ onAddProperty, onViewProperty, onEditProperty }: PropertiesProps = {}) {
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showPropertyMenu, setShowPropertyMenu] = useState<number | null>(null);

  // Calculate portfolio stats
  const totalProperties = properties.length;
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0);
  const occupiedUnits = properties.reduce((sum, p) => sum + p.occupied, 0);
  const occupancyRate = totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0;
  const monthlyIncome = properties.reduce((sum, p) => sum + p.monthlyIncome, 0);
  
  return (
    <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
        <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">Properties</h1>
        <button
          onClick={onAddProperty}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] hover:bg-[#3f51d7] dark:hover:bg-[#5d6dd8] transition-all duration-200 text-[14px] font-semibold"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>Add Property</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Total Properties</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{totalProperties}</p>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <Home className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Total Units</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{totalUnits}</p>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#ffce73]/10 flex items-center justify-center">
              <Percent className="w-5 h-5 text-[#ffce73]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Occupancy Rate</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">{occupancyRate}%</p>
          <p className="text-[12px] text-[#808191] dark:text-[#92939e] mt-1 transition-colors">{occupiedUnits} of {totalUnits} units</p>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[8px] bg-[#7fba7a]/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#7fba7a]" />
            </div>
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] transition-colors">Monthly Income</p>
          </div>
          <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">${monthlyIncome.toLocaleString()}</p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 mb-4 md:mb-6 transition-colors">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
            <input
              type="text"
              placeholder="Search properties..."
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
                <h3 className="text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">Filter by Type</h3>
                <div className="space-y-2 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" defaultChecked />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Apartment</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" defaultChecked />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">House</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" defaultChecked />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Condo</span>
                  </label>
                </div>
                <h3 className="text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" defaultChecked />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-[#475be8] dark:text-[#6c7ce8]" />
                    <span className="text-[13px] text-[#808191] dark:text-[#92939e]">Vacant</span>
                  </label>
                </div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {properties.map((property) => {
          const availableUnits = property.units - property.occupied;
          const occupancyRate = property.units > 0 ? Math.round((property.occupied / property.units) * 100) : 0;
          
          return (
            <div
              key={property.id}
              className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group border border-[#e4e8ef] dark:border-[#272b30]"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowPropertyMenu(showPropertyMenu === property.id ? null : property.id);
                    }}
                    className="p-2 bg-[#fcfcfc]/90 dark:bg-[#1a1d1f]/90 backdrop-blur-sm rounded-[8px] hover:bg-[#fcfcfc] dark:hover:bg-[#1a1d1f] transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-[#11142d] dark:text-[#efefef]" />
                  </button>
                  
                  {showPropertyMenu === property.id && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] shadow-lg border border-[#e4e8ef] dark:border-[#272b30] py-2 z-20">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewProperty?.(property.id);
                          setShowPropertyMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-[13px] text-[#808191] dark:text-[#92939e] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProperty?.(property.id);
                          setShowPropertyMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-[13px] text-[#808191] dark:text-[#92939e] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors"
                      >
                        Edit Property
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Are you sure you want to delete ${property.name}?`)) {
                            alert('Property deleted');
                          }
                          setShowPropertyMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-[13px] text-[#f45252] hover:bg-red-50 dark:hover:bg-[#f45252]/10 transition-colors"
                      >
                        Delete Property
                      </button>
                    </div>
                  )}
                </div>
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.status === 'vacant' ? (
                    <span className="px-3 py-1 bg-[#f45252] text-white text-[11px] font-semibold rounded-full">
                      Vacant
                    </span>
                  ) : (
                    <>
                      {availableUnits > 0 && (
                        <span className="px-3 py-1 bg-[#7fba7a] text-white text-[11px] font-semibold rounded-full">
                          {availableUnits} Available
                        </span>
                      )}
                      {availableUnits === 0 && property.units > 0 && (
                        <span className="px-3 py-1 bg-[#475be8] dark:bg-[#6c7ce8] text-white text-[11px] font-semibold rounded-full">
                          Fully Occupied
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="p-4 md:p-5">
                <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">{property.name}</h3>
                <div className="flex items-center gap-2 text-[#808191] dark:text-[#92939e] mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[13px]">{property.address}</span>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px]">
                    <Home className="w-4 h-4 text-[#475be8] dark:text-[#6c7ce8] mx-auto mb-1" />
                    <p className="text-[11px] text-[#808191] dark:text-[#92939e]">Type</p>
                    <p className="text-[11px] font-semibold text-[#11142d] dark:text-[#efefef]">{property.type}</p>
                  </div>
                  <div className="text-center p-2 bg-[#7fba7a]/10 rounded-[8px]">
                    <Users className="w-4 h-4 text-[#7fba7a] mx-auto mb-1" />
                    <p className="text-[11px] text-[#808191] dark:text-[#92939e]">Occupancy</p>
                    <p className="text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">{property.occupied}/{property.units}</p>
                    <p className="text-[11px] text-[#7fba7a] font-medium">{occupancyRate}%</p>
                  </div>
                  <div className="text-center p-2 bg-[#7fba7a]/10 rounded-[8px]">
                    <DollarSign className="w-4 h-4 text-[#7fba7a] mx-auto mb-1" />
                    <p className="text-[11px] text-[#808191] dark:text-[#92939e]">Monthly</p>
                    <p className="text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">${property.monthlyIncome.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onViewProperty?.(property.id)}
                      className="flex-1 px-3 py-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8] rounded-[8px] hover:bg-[#475be8]/20 dark:hover:bg-[#6c7ce8]/20 transition-colors font-medium text-[13px]"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onEditProperty?.(property.id)}
                      className="flex-1 px-3 py-2 border border-[#e4e8ef] dark:border-[#272b30] text-[#808191] dark:text-[#92939e] rounded-[8px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors font-medium text-[13px]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
