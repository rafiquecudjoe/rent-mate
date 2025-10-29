import StatsCards from '../components/StatsCards';
import PropertyStatus from '../components/PropertyStatus';
import IncomeOverview from '../components/IncomeOverview';
import LeasesTable from '../components/LeasesTable';
import RecentActivity from '../components/RecentActivity';
import QuickActions from '../components/QuickActions';

interface DashboardProps {
  onRecordPayment?: () => void;
  onAddProperty?: () => void;
  onAddTenant?: () => void;
  onNavigateToLeaseManagement?: () => void;
  onNavigate?: (page: string) => void;
}

export default function Dashboard({ onRecordPayment, onAddProperty, onAddTenant, onNavigateToLeaseManagement, onNavigate }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Welcome back, John!
          </h1>
          <p className="text-gray-600">Here's what's happening with your properties today.</p>
        </div>
        <QuickActions 
          onRecordPayment={onRecordPayment}
          onAddProperty={onAddProperty}
          onAddTenant={onAddTenant}
          onNavigateToLeaseManagement={onNavigateToLeaseManagement}
        />
      </div>

      <StatsCards onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <IncomeOverview />
          <LeasesTable onNavigateToTenants={() => onNavigate && onNavigate('tenants')} />
        </div>
        <div className="space-y-6">
          <PropertyStatus />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
