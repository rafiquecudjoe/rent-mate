import { useState } from 'react';
import { Plus, AlertCircle, Clock, CheckCircle, X, Image as ImageIcon, Send } from 'lucide-react';

interface Update {
  date: string;
  message: string;
  user: string;
}

interface MaintenanceRequest {
  id: number;
  title: string;
  category: string;
  status: string;
  priority: string;
  date: string;
  description: string;
  updates: Update[];
}

export default function MaintenanceRequests() {
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    images: [] as File[],
  });

  const [requests, setRequests] = useState<MaintenanceRequest[]>([
    {
      id: 1,
      title: 'Leaking faucet in kitchen',
      category: 'Plumbing',
      status: 'in-progress',
      priority: 'medium',
      date: '2025-10-20',
      description: 'The kitchen sink faucet has been leaking constantly for the past two days.',
      updates: [
        { date: '2025-10-21', message: 'Plumber assigned to your request', user: 'System' },
        { date: '2025-10-22', message: 'Scheduled for tomorrow at 2 PM', user: 'John Property Manager' },
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
      updates: [
        { date: '2025-10-16', message: 'Technician inspected the unit', user: 'HVAC Tech' },
        { date: '2025-10-17', message: 'Compressor replaced. Issue resolved.', user: 'HVAC Tech' },
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
      updates: [],
    },
  ]);

  const categories = ['Plumbing', 'Electrical', 'HVAC', 'Appliances', 'Security', 'Structural', 'Other'];

  const handleAddComment = (requestId: number) => {
    const comment = newComment[requestId]?.trim();
    if (!comment) return;

    const updatedRequests = requests.map(req => {
      if (req.id === requestId) {
        const newUpdate: Update = {
          date: new Date().toISOString().split('T')[0],
          message: comment,
          user: 'Sarah Johnson (Tenant)',
        };
        return {
          ...req,
          updates: [...req.updates, newUpdate],
        };
      }
      return req;
    });

    setRequests(updatedRequests);
    setNewComment({ ...newComment, [requestId]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New request:', formData);
    setShowNewRequest(false);
    setFormData({
      title: '',
      category: '',
      priority: 'medium',
      description: '',
      images: [],
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef]">Maintenance Requests</h1>
          <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e] mt-1">Submit and track your maintenance requests</p>
        </div>
        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#7fba7a] text-white font-semibold rounded-[8px] md:rounded-[10px] hover:bg-[#6fa968] transition-colors shadow-sm text-[13px] md:text-[14px]"
        >
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          <span>New Request</span>
        </button>
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

      {/* Requests List */}
      <div className="space-y-4 md:space-y-6">
        {requests.map((request) => (
          <div key={request.id} className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] p-4 md:p-6 border border-[#e4e8ef] dark:border-[#272b30]">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
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
                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    {new Date(request.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="px-2 py-1 bg-[#f4f4f4] dark:bg-[#111315] rounded-[6px] md:rounded-[8px]">{request.category}</span>
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

            <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e] mb-4">{request.description}</p>

            {/* Updates/Comments Section */}
            <div className="border-t border-[#e4e8ef] dark:border-[#272b30] pt-4">
              <p className="text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-3">Updates & Comments</p>
              
              {request.updates.length > 0 ? (
                <div className="space-y-3 mb-4">
                  {request.updates.map((update, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#475be8] dark:bg-[#6c7ce8] mt-2 flex-shrink-0" />
                      <div className="flex-1 bg-[#f4f4f4] dark:bg-[#111315] p-3 rounded-[8px] md:rounded-[10px]">
                        <p className="text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">{update.message}</p>
                        <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-1">
                          {update.user} • {new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mb-4">No updates yet</p>
              )}

              {/* Add Comment Form */}
              {request.status !== 'completed' && (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment(request.id);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={newComment[request.id] || ''}
                    onChange={(e) => setNewComment({ ...newComment, [request.id]: e.target.value })}
                    placeholder="Add a comment or update..."
                    className="flex-1 px-3 md:px-4 py-2 md:py-2.5 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a] text-[12px] md:text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                  />
                  <button
                    type="submit"
                    disabled={!newComment[request.id]?.trim()}
                    className="px-3 md:px-4 py-2 md:py-2.5 bg-[#7fba7a] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#6fa968] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-[12px] md:text-[13px]"
                  >
                    <Send className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    <span className="hidden sm:inline">Send</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
              <h2 className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">New Maintenance Request</h2>
              <button
                onClick={() => setShowNewRequest(false)}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Request Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief description of the issue"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a] text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                  required
                />
              </div>

              {/* Category and Priority */}
              <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                <div>
                  <label htmlFor="category" className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a] text-[13px]"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                    Priority *
                  </label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a] text-[13px]"
                    required
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#7fba7a] resize-none text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Photos (Optional)
                </label>
                <div className="border-2 border-dashed border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] md:rounded-[12px] p-4 md:p-6 text-center hover:border-[#7fba7a] transition-colors">
                  <input
                    type="file"
                    id="images"
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                    className="hidden"
                  />
                  <label htmlFor="images" className="cursor-pointer">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px] flex items-center justify-center mx-auto mb-3">
                      <ImageIcon className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
                    </div>
                    <p className="text-[13px] md:text-[14px] font-medium text-[#11142d] dark:text-[#efefef] mb-1">Click to upload photos</p>
                    <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">PNG, JPG up to 10MB</p>
                  </label>
                  {formData.images.length > 0 && (
                    <p className="mt-3 text-[12px] md:text-[13px] text-[#7fba7a]">{formData.images.length} file(s) selected</p>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-2 md:gap-3 pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                <button
                  type="button"
                  onClick={() => setShowNewRequest(false)}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] font-semibold rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors text-[13px] md:text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#7fba7a] text-white font-semibold rounded-[8px] md:rounded-[10px] hover:bg-[#6fa968] transition-colors shadow-sm text-[13px] md:text-[14px]"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
