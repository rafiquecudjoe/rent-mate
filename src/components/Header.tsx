import { Bell, Menu, Plus, Building2 } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationClick?: () => void;
  onAddProperty?: () => void;
  onAddTenant?: () => void;
  onProfileClick?: () => void;
}

export default function Header({ onMenuClick, onNotificationClick, onAddProperty, onAddTenant, onProfileClick }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        <div className="flex-1 lg:flex-none" />

        <div className="flex items-center gap-2 md:gap-3">
          <button 
            onClick={onAddTenant}
            className="hidden md:flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Building2 className="w-4 h-4" />
            <span className="font-medium">Add New Tenant</span>
          </button>

          <button 
            onClick={onAddProperty}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="font-medium hidden sm:inline">Add New Property</span>
            <span className="font-medium sm:hidden">Add Property</span>
          </button>

          <button onClick={onNotificationClick} className="relative p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button onClick={onProfileClick} className="focus:outline-none">
            <img
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100"
              alt="User"
              className="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
