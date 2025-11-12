import { useState, useEffect } from 'react';
import { X, RefreshCw, Clock, DollarSign } from 'lucide-react';

interface LeaseRenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RenewalData) => void;
  onSendLease?: () => void; // Callback to open send lease modal
  tenant: {
    id: string;
    name: string;
    email: string;
  };
  currentLease: {
    id: string;
    propertyName: string;
    unitNumber: string;
    monthlyRent: number;
    startDate: string;
    endDate: string;
  };
}

export interface RenewalData {
  type: 'renewal' | 'extension';
  leaseId: string;
  tenantId: string;
  newEndDate: string;
  newMonthlyRent: number;
  securityDepositAdjustment?: number;
  extensionType?: 'grace' | 'month-to-month' | 'short-term';
  reason?: string;
  notes: string;
}

export default function LeaseRenewalModal({ isOpen, onClose, onSubmit, onSendLease, tenant, currentLease }: LeaseRenewalModalProps) {
  const [activeTab, setActiveTab] = useState<'renewal' | 'extension'>('renewal');
  const [selectedTemplate, setSelectedTemplate] = useState<'same' | 'standard' | 'custom' | null>(null);
  const [formData, setFormData] = useState({
    duration: '12',
    customEndDate: '',
    newMonthlyRent: currentLease.monthlyRent.toString(),
    securityDepositAdjustment: '0',
    extensionType: 'grace' as 'grace' | 'month-to-month' | 'short-term',
    extensionDuration: '7',
    extensionEndDate: '',
    reason: '',
    notes: ''
  });

  // Reset selected template when switching tabs
  useEffect(() => {
    setSelectedTemplate(null);
  }, [activeTab]);

  if (!isOpen) return null;

  const calculateEndDate = (months: number) => {
    const currentEnd = new Date(currentLease.endDate);
    currentEnd.setMonth(currentEnd.getMonth() + months);
    return currentEnd.toISOString().split('T')[0];
  };

  const calculateRentIncrease = (percentage: number) => {
    return (currentLease.monthlyRent * (1 + percentage / 100)).toFixed(2);
  };

  const applyTemplate = (template: 'same' | 'standard' | 'custom') => {
    setSelectedTemplate(template);
    if (template === 'same') {
      setFormData({
        ...formData,
        duration: '12',
        newMonthlyRent: currentLease.monthlyRent.toString(),
        customEndDate: ''
      });
    } else if (template === 'standard') {
      setFormData({
        ...formData,
        duration: '12',
        newMonthlyRent: calculateRentIncrease(5),
        customEndDate: ''
      });
    } else if (template === 'custom') {
      setFormData({
        ...formData,
        duration: 'custom',
        customEndDate: calculateEndDate(12)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newEndDate = activeTab === 'renewal'
      ? (formData.duration === 'custom' ? formData.customEndDate : calculateEndDate(parseInt(formData.duration)))
      : formData.extensionEndDate;

    onSubmit({
      type: activeTab,
      leaseId: currentLease.id,
      tenantId: tenant.id,
      newEndDate,
      newMonthlyRent: parseFloat(formData.newMonthlyRent),
      securityDepositAdjustment: parseFloat(formData.securityDepositAdjustment) || undefined,
      extensionType: activeTab === 'extension' ? formData.extensionType : undefined,
      reason: formData.reason || undefined,
      notes: formData.notes
    });

    onClose();
    
    // For renewals, automatically open the send lease modal
    if (activeTab === 'renewal' && onSendLease) {
      // Small delay to allow the modal close animation to complete
      setTimeout(() => {
        onSendLease();
      }, 300);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Lease Management</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          {/* Current Lease Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current Lease Information</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-600 mb-1">Tenant</p>
                <p className="font-semibold text-gray-900">{tenant.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Property</p>
                <p className="font-medium text-gray-700">{currentLease.propertyName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Unit</p>
                <p className="font-medium text-gray-700">{currentLease.unitNumber}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Current Rent</p>
                <p className="font-bold text-green-600">${currentLease.monthlyRent}/mo</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-gray-600 mb-1">Current Lease End</p>
                <p className="font-medium text-gray-700">{new Date(currentLease.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              type="button"
              onClick={() => setActiveTab('renewal')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === 'renewal'
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <RefreshCw className="w-5 h-5" />
              Renew Lease
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('extension')}
              className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${
                activeTab === 'extension'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Clock className="w-5 h-5" />
              Extend Temporarily
            </button>
          </div>

          {/* Renewal Tab */}
          {activeTab === 'renewal' && (
            <div className="space-y-6">
              {/* Quick Templates */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quick Templates
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => applyTemplate('same')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      selectedTemplate === 'same'
                        ? 'border-blue-600 bg-blue-100 ring-2 ring-blue-200'
                        : 'border-blue-500 bg-blue-50 hover:bg-blue-100'
                    }`}
                  >
                    <h4 className="font-bold text-blue-900 mb-1">Same Terms</h4>
                    <p className="text-sm text-blue-700">12 months</p>
                    <p className="text-lg font-bold text-blue-900 mt-2">${currentLease.monthlyRent}/mo</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyTemplate('standard')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      selectedTemplate === 'standard'
                        ? 'border-green-600 bg-green-100 ring-2 ring-green-200'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">+5% Increase</h4>
                    <p className="text-sm text-gray-700">12 months</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">${calculateRentIncrease(5)}/mo</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyTemplate('custom')}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      selectedTemplate === 'custom'
                        ? 'border-purple-600 bg-purple-100 ring-2 ring-purple-200'
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    <h4 className="font-bold text-gray-900 mb-1">Custom</h4>
                    <p className="text-sm text-gray-700">Set your own</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">Configure →</p>
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Lease Duration
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {['6', '12', '18', '24', 'custom'].map((dur) => (
                    <label
                      key={dur}
                      className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.duration === dur
                          ? 'border-green-600 bg-green-50 text-green-700 font-semibold'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="duration"
                        value={dur}
                        checked={formData.duration === dur}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        className="sr-only"
                      />
                      <span>{dur === 'custom' ? 'Custom' : `${dur} mo`}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom End Date */}
              {formData.duration === 'custom' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Custom End Date
                  </label>
                  <input
                    type="date"
                    value={formData.customEndDate}
                    onChange={(e) => setFormData({ ...formData, customEndDate: e.target.value })}
                    min={currentLease.endDate}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    required
                  />
                </div>
              )}

              {/* New Rent */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  New Monthly Rent ($)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    step="0.01"
                    value={formData.newMonthlyRent}
                    onChange={(e) => setFormData({ ...formData, newMonthlyRent: e.target.value })}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, newMonthlyRent: calculateRentIncrease(3) })}
                    className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    +3%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, newMonthlyRent: calculateRentIncrease(5) })}
                    className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    +5%
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, newMonthlyRent: calculateRentIncrease(10) })}
                    className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all font-medium"
                  >
                    +10%
                  </button>
                </div>
              </div>

              {/* Security Deposit Adjustment */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Security Deposit Adjustment (Optional)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.securityDepositAdjustment}
                  onChange={(e) => setFormData({ ...formData, securityDepositAdjustment: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
                  placeholder="0.00 (Leave 0 for no change)"
                />
              </div>
            </div>
          )}

          {/* Extension Tab */}
          {activeTab === 'extension' && (
            <div className="space-y-6">
              {/* Extension Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Extension Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.extensionType === 'grace'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="extensionType"
                      value="grace"
                      checked={formData.extensionType === 'grace'}
                      onChange={(e) => setFormData({ ...formData, extensionType: e.target.value as any })}
                      className="sr-only"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">Grace Period</h4>
                    <p className="text-sm text-gray-600">No extra charge</p>
                  </label>

                  <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.extensionType === 'month-to-month'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="extensionType"
                      value="month-to-month"
                      checked={formData.extensionType === 'month-to-month'}
                      onChange={(e) => setFormData({ ...formData, extensionType: e.target.value as any })}
                      className="sr-only"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">Month-to-Month</h4>
                    <p className="text-sm text-gray-600">+10% rent</p>
                  </label>

                  <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.extensionType === 'short-term'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}>
                    <input
                      type="radio"
                      name="extensionType"
                      value="short-term"
                      checked={formData.extensionType === 'short-term'}
                      onChange={(e) => setFormData({ ...formData, extensionType: e.target.value as any })}
                      className="sr-only"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">Short-term</h4>
                    <p className="text-sm text-gray-600">1-4 weeks, prorated</p>
                  </label>
                </div>
              </div>

              {/* Extension Duration */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Extension Duration (Days)
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {['7', '14', '30', '60', '90'].map((days) => (
                    <label
                      key={days}
                      className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.extensionDuration === days
                          ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="extensionDuration"
                        value={days}
                        checked={formData.extensionDuration === days}
                        onChange={(e) => setFormData({ ...formData, extensionDuration: e.target.value })}
                        className="sr-only"
                      />
                      <span>{days} days</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Extension End Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Extension End Date
                </label>
                <input
                  type="date"
                  value={formData.extensionEndDate}
                  onChange={(e) => setFormData({ ...formData, extensionEndDate: e.target.value })}
                  min={currentLease.endDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Reason for Extension
                </label>
                <select
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <option value="">Select a reason</option>
                  <option value="moving-out">Tenant moving out soon</option>
                  <option value="waiting-property">Waiting on new property</option>
                  <option value="late-payment">Late payment grace period</option>
                  <option value="transition">Transition period</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Adjusted Rent Display */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Adjusted Rent (if applicable)</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ${formData.extensionType === 'month-to-month' 
                        ? (currentLease.monthlyRent * 1.1).toFixed(2)
                        : currentLease.monthlyRent.toFixed(2)}/mo
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>
          )}

          {/* Notes (Common) */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
              placeholder="Add any additional notes about this lease renewal/extension..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-8 py-3 font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${
                activeTab === 'renewal'
                  ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-600/30'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'
              }`}
            >
              {activeTab === 'renewal' ? 'Renew & Send Lease' : 'Create Extension'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
