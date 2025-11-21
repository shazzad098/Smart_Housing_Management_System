import React, { useState } from 'react';
import { Visitor, VisitorStatus } from '../types';
import { Search, Calendar, Filter, Plus, X, Clock, MapPin, Car, ChevronDown, Check } from 'lucide-react';

const visitors: Visitor[] = [
  { id: '1', name: 'Ravi Sharma', flatNo: 'A-101', entryTime: '2024-07-28 10:00 AM', exitTime: '2024-07-28 11:30 AM', purpose: 'Guest', status: VisitorStatus.EXITED, vehicleNumber: 'MH-02-AB-1234' },
  { id: '2', name: 'Priya Singh', flatNo: 'B-304', entryTime: '2024-07-28 09:45 AM', exitTime: '-', purpose: 'Service', status: VisitorStatus.INSIDE },
  { id: '3', name: 'Delivery Agent', flatNo: 'C-502', entryTime: '2024-07-28 09:30 AM', exitTime: '2024-07-28 09:35 AM', purpose: 'Delivery', status: VisitorStatus.EXITED, vehicleNumber: 'MH-04-CD-5678' },
  { id: '4', name: 'Amit Patel', flatNo: 'A-210', entryTime: '2024-07-29 02:00 PM', exitTime: '-', purpose: 'Family Guest', status: VisitorStatus.UPCOMING },
  { id: '5', name: 'Sunita Gupta', flatNo: 'D-112', entryTime: '2024-07-27 07:00 PM', exitTime: '2024-07-27 10:00 PM', purpose: 'Guest', status: VisitorStatus.EXITED, vehicleNumber: 'MH-12-EF-9012' },
];

const Visitors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter States
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [statusFilter, setStatusFilter] = useState<'All' | VisitorStatus>('All');

  // Modal Open States
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const getStatusBadge = (status: VisitorStatus) => {
    switch (status) {
      case VisitorStatus.INSIDE: return 'bg-green-100 text-green-700 border-green-200';
      case VisitorStatus.EXITED: return 'bg-gray-100 text-gray-700 border-gray-200';
      case VisitorStatus.UPCOMING: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  // Advanced Filtering Logic
  const filteredVisitors = visitors.filter(visitor => {
    const query = searchQuery.toLowerCase();
    
    const matchesSearch = (
      visitor.name.toLowerCase().includes(query) ||
      visitor.flatNo.toLowerCase().includes(query) ||
      (visitor.vehicleNumber && visitor.vehicleNumber.toLowerCase().includes(query))
    );

    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      const visitorDate = visitor.entryTime.substring(0, 10);
      if (dateRange.start && visitorDate < dateRange.start) matchesDate = false;
      if (dateRange.end && visitorDate > dateRange.end) matchesDate = false;
    }

    let matchesStatus = true;
    if (statusFilter !== 'All') {
        matchesStatus = visitor.status === statusFilter;
    }

    return matchesSearch && matchesDate && matchesStatus;
  });

  const clearDates = () => {
    setDateRange({ start: '', end: '' });
    setIsDateModalOpen(false);
  };

  return (
    <div className="space-y-6 relative">
      
      {/* --- DATE FILTER POPUP MODAL --- */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Calendar size={18} className="text-blue-600" /> Select Date Range
                    </h3>
                    <button onClick={() => setIsDateModalOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">Start Date</label>
                        <input 
                            type="date" 
                            value={dateRange.start}
                            onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase">End Date</label>
                        <input 
                            type="date" 
                            value={dateRange.end}
                            onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                            className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                        />
                    </div>
                </div>
                <div className="p-5 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex gap-3">
                    <button 
                        onClick={clearDates}
                        className="flex-1 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                    >
                        Clear
                    </button>
                    <button 
                        onClick={() => setIsDateModalOpen(false)}
                        className="flex-1 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg shadow-blue-600/20 transition-colors"
                    >
                        Apply Filter
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* --- STATUS FILTER POPUP MODAL --- */}
      {isStatusModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white dark:bg-gray-800 w-full max-w-xs rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Filter size={18} className="text-blue-600" /> Filter by Status
                    </h3>
                    <button onClick={() => setIsStatusModalOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-2">
                    {['All', VisitorStatus.INSIDE, VisitorStatus.UPCOMING, VisitorStatus.EXITED].map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setStatusFilter(status as any);
                                setIsStatusModalOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-4 py-3 mb-1 rounded-xl transition-colors ${
                                statusFilter === status 
                                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                            }`}
                        >
                            <span className="font-medium">{status}</span>
                            {statusFilter === status && <Check size={18} />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visitors</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all visitor access within the housing society.</p>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2.5 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2 shadow-md text-sm font-medium w-full md:w-auto">
          <Plus size={18} />
          Pre-authorize Visitor
        </button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, flat, vehicle..." 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Date Range Trigger Button */}
            <button 
                onClick={() => setIsDateModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm transition-colors whitespace-nowrap ${
                (dateRange.start || dateRange.end)
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
                <Calendar size={16} />
                {(dateRange.start || dateRange.end) ? 'Date Selected' : 'Date Range'}
                <ChevronDown size={14} className="opacity-50" />
            </button>

            {/* Status Filter Trigger Button */}
            <button 
                onClick={() => setIsStatusModalOpen(true)}
                className={`flex items-center gap-2 px-4 py-2.5 border rounded-lg text-sm whitespace-nowrap ${
                    statusFilter !== 'All'
                    ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
                    : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
                <Filter size={16} />
                Status: {statusFilter}
                <ChevronDown size={14} className="opacity-50" />
            </button>
        </div>
      </div>

      {/* Content Area (Table + Cards) */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-400">
            <thead className="bg-gray-50 dark:bg-gray-700/50 text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4">Visitor Name</th>
                <th className="px-6 py-4">Flat No.</th>
                <th className="px-6 py-4">Entry Time</th>
                <th className="px-6 py-4">Exit Time</th>
                <th className="px-6 py-4">Purpose</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                  <tr key={visitor.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 dark:text-white">{visitor.name}</div>
                      {visitor.vehicleNumber && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 flex items-center gap-1">
                            <Car size={10} /> {visitor.vehicleNumber}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs font-medium">
                            {visitor.flatNo}
                        </span>
                    </td>
                    <td className="px-6 py-4">{visitor.entryTime}</td>
                    <td className="px-6 py-4">{visitor.exitTime}</td>
                    <td className="px-6 py-4">{visitor.purpose}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(visitor.status)}`}>
                        {visitor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-xs font-medium">
                        {visitor.status === VisitorStatus.UPCOMING ? 'Edit' : 'View Details'}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                    No visitors found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
             {filteredVisitors.length > 0 ? (
                filteredVisitors.map((visitor) => (
                    <div key={visitor.id} className="p-4 space-y-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white">{visitor.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 font-medium flex items-center gap-1">
                                        <MapPin size={10} /> {visitor.flatNo}
                                    </span>
                                    {visitor.vehicleNumber && (
                                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                            <Car size={10} /> {visitor.vehicleNumber}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusBadge(visitor.status)}`}>
                                {visitor.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Entry</p>
                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium mt-0.5">
                                    <Clock size={12} className="text-green-600" />
                                    {visitor.entryTime.split(' ')[1]} {visitor.entryTime.split(' ')[2]}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">{visitor.entryTime.split(' ')[0]}</p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700/50 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase">Exit</p>
                                <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 font-medium mt-0.5">
                                    <Clock size={12} className="text-red-500" />
                                    {visitor.exitTime === '-' ? '--:--' : `${visitor.exitTime.split(' ')[1]} ${visitor.exitTime.split(' ')[2]}`}
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5">{visitor.exitTime === '-' ? '-' : visitor.exitTime.split(' ')[0]}</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-1">
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                Purpose: <span className="text-gray-700 dark:text-gray-300 font-medium">{visitor.purpose}</span>
                            </span>
                            <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-400 text-xs font-bold uppercase tracking-wide">
                                View Details
                            </button>
                        </div>
                    </div>
                ))
             ) : (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No visitors found.
                </div>
             )}
        </div>

        {/* Pagination (Common for both) */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
           <div className="flex gap-2">
             {[1, 2, 3].map((page, idx) => (
               <button 
                 key={idx} 
                 className={`w-8 h-8 flex items-center justify-center rounded-md border text-xs ${page === 1 ? 'bg-blue-50 border-blue-200 text-blue-600 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
               >
                 {page}
               </button>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Visitors;