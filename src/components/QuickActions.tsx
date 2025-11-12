import { Plus, UserPlus, DollarSign } from 'lucide-react';

interface QuickActionsProps {
  onRecordPayment?: () => void;
  onAddProperty?: () => void;
  onAddTenant?: () => void;
}

export default function QuickActions({ onRecordPayment, onAddProperty, onAddTenant }: QuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onAddProperty}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transform hover:-translate-y-0.5 hidden md:flex"
      >
        <Plus className="w-4 h-4" />
        <span className="text-sm">Add Property</span>
      </button>
      <button
        onClick={onAddTenant}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transform hover:-translate-y-0.5 hidden md:flex"
      >
        <UserPlus className="w-4 h-4" />
        <span className="text-sm">New Tenant</span>
      </button>
      <button
        onClick={onRecordPayment}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-600/40 transform hover:-translate-y-0.5 hidden md:flex"
      >
        <DollarSign className="w-4 h-4" />
        <span className="text-sm">Record Payment</span>
      </button>
    </div>
  );
}
