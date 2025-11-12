import { useState } from 'react';
import { AlertCircle, Clock, CheckCircle, Search, Filter, MessageSquare, Send, User } from 'lucide-react';

interface Comment {
  id: number;
  user: string;
  role: 'landlord' | 'tenant';
  message: string;
  date: string;
}

interface MaintenanceRequest {
  id: number;
  title: string;
  category: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  description: string;
  tenant: {
    name: string;
    unit: string;
    property: string;
  };
  comments: Comment[];
}

export default function LandlordMaintenanceRequests() {
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [newComment, setNewComment] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: 1,
      title: 'Leaking faucet in kitchen',
      category: 'Plumbing',
      status: 'in-progress',
      priority: 'medium',
      date: '2025-10-20',
      description: 'The kitchen sink faucet has been leaking constantly for the past two days.',
      tenant: {
        name: 'Sarah Johnson',
        unit: 'Unit 3B',
        property: '123 Maple St',
      },
      comments: [
        {
          id: 1,
          user: 'Sarah Johnson',
          role: 'tenant',
          message: 'The leak is getting worse. It\'s now dripping every few seconds.',
          date: '2025-10-21T10:30:00',
        },
        {
          id: 2,
          user: 'John Doe',
          role: 'landlord',
          message: 'I\'ve contacted our plumber. They will visit tomorrow at 2 PM.',
          date: '2025-10-22T09:15:00',
        },
      ],
    },
    {
      id: 2,
      title: 'AC not cooling properly',
      category: 'HVAC',
      status: 'completed',
      priority: 'high',
      date: '2025-10-15',
      description: 'Air conditioning unit is running but not cooling the apartment effectively.',
      tenant: {
        name: 'Mike Chen',
        unit: 'Unit 2A',
        property: '123 Maple St',
      },
      comments: [
        {
          id: 1,
          user: 'John Doe',
          role: 'landlord',
          message: 'HVAC technician scheduled for tomorrow morning.',
          date: '2025-10-16T08:00:00',
        },
        {
          id: 2,
          user: 'Mike Chen',
          role: 'tenant',
          message: 'Thank you! I\'ll be home in the morning.',
          date: '2025-10-16T08:30:00',
        },
        {
          id: 3,
          user: 'John Doe',
          role: 'landlord',
          message: 'Compressor replaced. Issue resolved. Please let me know if you have any other problems.',
          date: '2025-10-17T14:00:00',
        },
      ],
    },
    {
      id: 3,
      title: 'Broken window lock',
      category: 'Security',
      status: 'pending',
      priority: 'high',
      date: '2025-10-25',
      description: 'Window lock in bedroom is broken and won\'t secure properly.',
      tenant: {
        name: 'Emily Davis',
        unit: 'Unit 5C',
        property: '123 Maple St',
      },
      comments: [],
    },
    {
      id: 4,
      title: 'Garbage disposal not working',
      category: 'Appliances',
      status: 'pending',
      priority: 'low',
      date: '2025-10-26',
      description: 'The garbage disposal makes a humming sound but doesn\'t grind.',
      tenant: {
        name: 'Sarah Johnson',
        unit: 'Unit 3B',
        property: '123 Maple St',
      },
      comments: [],
    },
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRequest || !newComment.trim()) return;

    const updatedRequests = requests.map(req => {
      if (req.id === selectedRequest.id) {
        const newCommentObj: Comment = {
          id: req.comments.length + 1,
          user: 'John Doe',
          role: 'landlord',
          message: newComment,
          date: new Date().toISOString(),
        };
        return {
          ...req,
          comments: [...req.comments, newCommentObj],
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setSelectedRequest(updatedRequests.find(r => r.id === selectedRequest.id) || null);
    setNewComment('');
  };

  const handleStatusChange = (requestId: number, newStatus: 'pending' | 'in-progress' | 'completed') => {
    const updatedRequests = requests.map(req => 
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
    if (selectedRequest?.id === requestId) {
      setSelectedRequest(updatedRequests.find(r => r.id === requestId) || null);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesStatus = filterStatus === 'all' || req.status === filterStatus;
    const matchesSearch = req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          req.tenant.unit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef]">Maintenance Requests</h1>
        <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e] mt-1">View and manage all tenant maintenance requests</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#ffce73]/20 rounded-[8px] md:rounded-[10px] flex items-center justify-center">
              <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#ffce73]" />
            </div>
            <div>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">{requests.filter(r => r.status === 'pending').length}</p>
              <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#475be8]/20 dark:bg-[#6c7ce8]/20 rounded-[8px] md:rounded-[10px] flex items-center justify-center">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <div>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">{requests.filter(r => r.status === 'in-progress').length}</p>
              <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">In Progress</p>
            </div>
          </div>
        </div>

        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border border-[#e4e8ef] dark:border-[#272b30]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#7fba7a]/20 rounded-[8px] md:rounded-[10px] flex items-center justify-center">
              <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-[#7fba7a]" />
            </div>
            <div>
              <p className="text-[20px] md:text-[24px] font-bold text-[#11142d] dark:text-[#efefef]">{requests.filter(r => r.status === 'completed').length}</p>
              <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 border border-[#e4e8ef] dark:border-[#272b30] mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            <input
              type="text"
              placeholder="Search by title, tenant, or unit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 md:w-5 md:h-5 text-[#808191] dark:text-[#92939e]" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Requests Grid */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-8 text-center border border-[#e4e8ef] dark:border-[#272b30]">
              <AlertCircle className="w-10 h-10 md:w-12 md:h-12 text-[#808191] dark:text-[#92939e] mx-auto mb-3" />
              <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">No maintenance requests found</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className={`bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-5 border-2 cursor-pointer transition-all ${
                  selectedRequest?.id === request.id 
                    ? 'border-[#475be8] dark:border-[#6c7ce8] shadow-md' 
                    : 'border-[#e4e8ef] dark:border-[#272b30] hover:border-[#475be8] dark:hover:border-[#6c7ce8]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef]">{request.title}</h3>
                      <span className={`px-2 md:px-3 py-1 rounded-full text-[11px] md:text-[12px] font-semibold ${
                        request.priority === 'high' 
                          ? 'bg-[#f45252]/20 text-[#f45252]' 
                          : request.priority === 'medium'
                          ? 'bg-[#ffce73]/20 text-[#ffce73]'
                          : 'bg-[#808191]/20 text-[#808191] dark:text-[#92939e]'
                      }`}>
                        {request.priority}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mb-2">
                      <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="font-medium">{request.tenant.name}</span>
                      <span>•</span>
                      <span>{request.tenant.unit}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="px-2 py-0.5 bg-[#f4f4f4] dark:bg-[#111315] rounded-[6px]">{request.category}</span>
                    </div>
                  </div>
                  <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-[8px] md:rounded-[10px] text-[11px] md:text-[12px] font-semibold border ${
                    request.status === 'completed'
                      ? 'bg-[#7fba7a]/10 text-[#7fba7a] border-[#7fba7a]/30'
                      : request.status === 'in-progress'
                      ? 'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8] border-[#475be8]/30 dark:border-[#6c7ce8]/30'
                      : 'bg-[#ffce73]/10 text-[#ffce73] border-[#ffce73]/30'
                  }`}>
                    {request.status.replace('-', ' ')}
                  </span>
                </div>

                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] line-clamp-2 mb-3">{request.description}</p>

                <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>{request.comments.length} comment{request.comments.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Request Details */}
        <div className="lg:sticky lg:top-6 h-fit">
          {selectedRequest ? (
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] overflow-hidden">
              <div className="bg-gradient-to-r from-[#475be8] to-[#3d4fc7] dark:from-[#6c7ce8] dark:to-[#5d6dd7] p-4 md:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div className="flex-1">
                    <h2 className="text-[18px] md:text-[22px] font-bold mb-2">{selectedRequest.title}</h2>
                    <div className="flex items-center gap-2 text-[12px] md:text-[13px] text-white/90">
                      <User className="w-3.5 h-3.5 md:w-4 md:h-4" />
                      <span className="font-medium">{selectedRequest.tenant.name}</span>
                      <span>•</span>
                      <span>{selectedRequest.tenant.unit}</span>
                    </div>
                  </div>
                  <span className={`px-2 md:px-3 py-1 rounded-[8px] text-[11px] md:text-[12px] font-semibold ${
                    selectedRequest.priority === 'high' 
                      ? 'bg-[#f45252]/20 text-white border border-white/30' 
                      : selectedRequest.priority === 'medium'
                      ? 'bg-[#ffce73]/20 text-white border border-white/30'
                      : 'bg-white/20 text-white border border-white/30'
                  }`}>
                    {selectedRequest.priority}
                  </span>
                </div>

                <div className="flex items-center gap-3 md:gap-4 text-[12px] md:text-[13px] text-white/90">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {new Date(selectedRequest.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="px-2 py-1 bg-white/20 rounded-[6px]">{selectedRequest.category}</span>
                </div>
              </div>

              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* Status Update */}
                <div>
                  <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">Update Status</label>
                  <select
                    value={selectedRequest.status}
                    onChange={(e) => handleStatusChange(selectedRequest.id, e.target.value as any)}
                    className="w-full px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px]"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">Description</h3>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] bg-[#f4f4f4] dark:bg-[#111315] p-3 md:p-4 rounded-[8px] md:rounded-[10px]">{selectedRequest.description}</p>
                </div>

                {/* Comments */}
                <div>
                  <h3 className="text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">Comments ({selectedRequest.comments.length})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                    {selectedRequest.comments.length === 0 ? (
                      <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] text-center py-4">No comments yet</p>
                    ) : (
                      selectedRequest.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className={`p-3 md:p-4 rounded-[8px] md:rounded-[10px] ${
                            comment.role === 'landlord' 
                              ? 'bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 ml-2 md:ml-4' 
                              : 'bg-[#f4f4f4] dark:bg-[#111315] mr-2 md:mr-4'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-white text-[11px] md:text-[12px] font-semibold ${
                              comment.role === 'landlord' ? 'bg-[#475be8] dark:bg-[#6c7ce8]' : 'bg-[#7fba7a]'
                            }`}>
                              {comment.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                              <p className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">{comment.user}</p>
                              <p className="text-[10px] md:text-[11px] text-[#808191] dark:text-[#92939e]">
                                {new Date(comment.date).toLocaleString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  hour: 'numeric', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </div>
                            <span className={`text-[10px] md:text-[11px] px-2 py-1 rounded-[6px] ${
                              comment.role === 'landlord' 
                                ? 'bg-[#475be8]/20 dark:bg-[#6c7ce8]/20 text-[#475be8] dark:text-[#6c7ce8]' 
                                : 'bg-[#7fba7a]/20 text-[#7fba7a]'
                            }`}>
                              {comment.role}
                            </span>
                          </div>
                          <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{comment.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment} className="flex gap-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[12px] md:text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="px-3 md:px-4 py-2 md:py-2.5 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-8 md:p-12 text-center border border-[#e4e8ef] dark:border-[#272b30]">
              <MessageSquare className="w-12 h-12 md:w-16 md:h-16 text-[#808191] dark:text-[#92939e] mx-auto mb-4" />
              <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Select a request to view details and add comments</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
