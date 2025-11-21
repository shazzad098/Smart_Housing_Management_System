
import React, { useState } from 'react';
import { Complaint, ComplaintStatus, User } from '../types';
import { Plus, X, CheckCircle, FileText, Calendar, Activity, User as UserIcon } from 'lucide-react';

interface ComplaintsProps {
  user: User;
}

const initialComplaints: Complaint[] = [
  { id: 'CMPT-072', category: 'Maintenance', date: '15 July 2024', status: ComplaintStatus.RESOLVED, description: 'Leaking tap in kitchen. Water is dripping constantly causing wastage.' },
  { id: 'CMPT-071', category: 'Security', date: '12 July 2024', status: ComplaintStatus.IN_PROGRESS, description: 'Unknown car parked in my spot (A-101) since yesterday evening.' },
  { id: 'CMPT-069', category: 'Amenities', date: '10 July 2024', status: ComplaintStatus.NEW, description: 'Gym AC not cooling enough during morning hours.' },
];

const Complaints: React.FC<ComplaintsProps> = ({ user }) => {
  const [complaintsList, setComplaintsList] = useState<Complaint[]>(initialComplaints);
  const [activeTab, setActiveTab] = useState<'All' | 'New' | 'In Progress' | 'Resolved'>('All');
  
  // Submit Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  
  // View Details Modal State
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  
  const [newComplaint, setNewComplaint] = useState({
    category: 'Maintenance',
    description: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case ComplaintStatus.RESOLVED: return 'bg-green-100 text-green-800';
      case ComplaintStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-800';
      case ComplaintStatus.NEW: return 'bg-blue-100 text-blue-800';
    }
  };

  const filteredComplaints = complaintsList.filter(complaint => {
    if (activeTab === 'All') return true;
    return complaint.status === activeTab;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const complaint: Complaint = {
      id: `CMPT-${Math.floor(Math.random() * 1000)}`,
      category: newComplaint.category,
      description: newComplaint.description,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: ComplaintStatus.NEW
    };

    setComplaintsList([complaint, ...complaintsList]);
    setIsSubmitModalOpen(false);
    setNewComplaint({ category: 'Maintenance', description: '' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleStatusChange = (id: string, newStatus: ComplaintStatus) => {
    const updatedList = complaintsList.map(c => 
      c.id === id ? { ...c, status: newStatus } : c
    );
    setComplaintsList(updatedList);
    
    // Update the currently selected complaint so the modal reflects the change immediately
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint({ ...selectedComplaint, status: newStatus });
    }
  };

  return (
    <div className="space-y-6 relative">
       {/* Success Toast */}
       {showSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-top-5 fade-in duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3">
            <CheckCircle size={24} />
            <div>
              <h4 className="font-bold">Complaint Submitted</h4>
              <p className="text-sm text-green-100">Your ticket has been raised successfully.</p>
            </div>
          </div>
        </div>
      )}

      {/* Submit New Complaint Modal (Resident Only) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Submit New Complaint</h3>
                    <button 
                        onClick={() => setIsSubmitModalOpen(false)} 
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                        <select 
                            value={newComplaint.category}
                            onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                        >
                            <option value="Maintenance">Maintenance</option>
                            <option value="Security">Security</option>
                            <option value="Amenities">Amenities</option>
                            <option value="Cleanliness">Cleanliness</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                        <textarea 
                            required
                            rows={4}
                            value={newComplaint.description}
                            onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                            placeholder="Describe the issue in detail..."
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
                        />
                    </div>
                    <div className="pt-2">
                        <button 
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                        >
                            Submit Complaint
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* View Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                           <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Complaint Details</h3>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{selectedComplaint.id}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedComplaint(null)} 
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                    {/* Meta Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Activity size={12} /> Category
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedComplaint.category}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Calendar size={12} /> Date
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{selectedComplaint.date}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <Activity size={12} /> Status
                            </p>
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedComplaint.status)}`}>
                                {selectedComplaint.status}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                         <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider font-bold">Description</p>
                         <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {selectedComplaint.description}
                         </p>
                    </div>

                    {/* Admin Action: Change Status */}
                    {user.role === 'admin' && (
                        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Update Status</label>
                            <div className="flex gap-2">
                                <select
                                    value={selectedComplaint.status}
                                    onChange={(e) => handleStatusChange(selectedComplaint.id, e.target.value as ComplaintStatus)}
                                    className="flex-1 px-3 py-2.5 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white cursor-pointer"
                                >
                                    <option value={ComplaintStatus.NEW}>New</option>
                                    <option value={ComplaintStatus.IN_PROGRESS}>In Progress</option>
                                    <option value={ComplaintStatus.RESOLVED}>Resolved</option>
                                </select>
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                Changing the status will automatically notify the resident.
                            </p>
                        </div>
                    )}
                </div>
                <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex justify-end">
                    <button 
                        onClick={() => setSelectedComplaint(null)}
                        className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="flex justify-between items-start">
        <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Complaints</h2>
           <p className="text-gray-500 dark:text-gray-400 mt-1">
             {user.role === 'admin' ? 'Review and manage complaints raised by residents.' : 'View and manage all your submitted complaints.'}
           </p>
        </div>
        {/* Submit button hidden for Admins */}
        {user.role === 'resident' && (
          <button 
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-600/20"
          >
            <Plus size={18} />
            Submit New Complaint
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
        {['All', 'New', 'In Progress', 'Resolved'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === tab 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-700">
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-3 grid grid-cols-12 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <div className="col-span-2">Complaint ID</div>
              <div className="col-span-3">Category</div>
              <div className="col-span-3">Date Submitted</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {filteredComplaints.map((item) => (
              <div key={item.id} className="px-6 py-4 grid grid-cols-12 items-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="col-span-2 font-medium text-gray-900 dark:text-white">{item.id}</div>
                <div className="col-span-3 text-gray-600 dark:text-gray-300">{item.category}</div>
                <div className="col-span-3 text-gray-500 dark:text-gray-400">{item.date}</div>
                <div className="col-span-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="col-span-2 text-right">
                   <button 
                     onClick={() => setSelectedComplaint(item)}
                     className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-sm font-medium hover:underline"
                   >
                     View Details
                   </button>
                </div>
              </div>
            ))}
        </div>
        
        {filteredComplaints.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                No complaints found matching this filter.
            </div>
        )}
      </div>
    </div>
  );
};

export default Complaints;
