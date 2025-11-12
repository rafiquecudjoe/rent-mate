import { TrendingUp, MapPin, ChevronRight } from 'lucide-react';

interface DashboardProps {
  onRecordPayment?: () => void;
  onAddProperty?: () => void;
  onAddTenant?: () => void;
  onNavigate?: (page: string) => void;
}

// Figma asset URLs for donut charts and property images
const donutChart1 = "https://www.figma.com/api/mcp/asset/9fec4030-5c23-434d-94cb-fa85c2e5aa60";
const donutChart2 = "https://www.figma.com/api/mcp/asset/162c073a-66ee-4397-bd06-3cc2ea837fac";
const donutChart3 = "https://www.figma.com/api/mcp/asset/389f63df-144e-48c4-8eb0-d193da177a7f";
const donutChart4 = "https://www.figma.com/api/mcp/asset/92696239-d4e5-425b-8a56-6e3dad655df5";

const property1 = "https://www.figma.com/api/mcp/asset/e2013c39-a87c-42ab-83e8-488e6ac5524c";
const property2 = "https://www.figma.com/api/mcp/asset/1853e8d4-e6a6-48ae-91a8-1ca653e197fb";
const property3 = "https://www.figma.com/api/mcp/asset/f8be7fa7-7740-4069-b606-c4896d356296";

export default function Dashboard({ onNavigate }: DashboardProps) {
  // Monthly rental income data (based on $14,400/month from properties)
  const revenueData = [
    { month: 'Jan', lastMonth: 13200, runningMonth: 14400 },
    { month: 'Feb', lastMonth: 13200, runningMonth: 14400 },
    { month: 'Mar', lastMonth: 12000, runningMonth: 14400 },
    { month: 'Apr', lastMonth: 12000, runningMonth: 14400 },
    { month: 'May', lastMonth: 14400, runningMonth: 14400 },
    { month: 'Jun', lastMonth: 14400, runningMonth: 14400 },
    { month: 'Jul', lastMonth: 14400, runningMonth: 14400 },
  ];

  const maxAmount = 18000; // Fixed max for consistent scaling

  // Maintenance request status distribution
  const maintenanceStats = [
    { name: 'Completed', percentage: 65, color: 'bg-[#7fba7a]' },
    { name: 'In Progress', percentage: 25, color: 'bg-[#ffce73]' },
    { name: 'Pending', percentage: 10, color: 'bg-[#475be8]' },
  ];

  // Actual RentMate properties (from Properties.tsx)
  const topProperties = [
    {
      name: '123 Maple Street',
      location: 'Boston, MA',
      price: '$4,800/mo',
      image: property1,
    },
    {
      name: '789 Oak Avenue',
      location: 'Boston, MA',
      price: '$7,200/mo',
      image: property2,
    },
    {
      name: '456 Pine Lane',
      location: 'Cambridge, MA',
      price: '$2,400/mo',
      image: property3,
    },
  ];

  return (
    <div className="h-full bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6 overflow-y-auto transition-colors">
      {/* Page Title */}
      <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 transition-colors">Dashboard</h1>

      {/* Top Stats Cards - RentMate Property Management Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-5 md:p-6 flex items-center justify-between transition-colors">
          <div className="flex-1">
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1 transition-colors">Total Properties</p>
            <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">4</p>
          </div>
          <img src={donutChart1} alt="" className="w-[50px] h-[50px] md:w-[60px] md:h-[60px]" />
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-5 md:p-6 flex items-center justify-between transition-colors">
          <div className="flex-1">
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1 transition-colors">Total Units</p>
            <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">12</p>
            <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-1">9 occupied • 3 vacant</p>
          </div>
          <img src={donutChart2} alt="" className="w-[60px] h-[60px] md:w-[72px] md:h-[72px]" />
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-5 md:p-6 flex items-center justify-between transition-colors">
          <div className="flex-1">
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1 transition-colors">Active Tenants</p>
            <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">4</p>
          </div>
          <img src={donutChart3} alt="" className="w-[70px] h-[70px] md:w-[83px] md:h-[83px]" />
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-5 md:p-6 flex items-center justify-between transition-colors">
          <div className="flex-1">
            <p className="text-[12px] md:text-[14px] font-medium text-[#808191] dark:text-[#92939e] mb-1 transition-colors">Monthly Income</p>
            <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">$14,400</p>
          </div>
          <img src={donutChart4} alt="" className="w-[60px] h-[60px] md:w-[72px] md:h-[72px]" />
        </div>
      </div>

      {/* Main Content - Revenue Chart and Maintenance Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Total Revenue Chart */}
        <div className="lg:col-span-2 bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
            <div>
              <h2 className="text-[16px] md:text-[18px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2 transition-colors">Monthly Rental Income</h2>
              <div className="flex items-center gap-3 md:gap-4">
                <p className="text-[24px] md:text-[28px] font-bold text-[#11142d] dark:text-[#efefef] transition-colors">$100,800</p>
                <div className="flex items-center gap-2">
                  <div className="bg-[#475be8] dark:bg-[#6c7ce8] rounded-full p-1 transition-colors">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="text-[14px] md:text-[15px] font-medium text-[#475be8] dark:text-[#6c7ce8] transition-colors">9.1%</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] transition-colors">Past 7 months</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 md:gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#475be8] dark:bg-[#6c7ce8] transition-colors"></div>
                <span className="text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] transition-colors">Last Month</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#cfc8ff] dark:bg-[#a598ff] transition-colors"></div>
                <span className="text-[11px] md:text-[12px] font-semibold text-[#808191] dark:text-[#92939e] transition-colors">Running Month</span>
              </div>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative h-[200px] md:h-[240px] flex items-end justify-between gap-4 md:gap-8 pl-8 md:pl-12 pr-2 md:pr-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-[10px] md:text-[12px] text-[#808191] dark:text-[#92939e] transition-colors">
              <span>18k</span>
              <span>14k</span>
              <span>10k</span>
              <span>6k</span>
              <span>0k</span>
            </div>

            {/* Bars */}
            {revenueData.map((data, index) => {
              const lastMonthHeight = (data.lastMonth / maxAmount) * 100;
              const runningMonthHeight = (data.runningMonth / maxAmount) * 100;

              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full">
                  <div className="w-full flex items-end justify-center gap-[2px] md:gap-[3px] flex-1">
                    <div className="flex-1 relative group">
                      <div
                        className="w-full bg-[#475be8] dark:bg-[#6c7ce8] rounded-t-[4px] transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${lastMonthHeight}%` }}
                      />
                    </div>
                    <div className="flex-1 relative group">
                      <div
                        className="w-full bg-[#cfc8ff] dark:bg-[#a598ff] rounded-t-[4px] transition-all hover:opacity-80 cursor-pointer"
                        style={{ height: `${runningMonthHeight}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-[10px] md:text-[12px] text-[#808191] dark:text-[#92939e] transition-colors">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Maintenance Request Status */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] p-4 md:p-5 transition-colors">
          <h2 className="text-[16px] md:text-[18px] font-semibold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-5 transition-colors">Maintenance Status</h2>
          <div className="space-y-3 md:space-y-4">
            {maintenanceStats.map((stat, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[14px] md:text-[16px] font-medium text-[#11142d] dark:text-[#efefef] transition-colors">{stat.name}</span>
                  <span className="text-[14px] md:text-[16px] font-medium text-[#11142d] dark:text-[#efefef] transition-colors">{stat.percentage}%</span>
                </div>
                <div className="w-full bg-[#e4e8ef] dark:bg-[#272b30] rounded-[4px] h-2 overflow-hidden transition-colors">
                  <div
                    className={`${stat.color} h-full rounded-[4px] transition-all duration-1000 ease-out`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Property Portfolio */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 transition-colors">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
          <h2 className="text-[16px] md:text-[18px] font-semibold text-[#11142d] dark:text-[#efefef] transition-colors">Your Properties</h2>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            <button className="bg-[#475be8] dark:bg-[#6c7ce8] text-white text-[11px] md:text-[12px] font-semibold px-3 md:px-4 py-2 rounded-[6px] whitespace-nowrap transition-colors">
              All Properties
            </button>
            <button className="bg-[#f7f7f7] dark:bg-[#272b30] text-[#808191] dark:text-[#92939e] text-[11px] md:text-[12px] font-semibold px-2 md:px-3 py-2 rounded-[6px] hover:bg-[#e4e8ef] dark:hover:bg-[#3f4447] transition-colors whitespace-nowrap">
              High Occupancy
            </button>
            <button className="bg-[#f7f7f7] dark:bg-[#272b30] text-[#808191] dark:text-[#92939e] text-[11px] md:text-[12px] font-semibold px-2 md:px-3 py-2 rounded-[6px] hover:bg-[#e4e8ef] dark:hover:bg-[#3f4447] transition-colors whitespace-nowrap">
              Needs Attention
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('properties')}
              className="bg-[#f7f7f7] dark:bg-[#272b30] text-[#808191] dark:text-[#92939e] text-[11px] md:text-[12px] font-semibold px-2 md:px-3 py-2 rounded-[6px] hover:bg-[#e4e8ef] dark:hover:bg-[#3f4447] transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              View All
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {topProperties.map((property, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={() => onNavigate && onNavigate('properties')}
            >
              <div className="relative overflow-hidden rounded-[8px] md:rounded-[10px] mb-3 h-[150px] md:h-[186px]">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <h3 className="text-[14px] md:text-[16px] font-semibold text-[#11142d] dark:text-[#efefef] mb-1 group-hover:text-[#475be8] dark:group-hover:text-[#6c7ce8] transition-colors line-clamp-1">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-1 text-[12px] md:text-[14px] text-[#808191] dark:text-[#92939e] transition-colors">
                    <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                </div>
                <div className="bg-[#dadefa] dark:bg-[#2d3a52] text-[#475be8] dark:text-[#8b9cff] text-[11px] md:text-[12px] font-semibold px-2 py-1.5 rounded-[4px] whitespace-nowrap transition-colors">
                  {property.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
