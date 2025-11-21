import React, { useState } from 'react';
import { ChatChannel, ChatMessage } from '../types';
import { Hash, Search, Volume2, MoreVertical, Send, Paperclip, Smile, Info, Plus, Users, ArrowLeft, Menu } from 'lucide-react';

const channels: ChatChannel[] = [
  { id: '1', name: 'general', type: 'public', unreadCount: 0 },
  { id: '2', name: 'announcements', type: 'public', unreadCount: 3 },
  { id: '3', name: 'maintenance', type: 'public', unreadCount: 0 },
  { id: '4', name: 'gardening-club', type: 'public', unreadCount: 0 },
];

const messages: ChatMessage[] = [
  { id: '1', sender: 'Jane Doe', avatar: 'https://picsum.photos/id/65/40/40', time: '10:30 AM', content: "Don't forget the community meeting tonight at 7 PM in the clubhouse!", isMe: false },
  { id: '2', sender: 'You', avatar: 'https://picsum.photos/id/64/40/40', time: '10:31 AM', content: "Thanks for the reminder, Jane! Will there be snacks?", isMe: true },
  { id: '3', sender: 'Mark Anderson', avatar: 'https://picsum.photos/id/66/40/40', time: '10:35 AM', content: "I heard there will be cookies. That's the real reason I'm going.", isMe: false, reactions: [{emoji: '🍪', count: 3}, {emoji: '😂', count: 1}] },
];

const CommunityChat: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<string>('general');
  const [showMobileChat, setShowMobileChat] = useState(false); // State to toggle view on mobile
  const [input, setInput] = useState('');

  const handleChannelClick = (channelName: string) => {
    setActiveChannel(channelName);
    setShowMobileChat(true); // Switch to chat view on mobile
  };

  return (
    <div className="flex h-[calc(100vh-140px)] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative">
      
      {/* Channels Sidebar */}
      {/* Mobile: W-full when chat is closed. Desktop: W-64 always visible */}
      <div className={`w-full md:w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
           <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
             <input 
               type="text" 
               placeholder="Search channels..." 
               className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
             />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {channels.map(channel => (
            <button
              key={channel.id}
              onClick={() => handleChannelClick(channel.name)}
              className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeChannel === channel.name 
                  ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-200' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700/50'
              }`}
            >
              <div className="flex items-center gap-3">
                {channel.name === 'announcements' ? <Volume2 size={18} /> : <Hash size={18} />}
                <span className="truncate text-base md:text-sm">#{channel.name}</span>
              </div>
              {channel.unreadCount ? (
                <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {channel.unreadCount}
                </span>
              ) : channel.name === 'general' && (
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              )}
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center justify-center gap-2">
            <Plus size={18} /> Create Channel
          </button>
        </div>
      </div>

      {/* Chat Area */}
      {/* Mobile: Flex (fullscreen) when chat is open. Desktop: Always Flex */}
      <div className={`flex-1 flex-col min-w-0 bg-white dark:bg-gray-800 ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 md:px-6 flex-shrink-0">
           <div className="flex items-center gap-2 md:gap-3">
             {/* Back Button for Mobile */}
             <button 
                onClick={() => setShowMobileChat(false)} 
                className="md:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
             >
                <ArrowLeft size={20} />
             </button>
             
             <Hash size={20} className="text-gray-400 hidden md:block" />
             <div>
               <h3 className="font-bold text-gray-900 dark:text-white text-lg md:text-base">#{activeChannel}</h3>
               <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Discuss anything and everything with your neighbors.</p>
             </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm gap-1">
                <Users size={16} />
                <span>14</span>
              </div>
              <Info size={20} className="text-gray-400 cursor-pointer hover:text-gray-600" />
           </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-white dark:bg-gray-800 scrollbar-hide">
           <div className="flex flex-col items-center justify-center py-4">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mb-2">
                <Hash size={32} className="text-gray-400" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white">#{activeChannel}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Created on Jan 1, 2023</p>
           </div>
           
           <div className="relative flex py-2 items-center">
             <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
             <span className="flex-shrink-0 mx-4 text-gray-400 text-xs">Today</span>
             <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
           </div>

           {messages.map((msg) => (
             <div key={msg.id} className={`flex gap-3 md:gap-4 group ${msg.isMe ? 'flex-row-reverse' : ''}`}>
               <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover" />
               <div className={`flex flex-col max-w-[75%] md:max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                 <div className="flex items-baseline gap-2 mb-1">
                   <span className="font-bold text-gray-900 dark:text-white text-xs md:text-sm">{msg.sender}</span>
                   <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400">{msg.time}</span>
                 </div>
                 <div className={`p-3 rounded-2xl text-sm leading-relaxed relative shadow-sm ${
                   msg.isMe 
                     ? 'bg-blue-600 text-white rounded-tr-none' 
                     : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
                 }`}>
                   {msg.content}
                   {msg.reactions && (
                     <div className="absolute -bottom-3 left-2 flex gap-1">
                       {msg.reactions.map((r, i) => (
                         <span key={i} className="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-full px-1.5 py-0.5 text-[10px] shadow-sm">
                           {r.emoji} {r.count}
                         </span>
                       ))}
                     </div>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl p-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-shadow">
            <textarea 
              rows={1}
              className="w-full bg-transparent border-none focus:ring-0 resize-none p-2 text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              placeholder={`Message #${activeChannel}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div className="flex justify-between items-center mt-2 px-1">
              <div className="flex gap-2 text-gray-400">
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"><Paperclip size={18} /></button>
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition"><Smile size={18} /></button>
              </div>
              <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-green-700 transition flex items-center gap-1">
                <Send size={14} className="md:hidden" />
                <span className="hidden md:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Member Sidebar (Hidden on mobile and tablet) */}
      <div className="hidden xl:block w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4">
        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Pinned Messages</h4>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-6 border border-blue-100 dark:border-blue-800">
          <p className="text-xs text-blue-900 dark:text-blue-200 leading-relaxed">
            <span className="font-bold block mb-1">📌 Community BBQ</span>
             this Saturday at 2 PM. Please RSVP.
             <span className="block mt-2 text-blue-500 dark:text-blue-400 text-[10px]">- Admin</span>
          </p>
        </div>

        <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Members (14)</h4>
        <ul className="space-y-3">
          <li className="flex items-center gap-2">
            <img src="https://picsum.photos/id/64/32/32" className="w-8 h-8 rounded-full border dark:border-gray-600" alt="You" />
            <div className="flex-1">
               <p className="text-sm font-medium text-gray-900 dark:text-white">John Doe (You)</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </li>
           <li className="flex items-center gap-2">
            <img src="https://picsum.photos/id/65/32/32" className="w-8 h-8 rounded-full border dark:border-gray-600" alt="Jane" />
            <div className="flex-1">
               <p className="text-sm font-medium text-gray-900 dark:text-white">Jane Doe</p>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </li>
          <li className="flex items-center gap-2">
            <img src="https://picsum.photos/id/66/32/32" className="w-8 h-8 rounded-full border dark:border-gray-600" alt="Mark" />
            <div className="flex-1">
               <p className="text-sm font-medium text-gray-900 dark:text-white">Mark Anderson</p>
            </div>
            <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityChat;