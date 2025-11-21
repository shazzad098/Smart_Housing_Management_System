import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Bell, Search, Menu, User, Settings, LogOut, CheckCircle } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dropdown states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Refs for click outside detection
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getTitle = () => {
    switch (location.pathname) {
      case '/dashboard': return 'Dashboard';
      case '/bills': return 'Bill Payments';
      case '/visitors': return 'Visitors';
      case '/complaints': return 'Complaints';
      case '/chat': return 'Community Chat';
      case '/my-flat': return 'My Flat';
      case '/settings': return 'Settings';
      default: return 'SocietyHub';
    }
  };

  const notifications = [
    { id: 1, title: 'New Bill Generated', message: 'Maintenance bill for October ($150.00) is ready to view.', time: '2m ago', unread: true },
    { id: 2, title: 'Visitor Arrived', message: 'Delivery Agent for Amazon is waiting at the gate.', time: '1h ago', unread: true },
    { id: 3, title: 'Community Meeting', message: 'AGM meeting starts in 30 minutes at the Clubhouse.', time: '4h ago', unread: false },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 w-full overflow-hidden transition-colors duration-200">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-200 ease-in-out`}>
        <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0 transition-colors duration-200 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-gray-600 dark:text-gray-300"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">{getTitle()}</h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
              />
            </div>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`relative p-2 rounded-full transition-colors ${
                  isNotificationsOpen 
                    ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-white' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-800"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <button className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 flex items-center gap-1">
                      <CheckCircle size={12} />
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer flex gap-3 ${
                          notif.unread ? 'bg-blue-50/30 dark:bg-blue-900/10' : ''
                        }`}
                      >
                        <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                        <div className="flex-1">
                           <div className="flex justify-between items-start mb-1">
                             <p className={`text-sm font-medium ${notif.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                               {notif.title}
                             </p>
                             <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                           </div>
                           <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{notif.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    <button className="text-xs font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            <div className="relative pl-4 sm:pl-6 border-l border-gray-200 dark:border-gray-700" ref={profileRef}>
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group focus:outline-none"
              >
                <div className="relative">
                  <img 
                    src="https://picsum.photos/id/64/100/100" 
                    alt="User" 
                    className={`w-9 h-9 rounded-full border-2 object-cover transition-colors ${
                      isProfileOpen 
                        ? 'border-blue-500' 
                        : 'border-gray-200 dark:border-gray-600 group-hover:border-blue-400'
                    }`}
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
                <div className="hidden md:block text-left">
                  <p className={`font-medium text-sm transition-colors ${
                    isProfileOpen ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                  }`}>
                    Alex Morgan
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">A-101</p>
                </div>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                     <div className="flex items-center gap-3 mb-3">
                       <img 
                        src="https://picsum.photos/id/64/100/100" 
                        alt="User" 
                        className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-600 shadow-sm object-cover" 
                       />
                       <div>
                         <p className="font-semibold text-gray-900 dark:text-white">Alex Morgan</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400">Resident • A-101</p>
                       </div>
                     </div>
                     <div className="flex gap-2">
                       <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                         PREMIUM
                       </span>
                     </div>
                  </div>
                  <div className="p-2 space-y-1">
                    <button 
                      onClick={() => { navigate('/my-flat'); setIsProfileOpen(false); }} 
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    >
                       <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                         <User size={16} />
                       </div>
                       My Profile
                    </button>
                    <button 
                      onClick={() => { navigate('/settings'); setIsProfileOpen(false); }} 
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                    >
                       <div className="p-1.5 rounded-md bg-gray-100 dark:bg-gray-700 group-hover:bg-white dark:group-hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                         <Settings size={16} />
                       </div>
                       Settings
                    </button>
                  </div>
                  <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={() => setIsProfileOpen(false)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors group"
                    >
                       <div className="p-1.5 rounded-md bg-red-50 dark:bg-red-900/30 group-hover:bg-white dark:group-hover:bg-red-900/50 transition-colors text-red-500">
                         <LogOut size={16} />
                       </div>
                       Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-8 z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;