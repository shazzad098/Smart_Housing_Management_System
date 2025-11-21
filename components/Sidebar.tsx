import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Receipt, 
  Users, 
  AlertCircle, 
  MessageSquare, 
  Settings, 
  LogOut,
  Home,
  ScanLine,
  ShieldCheck
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  user: User;
  onCloseMobile: () => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onCloseMobile, onLogout }) => {
  
  // Define all possible nav items
  const allNavItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard', roles: ['admin', 'resident'] },
    { path: '/bills', icon: <Receipt size={20} />, label: 'Bill Payments', roles: ['admin', 'resident'] },
    { path: '/visitors', icon: <Users size={20} />, label: 'Visitors', roles: ['admin', 'resident', 'security'] },
    { path: '/complaints', icon: <AlertCircle size={20} />, label: 'Complaints', roles: ['admin', 'resident'] },
    { path: '/chat', icon: <MessageSquare size={20} />, label: 'Community Chat', roles: ['admin', 'resident', 'security'] },
    { path: '/security', icon: <ScanLine size={20} />, label: 'Security Gate', roles: ['admin', 'security'] },
  ];

  // Filter items based on user role
  const navItems = allNavItems.filter(item => item.roles.includes(user.role));

  const settingsItems = [
    { path: '/my-flat', icon: <Building2 size={20} />, label: 'My Flat', roles: ['resident'] },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings', roles: ['admin', 'resident', 'security'] },
  ].filter(item => item.roles.includes(user.role));

  return (
    <div className="w-64 bg-blue-900 h-full text-white flex flex-col shadow-xl">
      <div className="h-16 flex items-center px-6 border-b border-blue-800">
        <Home className="text-white mr-3" size={24} />
        <span className="text-xl font-bold tracking-wide">SocietyHub</span>
      </div>

      <div className="flex-1 py-6 flex flex-col gap-1 overflow-y-auto">
        <div className="px-4 mb-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative ${
                isActive 
                  ? 'text-white bg-blue-800/50 border-r-4 border-blue-400' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}

        <div className="mt-8 px-4 mb-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
          Settings
        </div>
        {settingsItems.map((item) => (
           <NavLink
            key={item.path}
            to={item.path}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-sm font-medium transition-colors relative ${
                isActive 
                  ? 'text-white bg-blue-800/50 border-r-4 border-blue-400' 
                  : 'text-blue-100 hover:bg-blue-800 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-blue-800">
        <div 
          onClick={onLogout}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt="User" className="w-full h-full object-cover" />
            ) : (
              user.name.substring(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">{user.name}</p>
            <p className="text-xs text-blue-300 truncate capitalize">{user.role}</p>
          </div>
          <LogOut size={16} className="text-blue-300 group-hover:text-red-300 transition-colors" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
