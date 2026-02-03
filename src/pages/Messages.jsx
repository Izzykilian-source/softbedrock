import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, MoreVertical, Phone, Video } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const [chats] = useState([
    { id: 1, name: 'Marco Rossi', time: '10:30 AM', online: true, avatar: 'bg-blue-100 text-blue-600' },
    { id: 2, name: 'Julia Smith', time: 'Yesterday', online: false, avatar: 'bg-pink-100 text-pink-600' },
  ]);

  // State Percakapan
  const [conversation, setConversation] = useState([
    { id: 1, text: "Hi, I'm stuck on the Italian grammar quiz.", sender: 'user', time: '10:25 AM' },
    { id: 2, text: "Hello! Don't worry, let me check. Which question?", sender: 'admin', time: '10:28 AM' },
  ]);

  // Scroll ke bawah saat ada pesan baru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  // LOGIC: Kirim Pesan
  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage = {
        id: conversation.length + 1,
        text: inputText,
        sender: 'admin',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversation([...conversation, newMessage]);
    setInputText(''); // Clear input
  };

  const currentChat = chats.find(c => c.id === selectedChat);

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex">
      {/* Sidebar (Static untuk demo ini) */}
      <div className="w-1/3 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 bg-white">
             <input type="text" placeholder="Search..." className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 outline-none"/>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} className={`p-4 flex items-center space-x-3 cursor-pointer border-b border-gray-50 ${selectedChat === chat.id ? 'bg-white border-l-4 border-l-brand-500' : ''}`}>
               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${chat.avatar}`}>{chat.name.charAt(0)}</div>
               <div><h4 className="text-sm font-bold text-gray-800">{chat.name}</h4><span className="text-xs text-gray-400">Click to chat</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center shadow-sm z-10">
          <div className="flex items-center space-x-3">
             <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentChat.avatar}`}>{currentChat.name.charAt(0)}</div>
             <div><h3 className="font-bold text-gray-800">{currentChat.name}</h3><span className="text-xs text-green-600 font-medium">Online</span></div>
          </div>
          <MoreVertical size={20} className="text-gray-400 cursor-pointer"/>
        </div>

        {/* Chat Bubbles */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
           {conversation.map((msg) => (
             <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm ${msg.sender === 'admin' ? 'bg-brand-600 text-white rounded-tr-none' : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'}`}>
                 <p>{msg.text}</p>
                 <p className={`text-[10px] mt-1 text-right opacity-70`}>{msg.time}</p>
               </div>
             </div>
           ))}
           <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-gray-100 bg-white">
           <div className="flex items-center space-x-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
             <input 
               type="text" 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Type a message..." 
               className="flex-1 bg-transparent focus:outline-none text-sm text-gray-700"
             />
             <button type="submit" className="bg-brand-600 hover:bg-brand-700 text-white p-2 rounded-lg transition shadow-sm"><Send size={18} /></button>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Messages;