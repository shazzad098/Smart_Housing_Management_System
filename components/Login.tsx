import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { Shield, User as UserIcon, Lock, KeyRound } from 'lucide-react';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeRole, setActiveRole] = useState<UserRole>('resident');
  const [email, setEmail] = useState('admin@smartsociety.com');
  const [password, setPassword] = useState('');

  // Update default email based on role selection for demo purposes
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    if (role === 'admin') setEmail('admin@smartsociety.com');
    if (role === 'resident') setEmail('alex@smartsociety.com');
    if (role === 'security') setEmail('gate@smartsociety.com');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock Login Logic
    let userData: User;

    if (activeRole === 'admin') {
      userData = {
        name: 'System Admin',
        email: email,
        role: 'admin',
        avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff'
      };
    } else if (activeRole === 'security') {
      userData = {
        name: 'Rajesh Guard',
        email: email,
        role: 'security',
        avatar: 'https://ui-avatars.com/api/?name=Security+Guard&background=4b5563&color=fff'
      };
    } else {
      userData = {
        name: 'Alex Morgan',
        email: email,
        role: 'resident',
        flatNo: 'A-101',
        avatar: 'https://picsum.photos/id/64/100/100'
      };
    }

    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        <div className="p-8 pb-0 text-center">
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
             <KeyRound size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Role Tabs */}
        <div className="px-8 mt-6">
          <div className="flex p-1 bg-gray-100 dark:bg-gray-700/50 rounded-xl">
            {(['admin', 'resident', 'security'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => handleRoleChange(role)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                  activeRole === role
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
            <div className="relative">
               <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="email" 
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                 placeholder="name@company.com"
               />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <div className="relative">
               <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                 type="password" 
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
                 placeholder="••••••••"
               />
            </div>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800">Forgot Password?</button>
          </div>

          <button 
            type="submit"
            className={`w-full py-3 rounded-xl text-white font-semibold shadow-lg transition-all hover:shadow-xl active:scale-95 ${
              activeRole === 'admin' ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/20' :
              activeRole === 'resident' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20' :
              'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
            }`}
          >
            Sign In as {activeRole.charAt(0).toUpperCase() + activeRole.slice(1)}
          </button>
        </form>
        
        <div className="bg-gray-50 dark:bg-gray-700/30 p-4 text-center border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
                Secured by <span className="font-semibold text-gray-700 dark:text-gray-300">SocietyHub Shield™</span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
