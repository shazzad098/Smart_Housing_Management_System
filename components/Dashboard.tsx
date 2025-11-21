import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { TrendingUp, Calendar, Users, DollarSign, AlertCircle } from 'lucide-react';

const data = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 7500 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 9000 },
  { name: 'May', amount: 11800 },
  { name: 'Jun', amount: 8500 },
];

const StatCard: React.FC<{ title: string; value: string; subtext?: string; icon: React.ReactNode; color: string }> = ({ title, value, subtext, icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: `w-6 h-6` })} 
      </div>
    </div>
    {subtext && <p className="text-xs text-gray-400 mt-auto">{subtext}</p>}
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Due Bill" 
          value="$150.00" 
          icon={<DollarSign />} 
          color="text-blue-600 bg-blue-600"
        />
        <StatCard 
          title="Active Complaints" 
          value="3" 
          icon={<AlertCircle />} 
          color="text-orange-500 bg-orange-500"
        />
        <StatCard 
          title="Visitors Today" 
          value="5" 
          icon={<Users />} 
          color="text-green-500 bg-green-500"
        />
        <StatCard 
          title="Upcoming Events" 
          value="1" 
          icon={<Calendar />} 
          color="text-purple-500 bg-purple-500"
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Monthly Maintenance Collection vs Expenses</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold text-gray-900">$12,450</span>
              <span className="flex items-center text-sm text-green-500 font-medium">
                <TrendingUp size={16} className="mr-1" />
                +5.2%
              </span>
              <span className="text-sm text-gray-400 ml-1">Last 6 Months</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e40af" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#9ca3af', fontSize: 12 }} 
                dy={10}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#fff' }}
                cursor={{ stroke: '#1e40af', strokeWidth: 2 }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#1e3a8a" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Visitors & Notices Preview (Bottom Row) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Visitors</h3>
          <div className="space-y-4">
             {[1, 2, 3].map((i) => (
               <div key={i} className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                     <Users size={20} className="text-gray-500" />
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-900">Delivery Agent</p>
                     <p className="text-xs text-gray-500">Today, 10:30 AM</p>
                   </div>
                 </div>
                 <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Exited</span>
               </div>
             ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-64">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Notices</h3>
          <div className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
               <p className="text-sm font-medium text-blue-900">Pool Maintenance</p>
               <p className="text-xs text-blue-700 mt-1">The swimming pool will be closed for maintenance tomorrow.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
               <p className="text-sm font-medium text-yellow-900">AGM Meeting</p>
               <p className="text-xs text-yellow-700 mt-1">Annual General Meeting is scheduled for this Sunday at 10 AM.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;