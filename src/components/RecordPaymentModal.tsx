import { useState, useEffect } from 'react';
import { X, ChevronDown, Home, Building2 } from 'lucide-react';

interface RecordPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payment: PaymentData) => void;
}

export interface PaymentData {
  leaseId: string;
  tenantId: string;
  propertyId: string;
  unitId: string;
  amount: number;
  date: string;
  method: string;
  notes: string;
}

// Mock data - replace with actual API calls
const properties = [
  { id: '1', name: 'Sunset Apartments', address: '123 Maple St' },
  { id: '2', name: 'Oak View Complex', address: '789 Oak Ave' },
  { id: '3', name: 'Pine Lane Residences', address: '456 Pine Ln' },
];

const units = [
  { id: '1', propertyId: '1', unitNumber: '4B', monthlyRent: 1200, status: 'occupied' },
  { id: '2', propertyId: '1', unitNumber: '5A', monthlyRent: 1350, status: 'occupied' },
  { id: '3', propertyId: '2', unitNumber: 'Apt 2', monthlyRent: 950, status: 'occupied' },
  { id: '4', propertyId: '3', unitNumber: 'House', monthlyRent: 2200, status: 'occupied' },
];

const leases = [
  { id: '1', unitId: '1', tenantId: '1', monthlyRent: 1200, status: 'active', endDate: '2026-12-31' },
  { id: '2', unitId: '2', tenantId: '2', monthlyRent: 1350, status: 'active', endDate: '2026-06-30' },
  { id: '3', unitId: '3', tenantId: '3', monthlyRent: 950, status: 'expired', endDate: '2025-10-31' },
  { id: '4', unitId: '4', tenantId: '4', monthlyRent: 2200, status: 'active', endDate: '2025-12-15' },
  { id: '5', unitId: '1', tenantId: '5', monthlyRent: 1150, status: 'expired', endDate: '2025-10-25' },
];

const tenants = [
  { id: '1', name: 'Alice Johnson', email: 'alice@email.com' },
  { id: '2', name: 'Bob Williams', email: 'bob@email.com' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@email.com' },
  { id: '4', name: 'Diana Miller', email: 'diana@email.com' },
  { id: '5', name: 'Emma Davis', email: 'emma@email.com' },
];

export default function RecordPaymentModal({ isOpen, onClose, onSubmit }: RecordPaymentModalProps) {
  const [selectedProperty, setSelectedProperty] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [availableLeases, setAvailableLeases] = useState<any[]>([]);
  const [selectedLeaseId, setSelectedLeaseId] = useState('');
  const [selectedLease, setSelectedLease] = useState<any>(null);
  const [availableUnits, setAvailableUnits] = useState<any[]>([]);
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [showLeaseDropdown, setShowLeaseDropdown] = useState(false);
  
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);

  // Filter units when property changes
  useEffect(() => {
    if (selectedProperty) {
      const filtered = units.filter(u => u.propertyId === selectedProperty && u.status === 'occupied');
      setAvailableUnits(filtered);
      setSelectedUnit('');
      setAvailableLeases([]);
      setSelectedLeaseId('');
      setSelectedLease(null);
      setAmount('');
    } else {
      setAvailableUnits([]);
      setSelectedUnit('');
      setAvailableLeases([]);
      setSelectedLeaseId('');
      setSelectedLease(null);
    }
  }, [selectedProperty]);

  // Load available leases when unit is selected
  useEffect(() => {
    if (selectedUnit) {
      // Find all leases for this unit (active or recently expired within 30 days)
      const unitLeases = leases.filter(l => {
        if (l.unitId !== selectedUnit) return false;
        
        // Always include active leases
        if (l.status === 'active') return true;
        
        // For expired leases, only show if expired within last 30 days
        if (l.status === 'expired' && l.endDate) {
          const endDate = new Date(l.endDate);
          const today = new Date();
          const daysSinceExpiry = Math.floor((today.getTime() - endDate.getTime()) / (1000 * 60 * 60 * 24));
          return daysSinceExpiry <= 30;
        }
        
        return false;
      });
      
      setAvailableLeases(unitLeases);
      
      // If only one lease, auto-select it
      if (unitLeases.length === 1) {
        const lease = unitLeases[0];
        setSelectedLeaseId(lease.id);
        setSelectedLease(lease);
        setAmount(lease.monthlyRent.toFixed(2));
      } else {
        // Multiple leases, user needs to choose
        setSelectedLeaseId('');
        setSelectedLease(null);
        setAmount('');
      }
    } else {
      setAvailableLeases([]);
      setSelectedLeaseId('');
      setSelectedLease(null);
      setAmount('');
    }
  }, [selectedUnit]);

  const handleLeaseChange = (leaseId: string) => {
    setSelectedLeaseId(leaseId);
    const lease = availableLeases.find(l => l.id === leaseId);
    if (lease) {
      setSelectedLease(lease);
      setAmount(lease.monthlyRent.toFixed(2));
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLease) return;

    onSubmit({
      leaseId: selectedLease.id,
      tenantId: selectedLease.tenantId,
      propertyId: selectedProperty,
      unitId: selectedUnit,
      amount: parseFloat(amount),
      date,
      method: paymentMethod,
      notes,
    });
    
    // Reset form
    setSelectedProperty('');
    setSelectedUnit('');
    setSelectedLease(null);
    setAmount('');
    setPaymentMethod('');
    setNotes('');
    onClose();
  };

  const selectedPropertyData = properties.find(p => p.id === selectedProperty);
  const selectedUnitData = units.find(u => u.id === selectedUnit);
  const tenantData = selectedLease ? tenants.find(t => t.id === selectedLease.tenantId) : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Record Rent Payment</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8">
          <div className="space-y-6">
            {/* Property Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Property *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-gray-400" />
                    <span className={selectedProperty ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedProperty
                        ? selectedPropertyData?.name
                        : 'Select a property'}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {showPropertyDropdown && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {properties.map((property) => (
                      <button
                        key={property.id}
                        type="button"
                        onClick={() => {
                          setSelectedProperty(property.id);
                          setShowPropertyDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="font-medium text-gray-900">{property.name}</div>
                        <div className="text-sm text-gray-500">{property.address}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Unit Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Select Unit *
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => selectedProperty && setShowUnitDropdown(!showUnitDropdown)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!selectedProperty || availableUnits.length === 0}
                >
                  <div className="flex items-center gap-3">
                    <Home className="w-5 h-5 text-gray-400" />
                    <span className={selectedUnit ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedUnit
                        ? `Unit ${selectedUnitData?.unitNumber} - $${selectedUnitData?.monthlyRent}/mo`
                        : !selectedProperty
                        ? 'Select a property first'
                        : availableUnits.length > 0 
                          ? 'Select a unit' 
                          : 'No occupied units in this property'}
                    </span>
                  </div>
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>

                {showUnitDropdown && availableUnits.length > 0 && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                    {availableUnits.map((unit) => (
                      <button
                        key={unit.id}
                        type="button"
                        onClick={() => {
                          setSelectedUnit(unit.id);
                          setShowUnitDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-medium text-gray-900">Unit {unit.unitNumber}</div>
                          <div className="text-sm font-semibold text-blue-600">${unit.monthlyRent}/mo</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Lease Selection (shown when unit has multiple leases) */}
            {availableLeases.length > 1 && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select Lease *
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowLeaseDropdown(!showLeaseDropdown)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-left flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <span className={selectedLeaseId ? 'text-gray-900' : 'text-gray-500'}>
                      {selectedLeaseId
                        ? (() => {
                            const lease = availableLeases.find(l => l.id === selectedLeaseId);
                            const tenant = tenants.find(t => t.id === lease?.tenantId);
                            return `${tenant?.name} - ${lease?.status === 'active' ? 'Active' : 'Expired'} Lease`;
                          })()
                        : 'Select a lease'}
                    </span>
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </button>

                  {showLeaseDropdown && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-y-auto">
                      {availableLeases.map((lease) => {
                        const tenant = tenants.find(t => t.id === lease.tenantId);
                        const isExpired = lease.status === 'expired';
                        
                        return (
                          <button
                            key={lease.id}
                            type="button"
                            onClick={() => {
                              handleLeaseChange(lease.id);
                              setShowLeaseDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b last:border-b-0"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="font-medium text-gray-900">{tenant?.name}</div>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                                isExpired 
                                  ? 'bg-orange-100 text-orange-700' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {isExpired ? 'Expired' : 'Active'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              ${lease.monthlyRent}/mo
                              {isExpired && lease.endDate && (
                                <span className="ml-2 text-orange-600">
                                  • Ended: {new Date(lease.endDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
                {selectedLeaseId && selectedLease?.status === 'expired' && (
                  <p className="mt-2 text-sm text-orange-600 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Extension payment for expired lease
                  </p>
                )}
              </div>
            )}

            {/* Tenant Info (Auto-populated) */}
            {selectedLease && tenantData && (
              <div className={`p-5 rounded-xl border ${
                selectedLease.status === 'expired' 
                  ? 'bg-gradient-to-r from-orange-50 to-red-50 border-orange-200' 
                  : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
              }`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-700">Tenant Information</h3>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    selectedLease.status === 'expired'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {selectedLease.status === 'expired' ? 'Expired Lease' : 'Active Lease'}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tenant Name</p>
                    <p className="font-semibold text-gray-900">{tenantData.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Email</p>
                    <p className="font-medium text-gray-700">{tenantData.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Property</p>
                    <p className="font-medium text-gray-700">{selectedPropertyData?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Unit</p>
                    <p className="font-medium text-gray-700">Unit {selectedUnitData?.unitNumber}</p>
                  </div>
                  {selectedLease.status === 'expired' && selectedLease.endDate && (
                    <div className="col-span-1 md:col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Lease End Date</p>
                      <p className="font-medium text-orange-700">{new Date(selectedLease.endDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                {selectedLease.status === 'expired' && (
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <div className="flex items-start justify-between gap-4">
                      <p className="text-sm text-orange-700 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Recording payment for expired lease
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => alert('Opening renewal modal... (Feature coming soon!)')}
                          className="px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-lg hover:bg-green-700 transition-all flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Renew Lease
                        </button>
                        <button
                          type="button"
                          onClick={() => alert('Opening extension modal... (Feature coming soon!)')}
                          className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-all flex items-center gap-1"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Extend
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Amount */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Payment Amount ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Payment Date *
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Payment Method *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Cash', 'Check', 'Bank Transfer', 'Online'].map((method) => (
                  <label
                    key={method}
                    className={`relative flex items-center justify-center px-4 py-3 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method
                        ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="sr-only"
                      required
                    />
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                placeholder="Add any additional notes about this payment..."
              />
            </div>
          </div>

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
              disabled={!selectedLease}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
            >
              Submit Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
