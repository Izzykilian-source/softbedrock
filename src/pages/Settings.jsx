/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Save, Globe, Users, Database, Server, Activity, CheckCircle, Key } from 'lucide-react';
import toast from 'react-hot-toast';

// --- SUB-COMPONENTS (ADMIN SPECIFIC) ---

const PlatformTab = ({ onSave }) => {
  const [maintenance, setMaintenance] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-4 border-b border-gray-50 pb-2">Platform Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
            <input type="text" defaultValue="Soft Bedrock" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
            <input type="email" defaultValue="help@softbedrock.com" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Default Language</label>
            <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
                <option>English (US)</option>
                <option>Italiano</option>
                <option>Bahasa Indonesia</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm flex items-center justify-between">
         <div>
             <h3 className="font-bold text-gray-800 flex items-center">
                <Server size={18} className="mr-2 text-gray-500"/> 
                Maintenance Mode
             </h3>
             <p className="text-sm text-gray-500 mt-1">
                 If enabled, only admins can access the site. Students will see a "Under Construction" page.
             </p>
         </div>
         <button 
            onClick={() => {
                setMaintenance(!maintenance);
                toast(maintenance ? 'Site is LIVE again!' : 'Site is in MAINTENANCE mode', { icon: maintenance ? '🟢' : '🔴' });
            }}
            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${maintenance ? 'bg-red-500' : 'bg-gray-300'}`}
         >
            <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition ${maintenance ? 'translate-x-7' : 'translate-x-1'}`} />
         </button>
      </div>

      <div className="flex justify-end">
        <button onClick={onSave} className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition flex items-center"><Save size={18} className="mr-2"/> Save Changes</button>
      </div>
    </div>
  );
};

const TeamTab = () => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
                <h3 className="font-bold text-gray-800">Team Members</h3>
                <p className="text-sm text-gray-500">Manage who has access to the admin dashboard.</p>
            </div>
            <button className="bg-brand-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-700">Invite Member</button>
        </div>
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="p-4">Name</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Last Active</th>
                    <th className="p-4 text-right">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                <tr>
                    <td className="p-4 font-medium flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold">A</div>
                        Admin Staff (You)
                    </td>
                    <td className="p-4"><span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-bold">Super Admin</span></td>
                    <td className="p-4 text-green-600">Online Now</td>
                    <td className="p-4 text-right"><span className="text-gray-400 italic">Owner</span></td>
                </tr>
                <tr>
                    <td className="p-4 font-medium flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">S</div>
                        Sarah Content
                    </td>
                    <td className="p-4"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-bold">Editor</span></td>
                    <td className="p-4 text-gray-500">2 hours ago</td>
                    <td className="p-4 text-right"><button className="text-red-500 hover:text-red-700 font-medium">Remove</button></td>
                </tr>
            </tbody>
        </table>
    </div>
);

const IntegrationsTab = ({ onSave }) => (
    <div className="space-y-6 animate-fade-in">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600"><Key size={24}/></div>
                    <div>
                        <h3 className="font-bold text-gray-800">Stripe Payment</h3>
                        <p className="text-xs text-gray-500">Handle course payments globally.</p>
                    </div>
                </div>
                <div className="flex items-center text-green-600 text-sm font-bold bg-green-50 px-2 py-1 rounded"><CheckCircle size={14} className="mr-1"/> Connected</div>
            </div>
            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Publishable Key</label>
                    <input type="text" disabled value="pk_live_51Mz..." className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 font-mono" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Secret Key</label>
                    <input type="password" value="sk_live_Gb2..." className="w-full bg-gray-50 border border-gray-200 rounded px-3 py-2 text-sm text-gray-500 font-mono" />
                </div>
            </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm opacity-75">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-500"><Globe size={24}/></div>
                    <div>
                        <h3 className="font-bold text-gray-800">Zoom Integration</h3>
                        <p className="text-xs text-gray-500">Auto-generate links for live classes.</p>
                    </div>
                </div>
                <button className="text-brand-600 text-sm font-bold hover:underline">Connect</button>
            </div>
        </div>

        <div className="flex justify-end">
            <button onClick={onSave} className="bg-brand-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-brand-700 transition">Save Keys</button>
        </div>
    </div>
);

const LogsTab = () => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">System Activity Logs</h3>
            <p className="text-sm text-gray-500">Monitor sensitive actions performed on the platform.</p>
        </div>
        <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500">
                <tr>
                    <th className="p-4">Action</th>
                    <th className="p-4">User</th>
                    <th className="p-4">IP Address</th>
                    <th className="p-4">Date</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
                <tr>
                    <td className="p-4 font-bold text-gray-700">Deleted Course #102</td>
                    <td className="p-4">Admin Staff</td>
                    <td className="p-4 font-mono text-gray-500">192.168.1.1</td>
                    <td className="p-4 text-gray-500">Today, 10:45 AM</td>
                </tr>
                <tr>
                    <td className="p-4 font-bold text-gray-700">Exported User Data</td>
                    <td className="p-4">Sarah Content</td>
                    <td className="p-4 font-mono text-gray-500">10.0.0.42</td>
                    <td className="p-4 text-gray-500">Yesterday, 4:20 PM</td>
                </tr>
                <tr>
                    <td className="p-4 font-bold text-gray-700">Updated Stripe API Key</td>
                    <td className="p-4">Admin Staff</td>
                    <td className="p-4 font-mono text-gray-500">192.168.1.1</td>
                    <td className="p-4 text-gray-500">Oct 20, 2024</td>
                </tr>
            </tbody>
        </table>
    </div>
);

const SettingsNavItem = ({ id, icon: Icon, label, active, onClick }) => (
    <button 
        onClick={() => onClick(id)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
        ${active === id 
            ? 'bg-brand-600 text-white shadow-md transform translate-x-1' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
    >
        <Icon size={18} />
        <span>{label}</span>
    </button>
);

const Settings = () => {
  const [activeTab, setActiveTab] = useState('platform');

  // --- LOGIC SIMPAN (NATURAL TOAST) ---
  const handleSave = () => {
    const savePromise = new Promise((resolve) => setTimeout(resolve, 1500));

    toast.promise(savePromise, {
      loading: 'Saving your preferences...',
      success: (
        <span className="font-medium text-gray-700">
          All set! Your changes have been updated.
        </span>
      ),
      error: 'Could not save changes. Please try again.',
    }, {
        style: {
            minWidth: '250px',
        },
        success: {
            duration: 3000,
            icon: '✅',
        },
    });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-64 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">System Settings</h2>
        <p className="text-gray-500 text-sm mb-6">Configuration for Soft Bedrock Platform.</p>
        
        <nav className="space-y-1">
            <SettingsNavItem id="platform" icon={Globe} label="Platform" active={activeTab} onClick={setActiveTab} />
            <SettingsNavItem id="team" icon={Users} label="Team & Roles" active={activeTab} onClick={setActiveTab} />
            <SettingsNavItem id="integrations" icon={Database} label="Integrations" active={activeTab} onClick={setActiveTab} />
            <SettingsNavItem id="logs" icon={Activity} label="Audit Logs" active={activeTab} onClick={setActiveTab} />
        </nav>
      </div>

      <div className="flex-1">
          {activeTab === 'platform' && <PlatformTab onSave={handleSave} />}
          {activeTab === 'team' && <TeamTab />}
          {activeTab === 'integrations' && <IntegrationsTab onSave={handleSave} />}
          {activeTab === 'logs' && <LogsTab />}
      </div>
    </div>
  );
};

export default Settings;