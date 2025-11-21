
import React, { useState } from 'react';
import { Visitor, VisitorStatus } from '../types';
import { Search, Calendar, Filter, Plus, X } from 'lucide-react';

const visitors: Visitor[] = [
  { id: '1', name: 'Ravi Sharma', flatNo: 'A-101', entryTime: '2024-07-28 10:00 AM', exitTime: '2024-07-28 11:30 AM', purpose: 'Guest', status: VisitorStatus.EXITED, vehicleNumber: 'MH-02-AB-1234' },
  { id: '2', name: 'Priya Singh', flatNo: 'B-304', entryTime: '2024-07-28 09:45 AM', exitTime: '-', purpose: 'Service', status: VisitorStatus.INSIDE },
  { id: '3', name: 'Delivery Agent', flatNo: 'C-502', entryTime: '2024-07-28 09:30 AM', exitTime: '2024-07-28 09:35 AM', purpose: 'Delivery', status: VisitorStatus.EXITED, vehicleNumber: 'MH-04-CD-5678' },
  { id: '4', name: 'Amit Patel', flatNo: 'A-210', entryTime: '2024-07-29 02:00 PM', exitTime: '-', purpose: 'Family Guest', status: VisitorStatus.UPCOMING },
  { id: '5', name: 'Sunita Gupta', flatNo: 'D-112', entryTime: '2024-07-27 07:00 PM', exitTime: '2024-07-27 10:00 PM', purpose: 'Guest', status: VisitorStatus.EXITED, vehicleNumber: 'MH-12-EF-9012' },
];

const Visitors: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const getStatusBadge = (status: VisitorStatus) => {
    switch (status) {
      case VisitorStatus.INSIDE: return 'bg-green-100 text-green-700';
      case VisitorStatus.EXITED: return 'bg-gray-100 text-gray-700';
      case VisitorStatus.UPCOMING: return 'bg-blue-100 text-blue-700';
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = (
      visitor.name.toLowerCase().includes(query) ||
      visitor.flatNo.toLowerCase().includes(query) ||
      (visitor.vehicleNumber && visitor.vehicleNumber.toLowerCase().includes(query))
    );

    let matchesDate = true;
    if (dateRange.start || dateRange.end) {
      // Extract YYYY-MM-DD from "YYYY-MM-DD HH:MM AM"
      const visitorDate = visitor.entryTime.substring(0, 10);
      
      if (dateRange.start && visitorDate < dateRange.start) matchesDate = false;
      if (dateRange.end && visitorDate > dateRange.end) matchesDate = false;
    }

    return matchesSearch && matchesDate;
  });

  const clearDates = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDateRange({ start: '', end: '' });
    setShowDateFilters(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Visitors</h2>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all visitor access within the housing society.</p>
        </div>
        <button className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition flex items-center gap-2 shadow-md text-sm font-medium">
          <Plus size={16} />
          Pre-authorize Visitor
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, flat, vehicle..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Date Range Picker */}
        <div className="relative">
          <button 
            onClick={() => setShowDateFilters(!showDateFilters)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm transition-colors ${
              showDateFilters || (dateRange.start || dateRange.end)
                ? 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800' 
                : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Calendar size={16} />
            {(dateRange.start || dateRange.end) ? 'Date Selected' : 'Date Range'}
            {(dateRange.start || dateRange.end) && (
              <span 
                onClick={clearDates}
                className="ml-1 p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800 rounded-full"
              >
                <X size={12} />
              </span>
            )}
          </button>

          {showDateFilters && (
            <div className="absolute top-full right-0 sm:left-0 sm:right-auto mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 z-20 animate-in fade-in zoom-in-95 duration-100">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Filter by Date</h3>
                {(dateRange.start || dateRange.end) && (
                  <button onClick={clearDates} className="text-xs text-red-600 hover:text-red-700 dark:text-red-400">Clear All</button>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Start Date</label>
                  <input 
                    type="date" 
                    value={dateRange.start}
                    onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">End Date</label>
                  <input 
                    type="date" 
                    value={dateRange.end}
                    onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
          <Filter size={16} />
          Status: All
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
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
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Vehicle: {visitor.vehicleNumber}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">{visitor.flatNo}</td>
                    <td className="px-6 py-4">{visitor.entryTime}</td>
                    <td className="px-6 py-4">{visitor.exitTime}</td>
                    <td className="px-6 py-4">{visitor.purpose}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(visitor.status)}`}>
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-center">
           <div className="flex gap-2">
             {[1, 2, 3, '...', 10].map((page, idx) => (
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
