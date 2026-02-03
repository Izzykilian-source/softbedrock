/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Users, Star, Clock, DollarSign, Plus, Edit, Trash2, 
  PlayCircle, FileText, HelpCircle, Save, BarChart2, Eye, Share2, MoreHorizontal, AlertTriangle 
} from 'lucide-react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

// --- DATABASE DUMMY (Data Unik Tiap Course) ---
const COURSES_DB = [
  {
    id: 1,
    title: 'Italian for Beginners',
    category: 'Language',
    level: 'Beginner',
    status: 'Published',
    price: 49,
    students: 1240,
    rating: 4.8,
    revenue: '$60,760',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Learn the basics of Italian language from scratch.',
    modules: [
        { id: 1, title: 'Module 1: Ciao!', lessons: [{ title: 'Greetings', type: 'video' }, { title: 'Alphabet', type: 'file' }] }
    ]
  },
  {
    id: 2,
    title: 'Mastering Italian Grammar',
    category: 'Academics',
    level: 'Intermediate',
    status: 'Published',
    price: 69,
    students: 850,
    rating: 4.6,
    revenue: '$58,650',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Deep dive into complex verbs and sentence structures.',
    modules: [
        { id: 1, title: 'Module 1: Verbs', lessons: [{ title: 'Past Tense', type: 'video' }, { title: 'Future Tense', type: 'quiz' }] }
    ]
  },
  {
    id: 3,
    title: 'Business Italian Pro',
    category: 'Business',
    level: 'Advanced',
    status: 'Draft',
    price: 89,
    students: 320,
    rating: 4.9,
    revenue: '$28,480',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Professional vocabulary for meetings and negotiations.',
    modules: []
  },
  {
    id: 4,
    title: 'Italian Culture & History',
    category: 'Culture',
    level: 'All Levels',
    status: 'Published',
    price: 39,
    students: 560,
    rating: 4.7,
    revenue: '$21,840',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Explore the history of Rome, Renaissance art, and modern culture.',
    modules: []
  },
  {
    id: 5,
    title: 'Travel Survival Kit',
    category: 'Travel',
    level: 'Beginner',
    status: 'Archived',
    price: 0,
    students: 2100,
    rating: 4.5,
    revenue: '$0',
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    description: 'Essential phrases for tourists visiting Italy.',
    modules: []
  }
];

// --- SUB-COMPONENTS ---

const AnalyticsTab = ({ course }) => {
    // Simulasi data grafik dinamis berdasarkan ID course (supaya grafiknya beda-beda dikit)
    const baseValue = course.students / 10; 
    const data = [
        { name: 'Mon', students: Math.floor(baseValue * 0.8) }, 
        { name: 'Tue', students: Math.floor(baseValue * 1.2) },
        { name: 'Wed', students: Math.floor(baseValue * 0.5) }, 
        { name: 'Thu', students: Math.floor(baseValue * 1.5) },
        { name: 'Fri', students: Math.floor(baseValue * 1.0) }, 
        { name: 'Sat', students: Math.floor(baseValue * 1.8) },
        { name: 'Sun', students: Math.floor(baseValue * 1.3) },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Total Revenue</p>
                    <h3 className="text-2xl font-bold text-gray-800">{course.revenue}</h3>
                    <p className="text-xs text-green-600 font-medium mt-1">Lifetime earnings</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Total Students</p>
                    <h3 className="text-2xl font-bold text-gray-800">{course.students}</h3>
                    <p className="text-xs text-blue-600 font-medium mt-1">Active learners</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <p className="text-gray-500 text-xs uppercase font-bold">Rating</p>
                    <h3 className="text-2xl font-bold text-gray-800">{course.rating}</h3>
                    <div className="flex text-yellow-400 text-xs mt-1">★★★★★</div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <h4 className="font-bold text-gray-800 mb-4">Enrollment Trend (Weekly)</h4>
                <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                            <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

const CurriculumTab = ({ initialModules }) => {
  // Gunakan modules dari database jika ada, jika kosong pakai default
  const defaultModules = [
    { id: 1, title: 'Module 1: Introduction', lessons: [{ id: 101, title: 'Welcome', type: 'video', meta: '5:00' }] }
  ];
  
  const [modules, setModules] = useState(initialModules && initialModules.length > 0 ? initialModules : defaultModules);

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
            <div>
                <h3 className="font-bold text-gray-800">Course Content</h3>
                <p className="text-sm text-gray-500">Manage modules and lessons.</p>
            </div>
            <button className="flex items-center space-x-2 bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition shadow-sm">
                <Plus size={18} /> <span>New Module</span>
            </button>
        </div>

        <div className="space-y-4">
            {modules.map((module, idx) => (
                <div key={idx} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-white p-4 flex justify-between items-center border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <h4 className="font-bold text-gray-800">{module.title}</h4>
                        </div>
                        <div className="flex space-x-2">
                             <button className="p-2 text-gray-400 hover:text-brand-600"><Edit size={16}/></button>
                        </div>
                    </div>
                    <div className="divide-y divide-gray-50 bg-gray-50/30">
                        {module.lessons && module.lessons.map((lesson, lIdx) => (
                            <div key={lIdx} className="p-3 pl-10 flex items-center justify-between hover:bg-white transition group">
                                <div className="flex items-center space-x-3">
                                    <div className={`p-2 rounded-lg ${lesson.type === 'video' ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {lesson.type === 'video' ? <PlayCircle size={16}/> : <FileText size={16}/>}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{lesson.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {modules.length === 0 && <p className="text-center text-gray-400 py-4">No content yet.</p>}
        </div>
    </div>
  );
};

const SettingsTab = ({ course, onSave }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">General Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Course Title</label>
                    <input type="text" defaultValue={course.title} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none"/>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                     <select className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white" defaultValue={course.category}>
                        <option>Language</option><option>Business</option><option>Culture</option><option>Academics</option><option>Travel</option>
                     </select>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                     <input type="number" defaultValue={course.price} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none"/>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                <button onClick={onSave} className="bg-brand-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-brand-700 transition flex items-center">
                    <Save size={18} className="mr-2"/> Save Changes
                </button>
            </div>
        </div>
    </div>
);

// --- MAIN COMPONENT ---

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('analytics');
  
  // 1. CARI DATA: Temukan course berdasarkan ID dari URL
  // parseInt(id) penting karena id dari URL berbentuk string
  const course = COURSES_DB.find(c => c.id === parseInt(id));

  const handleSave = () => {
      const promise = new Promise((resolve) => setTimeout(resolve, 1000));
      toast.promise(promise, {
          loading: 'Saving course settings...',
          success: 'Changes saved successfully!',
          error: 'Error saving changes'
      });
  };

  // 2. ERROR HANDLING: Jika ID tidak ditemukan (misal user ketik /courses/999)
  if (!course) {
      return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="bg-red-100 text-red-500 p-4 rounded-full mb-4"><AlertTriangle size={48} /></div>
              <h2 className="text-2xl font-bold text-gray-800">Course Not Found</h2>
              <p className="text-gray-500 mb-6">The course you are looking for does not exist or has been removed.</p>
              <button onClick={() => navigate('/courses')} className="bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition">Back to Courses</button>
          </div>
      );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-10">
      {/* Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
         <button onClick={() => navigate('/courses')} className="flex items-center text-gray-500 hover:text-brand-600 transition group">
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Courses
         </button>
         <div className="flex space-x-3">
             <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-gray-50 transition">
                 <Eye size={18}/> <span>Preview</span>
             </button>
         </div>
      </div>

      {/* Hero Card (DYNAMIC DATA) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group">
         <div className="h-48 w-full relative">
             <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
             <div className="absolute bottom-6 left-6 text-white max-w-2xl">
                 <div className="flex items-center space-x-3 mb-2">
                     <span className="bg-brand-500 text-white px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                        {course.category}
                     </span>
                     <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide flex items-center gap-1
                        ${course.status === 'Published' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                        {course.status === 'Published' && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>}
                        {course.status}
                     </span>
                 </div>
                 <h1 className="text-3xl font-bold mb-1">{course.title}</h1>
                 <p className="text-gray-300 text-sm line-clamp-1">{course.description}</p>
             </div>
         </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl overflow-x-auto">
          {['analytics', 'curriculum', 'settings'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-sm font-bold capitalize rounded-lg transition-all ${
                    activeTab === tab ? 'bg-white text-brand-600 shadow-sm' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                }`}
              >
                  {tab}
              </button>
          ))}
      </div>

      {/* Tab Content (PASSING PROPS) */}
      <div className="min-h-[400px]">
          {/* Kita oper data 'course' ke komponen anak */}
          {activeTab === 'analytics' && <AnalyticsTab course={course} />}
          {activeTab === 'curriculum' && <CurriculumTab initialModules={course.modules} />}
          {activeTab === 'settings' && <SettingsTab course={course} onSave={handleSave} />}
      </div>
    </div>
  );
};

export default CourseDetail;