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
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Settings</h1>
          <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Manage your account and lease preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-t-[10px] md:rounded-t-[15px] border border-[#e4e8ef] dark:border-[#272b30] border-b-0">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-4 font-semibold whitespace-nowrap border-b-2 transition-colors text-[13px] md:text-[14px] min-w-[140px] ${
                    activeTab === tab.id
                      ? 'border-[#475be8] dark:border-[#6c7ce8] text-[#475be8] dark:text-[#6c7ce8] bg-[#475be8]/5 dark:bg-[#6c7ce8]/5'
                      : 'border-transparent text-[#808191] dark:text-[#92939e] hover:text-[#11142d] dark:hover:text-[#efefef] hover:bg-[#f4f4f4] dark:hover:bg-[#111315]'
                  }`}
                >
                  <Icon className="w-4 h-4 md:w-5 md:h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content - Scrollable */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-b-[10px] md:rounded-b-[15px] border border-[#e4e8ef] dark:border-[#272b30] max-h-[calc(100vh-280px)] overflow-y-auto">
          <div className="p-4 md:p-6 max-w-4xl">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center gap-4">
                  <img
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150"
                    alt="Profile"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover ring-4 ring-[#475be8]/20 dark:ring-[#6c7ce8]/20"
                  />
                  <div>
                    <button 
                      onClick={() => alert('Photo upload functionality would open here')}
                      className="px-4 py-2 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all font-medium text-[12px] md:text-[13px]"
                    >
                      Change Photo
                    </button>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-2">JPG, PNG or GIF. Max size 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="John"
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Doe"
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="john.doe@email.com"
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>

                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="(555) 123-4567"
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => alert('Profile updated successfully!')}
                    className="px-6 py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all font-medium text-[13px] md:text-[14px]"
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
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => alert('Password updated successfully!')}
                    className="px-6 py-2.5 bg-[#f45252] text-white rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all font-medium text-[13px] md:text-[14px]"
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
              <div className="bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px] md:rounded-[12px] p-3 md:p-4 mb-4 md:mb-6">
                <div className="flex gap-2 md:gap-3">
                  <Info className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-1 text-[13px] md:text-[14px]">How Auto-Generation Works</h3>
                    <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                      Configure your lease terms once. When you send a lease, we auto-generate a professional PDF with these settings.
                    </p>
                  </div>
                </div>
              </div>

              {/* Landlord Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[14px] md:text-[16px]">Your Information</h3>
                </div>
                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Landlord/Company Name</label>
                  <input
                    type="text"
                    value={leaseSettings.landlordName}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>
                <div>
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    value={leaseSettings.landlordPhone}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordPhone: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={leaseSettings.landlordEmail}
                    onChange={(e) => setLeaseSettings({ ...leaseSettings, landlordEmail: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                  />
                </div>
              </div>

              {/* Standard Clauses */}
              <div>
                <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[14px] md:text-[16px]">Standard Clauses</h3>
                <div className="space-y-2">
                  {[
                    { key: 'quietHours', label: 'Quiet Hours (10 PM - 8 AM)' },
                    { key: 'noSmoking', label: 'No Smoking Policy' },
                    { key: 'petsAllowed', label: 'Pets Allowed (with deposit)' },
                    { key: 'landlordMaintainsExterior', label: 'Landlord Maintains Exterior' },
                    { key: 'tenantMaintainsInterior', label: 'Tenant Maintains Interior' },
                  ].map((clause) => (
                    <div key={clause.key} className="flex items-center justify-between p-3 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                      <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{clause.label}</span>
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
                        <div className="w-11 h-6 bg-[#e4e8ef] dark:bg-[#272b30] peer-focus:ring-4 peer-focus:ring-[#475be8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e8ef] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#475be8] dark:peer-checked:bg-[#6c7ce8]"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Terms */}
              <div>
                <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[14px] md:text-[16px]">Custom Terms (Optional)</h3>
                <div className="space-y-3">
                  {leaseSettings.customClauses.map((clause, index) => (
                    <div key={index}>
                      <label className="block text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Custom Rule {index + 1}</label>
                      <textarea
                        value={clause}
                        onChange={(e) => handleCustomClauseChange(index, e.target.value)}
                        rows={2}
                        placeholder="e.g., No parties without 48-hour notice"
                        className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[12px] md:text-[13px] resize-none focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Policies */}
              <div>
                <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-3 text-[14px] md:text-[16px]">Financial Policies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Late Fee (%)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.lateFeePercent}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, lateFeePercent: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Grace Period (Days)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.gracePeriodDays}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, gracePeriodDays: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Security Deposit (x Monthly Rent)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={leaseSettings.financialPolicies.securityDepositMultiplier}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, securityDepositMultiplier: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Pet Deposit ($)</label>
                    <input
                      type="number"
                      value={leaseSettings.financialPolicies.petDeposit}
                      onChange={(e) => setLeaseSettings({
                        ...leaseSettings,
                        financialPolicies: { ...leaseSettings.financialPolicies, petDeposit: e.target.value }
                      })}
                      className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                      disabled={!leaseSettings.standardClauses.petsAllowed}
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 md:py-3 border-2 border-[#475be8] dark:border-[#6c7ce8] text-[#475be8] dark:text-[#6c7ce8] rounded-[8px] md:rounded-[10px] hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 transition-colors font-semibold text-[13px] md:text-[14px]"
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5" />
                  Preview Lease
                </button>
                <button
                  onClick={handleSaveLeaseSettings}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all font-semibold text-[13px] md:text-[14px]"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* Preview Modal */}
          {showPreview && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
                  <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef]">Lease Preview</h2>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
                  >
                    <X className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
                  </button>
                </div>
                <div className="p-4 md:p-6">
                  <div className="bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] md:rounded-[12px] p-4 md:p-6 font-serif">
                    <h1 className="text-[18px] md:text-[24px] font-bold text-center mb-6 text-[#11142d] dark:text-[#efefef]">RESIDENTIAL LEASE AGREEMENT</h1>
                    <div className="space-y-4 text-[12px] md:text-[14px]">
                      <p className="text-[#11142d] dark:text-[#efefef]"><strong>Landlord:</strong> {leaseSettings.landlordName}</p>
                      <p className="text-[#11142d] dark:text-[#efefef]"><strong>Contact:</strong> {leaseSettings.landlordPhone} | {leaseSettings.landlordEmail}</p>
                      <div className="border-t border-[#e4e8ef] dark:border-[#272b30] pt-4">
                        <p className="font-semibold mb-2 text-[#11142d] dark:text-[#efefef]">Terms & Conditions:</p>
                        <ul className="list-disc pl-5 space-y-1 text-[#808191] dark:text-[#92939e]">
                          {leaseSettings.standardClauses.quietHours && <li>Quiet hours: 10 PM - 8 AM</li>}
                          {leaseSettings.standardClauses.noSmoking && <li>No smoking policy enforced</li>}
                          {leaseSettings.standardClauses.petsAllowed && <li>Pets allowed with ${leaseSettings.financialPolicies.petDeposit} deposit</li>}
                          {leaseSettings.customClauses.filter(c => c).map((clause, i) => <li key={i}>{clause}</li>)}
                        </ul>
                      </div>
                      <div className="border-t border-[#e4e8ef] dark:border-[#272b30] pt-4">
                        <p className="font-semibold mb-2 text-[#11142d] dark:text-[#efefef]">Financial Terms:</p>
                        <p className="text-[#808191] dark:text-[#92939e]">• Late Fee: {leaseSettings.financialPolicies.lateFeePercent}% after {leaseSettings.financialPolicies.gracePeriodDays} day grace period</p>
                        <p className="text-[#808191] dark:text-[#92939e]">• Security Deposit: {leaseSettings.financialPolicies.securityDepositMultiplier}x monthly rent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-3 md:space-y-4">
              {[
                { label: 'Email Notifications', icon: Mail, checked: true },
                { label: 'Payment Reminders', icon: Bell, checked: true },
                { label: 'Lease Expiry Alerts', icon: Bell, checked: true },
                { label: 'Maintenance Updates', icon: Bell, checked: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-[#808191] dark:text-[#92939e]" />
                    <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{item.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#e4e8ef] dark:bg-[#272b30] peer-focus:ring-4 peer-focus:ring-[#475be8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e8ef] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#475be8] dark:peer-checked:bg-[#6c7ce8]"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <div>
                <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Language</label>
                <select className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-2">Timezone</label>
                <select className="w-full px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]">
                  <option>EST (UTC-5)</option>
                  <option>PST (UTC-8)</option>
                  <option>CST (UTC-6)</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-3 md:p-4 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                <div className="flex items-center gap-3">
                  <Moon className="w-4 h-4 text-[#808191] dark:text-[#92939e]" />
                  <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">Dark Mode</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-[#e4e8ef] dark:bg-[#272b30] peer-focus:ring-4 peer-focus:ring-[#475be8]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#e4e8ef] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#475be8] dark:peer-checked:bg-[#6c7ce8]"></div>
                </label>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
