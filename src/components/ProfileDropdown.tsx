import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const iconProfile = "https://www.figma.com/api/mcp/asset/07f98628-74d9-4924-a3e5-8ea241c6eda7";
const iconSettings = "https://www.figma.com/api/mcp/asset/94f718b3-229f-4c13-9e43-5facbf5f9e33";
const iconLogout = "https://www.figma.com/api/mcp/asset/a3908c4d-60eb-4eee-a1d7-de48926d6879";

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

export default function ProfileDropdown({
  isOpen,
  onClose,
  onEditProfile,
  onSettings,
  onLogout,
}: ProfileDropdownProps) {
  const { theme, toggleTheme } = useTheme();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      
      {/* Dropdown Menu */}
      <div className="absolute top-[74px] right-6 z-50 w-[192px] bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] shadow-[0px_40px_50px_1px_rgba(120,114,114,0.15)] dark:shadow-[0px_40px_50px_1px_rgba(0,0,0,0.3)] p-[10px] flex flex-col gap-[10px]">
        {/* Edit Profile */}
        <button
          onClick={() => {
            onEditProfile?.();
            onClose();
          }}
          className="w-full bg-[#fcfcfc] dark:bg-[#272b30] hover:bg-[#f7f7f7] dark:hover:bg-[#2f3439] rounded-[5px] p-[10px] flex items-center gap-[10px] transition-colors"
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center">
            <img src={iconProfile} alt="" className="w-full h-full" />
          </div>
          <span className="font-['Manrope',sans-serif] font-semibold text-[14px] leading-[22px] text-[#475be8] dark:text-[#6c7ce8]">
            Edit Profile
          </span>
        </button>

        {/* Settings */}
        <button
          onClick={() => {
            onSettings?.();
            onClose();
          }}
          className="w-full bg-[#fcfcfc] dark:bg-[#272b30] hover:bg-[#f7f7f7] dark:hover:bg-[#2f3439] rounded-[5px] p-[10px] flex items-center gap-[10px] transition-colors"
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center">
            <img src={iconSettings} alt="" className="w-full h-full" />
          </div>
          <span className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[22px] text-[#808191] dark:text-[#92939e]">
            Settings
          </span>
        </button>

        {/* Logout */}
        <button
          onClick={() => {
            onLogout?.();
            onClose();
          }}
          className="w-full bg-[#fcfcfc] dark:bg-[#272b30] hover:bg-[#f7f7f7] dark:hover:bg-[#2f3439] rounded-[5px] p-[10px] flex items-center gap-[10px] transition-colors"
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center">
            <img src={iconLogout} alt="" className="w-full h-full" />
          </div>
          <span className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[22px] text-[#808191] dark:text-[#92939e]">
            Logout
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="w-full bg-[#fcfcfc] dark:bg-[#272b30] hover:bg-[#f7f7f7] dark:hover:bg-[#2f3439] rounded-[5px] p-[10px] flex items-center gap-[10px] transition-colors"
        >
          <div className="w-[18px] h-[18px] flex items-center justify-center">
            {theme === 'light' ? (
              <Moon className="w-[18px] h-[18px] text-[#808191]" />
            ) : (
              <Sun className="w-[18px] h-[18px] text-[#fbbf24]" />
            )}
          </div>
          <span className="font-['Manrope',sans-serif] font-medium text-[14px] leading-[22px] text-[#808191] dark:text-[#92939e]">
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </span>
        </button>
      </div>
    </>
  );
}
