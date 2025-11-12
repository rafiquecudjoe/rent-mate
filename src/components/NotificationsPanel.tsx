import { X, Check, AlertCircle, Info, TrendingUp } from 'lucide-react';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'default';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Payment Received',
    message: 'John Doe paid $1,200 for Oak Street Apartment',
    time: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Lease Request',
    message: 'Jane Smith requested a lease for Maple Avenue Property',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Maintenance Request',
    message: 'Tenant reported a leaking faucet in Unit 304',
    time: '3 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'default',
    title: 'Property Viewed',
    message: '5 potential tenants viewed your listing today',
    time: '5 hours ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'success',
    title: 'Rent Due Reminder',
    message: '3 properties have rent due in 5 days',
    time: '1 day ago',
    isRead: true,
  },
];

export default function NotificationsPanel({ isOpen, onClose }: NotificationsProps) {
  if (!isOpen) return null;

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-[#7fba7a]" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-[#ff9f43]" />;
      case 'info':
        return <Info className="w-5 h-5 text-[#475be8]" />;
      default:
        return <TrendingUp className="w-5 h-5 text-[#808191]" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/10"
        onClick={onClose}
      />
      
      {/* Notifications Panel */}
      <div className="fixed top-[70px] right-6 z-50 w-[411px] max-h-[705px] bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] shadow-[0px_40px_50px_1px_rgba(120,114,114,0.15)] dark:shadow-[0px_40px_50px_1px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#e4e8ef] dark:border-[#272b30]">
          <h3 className="font-['Manrope',sans-serif] font-bold text-[18px] leading-[25px] text-[#11142d] dark:text-[#efefef]">
            Notifications
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] transition-colors"
          >
            <X className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {mockNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 border-b border-[#e4e8ef] dark:border-[#272b30] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] transition-colors cursor-pointer ${
                !notification.isRead ? 'bg-[#f7f8ff] dark:bg-[#1f2937]' : ''
              }`}
            >
              <div className="flex gap-3">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-['Manrope',sans-serif] font-semibold text-[14px] leading-[20px] text-[#11142d] dark:text-[#efefef]">
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-[#475be8] rounded-full flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="font-['Manrope',sans-serif] font-normal text-[12px] leading-[18px] text-[#808191] dark:text-[#92939e] mb-2">
                    {notification.message}
                  </p>
                  <span className="font-['Manrope',sans-serif] font-normal text-[11px] leading-[16px] text-[#808191] dark:text-[#6b7280]">
                    {notification.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
          <button className="w-full py-2 text-center font-['Manrope',sans-serif] font-semibold text-[14px] text-[#475be8] dark:text-[#6c7ce8] hover:underline">
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
}
