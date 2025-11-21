import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, Calendar, Users, DollarSign, AlertCircle, ShieldCheck, Activity, Bell } from 'lucide-react';
import { User } from '../types';

const financialData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 7500 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 9000 },
  { name: 'May', amount: 11800 },
  { name: 'Jun', amount: 8500 },
];

const visitorData = [
  { name: 'Mon', visitors: 45 },
  { name: 'Tue', visitors: 52 },
  { name: 'Wed', visitors: 38 },
  { name: 'Thu', visitors: 65 },
  { name: 'Fri', visitors: 48 },
  { name: 'Sat', visitors: 90 },
  { name: 'Sun', visitors: 85 },
];

interface DashboardProps {
  user: User;
}

const StatCard: React.FC<{ title: string; value: string; subtext?: string; icon: React.ReactNode; color: string }> = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: `w-6 h-6` })} 
      </div>
    </div>
    {subtext && <p className="text-xs text-gray-400 mt-auto">{subtext}</p>}
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  
  // --- ADMIN DASHBOARD ---
  if (user.role === 'admin') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h2>
          <p className="text-gray-500 dark:text-gray-400">Welcome back, Administrator.</p>
        </div>
        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Collections" value="$45,250" icon={<DollarSign />} color="text-blue-600 bg-blue-600" subtext="+12% from last month" />
          <StatCard title="Pending Issues" value="12" icon={<AlertCircle />} color="text-orange-500 bg-orange-500" subtext="4 High Priority" />
          <StatCard title="Total Residents" value="124" icon={<Users />} color="text-purple-500 bg-purple-500" subtext="98% Occupancy" />
          <StatCard title="Gate Activity" value="340" icon={<ShieldCheck />} color="text-green-500 bg-green-500" subtext="Entries today" />
        </div>

        {/* Financial Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Society Financials</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Area type="monotone" dataKey="amount" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorAmount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  }

  // --- RESIDENT DASHBOARD ---
  if (user.role === 'resident') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Dashboard</h2>
          <p className="text-gray-500 dark:text-gray-400">Overview for Flat {user.flatNo}</p>
        </div>
        {/* Resident Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Due Bill" value="$150.00" icon={<DollarSign />} color="text-red-600 bg-red-600" />
          <StatCard title="My Complaints" value="3" icon={<AlertCircle />} color="text-orange-500 bg-orange-500" subtext="1 Resolved" />
          <StatCard title="Expected Visitors" value="2" icon={<Users />} color="text-blue-500 bg-blue-500" subtext="For today" />
          <StatCard title="Notices" value="1" icon={<Bell />} color="text-yellow-500 bg-yellow-500" subtext="New announcement" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm h-64">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Visitors</h3>
            <div className="space-y-4">
               {[1, 2, 3].map((i) => (
                 <div key={i} className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                       <Users size={20} className="text-gray-500 dark:text-gray-400" />
                     </div>
                     <div>
                       <p className="text-sm font-medium text-gray-900 dark:text-white">Delivery Agent</p>
                       <p className="text-xs text-gray-500 dark:text-gray-400">Today, 10:30 AM</p>
                     </div>
                   </div>
                   <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full">Exited</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm h-64">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Community Notices</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                 <p className="text-sm font-medium text-blue-900 dark:text-blue-300">Pool Maintenance</p>
                 <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">The swimming pool will be closed for maintenance tomorrow.</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-100 dark:border-yellow-800">
                 <p className="text-sm font-medium text-yellow-900 dark:text-yellow-300">AGM Meeting</p>
                 <p className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">Annual General Meeting is scheduled for this Sunday at 10 AM.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- SECURITY DASHBOARD (Fallback if not redirected) ---
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
       <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Security Operations</h2>
          <p className="text-gray-500 dark:text-gray-400">Main Gate Status: Active</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Currently Inside" value="18" icon={<Users />} color="text-green-500 bg-green-500" subtext="Visitors & Staff" />
          <StatCard title="Total Entries Today" value="142" icon={<Activity />} color="text-blue-500 bg-blue-500" />
          <StatCard title="Denied Entries" value="3" icon={<ShieldCheck />} color="text-red-500 bg-red-500" />
       </div>
       
       <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visitor Traffic (Weekly)</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" strokeOpacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                <Tooltip cursor={{fill: 'rgba(255, 255, 255, 0.1)'}} contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="visitors" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
       </div>
    </div>
  );
};

export default Dashboard;
