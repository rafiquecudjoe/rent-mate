import { User, Bell, Lock, Globe, Moon, Mail, FileText, CheckCircle, Info, DollarSign, Home as HomeIcon, Eye, X } from 'lucide-react';
import { useState } from 'react';

type SettingsTab = 'profile' | 'security' | 'lease' | 'notifications' | 'preferences';

export default function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  const [leaseSettings, setLeaseSettings] = useState({
    landlordName: 'John Doe',
    landlordPhone: '(555) 123-4567',
    landlordEmail: 'john.doe@email.com',
    standardClauses: {
      quietHours: true,
      noSmoking: true,
      petsAllowed: false,
      landlordMaintainsExterior: true,
      tenantMaintainsInterior: true,
    },
    customClauses: ['', '', ''],
    financialPolicies: {
      lateFeePercent: '5',
      gracePeriodDays: '5',
      securityDepositMultiplier: '1',
      petDeposit: '500',
    },
    propertyRules: {
      pets: 'No pets allowed',
      smoking: 'No smoking anywhere on property',
      guests: 'Guests allowed with 24-hour notice',
      maintenance: 'Tenant responsible for minor repairs under $50',
    },
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleCustomClauseChange = (index: number, value: string) => {
    const newClauses = [...leaseSettings.customClauses];
    newClauses[index] = value;
    setLeaseSettings({ ...leaseSettings, customClauses: newClauses });
  };

  const handleSaveLeaseSettings = () => {
    alert('Lease settings saved successfully! These will be used to auto-generate all future leases.');
  };

  const tabs = [
    { id: 'profile' as SettingsTab, label: 'Profile', icon: User },
    { id: 'security' as SettingsTab, label: 'Security', icon: Lock },
    { id: 'lease' as SettingsTab, label: 'Lease Settings', icon: FileText },
    { id: 'notifications' as SettingsTab, label: 'Notifications', icon: Bell },
    { id: 'preferences' as SettingsTab, label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and lease preferences</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-t-2xl shadow-lg border border-gray-100 border-b-0">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content - Scrollable */}
      <div className="bg-white rounded-b-2xl shadow-lg border border-gray-100 flex-1 overflow-y-auto">
        <div className="p-6 max-w-4xl">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-50"
                />
                <div>
                  <button 
                    onClick={() => alert('Photo upload functionality would open here')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                  >
                    Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, PNG or GIF. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@email.com"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  defaultValue="(555) 123-4567"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => alert('Profile updated successfully!')}
                  className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => alert('Password updated successfully!')}
                  className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Lease Settings Tab */}
          {activeTab === 'lease' && (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">How Auto-Generation Works</h3>
                    <p className="text-sm text-blue-700">
                      Configure your lease terms once. When you send a lease, we auto-generate a professional PDF with these settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Landlord Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-3">Your Information</h3>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Landlord/Company Name</label>
                  <input
                    type="text"
                    value={leaseSettings.landlordName}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={leaseSettings.landlordPhone}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordPhone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={leaseSettings.landlordEmail}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordEmail: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Standard Clauses */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Standard Clauses</h3>
                <div className="space-y-2">
                  {[
                    { key: 'quietHours', label: 'Quiet Hours (10 PM - 8 AM)' },
                    { key: 'noSmoking', label: 'No Smoking Policy' },
                    { key: 'petsAllowed', label: 'Pets Allowed (with deposit)' },
                    { key: 'landlordMaintainsExterior', label: 'Landlord Maintains Exterior' },
                    { key: 'tenantMaintainsInterior', label: 'Tenant Maintains Interior' },
                  ].map((clause) => (
                    <div key={clause.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm text-gray-700">{clause.label}</span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={leaseSettings.standardClauses[clause.key as keyof typeof leaseSettings.standardClauses]}
                          onChange={(e) => setLeaseSettings({
                            ...leaseSettings,
                            standardClauses: {
                              ...leaseSettings.standardClauses,
                              [clause.key]: e.target.checked
                            }
                          })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Terms */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Custom Terms (Optional)</h3>
                <div className="space-y-3">
                  {leaseSettings.customClauses.map((clause, index) => (
                    <div key={index}>
                      <label className="block text-xs text-gray-600 mb-1">Custom Rule {index + 1}</label>
                      <textarea
                        value={clause}
                        onChange={(e) => handleCustomClauseChange(index, e.target.value)}
                        rows={2}
                        placeholder="e.g., No parties without 48-hour notice"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Policies */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Financial Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Late Fee (%)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.lateFeePercent}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, lateFeePercent: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Grace Period (Days)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.gracePeriodDays}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, gracePeriodDays: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Security Deposit (x Monthly Rent)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={leaseSettings.financialPolicies.securityDepositMultiplier}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, securityDepositMultiplier: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pet Deposit ($)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.petDeposit}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, petDeposit: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      disabled={!leaseSettings.standardClauses.petsAllowed}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
                >
                  <Eye className="w-5 h-5" />
                  Preview Lease
                </button>
                <button
                  onClick={handleSaveLeaseSettings}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Preview Modal */}
          {showPreview && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Lease Preview</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <div className="p-6">
                  <div className="bg-gray-50 rounded-xl p-6 font-serif">
                    <h1 className="text-2xl font-bold text-center mb-6">RESIDENTIAL LEASE AGREEMENT</h1>
                    <div className="space-y-4 text-sm">
                      <p><strong>Landlord:</strong> {leaseSettings.landlordName}</p>
                      <p><strong>Contact:</strong> {leaseSettings.landlordPhone} | {leaseSettings.landlordEmail}</p>
                      <div className="border-t pt-4">
                        <p className="font-semibold mb-2">Terms & Conditions:</p>
                        <ul className="list-disc pl-5 space-y-1">
                          {leaseSettings.standardClauses.quietHours && <li>Quiet hours: 10 PM - 8 AM</li>}
                          {leaseSettings.standardClauses.noSmoking && <li>No smoking policy enforced</li>}
                          {leaseSettings.standardClauses.petsAllowed && <li>Pets allowed with ${leaseSettings.financialPolicies.petDeposit} deposit</li>}
                          {leaseSettings.customClauses.filter(c => c).map((clause, i) => <li key={i}>{clause}</li>)}
                        </ul>
                      </div>
                      <div className="border-t pt-4">
                        <p className="font-semibold mb-2">Financial Terms:</p>
                        <p>• Late Fee: {leaseSettings.financialPolicies.lateFeePercent}% after {leaseSettings.financialPolicies.gracePeriodDays} day grace period</p>
                        <p>• Security Deposit: {leaseSettings.financialPolicies.securityDepositMultiplier}x monthly rent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-4">
              {[
                { label: 'Email Notifications', icon: Mail, checked: true },
                { label: 'Payment Reminders', icon: Bell, checked: true },
                { label: 'Lease Expiry Alerts', icon: Bell, checked: true },
                { label: 'Maintenance Updates', icon: Bell, checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>EST (UTC-5)</option>
                  <option>PST (UTC-8)</option>
                  <option>CST (UTC-6)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">Dark Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
