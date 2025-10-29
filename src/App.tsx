import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TenantSidebar from './components/TenantSidebar';
import TenantHeader from './components/TenantHeader';
import Dashboard from './pages/Dashboard';
import Properties from './pages/Properties';
import Tenants from './pages/Tenants';
import Payments from './pages/Payments';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import AddProperty from './pages/AddProperty';
import AddTenant from './pages/AddTenant';
import PropertyDetails from './pages/PropertyDetails';
import TenantDetails from './pages/TenantDetails';
import PaymentHistory from './pages/PaymentHistory';
import Notifications from './pages/Notifications';
import RecordPaymentModal from './components/RecordPaymentModal';
import TenantDashboard from './pages/TenantDashboard';
import TenantPayments from './pages/TenantPayments';
import MyLease from './pages/MyLease';
import MaintenanceRequests from './pages/MaintenanceRequests';
import LandlordMaintenanceRequests from './pages/LandlordMaintenanceRequests';
import LeaseManagement from './pages/LeaseManagement';
import TeamManagement from './pages/TeamManagement';
import TenantProfile from './pages/TenantProfile';
import LandingPage from './pages/LandingPage';

type UserRole = 'landlord' | 'tenant' | null;
type AuthPage = 'login' | 'register' | 'forgot-password';
type AppView = 'landing' | 'auth' | 'app';

// Mock property database - in a real app, this would come from an API/database
const mockProperties = [
  {
    id: 1,
    address: '123 Maple St',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
    propertyType: 'Apartment Building',
    description: 'Modern apartment building with secure parking, 24/7 security, elevator access, and nearby public transportation.',
    photos: ['https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800&h=400'],
    units: [
      {
        id: 1,
        unitNumber: 'Unit 4B',
        apartmentType: '2 Bedroom (1 Bathroom)',
        bedrooms: 2,
        bathrooms: 1,
        squareFootage: 950,
        monthlyRent: 1500,
        securityDeposit: 3000,
        isAvailable: false,
      },
      {
        id: 2,
        unitNumber: 'Unit 2A',
        apartmentType: 'Single Self-Contain (Private Bathroom)',
        bedrooms: 0,
        bathrooms: 1,
        squareFootage: 400,
        monthlyRent: 800,
        securityDeposit: 1600,
        isAvailable: false,
      },
      {
        id: 3,
        unitNumber: 'Unit 5C',
        apartmentType: '1 Bedroom Self-Contain (Chamber & Hall)',
        bedrooms: 1,
        bathrooms: 1,
        squareFootage: 750,
        monthlyRent: 1200,
        securityDeposit: 2400,
        isAvailable: false,
      },
      {
        id: 4,
        unitNumber: 'Unit 1A',
        apartmentType: '2 Bedroom (2 Bathrooms)',
        bedrooms: 2,
        bathrooms: 2,
        squareFootage: 1100,
        monthlyRent: 1800,
        securityDeposit: 3600,
        isAvailable: true,
      },
    ],
  },
];

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [showRecordPayment, setShowRecordPayment] = useState(false);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState<number | null>(null);
  const [previousPage, setPreviousPage] = useState<string>('dashboard');

  const handleLogin = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentView('app');
  };

  const handleRegister = (role: UserRole) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentView('app');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentPage('dashboard');
    setIsSidebarOpen(false);
    setCurrentView('landing');
  };

  const handleGetStarted = (role: UserRole) => {
    setUserRole(role);
    setAuthPage('register');
    setCurrentView('auth');
  };

  const handleSignIn = () => {
    setAuthPage('login');
    setCurrentView('auth');
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setAuthPage('login');
  };

  // Helper function to get property data by ID
  const getPropertyById = (id: number) => {
    return mockProperties.find(property => property.id === id);
  };

  const renderLandlordPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard 
          onRecordPayment={() => setShowRecordPayment(true)}
          onAddProperty={() => setCurrentPage('addProperty')}
          onAddTenant={() => setCurrentPage('addTenant')}
          onNavigateToLeaseManagement={() => setCurrentPage('lease-management')}
          onNavigate={(page) => setCurrentPage(page)}
        />;
      case 'properties':
        return (
          <Properties
            onAddProperty={() => setCurrentPage('addProperty')}
            onViewProperty={(id) => {
              setSelectedPropertyId(id);
              setCurrentPage('propertyDetails');
            }}
            onEditProperty={(id) => {
              setSelectedPropertyId(id);
              setCurrentPage('editProperty');
            }}
          />
        );
      case 'tenants':
        return (
          <Tenants 
            onAddTenant={() => setCurrentPage('addTenant')}
            onViewTenant={(tenantId) => {
              setSelectedTenantId(tenantId);
              setPreviousPage('tenants');
              setCurrentPage('tenantDetails');
            }}
          />
        );
      case 'payments':
        return <Payments onViewHistory={() => setCurrentPage('paymentHistory')} />;
      case 'lease-management':
        return <LeaseManagement />;
      case 'maintenance-requests':
        return <LandlordMaintenanceRequests />;
      case 'team-management':
        return <TeamManagement />;
      case 'settings':
        return <Settings />;
      case 'addProperty':
        return (
          <AddProperty
            onBack={() => setCurrentPage('properties')}
            onSave={() => setCurrentPage('properties')}
          />
        );
      case 'editProperty':
        const propertyToEdit = selectedPropertyId ? getPropertyById(selectedPropertyId) : undefined;
        return (
          <AddProperty
            initialData={propertyToEdit}
            isEditMode={true}
            onBack={() => setCurrentPage('properties')}
            onSave={() => setCurrentPage('properties')}
          />
        );
      case 'propertyDetails':
        return (
          <PropertyDetails
            propertyId={selectedPropertyId!}
            onBack={() => setCurrentPage('properties')}
            onEdit={() => {
              setCurrentPage('editProperty');
            }}
            onAssignTenant={(unitId) => {
              // Navigate to Add Tenant page
              // TODO: Pre-select property and unit based on unitId
              console.log('Assign tenant to unit:', unitId);
              setCurrentPage('addTenant');
            }}
            onViewTenant={(tenantId) => {
              setSelectedTenantId(tenantId);
              setPreviousPage('propertyDetails');
              setCurrentPage('tenantDetails');
            }}
          />
        );
      case 'tenantDetails':
        return (
          <TenantDetails
            tenantId={selectedTenantId!}
            onBack={() => setCurrentPage(previousPage)}
          />
        );
      case 'addTenant':
        return (
          <AddTenant
            onBack={() => setCurrentPage('tenants')}
            onSave={() => setCurrentPage('tenants')}
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

  const renderTenantPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TenantDashboard onNavigate={(page) => setCurrentPage(page)} />;
      case 'payments':
        return <TenantPayments />;
      case 'lease':
        return <MyLease />;
      case 'maintenance':
        return <MaintenanceRequests />;
      case 'profile':
        return <TenantProfile />;
      case 'settings':
        return <Settings />;
      case 'notifications':
        return <Notifications />;
      default:
        return <TenantDashboard onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  // Show landing page
  if (currentView === 'landing') {
    return (
      <LandingPage
        onGetStarted={handleGetStarted}
        onSignIn={handleSignIn}
      />
    );
  }

  // Authentication pages
  if (!isAuthenticated) {
    if (authPage === 'register') {
      return (
        <Register
          onRegister={handleRegister}
          onBackToLogin={() => setAuthPage('login')}
          onBackToLanding={handleBackToLanding}
        />
      );
    }
    
    if (authPage === 'forgot-password') {
      return (
        <ForgotPassword
          onBackToLogin={() => setAuthPage('login')}
          onBackToLanding={handleBackToLanding}
        />
      );
    }

    return (
      <Login
        onLogin={handleLogin}
        onRegister={() => setAuthPage('register')}
        onForgotPassword={() => setAuthPage('forgot-password')}
        onBackToLanding={handleBackToLanding}
      />
    );
  }

  // Landlord Portal
  if (userRole === 'landlord') {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 flex overflow-hidden">
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
          onLogout={handleLogout}
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onMenuClick={() => setIsSidebarOpen(true)}
            onNotificationClick={() => setCurrentPage('notifications')}
            onAddProperty={() => setCurrentPage('addProperty')}
            onAddTenant={() => setCurrentPage('addTenant')}
            onProfileClick={() => setCurrentPage('settings')}
          />

          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
              {renderLandlordPage()}
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

  // Tenant Portal
  return (
    <div className="h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50 flex overflow-hidden">
      <TenantSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        currentPage={currentPage}
        onNavigate={(page) => {
          setCurrentPage(page);
          setIsSidebarOpen(false);
        }}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <TenantHeader
          onMenuClick={() => setIsSidebarOpen(true)}
          onNotificationClick={() => setCurrentPage('notifications')}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {renderTenantPage()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
