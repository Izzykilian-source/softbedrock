import React, { useState } from 'react';
import { Plus, Users, Star, Search, BookOpen, X, Trash2, AlertTriangle } from 'lucide-react'; // Tambah AlertTriangle
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Courses = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modal Tambah Course
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // State BARU untuk Modal Delete
  const [courseToDelete, setCourseToDelete] = useState(null); // Menyimpan ID course yang akan dihapus

  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'Italian for Beginners', 
      category: 'Language', 
      level: 'Beginner', 
      students: 1240, 
      rating: 4.8, 
      price: '$49', 
      status: 'Published', 
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 2, 
      title: 'Mastering Italian Grammar', 
      category: 'Academics', 
      level: 'Intermediate', 
      students: 850, 
      rating: 4.6, 
      price: '$69', 
      status: 'Published', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 3, 
      title: 'Business Italian Pro', 
      category: 'Business', 
      level: 'Advanced', 
      students: 320, 
      rating: 4.9, 
      price: '$89', 
      status: 'Draft', 
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 4, 
      title: 'Italian Culture & History', 
      category: 'Culture', 
      level: 'All Levels', 
      students: 560, 
      rating: 4.7, 
      price: '$39', 
      status: 'Published', 
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
    { 
      id: 5, 
      title: 'Travel Survival Kit', 
      category: 'Travel', 
      level: 'Beginner', 
      students: 2100, 
      rating: 4.5, 
      price: 'Free', 
      status: 'Archived', 
      image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
    },
  ]);

  const [newCourse, setNewCourse] = useState({ title: '', price: '', category: 'Language' });

  const filteredCourses = courses.filter(course => {
    const matchesTab = activeTab === 'All' || course.status === activeTab;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddCourse = (e) => {
    e.preventDefault();
    const newId = courses.length + 1;
    const courseToAdd = {
      id: newId,
      ...newCourse,
      level: 'Beginner',
      students: 0,
      rating: 0,
      status: 'Draft',
      image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    };
    
    setCourses([courseToAdd, ...courses]); 
    setIsAddModalOpen(false);
    setNewCourse({ title: '', price: '', category: 'Language' });
    toast.success('New course created successfully!');
  };

  // 1. Trigger Modal Hapus
  const promptDelete = (id, e) => {
    e.stopPropagation(); // Mencegah masuk ke halaman detail
    setCourseToDelete(id); // Simpan ID ke state -> Modal akan muncul
  };

  // 2. Eksekusi Hapus (Saat user klik Yes di Modal)
  const confirmDelete = () => {
    if (courseToDelete) {
        setCourses(courses.filter(c => c.id !== courseToDelete));
        setCourseToDelete(null); // Tutup modal
        toast.success('Course deleted permanently.', { icon: '🗑️' });
    }
  };

  return (
    <div className="relative">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Course Management</h2>
          <p className="text-gray-500 mt-1">Manage your educational content and catalog.</p>
        </div>
        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center space-x-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm hover:shadow-lg transform hover:-translate-y-0.5 duration-200">
          <Plus size={20} />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto max-w-full">
          {['All', 'Published', 'Draft', 'Archived'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition"
            />
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div 
            key={course.id} 
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full relative cursor-pointer"
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            
            {/* Tombol Hapus: Sekarang memanggil promptDelete */}
            <button 
                onClick={(e) => promptDelete(course.id, e)}
                className="absolute top-3 right-3 z-20 p-2 bg-white/90 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition shadow-sm hover:bg-red-50 hover:text-red-600"
                title="Delete Course"
            >
                <Trash2 size={16} />
            </button>

            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-3 left-3 z-10">
                 <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                   <BookOpen size={12} className="text-brand-600"/>
                   {course.category}
                 </span>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wider">{course.level}</span>
                  <h3 className="font-bold text-gray-800 text-lg leading-tight mt-1 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors">
                      {course.title}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-gray-50">
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5"><Users size={16} /><span>{course.students}</span></div>
                    <div className="flex items-center space-x-1.5"><Star size={16} className="text-yellow-400 fill-yellow-400" /><span>{course.rating}</span></div>
                </div>
                <div className="font-bold text-gray-900 text-lg">{course.price}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODAL 1: ADD COURSE --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800">Create New Course</h3>
                    <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600"><X size={24}/></button>
                </div>
                <form onSubmit={handleAddCourse} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                        <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="e.g., Italian Masterclass" 
                            value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input required type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="$49"
                                value={newCourse.price} onChange={e => setNewCourse({...newCourse, price: e.target.value})} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                                value={newCourse.category} onChange={e => setNewCourse({...newCourse, category: e.target.value})}>
                                <option>Language</option>
                                <option>Culture</option>
                                <option>Business</option>
                                <option>Academics</option>
                                <option>Travel</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className="pt-4 flex space-x-3">
                         <button type="button" onClick={() => setIsAddModalOpen(false)} className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                         <button type="submit" className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-lg transition shadow-sm">Create Course</button>
                    </div>
                </form>
            </div>
        </div>
      )}

      {/* --- MODAL 2: CONFIRM DELETE (BARU & KEREN) --- */}
      {courseToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
           <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 animate-scale-up text-center">
               <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <AlertTriangle size={32} />
               </div>
               <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Course?</h3>
               <p className="text-gray-500 text-sm mb-6">
                   Are you sure you want to delete this course? This action cannot be undone and all student data will be lost.
               </p>
               <div className="flex space-x-3">
                   <button 
                      onClick={() => setCourseToDelete(null)}
                      className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition"
                   >
                       Cancel
                   </button>
                   <button 
                      onClick={confirmDelete}
                      className="flex-1 py-2.5 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition shadow-sm"
                   >
                       Yes, Delete
                   </button>
               </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default Courses;