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
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Team Management</h1>
            <p className="text-gray-600">Add team members and assign roles to delegate tasks</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            <span className="font-semibold">Add Team Member</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Members</p>
                <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Active</p>
                <p className="text-3xl font-bold text-green-600">
                  {teamMembers.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {teamMembers.filter(m => m.status === 'pending').length}
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Roles</p>
                <p className="text-3xl font-bold text-purple-600">4</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-16 h-16 rounded-full border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRoleColor(member.role)}`}>
                        {rolePermissions[member.role].name}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{member.phone}</span>
                </div>
              </div>

              {/* Activity Info */}
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>Joined: {member.joinDate}</span>
                <span>Last active: {member.lastActive}</span>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Permissions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {member.permissions.slice(0, 3).map((permission, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                    >
                      {permission}
                    </span>
                  ))}
                  {member.permissions.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      +{member.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Role Permissions Reference */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Available Roles & Permissions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(rolePermissions).map(([key, role]) => (
              <div key={key} className="border border-gray-200 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${getRoleColor(key as TeamMember['role'])}`}>
                    {role.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                <div className="space-y-1.5">
                  {role.permissions.map((permission, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Add Team Member</h2>
                  <p className="text-sm text-gray-600">Invite a new member to your team</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john.doe@email.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">An invitation will be sent to this email</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Assign Role *
                </label>
                <div className="space-y-3">
                  {Object.entries(rolePermissions).map(([key, role]) => (
                    <label
                      key={key}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.role === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
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
                          <span className="font-semibold text-gray-900">{role.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRoleColor(key as TeamMember['role'])}`}>
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
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

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Edit className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Edit Team Member</h2>
                  <p className="text-sm text-gray-600">Update member details and role</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedMember(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleUpdateMember} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Assign Role *
                </label>
                <div className="space-y-3">
                  {Object.entries(rolePermissions).map(([key, role]) => (
                    <label
                      key={key}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.role === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
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
                          <span className="font-semibold text-gray-900">{role.name}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${getRoleColor(key as TeamMember['role'])}`}>
                            {role.permissions.length} permissions
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{role.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedMember(null);
                  }}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
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
