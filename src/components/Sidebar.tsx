import { Home, Building2, Users, CreditCard, Settings, X, FileText, UserCog, LogOut, Wrench } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onAddProperty?: () => void;
  onLogout?: () => void;
}

const menuItems = [
  { icon: Home, label: 'Dashboard', id: 'dashboard' },
  { icon: Building2, label: 'Properties', id: 'properties' },
  { icon: Users, label: 'Tenants', id: 'tenants' },
  { icon: CreditCard, label: 'Payments', id: 'payments' },
  { icon: FileText, label: 'Lease Management', id: 'lease-management' },
  { icon: Wrench, label: 'Maintenance', id: 'maintenance-requests' },
  { icon: UserCog, label: 'Team', id: 'team-management' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function Sidebar({ isOpen, onClose, currentPage, onNavigate, onAddProperty, onLogout }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">RentMate</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg
                    transition-all duration-200
                    ${currentPage === item.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}>
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-gray-200 space-y-4">
            <button
              onClick={onAddProperty}
              className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl"
            >
              Add New Property
            </button>

            <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100"
                alt="John Doe"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">John Doe</div>
                <div className="text-sm text-gray-500">Homeowner</div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 font-semibold rounded-xl hover:bg-red-100 transition-all duration-200 border border-red-200"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
