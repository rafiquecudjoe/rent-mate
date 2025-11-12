import { Bell, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import ProfileDropdown from './ProfileDropdown';
import NotificationsPanel from './NotificationsPanel';

interface HeaderProps {
  onMenuClick: () => void;
  onNotificationClick?: () => void;
  onAddProperty?: () => void;
  onAddTenant?: () => void;
  onProfileClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] sticky top-0 z-30 h-[70px] transition-colors">
      <div className="h-full flex items-center justify-between px-6 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-[#f7f7f7] dark:hover:bg-[#272b30] rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-[#11142d] dark:text-[#efefef]" />
        </button>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto hidden md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#808191] dark:text-[#92939e]" />
            <input
              type="text"
              placeholder="Search Property, Customer, etc..."
              className="w-full pl-12 pr-4 py-2.5 bg-[#f4f4f4] dark:bg-[#272b30] border border-[#e4e8ef] dark:border-[#3f4447] rounded-lg text-sm text-[#11142d] dark:text-[#efefef] placeholder-[#808191] dark:placeholder-[#6b7280] focus:outline-none focus:ring-2 focus:ring-[#475be8] focus:border-[#475be8] transition-all"
            />
          </div>
        </div>

        {/* Right Side - Notification and Profile */}
        <div className="flex items-center gap-4 relative">
          <button 
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileDropdown(false);
            }}
            className="relative p-2 hover:bg-[#f7f7f7] dark:hover:bg-[#272b30] rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#f45252] rounded-full"></span>
          </button>

          {/* User Profile Info */}
          <button
            onClick={() => {
              setShowProfileDropdown(!showProfileDropdown);
              setShowNotifications(false);
            }}
            className="flex items-center gap-3 pl-4 border-l border-[#e4e8ef] dark:border-[#272b30] hover:opacity-80 transition-opacity"
          >
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-[#11142d] dark:text-[#efefef]">John Anderson</p>
              <p className="text-xs text-[#808191] dark:text-[#92939e]">Property Manager</p>
            </div>
          </button>

          {/* Profile Dropdown */}
          <ProfileDropdown
            isOpen={showProfileDropdown}
            onClose={() => setShowProfileDropdown(false)}
            onEditProfile={() => console.log('Edit Profile')}
            onSettings={() => console.log('Settings')}
            onLogout={() => console.log('Logout')}
          />

          {/* Notifications Panel */}
          <NotificationsPanel
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>
      </div>
    </header>
  );
}
