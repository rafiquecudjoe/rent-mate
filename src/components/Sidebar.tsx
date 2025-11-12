import { LayoutDashboard, Building2, Users, CreditCard, Wrench, UsersRound, Settings, LogOut } from 'lucide-react';
import YarigaLogo from './YarigaLogo';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
  onAddProperty?: () => void;
  onLogout?: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Building2, label: 'Properties', id: 'properties' },
  { icon: Users, label: 'Tenants', id: 'tenants' },
  { icon: CreditCard, label: 'Payments', id: 'payments' },
  { icon: Wrench, label: 'Maintenance', id: 'maintenance-requests' },
  { icon: UsersRound, label: 'Team', id: 'team-management' },
];

export default function Sidebar({ isOpen, onClose, currentPage, onNavigate, onLogout }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[250px] bg-[#fcfcfc] dark:bg-[#1a1d1f] border-r border-[#e4e8ef] dark:border-[#272b30]
        transform transition-all duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col py-8 px-4
      `}>
        {/* Logo */}
        <div className="mb-12 px-3">
          <YarigaLogo />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                  isActive 
                    ? 'bg-[#475be8] dark:bg-[#6c7ce8] text-white' 
                    : 'text-[#808191] dark:text-[#92939e] hover:bg-[#f7f7f7] dark:hover:bg-[#272b30]'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[16px] font-semibold">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="flex flex-col space-y-1 mt-auto pt-6 border-t border-[#e4e8ef] dark:border-[#272b30] transition-colors">
          <button 
            onClick={() => {
              onNavigate('settings');
              onClose();
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
              currentPage === 'settings'
                ? 'bg-[#475be8] dark:bg-[#6c7ce8] text-white'
                : 'text-[#808191] dark:text-[#92939e] hover:bg-[#f7f7f7] dark:hover:bg-[#272b30]'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[16px] font-semibold">Settings</span>
          </button>
          <button 
            onClick={() => {
              onLogout && onLogout();
              onClose();
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left text-[#808191] dark:text-[#92939e] hover:bg-[#f7f7f7] dark:hover:bg-[#272b30] hover:text-red-500 dark:hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[16px] font-semibold">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
