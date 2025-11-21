import React, { useState, useEffect } from 'react';
import { Bell, User, Shield, LogOut, Moon, Check, Monitor, Sun } from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('System');
  const [density, setDensity] = useState('Comfortable');

  // Notification Settings State
  const [emailSettings, setEmailSettings] = useState({
    bills: true,
    payments: true
  });
  
  const [pushSettings, setPushSettings] = useState({
    chat: true,
    announcements: true,
    visitors: true
  });

  const toggleEmail = (key: keyof typeof emailSettings) => {
    setEmailSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePush = (key: keyof typeof pushSettings) => {
    setPushSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Moon },
  ];

  // Effect to handle Theme switching
  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (theme === 'Dark') {
        root.classList.add('dark');
      } else if (theme === 'Light') {
        root.classList.remove('dark');
      } else if (theme === 'System') {
        if (mediaQuery.matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
      }
    };

    applyTheme();

    // Listen for system changes if in System mode
    if (theme === 'System') {
      mediaQuery.addEventListener('change', applyTheme);
    }

    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [theme]);

  // Effect to handle Density
  useEffect(() => {
    if (density === 'Compact') {
      document.body.classList.add('density-compact');
    } else {
      document.body.classList.remove('density-compact');
    }
  }, [density]);

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
        <p className="text-gray-500 dark:text-gray-400">Manage your account preferences and security settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Sidebar Navigation */}
        <div className="col-span-1 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <tab.icon size={18} /> {tab.label}
            </button>
          ))}
        </div>

        {/* Main Settings Content */}
        <div className="col-span-1 md:col-span-2">
          
          {/* Profile Content */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
                <div className="flex items-center gap-6 mb-6">
                  <img 
                    src="https://picsum.photos/id/64/100/100" 
                    alt="Profile" 
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-50 dark:border-gray-700" 
                  />
                  <div>
                    <button className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-600">
                      Change Avatar
                    </button>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <input type="text" defaultValue="Alex" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <input type="text" defaultValue="Morgan" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" defaultValue="alex.morgan@example.com" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-900/20">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">Danger Zone</h3>
                <p className="text-sm text-red-600 dark:text-red-300 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="bg-white dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2">
                  <LogOut size={16} /> Delete Account
                </button>
              </div>
            </div>
          )}

          {/* Notifications Content */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Email Alerts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Bill Due Reminders</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive alerts when bills are generated or due.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailSettings.bills}
                        onChange={() => toggleEmail('bills')}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Payment Confirmations</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get receipts sent to your registered email.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={emailSettings.payments}
                        onChange={() => toggleEmail('payments')}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Community Chat Messages</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications for new messages in community channels.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={pushSettings.chat}
                        onChange={() => togglePush('chat')}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">New Announcements</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Get instant alerts for important society announcements.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={pushSettings.announcements}
                        onChange={() => togglePush('announcements')}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-200">Visitor Alerts</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Real-time notifications when visitors arrive or exit.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={pushSettings.visitors}
                        onChange={() => togglePush('visitors')}
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Content */}
          {activeTab === 'security' && (
             <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                   <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                        <input type="password" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                      </div>
                   </div>
                   <div className="mt-6 flex justify-end">
                      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Update Password
                      </button>
                   </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                   <div className="flex items-start justify-between">
                      <div>
                         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Two-Factor Authentication</h3>
                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Add an extra layer of security to your account.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                   </div>
                </div>
             </div>
          )}

          {/* Appearance Content */}
          {activeTab === 'appearance' && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Theme Preferences</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                   {[
                     { id: 'Light', icon: Sun, label: 'Light' }, 
                     { id: 'Dark', icon: Moon, label: 'Dark' }, 
                     { id: 'System', icon: Monitor, label: 'System' }
                   ].map((t) => (
                     <button 
                        key={t.id} 
                        onClick={() => setTheme(t.id)}
                        className={`relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                          theme === t.id 
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {theme === t.id && (
                          <div className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                            <Check size={18} strokeWidth={3} />
                          </div>
                        )}
                        <div className={`p-4 rounded-full mb-3 ${
                           theme === t.id 
                             ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200' 
                             : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                        }`}>
                           <t.icon size={24} />
                        </div>
                        <span className={`font-medium ${theme === t.id ? 'text-blue-900 dark:text-blue-200' : 'text-gray-700 dark:text-gray-300'}`}>
                          {t.label}
                        </span>
                     </button>
                   ))}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Interface Density</h3>
                <div className="space-y-3">
                   {[
                     { id: 'Comfortable', desc: 'More whitespace for better readability' },
                     { id: 'Compact', desc: 'See more content on the screen' }
                   ].map((d) => (
                     <label 
                        key={d.id} 
                        onClick={() => setDensity(d.id)}
                        className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                         density === d.id 
                           ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800' 
                           : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-5 h-5 rounded-full border ${
                           density === d.id 
                             ? 'border-blue-600 bg-blue-600' 
                             : 'border-gray-300 dark:border-gray-500'
                        }`}>
                           {density === d.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div className="flex-1">
                           <p className={`text-sm font-semibold ${density === d.id ? 'text-blue-900 dark:text-blue-300' : 'text-gray-900 dark:text-white'}`}>
                             {d.id}
                           </p>
                           <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{d.desc}</p>
                        </div>
                     </label>
                   ))}
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;