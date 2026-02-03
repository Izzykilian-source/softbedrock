import React, { useState } from 'react';
import { Search, MoreHorizontal, Shield, X, UserPlus, Trash2, AlertTriangle } from 'lucide-react'; // Tambah AlertTriangle
import toast from 'react-hot-toast';

const Users = () => {
  // 1. STATE: Data Users
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice Johnson', email: 'alice@ex.com', role: 'Student', status: 'Active', progress: 75, course: 'Italian Basics', lastLogin: '2 mins ago', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 2, name: 'Robert Smith', email: 'rob@ex.com', role: 'Student', status: 'Inactive', progress: 12, course: 'Grammar Pro', lastLogin: '5 days ago', image: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
    { id: 3, name: 'Admin Staff', email: 'admin@softbedrock.com', role: 'Admin', status: 'Active', progress: 100, course: '-', lastLogin: 'Online', image: null },
    { id: 4, name: 'Karen Doe', email: 'karen@ex.com', role: 'Student', status: 'Active', progress: 45, course: 'Italian Basics', lastLogin: '1 hour ago', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
  ]);

  // 2. STATE: Kontrol Modal Add & Delete
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // State untuk menyimpan ID user yg mau dihapus
  
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Student' });
  const [searchTerm, setSearchTerm] = useState('');

  // LOGIC: Tambah User
  const handleAddUser = (e) => {
    e.preventDefault();
    const userToAdd = {
      id: Date.now(),
      ...newUser,
      status: 'Active',
      progress: 0,
      course: newUser.role === 'Student' ? 'Not Started' : '-',
      lastLogin: 'Never',
      image: null
    };

    setUsers([userToAdd, ...users]);
    setIsAddModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Student' });
    toast.success(`${newUser.name} added successfully!`);
  };

  // LOGIC: Trigger Modal Delete
  const promptDelete = (id) => {
      setUserToDelete(id); // Munculkan modal konfirmasi
  };

  // LOGIC: Eksekusi Hapus
  const confirmDelete = () => {
    if (userToDelete) {
        setUsers(users.filter(user => user.id !== userToDelete));
        setUserToDelete(null); // Tutup modal
        toast.success('User removed from database.', { icon: '🗑️' });
    }
  };

  // Logic Search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
          <p className="text-gray-500">Track student progress and accounts.</p>
        </div>
        
        <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition shadow-sm flex items-center space-x-2"
        >
          <UserPlus size={18} />
          <span>Add User</span>
        </button>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-72">
             <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
             <input 
                type="text" 
                placeholder="Search users..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:border-brand-500"
             />
          </div>
          <div className="flex space-x-2">
             <select className="border border-gray-200 rounded-lg text-sm p-2 outline-none text-gray-600 bg-white">
                <option>All Roles</option>
                <option>Student</option>
                <option>Admin</option>
             </select>
          </div>
        </div>

        {/* Table Body */}
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4 pl-6">User</th>
              <th className="p-4">Current Course & Progress</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Login</th>
              <th className="p-4 text-right pr-6">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition group">
                <td className="p-4 pl-6">
                  <div className="flex items-center space-x-3">
                    {user.image ? (
                        <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold border border-brand-200 uppercase">
                           {user.name.charAt(0)}
                        </div>
                    )}
                    <div>
                      <div className="flex items-center space-x-2">
                         <p className="font-bold text-gray-800">{user.name}</p>
                         {user.role === 'Admin' && <Shield size={14} className="text-purple-600 fill-purple-100"/>}
                      </div>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                
                <td className="p-4 w-1/3">
                  {user.role === 'Student' ? (
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                            <span className="font-medium text-gray-700">{user.course}</span>
                            <span className="text-brand-600 font-bold">{user.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                            <div 
                                className="bg-brand-500 h-2 rounded-full transition-all duration-1000" 
                                style={{ width: `${user.progress}%` }}
                            ></div>
                        </div>
                      </div>
                  ) : (
                      <span className="text-gray-400 text-sm italic">System Access</span>
                  )}
                </td>

                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border
                    ${user.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${user.lastLogin === 'Online' ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                        <span>{user.lastLogin}</span>
                    </div>
                </td>
                <td className="p-4 text-right pr-6">
                  {/* Tombol Delete memanggil promptDelete */}
                  <button 
                    onClick={() => promptDelete(user.id)}
                    className="text-gray-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition"
                    title="Delete User"
                  >
                      <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
            <div className="p-8 text-center text-gray-400">No users found.</div>
        )}
      </div>

      {/* --- MODAL 1: ADD USER --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">Add New User</h3>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X size={24}/>
                    </button>
                </div>
                
                <form onSubmit={handleAddUser} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input 
                            required 
                            type="text" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" 
                            placeholder="e.g. John Doe" 
                            value={newUser.name} 
                            onChange={e => setNewUser({...newUser, name: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input 
                            required 
                            type="email" 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" 
                            placeholder="e.g. john@example.com"
                            value={newUser.email} 
                            onChange={e => setNewUser({...newUser, email: e.target.value})} 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select 
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                            value={newUser.role} 
                            onChange={e => setNewUser({...newUser, role: e.target.value})}
                        >
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>

                    <div className="pt-4 flex space-x-3">
                        <button 
                            type="button" 
                            onClick={() => setIsAddModalOpen(false)}
                            className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 py-2.5 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium shadow-sm"
                        >
                            Create Account
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* --- MODAL 2: CONFIRM DELETE USER (BARU) --- */}
      {userToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-scale-up text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertTriangle size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete User?</h3>
               <p className="text-gray-500 text-sm mb-6">
                   Are you sure you want to remove this user? Their access and progress data will be permanently deleted.
               </p>
               <div className="flex space-x-3">
                   <button 
                      onClick={() => setUserToDelete(null)}
                      className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                   >
                       Cancel
                   </button>
                   <button 
                      onClick={confirmDelete}
                      className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-sm"
                   >
                       Yes, Remove
                   </button>
               </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Users;