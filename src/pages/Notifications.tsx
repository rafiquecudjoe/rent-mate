import { Bell, Check, Trash2, AlertCircle, Calendar, CheckCircle, Megaphone } from 'lucide-react';
import { useState } from 'react';

const notificationCategories = ['All', 'Rent', 'Lease', 'Payments', 'General'];

interface Notification {
  id: number;
  category: string;
  title: string;
  message: string;
  time: string;
  icon: 'alert' | 'calendar' | 'success' | 'megaphone';
  action?: { label: string; variant: 'primary' | 'secondary' };
  priority?: 'high' | 'normal';
}

const notifications: Notification[] = [
  {
    id: 1,
    category: 'Rent',
    title: 'Upcoming Rent Payment',
    message: 'Your rent payment of $1,500 for 123 Main St, Apt 4B is due in 5 days.',
    time: '2 days ago',
    icon: 'alert',
    action: { label: 'Pay Now', variant: 'primary' },
  },
  {
    id: 2,
    category: 'Lease',
    title: 'Lease Nearing Expiry',
    message: 'Your lease for 123 Main St, Apt 4B expires in 30 days.',
    time: '5 days ago',
    icon: 'calendar',
    action: { label: 'Review Lease', variant: 'secondary' },
  },
  {
    id: 3,
    category: 'Payments',
    title: 'Payment Received',
    message: 'We have successfully received your payment of $1,500.',
    time: '1 week ago',
    icon: 'success',
    action: { label: 'View Receipt', variant: 'secondary' },
  },
  {
    id: 4,
    category: 'General',
    title: 'Scheduled Maintenance',
    message: 'Please note that building maintenance is scheduled for October 25th.',
    time: '2 weeks ago',
    icon: 'megaphone',
    action: { label: 'Dismiss', variant: 'secondary' },
  },
  {
    id: 5,
    category: 'Rent',
    title: 'Rent Payment Overdue',
    message: 'Your rent payment is overdue. Please make a payment as soon as possible.',
    time: '1 month ago',
    icon: 'alert',
    action: { label: 'Pay Now', variant: 'primary' },
    priority: 'high',
  },
];

const iconComponents = {
  alert: AlertCircle,
  calendar: Calendar,
  success: CheckCircle,
  megaphone: Megaphone,
};

const iconColors = {
  alert: 'bg-[#ffce73]/10 text-[#ffce73]',
  calendar: 'bg-[#ffce73]/10 text-[#ffce73]',
  success: 'bg-[#7fba7a]/10 text-[#7fba7a]',
  megaphone: 'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8]',
};

export default function Notifications() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotifications = selectedCategory === 'All'
    ? notifications
    : notifications.filter(n => n.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        <div>
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Notifications</h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {notificationCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-[8px] md:rounded-[10px] font-medium transition-all text-[13px] md:text-[14px]
                ${selectedCategory === category
                  ? 'bg-[#475be8] dark:bg-[#6c7ce8] text-white'
                  : 'bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#808191] dark:text-[#92939e] hover:text-[#11142d] dark:hover:text-[#efefef] border border-[#e4e8ef] dark:border-[#272b30]'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors">
              <Check className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            </button>
            <button className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors">
              <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            </button>
            <div className="flex-1"></div>
            <button className="px-4 py-2 text-[#808191] dark:text-[#92939e] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] font-medium transition-colors text-[13px] md:text-[14px]">
              Clear all
            </button>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {filteredNotifications.map((notification) => {
            const IconComponent = iconComponents[notification.icon];

            return (
              <div
                key={notification.id}
                className={`
                  bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 hover:shadow-lg transition-all duration-300
                  ${notification.priority === 'high' ? 'bg-[#f45252]/5 border-[#f45252]/30' : ''}
                `}
              >
                <div className="flex gap-3 md:gap-4">
                  <div className={`p-2.5 md:p-3 rounded-[8px] md:rounded-[10px] ${iconColors[notification.icon]} flex-shrink-0 h-fit`}>
                    <IconComponent className="w-5 h-5 md:w-6 md:h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-[14px] md:text-[16px] font-bold text-[#11142d] dark:text-[#efefef]">{notification.title}</h3>
                      <span className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mb-4">{notification.message}</p>

                    {notification.action && (
                      <button
                        className={`
                          px-4 py-2 rounded-[8px] md:rounded-[10px] font-medium transition-all text-[12px] md:text-[13px]
                          ${notification.action.variant === 'primary'
                            ? 'bg-[#475be8] dark:bg-[#6c7ce8] text-white hover:opacity-90'
                            : 'bg-[#f4f4f4] dark:bg-[#111315] text-[#11142d] dark:text-[#efefef] hover:bg-[#e4e8ef] dark:hover:bg-[#272b30]'
                          }
                        `}
                      >
                        {notification.action.label}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-8 md:p-12 text-center">
            <Bell className="w-12 h-12 md:w-16 md:h-16 text-[#e4e8ef] dark:text-[#272b30] mx-auto mb-4" />
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-2">No notifications</h3>
            <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
