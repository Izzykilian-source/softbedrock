/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Users, BookOpen, DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal, Plus, Send, FileText, CheckSquare, Square, DownloadCloud, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Skeleton from '../components/Skeleton'; // Pastikan path ini benar

// --- DATA DUMMY CHART ---
const weeklyData = [
  { name: 'Mon', income: 1200 }, { name: 'Tue', income: 2100 }, { name: 'Wed', income: 800 },
  { name: 'Thu', income: 1600 }, { name: 'Fri', income: 2400 }, { name: 'Sat', income: 3200 }, { name: 'Sun', income: 1800 },
];

const monthlyData = [
  { name: 'Jan', income: 4000 }, { name: 'Feb', income: 3000 }, { name: 'Mar', income: 5000 },
  { name: 'Apr', income: 2780 }, { name: 'May', income: 1890 }, { name: 'Jun', income: 2390 }, { name: 'Jul', income: 3490 },
];

const topCourses = [
  { name: 'Italian Basics', students: 400 }, { name: 'Travel Kit', students: 300 },
  { name: 'Business Pro', students: 200 }, { name: 'Grammar', students: 150 },
];

// --- DATA DUMMY ENROLLMENTS (REALISTIS) ---
const recentEnrollments = [
  { 
    id: 'TRX-9801', 
    user: 'Sofia Rossi', 
    email: 'sofia.r@gmail.com',
    course: 'Italian for Beginners', 
    amount: '$49.00', 
    status: 'Completed', 
    date: '2 mins ago',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 'TRX-9802', 
    user: 'James Miller', 
    email: 'james.m@work.co', 
    course: 'Business Italian Pro', 
    amount: '$89.00', 
    status: 'Pending', 
    date: '15 mins ago',
    img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 'TRX-9803', 
    user: 'Yuki Tanaka', 
    email: 'yuki.t@proto.jp', 
    course: 'Travel Survival Kit', 
    amount: '$39.00', 
    status: 'Completed', 
    date: '1 hour ago',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  { 
    id: 'TRX-9804', 
    user: 'Budi Santoso', 
    email: 'budi.santoso@mail.id', 
    course: 'Italian for Beginners', 
    amount: '$49.00', 
    status: 'Failed', 
    date: '3 hours ago',
    img: null 
  },
  { 
    id: 'TRX-9805', 
    user: 'Sarah Jenkins', 
    email: 'sarah.j@design.net', 
    course: 'Mastering Italian Grammar', 
    amount: '$69.00', 
    status: 'Completed', 
    date: '5 hours ago',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
];

// --- COMPONENTS ---

const KpiCard = ({ title, value, trend, trendValue, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon size={20} className={color.replace('bg-', 'text-')} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className={`${trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} flex items-center font-medium px-2 py-0.5 rounded`}>
        {trend === 'up' ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
        {trendValue}
      </span>
      <span className="text-gray-400 ml-2">vs last period</span>
    </div>
  </div>
);

const QuickActionButton = ({ icon: Icon, label, color, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-xl hover:bg-white hover:shadow-md border border-transparent hover:border-gray-100 transition-all group active:scale-95">
    <div className={`p-3 rounded-full mb-2 ${color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
      <Icon size={20} />
    </div>
    <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{label}</span>
  </button>
);

const Overview = () => {
  const [chartPeriod, setChartPeriod] = useState('Monthly');
  const [loading, setLoading] = useState(true); // State Loading
  
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review new sample requests', done: false },
    { id: 2, text: 'Update "Italian Basics" price', done: true },
    { id: 3, text: 'Email marketing campaign', done: false },
  ]);
  const [newTaskInput, setNewTaskInput] = useState('');
  const navigate = useNavigate();

  // 1. SIMULASI API LOADING (2 Detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  // --- LOGIC TASK ---
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const handleAddTask = (e) => {
    if (e.key === 'Enter') {
        if (!newTaskInput.trim()) return;
        setTodos([...todos, { id: Date.now(), text: newTaskInput, done: false }]);
        setNewTaskInput('');
        toast.success('Task added to list!');
    }
  };

  // --- LOGIC NOTIFIKASI NATURAL ---
  const handleBroadcast = () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-xl rounded-2xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 overflow-hidden`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
               <div className="h-10 w-10 rounded-full bg-brand-100 flex items-center justify-center">
                 <Send className="h-5 w-5 text-brand-600" />
               </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-bold text-gray-900">Broadcast Sent!</p>
              <p className="mt-1 text-sm text-gray-500">
                Your email has been queued and will be sent to <b>1,240 students</b> shortly.
              </p>
            </div>
          </div>
        </div>
        <div className="flex border-l border-gray-100">
          <button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-brand-600 hover:text-brand-500 focus:outline-none">
            Close
          </button>
        </div>
      </div>
    ), { duration: 5000 });
  };

  const handleGenerateReport = () => {
    const toastId = toast.loading('Compiling data for your report...');
    setTimeout(() => {
        toast.dismiss(toastId);
        toast.custom((t) => (
            <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} bg-white px-6 py-4 rounded-xl shadow-xl border border-gray-100 flex items-center space-x-4`}>
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <DownloadCloud size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-gray-800">Report Ready</h4>
                    <p className="text-xs text-gray-500">Monthly_Revenue_Oct2023.pdf has been downloaded.</p>
                </div>
            </div>
        ));
    }, 2000);
  };

  // Helper Warna Status
  const getStatusColor = (status) => {
      switch(status) {
          case 'Completed': return 'bg-green-100 text-green-700';
          case 'Pending': return 'bg-yellow-100 text-yellow-700';
          case 'Failed': return 'bg-red-100 text-red-700';
          default: return 'bg-gray-100 text-gray-700';
      }
  };

  const getStatusIcon = (status) => {
    switch(status) {
        case 'Completed': return <CheckCircle size={14} className="mr-1"/>;
        case 'Pending': return <Clock size={14} className="mr-1"/>;
        case 'Failed': return <AlertCircle size={14} className="mr-1"/>;
        default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
          <p className="text-gray-500 mt-1">Track your performance and manage daily tasks.</p>
        </div>
        {loading ? (
            <Skeleton className="w-48 h-10" />
        ) : (
            <div className="flex space-x-2 bg-white p-1 rounded-lg border border-gray-200 shadow-sm">
            {['Weekly', 'Monthly'].map((period) => (
                <button 
                key={period} 
                onClick={() => setChartPeriod(period)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${chartPeriod === period ? 'bg-brand-100 text-brand-700 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                {period}
                </button>
            ))}
            </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
            Array(4).fill(0).map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-32 flex flex-col justify-between">
                    <div className="flex justify-between">
                        <Skeleton className="w-24 h-4" />
                        <Skeleton className="w-10 h-10 rounded-lg" />
                    </div>
                    <Skeleton className="w-32 h-8" />
                </div>
            ))
        ) : (
            <>
                <KpiCard title="Total Revenue" value="$24,500" trend="up" trendValue="12%" icon={DollarSign} color="bg-green-500 text-green-600" />
                <KpiCard title="Active Students" value="1,240" trend="up" trendValue="8.2%" icon={Users} color="bg-blue-500 text-blue-600" />
                <KpiCard title="Course Completion" value="84%" trend="down" trendValue="2.1%" icon={BookOpen} color="bg-purple-500 text-purple-600" />
                <KpiCard title="Growth Rate" value="+18.2%" trend="up" trendValue="4.5%" icon={TrendingUp} color="bg-orange-500 text-orange-600" />
            </>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT: Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-96">
          {loading ? (
             <div className="h-full flex flex-col space-y-4">
                 <div className="flex justify-between">
                     <Skeleton className="w-48 h-6" />
                     <Skeleton className="w-8 h-8 rounded-full" />
                 </div>
                 <Skeleton className="w-full h-full rounded-xl" />
             </div>
          ) : (
             <>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="font-bold text-gray-800 text-lg">Revenue Analytics</h3>
                        <p className="text-xs text-gray-400">Income based on {chartPeriod} period</p>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal size={20}/></button>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartPeriod === 'Monthly' ? monthlyData : weeklyData}>
                        <defs>
                          <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="income" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" animationDuration={1000} />
                      </AreaChart>
                    </ResponsiveContainer>
                </div>
             </>
          )}
        </div>

        {/* RIGHT: Quick Actions & Todo List */}
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                {loading ? (
                    <div className="space-y-4">
                        <Skeleton className="w-32 h-6" />
                        <div className="grid grid-cols-2 gap-3">
                            <Skeleton className="h-24 rounded-xl" />
                            <Skeleton className="h-24 rounded-xl" />
                            <Skeleton className="h-24 rounded-xl" />
                            <Skeleton className="h-24 rounded-xl" />
                        </div>
                    </div>
                ) : (
                    <>
                        <h3 className="font-bold text-gray-800 text-lg mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <QuickActionButton icon={Plus} label="New Course" color="bg-blue-500" onClick={() => navigate('/courses')} />
                            <QuickActionButton icon={Users} label="Add Student" color="bg-green-500" onClick={() => navigate('/users')} />
                            <QuickActionButton icon={Send} label="Broadcast" color="bg-purple-500" onClick={handleBroadcast} />
                            <QuickActionButton icon={FileText} label="Reports" color="bg-orange-500" onClick={handleGenerateReport} />
                        </div>
                    </>
                )}
            </div>

             <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 text-lg">My Tasks</h3>
                    <span className="text-xs bg-brand-100 text-brand-700 px-2 py-1 rounded-full font-bold">{todos.filter(t=>!t.done).length} Pending</span>
                </div>
                
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[180px]">
                    {todos.map(todo => (
                        <div key={todo.id} onClick={() => toggleTodo(todo.id)} className="flex items-center space-x-3 cursor-pointer group">
                            <div className={`transition-colors ${todo.done ? 'text-brand-500' : 'text-gray-300 group-hover:text-brand-400'}`}>
                                {todo.done ? <CheckSquare size={20} /> : <Square size={20} />}
                            </div>
                            <span className={`text-sm select-none ${todo.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>{todo.text}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50">
                    <input 
                        type="text" 
                        value={newTaskInput}
                        onChange={(e) => setNewTaskInput(e.target.value)}
                        onKeyDown={handleAddTask}
                        placeholder="+ Add new task (Press Enter)..." 
                        className="w-full text-sm bg-transparent outline-none text-gray-600 placeholder-gray-400 focus:text-gray-900" 
                    />
                </div>
            </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
           {loading ? <Skeleton className="w-full h-64 rounded-xl"/> : (
             <>
               <h3 className="font-bold text-gray-800 text-lg mb-6">Popular Courses</h3>
               <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCourses} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} tickLine={false} axisLine={false} tick={{fill: '#4b5563', fontSize: 13, fontWeight: 500}} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="students" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
               </div>
             </>
           )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
            {loading ? (
                <div className="p-6 space-y-4">
                    <Skeleton className="w-48 h-6 mb-4" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                </div>
            ) : (
                <>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800 text-lg">Recent Enrollments</h3>
                    <button className="text-sm text-brand-600 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left">
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {recentEnrollments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition group">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        <div className="flex items-center space-x-3">
                                            {item.img ? (
                                                <img src={item.img} alt={item.user} className="w-8 h-8 rounded-full object-cover" />
                                            ) : (
                                                <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-xs font-bold text-brand-700">
                                                    {item.user.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-bold text-gray-800">{item.user}</p>
                                                <p className="text-xs text-gray-400">{item.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-gray-700 font-medium">{item.course}</p>
                                        <p className="text-xs text-gray-400">{item.id}</p>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`flex items-center px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide w-fit ml-auto ${getStatusColor(item.status)}`}>
                                            {getStatusIcon(item.status)}
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Overview;