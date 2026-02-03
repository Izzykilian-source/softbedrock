import React, { useState } from 'react';
import { CheckCircle, XCircle, Search, Mail, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const FreeSamples = () => {
  const [activeTab, setActiveTab] = useState('New');
  const [searchTerm, setSearchTerm] = useState('');

  // State Data Requests
  const [requests, setRequests] = useState([
    { id: 1, name: 'Giulia Romano', email: 'giulia.r@gmail.com', location: 'Jakarta, ID', date: '2 hrs ago', status: 'New', course: 'Italian for Beginners', avatar: 'bg-pink-100 text-pink-600' },
    { id: 2, name: 'Dimas Anggara', email: 'dimas.anggara@yahoo.com', location: 'Surabaya, ID', date: '5 hrs ago', status: 'New', course: 'Business Italian', avatar: 'bg-blue-100 text-blue-600' },
    { id: 3, name: 'Sarah Connor', email: 'sarah.c@tech.us', location: 'Bali, ID', date: '1 day ago', status: 'In Progress', course: 'Travel Survival Kit', avatar: 'bg-purple-100 text-purple-600' },
  ]);

  // LOGIC: Update Status
  const updateStatus = (id, newStatus) => {
    setRequests(requests.map(req => 
        req.id === id ? { ...req, status: newStatus } : req
    ));
    
    if (newStatus === 'Rejected') {
        toast.error('Request rejected');
        // Opsi: Bisa juga dihapus dari list
        // setRequests(requests.filter(r => r.id !== id));
    } else {
        toast.success(`Request marked as ${newStatus}`);
    }
  };

  // Filter Logic
  const filteredRequests = requests.filter(r => {
      const matchTab = activeTab === 'All' || r.status === activeTab;
      const matchSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchTab && matchSearch;
  });

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Sample Requests</h2>
        <p className="text-gray-500 mt-1">Manage leads requesting free trial access.</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-gray-100 p-1 rounded-lg flex space-x-1">
          {['New', 'In Progress', 'Completed', 'All'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${activeTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>{tab}</button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
           <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
           <input type="text" placeholder="Search leads..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"/>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map((req) => (
          <div key={req.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${req.avatar}`}>{req.name.charAt(0)}</div>
              <div>
                <h4 className="font-bold text-gray-800">{req.name}</h4>
                <div className="flex items-center space-x-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center"><Mail size={12} className="mr-1"/> {req.email}</span>
                  <span className="hidden md:flex items-center"><MapPin size={12} className="mr-1"/> {req.location}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons Logic */}
            <div className="flex items-center space-x-2">
              {req.status === 'New' && (
                <>
                  <button onClick={() => updateStatus(req.id, 'In Progress')} className="flex items-center space-x-1 px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition shadow-sm">
                    <CheckCircle size={16} /> <span>Approve</span>
                  </button>
                  <button onClick={() => updateStatus(req.id, 'Rejected')} className="p-2 border border-gray-200 hover:bg-red-50 hover:text-red-600 text-gray-500 rounded-lg transition">
                    <XCircle size={20} />
                  </button>
                </>
              )}
              {req.status !== 'New' && (
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide rounded-full ${req.status === 'Completed' ? 'bg-green-100 text-green-700' : req.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                  {req.status}
                </span>
              )}
            </div>
          </div>
        ))}
        {filteredRequests.length === 0 && <p className="text-center text-gray-400 py-10">No data found.</p>}
      </div>
    </div>
  );
};

export default FreeSamples;