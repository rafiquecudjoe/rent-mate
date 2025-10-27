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
  alert: 'bg-yellow-100 text-yellow-600',
  calendar: 'bg-yellow-100 text-yellow-600',
  success: 'bg-green-100 text-green-600',
  megaphone: 'bg-blue-100 text-blue-600',
};

export default function Notifications() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredNotifications = selectedCategory === 'All'
    ? notifications
    : notifications.filter(n => n.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Notifications</h1>
      </div>

      <div className="flex flex-wrap gap-2">
        {notificationCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${selectedCategory === category
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Check className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1"></div>
          <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {filteredNotifications.map((notification) => {
          const IconComponent = iconComponents[notification.icon];

          return (
            <div
              key={notification.id}
              className={`
                bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300
                ${notification.priority === 'high' ? 'bg-red-50 border-red-200' : ''}
              `}
            >
              <div className="flex gap-4">
                <div className={`p-3 rounded-xl ${iconColors[notification.icon]} flex-shrink-0 h-fit`}>
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{notification.title}</h3>
                    <span className="text-sm text-gray-500 whitespace-nowrap">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{notification.message}</p>

                  {notification.action && (
                    <button
                      className={`
                        px-4 py-2 rounded-lg font-medium transition-all
                        ${notification.action.variant === 'primary'
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/30'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
          <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No notifications</h3>
          <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
        </div>
      )}
    </div>
  );
}
