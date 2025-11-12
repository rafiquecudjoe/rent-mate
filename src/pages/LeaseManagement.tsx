import { FileText, Upload, Download, Edit, Trash2, Eye, Plus, X, CheckCircle, AlertCircle, Calendar } from 'lucide-react';
import { useState } from 'react';

interface LeaseTemplate {
  id: number;
  name: string;
  description: string;
  uploadDate: string;
  lastModified: string;
  fileSize: string;
  usageCount: number;
}

export default function LeaseManagement() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<LeaseTemplate | null>(null);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    file: null as File | null,
  });

  // Mock lease templates - in real app, this would come from API
  const [leaseTemplates, setLeaseTemplates] = useState<LeaseTemplate[]>([
    {
      id: 1,
      name: 'Standard Residential Lease',
      description: 'Standard lease agreement for residential properties',
      uploadDate: '2024-08-15',
      lastModified: '2024-09-20',
      fileSize: '245 KB',
      usageCount: 23,
    },
    {
      id: 2,
      name: 'Month-to-Month Agreement',
      description: 'Flexible month-to-month rental agreement',
      uploadDate: '2024-07-10',
      lastModified: '2024-08-05',
      fileSize: '198 KB',
      usageCount: 12,
    },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadForm({ ...uploadForm, file: e.target.files[0] });
    }
  };

  const handleUploadTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.file || !uploadForm.name) {
      alert('Please provide a template name and upload a file');
      return;
    }

    // In real app, this would upload to server
    const newTemplate: LeaseTemplate = {
      id: leaseTemplates.length + 1,
      name: uploadForm.name,
      description: uploadForm.description,
      uploadDate: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      fileSize: `${Math.round(uploadForm.file.size / 1024)} KB`,
      usageCount: 0,
    };

    setLeaseTemplates([...leaseTemplates, newTemplate]);
    setShowUploadModal(false);
    setUploadForm({ name: '', description: '', file: null });
    alert('Lease template uploaded successfully!');
  };

  const handleDeleteTemplate = (id: number) => {
    if (confirm('Are you sure you want to delete this lease template?')) {
      setLeaseTemplates(leaseTemplates.filter(template => template.id !== id));
    }
  };

  const handlePreview = (template: LeaseTemplate) => {
    setSelectedTemplate(template);
    setShowPreviewModal(true);
  };

  // Available merge fields that will be auto-populated
  const mergeFields = [
    { field: '{{TENANT_NAME}}', description: 'Tenant full name' },
    { field: '{{TENANT_EMAIL}}', description: 'Tenant email address' },
    { field: '{{TENANT_PHONE}}', description: 'Tenant phone number' },
    { field: '{{PROPERTY_ADDRESS}}', description: 'Full property address' },
    { field: '{{UNIT_NUMBER}}', description: 'Unit or apartment number' },
    { field: '{{MONTHLY_RENT}}', description: 'Monthly rent amount' },
    { field: '{{SECURITY_DEPOSIT}}', description: 'Security deposit amount' },
    { field: '{{LEASE_START_DATE}}', description: 'Lease start date' },
    { field: '{{LEASE_END_DATE}}', description: 'Lease end date' },
    { field: '{{LEASE_TERM}}', description: 'Lease term (e.g., 12 months)' },
    { field: '{{LANDLORD_NAME}}', description: 'Landlord/Owner name' },
    { field: '{{LANDLORD_PHONE}}', description: 'Landlord contact phone' },
    { field: '{{LANDLORD_EMAIL}}', description: 'Landlord contact email' },
    { field: '{{CURRENT_DATE}}', description: 'Current date' },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#f4f4f4] dark:bg-[#111315] p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 md:mb-6">
          <div>
            <h1 className="text-[22px] md:text-[25px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">Lease Management</h1>
            <p className="text-[13px] md:text-[14px] text-[#808191] dark:text-[#92939e]">Manage and customize lease agreement templates</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors shadow-sm font-semibold text-[13px] md:text-[14px]"
          >
            <Plus className="w-4 h-4 md:w-5 md:h-5" />
            <span>Upload Template</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px] md:rounded-[15px] p-4 mb-4 md:mb-6">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-1 text-[14px] md:text-[15px]">How Lease Templates Work</h3>
              <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                Upload your lease agreement template with merge fields (like <code className="bg-[#475be8]/20 dark:bg-[#6c7ce8]/20 px-1 rounded text-[#475be8] dark:text-[#6c7ce8]">{'{{TENANT_NAME}}'}</code>). 
                When you send a lease to a tenant, we'll automatically replace these fields with their actual information.
              </p>
            </div>
          </div>
        </div>

        {/* When to Send Banner */}
        <div className="bg-gradient-to-r from-[#475be8]/10 to-[#7fba7a]/10 dark:from-[#6c7ce8]/10 dark:to-[#7fba7a]/10 border border-[#475be8]/30 dark:border-[#6c7ce8]/30 rounded-[10px] md:rounded-[15px] p-4 mb-4 md:mb-6">
          <div className="flex gap-3">
            <Calendar className="w-5 h-5 text-[#475be8] dark:text-[#6c7ce8] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-2 text-[14px] md:text-[15px]">When to Send Lease Agreements</h3>
              <div className="grid md:grid-cols-2 gap-2 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#7fba7a] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-[#11142d] dark:text-[#efefef]">During Onboarding</strong> - Primary time (before move-in)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#7fba7a] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-[#11142d] dark:text-[#efefef]">Lease Renewal</strong> - 60-90 days before expiration</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#7fba7a] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-[#11142d] dark:text-[#efefef]">Manual Resend</strong> - From Tenants page anytime</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#7fba7a] flex-shrink-0 mt-0.5" />
                  <span><strong className="text-[#11142d] dark:text-[#efefef]">Amendments</strong> - When terms change mid-lease</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lease Templates Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
          {leaseTemplates.map((template) => (
            <div key={template.id} className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 md:p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[16px] md:text-[18px] font-bold text-[#11142d] dark:text-[#efefef] mb-1">{template.name}</h3>
                    <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">{template.description}</p>
                  </div>
                </div>
              </div>

              {/* Template Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4 mb-4 p-3 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                <div>
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">File Size</p>
                  <p className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">{template.fileSize}</p>
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Last Modified</p>
                  <p className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">
                    {new Date(template.lastModified).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mb-1">Times Used</p>
                  <p className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef]">{template.usageCount}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handlePreview(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 text-[#475be8] dark:text-[#6c7ce8] rounded-[8px] md:rounded-[10px] hover:bg-[#475be8]/20 dark:hover:bg-[#6c7ce8]/20 transition-colors font-medium text-[12px] md:text-[13px]"
                >
                  <Eye className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => {
                    alert(`Downloading ${template.name}...`);
                    console.log('Download template:', template);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 bg-[#7fba7a]/10 text-[#7fba7a] rounded-[8px] md:rounded-[10px] hover:bg-[#7fba7a]/20 transition-colors font-medium text-[12px] md:text-[13px]"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  Download
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="px-3 md:px-4 py-2 bg-[#f45252]/10 text-[#f45252] rounded-[8px] md:rounded-[10px] hover:bg-[#f45252]/20 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Merge Fields Reference */}
        <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[10px] md:rounded-[15px] border border-[#e4e8ef] dark:border-[#272b30] p-4 md:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
              <Edit className="w-4 h-4 md:w-5 md:h-5 text-[#475be8] dark:text-[#6c7ce8]" />
            </div>
            <h2 className="text-[18px] md:text-[20px] font-bold text-[#11142d] dark:text-[#efefef]">Available Merge Fields</h2>
          </div>
          <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e] mb-4">
            Use these merge fields in your lease template. They will be automatically replaced with actual tenant and property data when you send the lease.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
            {mergeFields.map((field, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-[#f4f4f4] dark:bg-[#111315] rounded-[8px] md:rounded-[10px]">
                <code className="px-2 py-1 bg-[#475be8]/20 dark:bg-[#6c7ce8]/20 text-[#475be8] dark:text-[#6c7ce8] rounded-[6px] text-[11px] md:text-[12px] font-mono">
                  {field.field}
                </code>
                <span className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">{field.description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upload Template Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Upload className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
                <div>
                  <h2 className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">Upload Lease Template</h2>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Add a new customizable lease agreement</p>
                </div>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleUploadTemplate} className="p-4 md:p-6 space-y-4 md:space-y-5">
              {/* Template Name */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  value={uploadForm.name}
                  onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                  placeholder="e.g., Standard Residential Lease"
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder="Brief description of this lease template..."
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] bg-[#fcfcfc] dark:bg-[#1a1d1f] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] focus:outline-none focus:ring-2 focus:ring-[#475be8] dark:focus:ring-[#6c7ce8] resize-none text-[13px] placeholder:text-[#808191] dark:placeholder:text-[#92939e]"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-[13px] md:text-[14px] font-semibold text-[#11142d] dark:text-[#efefef] mb-2">
                  Upload Document *
                </label>
                <div className="border-2 border-dashed border-[#e4e8ef] dark:border-[#272b30] rounded-[10px] md:rounded-[12px] p-4 md:p-6 text-center hover:border-[#475be8] dark:hover:border-[#6c7ce8] transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    required
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                      <div className="p-3 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-full">
                        <Upload className="w-6 h-6 md:w-8 md:h-8 text-[#475be8] dark:text-[#6c7ce8]" />
                      </div>
                      <div>
                        <p className="text-[12px] md:text-[13px] font-semibold text-[#11142d] dark:text-[#efefef] mb-1">
                          {uploadForm.file ? uploadForm.file.name : 'Click to upload or drag and drop'}
                        </p>
                        <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e]">PDF, DOC, or DOCX (max 10MB)</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Instructions */}
              <div className="p-4 bg-[#ffce73]/10 border border-[#ffce73]/30 rounded-[10px] md:rounded-[12px]">
                <h3 className="font-semibold text-[#11142d] dark:text-[#efefef] mb-2 flex items-center gap-2 text-[13px] md:text-[14px]">
                  <AlertCircle className="w-4 h-4 text-[#ffce73]" />
                  Important Instructions
                </h3>
                <ul className="space-y-1 text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffce73] mt-0.5">•</span>
                    <span>Include merge fields in your template (e.g., <code className="bg-[#ffce73]/20 px-1 rounded text-[#ffce73]">{'{{TENANT_NAME}}'}</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffce73] mt-0.5">•</span>
                    <span>Supported formats: PDF, DOC, DOCX</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffce73] mt-0.5">•</span>
                    <span>Fields will be automatically replaced when sending to tenants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#ffce73] mt-0.5">•</span>
                    <span>Review the merge fields list below for available options</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 md:gap-3 pt-4 border-t border-[#e4e8ef] dark:border-[#272b30]">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border border-[#e4e8ef] dark:border-[#272b30] text-[#11142d] dark:text-[#efefef] rounded-[8px] md:rounded-[10px] hover:bg-[#f4f4f4] dark:hover:bg-[#111315] transition-colors font-medium text-[13px] md:text-[14px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-[#475be8] dark:bg-[#6c7ce8] text-white rounded-[8px] md:rounded-[10px] hover:bg-[#3d4fc7] dark:hover:bg-[#5d6dd7] transition-colors font-medium flex items-center justify-center gap-2 text-[13px] md:text-[14px]"
                >
                  <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  Upload Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedTemplate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#fcfcfc] dark:bg-[#1a1d1f] rounded-[15px] md:rounded-[20px] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#fcfcfc] dark:bg-[#1a1d1f] border-b border-[#e4e8ef] dark:border-[#272b30] px-4 md:px-6 py-4 flex items-center justify-between rounded-t-[15px] md:rounded-t-[20px]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#475be8]/10 dark:bg-[#6c7ce8]/10 rounded-[8px] md:rounded-[10px]">
                  <Eye className="w-5 h-5 md:w-6 md:h-6 text-[#475be8] dark:text-[#6c7ce8]" />
                </div>
                <div>
                  <h2 className="text-[18px] md:text-[22px] font-bold text-[#11142d] dark:text-[#efefef]">{selectedTemplate.name}</h2>
                  <p className="text-[12px] md:text-[13px] text-[#808191] dark:text-[#92939e]">Template Preview</p>
                </div>
              </div>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="p-2 hover:bg-[#f4f4f4] dark:hover:bg-[#111315] rounded-[8px] transition-colors"
              >
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#808191] dark:text-[#92939e]" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 md:p-6">
              <div className="bg-[#f4f4f4] dark:bg-[#111315] rounded-[10px] md:rounded-[12px] p-4 md:p-8 min-h-[400px]">
                <div className="max-w-3xl mx-auto bg-[#fcfcfc] dark:bg-[#1a1d1f] p-6 md:p-8 shadow-sm rounded-[10px]">
                  <h1 className="text-[18px] md:text-[24px] font-bold text-center mb-6 text-[#11142d] dark:text-[#efefef]">RESIDENTIAL LEASE AGREEMENT</h1>
                  
                  <p className="mb-4 text-[12px] md:text-[13px] text-[#11142d] dark:text-[#efefef]">
                    This Lease Agreement ("Agreement") is entered into on <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{CURRENT_DATE}}'}</span> between:
                  </p>
                  
                  <div className="mb-4 text-[12px] md:text-[13px]">
                    <p className="font-semibold text-[#11142d] dark:text-[#efefef]">LANDLORD:</p>
                    <p className="text-[#808191] dark:text-[#92939e]"><span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LANDLORD_NAME}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Phone: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LANDLORD_PHONE}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Email: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LANDLORD_EMAIL}}'}</span></p>
                  </div>

                  <div className="mb-4 text-[12px] md:text-[13px]">
                    <p className="font-semibold text-[#11142d] dark:text-[#efefef]">TENANT:</p>
                    <p className="text-[#808191] dark:text-[#92939e]"><span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{TENANT_NAME}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Phone: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{TENANT_PHONE}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Email: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{TENANT_EMAIL}}'}</span></p>
                  </div>

                  <div className="mb-4 text-[12px] md:text-[13px]">
                    <p className="font-semibold text-[#11142d] dark:text-[#efefef]">PROPERTY:</p>
                    <p className="text-[#808191] dark:text-[#92939e]"><span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{PROPERTY_ADDRESS}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Unit: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{UNIT_NUMBER}}'}</span></p>
                  </div>

                  <div className="mb-4 text-[12px] md:text-[13px]">
                    <p className="font-semibold text-[#11142d] dark:text-[#efefef]">LEASE TERMS:</p>
                    <p className="text-[#808191] dark:text-[#92939e]">Term: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LEASE_TERM}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Start Date: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LEASE_START_DATE}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">End Date: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{LEASE_END_DATE}}'}</span></p>
                  </div>

                  <div className="mb-4 text-[12px] md:text-[13px]">
                    <p className="font-semibold text-[#11142d] dark:text-[#efefef]">FINANCIAL TERMS:</p>
                    <p className="text-[#808191] dark:text-[#92939e]">Monthly Rent: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{MONTHLY_RENT}}'}</span></p>
                    <p className="text-[#808191] dark:text-[#92939e]">Security Deposit: <span className="bg-[#ffce73]/30 px-1 text-[#11142d] dark:text-[#efefef]">{'{{SECURITY_DEPOSIT}}'}</span></p>
                  </div>

                  <p className="text-[11px] md:text-[12px] text-[#808191] dark:text-[#92939e] mt-6 italic">
                    * Highlighted fields will be automatically filled with tenant and property data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
