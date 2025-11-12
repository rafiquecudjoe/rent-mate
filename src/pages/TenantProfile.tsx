import { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Home, FileText, Edit2, Save, X } from 'lucide-react';

export default function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 234-5678',
    emergencyContact: {
      name: 'Michael Johnson',
      relationship: 'Brother',
      phone: '+1 (555) 876-5432',
    },
    moveInDate: '2024-05-01',
    leaseEndDate: '2026-04-30',
    property: 'Sunset Apartments',
    unit: 'Unit 3B',
    address: '123 Main Street, Apt 3B',
    city: 'Boston',
    state: 'MA',
    zipCode: '02101',
  });

  const [editedData, setEditedData] = useState(profileData);

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef]">My Profile</h1>
            <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mt-1">Manage your personal information</p>
          </div>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#7fba7a] text-white font-semibold text-[12px] md:text-[13px] rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all duration-200"
            >
              <Edit2 className="w-4 h-4 md:w-5 md:h-5" />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] font-semibold text-[12px] md:text-[13px] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#272b30] transition-all"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#7fba7a] text-white font-semibold text-[12px] md:text-[13px] rounded-[8px] md:rounded-[10px] hover:opacity-90 transition-all duration-200"
              >
                <Save className="w-4 h-4 md:w-5 md:h-5" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-r from-[#7fba7a] to-[#7fba7a]/90 rounded-[15px] md:rounded-[20px] p-6 md:p-8 text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-full flex items-center justify-center text-[#7fba7a] text-[28px] md:text-[32px] font-bold shadow-lg">
              {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-[22px] md:text-[28px] font-bold mb-2">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-white/90 text-[12px] md:text-[13px]">
                <span className="flex items-center gap-2">
                  <Home className="w-4 h-4 md:w-5 md:h-5" />
                  {profileData.property} - {profileData.unit}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                  Tenant since {new Date(profileData.moveInDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
          {/* Personal Information */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
              <User className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.firstName}
                      onChange={(e) => setEditedData({ ...editedData, firstName: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                    />
                  ) : (
                    <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedData.lastName}
                      onChange={(e) => setEditedData({ ...editedData, lastName: e.target.value })}
                      className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                    />
                  ) : (
                    <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedData.email}
                    onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                  />
                ) : (
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 inline mr-1" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.phone}
                    onChange={(e) => setEditedData({ ...editedData, phone: e.target.value })}
                    className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                  />
                ) : (
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-[#ffce73]" />
              Emergency Contact
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Contact Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.emergencyContact.name}
                    onChange={(e) => setEditedData({ 
                      ...editedData, 
                      emergencyContact: { ...editedData.emergencyContact, name: e.target.value }
                    })}
                    className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                  />
                ) : (
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.emergencyContact.name}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Relationship</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedData.emergencyContact.relationship}
                    onChange={(e) => setEditedData({ 
                      ...editedData, 
                      emergencyContact: { ...editedData.emergencyContact, relationship: e.target.value }
                    })}
                    className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                  />
                ) : (
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.emergencyContact.relationship}</p>
                )}
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedData.emergencyContact.phone}
                    onChange={(e) => setEditedData({ 
                      ...editedData, 
                      emergencyContact: { ...editedData.emergencyContact, phone: e.target.value }
                    })}
                    className="w-full px-3 md:px-4 py-2 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] text-[12px] md:text-[13px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a]"
                  />
                ) : (
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.emergencyContact.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Residence Information */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
              Residence Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Property</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.property}</p>
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Unit</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.unit}</p>
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Address</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.address}</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">City</label>
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.city}</p>
                </div>
                <div>
                  <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">State</label>
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.state}</p>
                </div>
                <div>
                  <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">ZIP</label>
                  <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">{profileData.zipCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lease Information */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-4 md:mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#7c5dfa]" />
              Lease Information
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Move-in Date</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">
                  {new Date(profileData.moveInDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Lease End Date</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">
                  {new Date(profileData.leaseEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>

              <div>
                <label className="block text-[12px] md:text-[13px] font-semibold text-[#808191] dark:text-[#92939e] mb-2">Days Remaining</label>
                <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef] bg-[#f4f4f4] dark:bg-[#111315] px-3 md:px-4 py-2 rounded-[8px]">
                  {Math.ceil((new Date(profileData.leaseEndDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                </p>
              </div>

              <div className="bg-[#475be8]/5 border border-[#475be8]/20 rounded-[8px] md:rounded-[10px] p-3 md:p-4 mt-4">
                <p className="text-[11px] md:text-[12px] text-[#11142d] dark:text-[#efefef]">
                  <strong>Note:</strong> Contact your property manager if you need to discuss lease renewal or have any questions about your tenancy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-br from-[#11142d] to-[#11142d]/90 dark:from-[#1a1d1f] dark:to-[#1a1d1f]/90 rounded-[10px] md:rounded-[15px] p-4 md:p-6 text-white border border-[#272b30]">
          <h3 className="text-[14px] md:text-[16px] font-bold mb-2">Need to update your information?</h3>
          <p className="text-white/70 text-[12px] md:text-[13px]">
            Some information like your property address and lease dates can only be updated by your property manager. 
            If you need to make changes to these details, please contact them directly.
          </p>
        </div>
      </div>
    </div>
  );
}
