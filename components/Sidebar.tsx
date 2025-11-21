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
  ScanLine
} from 'lucide-react';

interface SidebarProps {
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navItems = [
    { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/bills', icon: <Receipt size={20} />, label: 'Bill Payments' },
    { path: '/visitors', icon: <Users size={20} />, label: 'Visitors' },
    { path: '/complaints', icon: <AlertCircle size={20} />, label: 'Complaints' },
    { path: '/chat', icon: <MessageSquare size={20} />, label: 'Community Chat' },
    { path: '/security', icon: <ScanLine size={20} />, label: 'Security Gate' },
  ];

  const settingsItems = [
    { path: '/my-flat', icon: <Building2 size={20} />, label: 'My Flat' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

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
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-xs font-bold text-white">
            AM
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate text-white">Alex Morgan</p>
            <p className="text-xs text-blue-300 truncate">View Profile</p>
          </div>
          <LogOut size={16} className="text-blue-300" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;