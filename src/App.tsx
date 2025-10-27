import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AddProperty from './pages/AddProperty';
import PaymentHistory from './pages/PaymentHistory';
import Notifications from './pages/Notifications';
import RecordPaymentModal from './components/RecordPaymentModal';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRecordPayment, setShowRecordPayment] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onRecordPayment={() => setShowRecordPayment(true)} />;
      case 'properties':
        return <Properties />;
      case 'tenants':
        return <Tenants />;
      case 'payments':
        return <Payments onViewHistory={() => setCurrentPage('paymentHistory')} />;
      case 'settings':
        return <Settings />;
      case 'addProperty':
        return (
          <AddProperty
            onBack={() => setCurrentPage('properties')}
            onSave={() => setCurrentPage('properties')}
          />
        );
      case 'paymentHistory':
        return <PaymentHistory />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Dashboard onRecordPayment={() => setShowRecordPayment(true)} />;
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
        }}
        onAddProperty={() => {
          setCurrentPage('addProperty');
          setIsSidebarOpen(false);
        }}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onMenuClick={() => setIsSidebarOpen(true)}
          onNotificationClick={() => setCurrentPage('notifications')}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderPage()}
          </div>
        </main>
      </div>

      <RecordPaymentModal
        isOpen={showRecordPayment}
        onClose={() => setShowRecordPayment(false)}
        onSubmit={(payment) => {
          console.log('Payment recorded:', payment);
          setShowRecordPayment(false);
        }}
      />
    </div>
  );
}

export default App;
