import { Users, Plus, X, Mail, Shield, Edit, Trash2, CheckCircle, AlertCircle, Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'manager' | 'accountant' | 'maintenance';
  status: 'active' | 'pending' | 'inactive';
  joinDate: string;
  lastActive: string;
  photo: string;
  permissions: string[];
}

const rolePermissions = {
  admin: {
    name: 'Administrator',
    color: 'red',
    description: 'Full access to all features and settings',
    permissions: [
      'Manage all properties',
      'Add/remove tenants',
      'Process payments',
      'View financial reports',
      'Manage team members',
      'Configure settings',
      'Send lease agreements',
      'Handle maintenance requests',
    ],
  },
  manager: {
    name: 'Property Manager',
    color: 'blue',
    description: 'Manage properties, tenants, and day-to-day operations',
    permissions: [
      'Manage assigned properties',
      'Add/remove tenants',
      'Process payments',
      'View financial reports',
      'Send lease agreements',
      'Handle maintenance requests',
    ],
  },
  accountant: {
    name: 'Accountant',
    color: 'green',
    description: 'Handle financial operations and reporting',
    permissions: [
      'View all properties',
      'Process payments',
      'View financial reports',
      'Export reports',
      'Record expenses',
    ],
  },
  maintenance: {
    name: 'Maintenance Coordinator',
    color: 'orange',
    description: 'Handle maintenance requests and property upkeep',
    permissions: [
      'View assigned properties',
      'Handle maintenance requests',
      'Update maintenance status',
      'Contact tenants',
      'View property details',
    ],
  },
};

export default function TeamManagement() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'manager' as TeamMember['role'],
  });

  // Mock team members - in real app, this would come from API
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: 'Sarah Martinez',
      email: 'sarah.martinez@email.com',
      phone: '(555) 987-6543',
      role: 'manager',
      status: 'active',
      joinDate: 'Jan 15, 2024',
      lastActive: '2 hours ago',
      photo: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      permissions: rolePermissions.manager.permissions,
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      phone: '(555) 876-5432',
      role: 'accountant',
      status: 'active',
      joinDate: 'Feb 20, 2024',
      lastActive: '1 day ago',
      photo: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      permissions: rolePermissions.accountant.permissions,
    },
    {
      id: 3,
      name: 'James Wilson',
      email: 'james.wilson@email.com',
      phone: '(555) 765-4321',
      role: 'maintenance',
      status: 'active',
      joinDate: 'Mar 10, 2024',
      lastActive: '3 hours ago',
      photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      permissions: rolePermissions.maintenance.permissions,
    },
  ]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      ...formData,
      status: 'pending',
      joinDate: new Date().toLocaleDateString(),
      lastActive: 'Never',
      photo: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      permissions: rolePermissions[formData.role].permissions,
    };
    setTeamMembers([...teamMembers, newMember]);
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', role: 'manager' });
    alert(`Invitation sent to ${formData.email}`);
  };

  const handleDeleteMember = (id: number) => {
    if (confirm('Are you sure you want to remove this team member?')) {
      setTeamMembers(teamMembers.filter(member => member.id !== id));
    }
  };

  const handleEditMember = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
    });
    setShowEditModal(true);
  };

  const handleUpdateMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMember) {
      setTeamMembers(teamMembers.map(member =>
        member.id === selectedMember.id
          ? { ...member, ...formData, permissions: rolePermissions[formData.role].permissions }
          : member
      ));
      setShowEditModal(false);
      setSelectedMember(null);
      setFormData({ name: '', email: '', phone: '', role: 'manager' });
    }
  };

  const getRoleColor = (role: TeamMember['role']) => {
    const colors = {
      admin: 'bg-red-100 text-red-700 border-red-200',
      manager: 'bg-blue-100 text-blue-700 border-blue-200',
      accountant: 'bg-green-100 text-green-700 border-green-200',
      maintenance: 'bg-orange-100 text-orange-700 border-orange-200',
    };
    return colors[role];
  };

  const getStatusColor = (status: TeamMember['status']) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      inactive: 'bg-gray-100 text-gray-700',
    };
    return colors[status];
  };

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || member.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
        <div className="max-w-[1600px] mx-auto space-y-4 md:space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Team Management</h1>
              <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Add team members and assign roles to delegate tasks</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] hover:opacity-90 transition-all text-[13px] md:text-[14px] font-semibold"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              <span>Add Team Member</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] mb-1">Total Members</p>
                  <p className="text-[28px] md:text-[32px] font-bold text-[#11142d] dark:text-[#efefef]">{teamMembers.length}</p>
                </div>
                <div className="p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
              </div>
            </div>

            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] mb-1">Active</p>
                  <p className="text-[28px] md:text-[32px] font-bold text-[#7fba7a]">
                    {teamMembers.filter(m => m.status === 'active').length}
                  </p>
                </div>
                <div className="p-3 bg-[#7fba7a]/10 rounded-[8px] md:rounded-[10px]">
                  <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
                </div>
              </div>
            </div>

            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] mb-1">Pending</p>
                  <p className="text-[28px] md:text-[32px] font-bold text-[#ffce73]">
                    {teamMembers.filter(m => m.status === 'pending').length}
                  </p>
                </div>
                <div className="p-3 bg-[#ffce73]/10 rounded-[8px] md:rounded-[10px]">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[#ffce73]" />
                </div>
              </div>
            </div>

            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#808191] dark:text-[#92939e] text-[12px] md:text-[13px] mb-1">Roles</p>
                  <p className="text-[28px] md:text-[32px] font-bold text-[#475be8] dark:text-[#6c7ce8]">4</p>
                </div>
                <div className="p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#808191] dark:text-[#92939e] w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 md:pl-10 pr-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-4 py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                >
                  <option value="all">All Roles</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Property Manager</option>
                  <option value="accountant">Accountant</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredMembers.map((member) => (
              <div key={member.id} className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#e4e8ef] dark:border-[#272b30]"
                    />
                    <div className="flex-1">
                      <h3 className="text-[14px] md:text-[16px] font-bold text-[#11142d] dark:text-[#efefef] mb-1.5">{member.name}</h3>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[11px] md:text-[12px] font-semibold border ${getRoleColor(member.role)}`}>
                          {rolePermissions[member.role].name}
                        </span>
                        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-[11px] md:text-[12px] font-semibold ${getStatusColor(member.status)}`}>
                          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditMember(member)}
                      className="p-1.5 md:p-2 hover:bg-[#475be8]/10 dark:hover:bg-[#6c7ce8]/10 rounded-[6px] md:rounded-[8px] transition-colors"
                    >
                      <Edit className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#475be8] dark:text-[#6c7ce8]" />
                    </button>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="p-1.5 md:p-2 hover:bg-[#f45252]/10 rounded-[6px] md:rounded-[8px] transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#f45252]" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4 p-3 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                  <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                    <Mail className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                    <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                {/* Activity Info */}
                <div className="flex justify-between text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-4">
                  <span>Joined: {member.joinDate}</span>
                  <span>Last active: {member.lastActive}</span>
                </div>

                {/* Permissions */}
                <div>
                  <h4 className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">Permissions</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {member.permissions.slice(0, 3).map((permission, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8] rounded-[4px] text-[11px] md:text-[12px]"
                      >
                        {permission}
                      </span>
                    ))}
                    {member.permissions.length > 3 && (
                      <span className="px-2 py-0.5 bg-[#f4f4f4] dark:bg-[#111315] text-[#808191] dark:text-[#92939e] rounded-[4px] text-[11px] md:text-[12px]">
                        +{member.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Role Permissions Reference */}
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
              </div>
              <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef]">Available Roles & Permissions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {Object.entries(rolePermissions).map(([key, role]) => (
                <div key={key} className="border border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] md:rounded-[12px] p-4 md:p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 md:px-3 py-1 md:py-1.5 rounded-[8px] text-[12px] md:text-[13px] font-bold border ${getRoleColor(key as TeamMember['role'])}`}>
                      {role.name}
                    </span>
                  </div>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mb-3">{role.description}</p>
                  <div className="space-y-1.5">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#7fba7a] flex-shrink-0 mt-0.5" />
                        <span className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Users className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
                <div>
                  <h2 className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Add Team Member</h2>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Invite a new member to your team</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-4 md:p-6 space-y-4 md:space-y-5">
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@email.com"
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
                <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-1">An invitation will be sent to this email</p>
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">
                  Assign Role *
                </label>
                <div className="space-y-3">
                  {Object.entries(rolePermissions).map(([key, role]) => (
                    <label
                      key={key}
                      className={`flex items-start gap-3 p-3 md:p-4 border-2 rounded-[10px] md:rounded-[12px] cursor-pointer transition-all ${
                        formData.role === key
                          ? 'border-[#475be8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                          : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={key}
                        checked={formData.role === key}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamMember['role'] })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{role.name}</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[10px] md:text-[11px] font-semibold ${getRoleColor(key as TeamMember['role'])}`}>
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-3 md:p-4 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px] md:rounded-[12px]">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8] flex-shrink-0" />
                  <div className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">
                    <p className="font-semibold mb-1">What happens next?</p>
                    <ul className="space-y-1">
                      <li>• Member receives an email invitation</li>
                      <li>• They can set up their account and password</li>
                      <li>• Access is granted based on assigned role</li>
                      <li>• You can change their role anytime</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[13px] md:text-[14px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] md:rounded-[12px] hover:opacity-90 transition-all text-[13px] md:text-[14px] font-medium flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4 md:w-5 md:h-5" />
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Edit className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
                <div>
                  <h2 className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Edit Team Member</h2>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Update member details and role</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMember(null);
                }}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            <form onSubmit={handleUpdateMember} className="p-4 md:p-6 space-y-4 md:space-y-5">
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] text-[13px] md:text-[14px] focus:outline-none focus:ring-2 focus:ring-[#475be8]"
                />
              </div>

              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">
                  Assign Role *
                </label>
                <div className="space-y-3">
                  {Object.entries(rolePermissions).map(([key, role]) => (
                    <label
                      key={key}
                      className={`flex items-start gap-3 p-3 md:p-4 border-2 rounded-[10px] md:rounded-[12px] cursor-pointer transition-all ${
                        formData.role === key
                          ? 'border-[#475be8] bg-[#475be8]/10 dark:bg-[#6c7ce8]/10'
                          : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8]/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={key}
                        checked={formData.role === key}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value as TeamMember['role'] })}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[13px] md:text-[14px] text-[#11142d] dark:text-[#efefef]">{role.name}</span>
                          <span className={`px-2 py-0.5 rounded-[4px] text-[10px] md:text-[11px] font-semibold ${getRoleColor(key as TeamMember['role'])}`}>
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[10px] md:rounded-[12px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[13px] md:text-[14px] font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[10px] md:rounded-[12px] hover:opacity-90 transition-all text-[13px] md:text-[14px] font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  Update Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
