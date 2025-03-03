import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const Settings = () => {
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('settings');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    urgentTasks: true,
    allTasks: false,
    urgentEmails: true,
    allEmails: false,
    recommendations: true
  });
  const [integrations, setIntegrations] = useState({
    googleDocs: false,
    gmail: true,
    todoist: false,
    trello: true
  });
  
  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // In a real app, you would save this to localStorage here
  };
  
  // Handle notification toggle
  const toggleNotification = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
    // In a real app, you would save this to localStorage here
  };
  
  // Handle integration toggle
  const toggleIntegration = (key) => {
    setIntegrations({
      ...integrations,
      [key]: !integrations[key]
    });
    // In a real app, you would save this to localStorage here
  };
  
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Left Sidebar - Same as Dashboard */}
      <div className="w-16 md:w-64 bg-gray-900 text-white">
        <div className="p-4 text-center">
        <h1 className="hidden md:block text-xl font-bold">Life-with-AI</h1>

        </div>
        <nav className="mt-8">
          <button 
        
            onClick={() => {
                setActiveTab('dashboard');
                navigate('/'); // Navigate when button is clicked
              }}  
            className={`w-full flex items-center p-4 hover:bg-gray-800 ${activeTab === 'dashboard' ? 'bg-gray-800' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden md:block ml-4">Dashboard</span>
          </button>
          <button 
  onClick={() => {
    setActiveTab('tasks');
    navigate('/TaskManagement'); // Navigate when button is clicked
  }} 
  className={`w-full flex items-center p-4 hover:bg-gray-800 ${activeTab === 'tasks' ? 'bg-gray-800' : ''}`}
>
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </svg>
  <span className="hidden md:block ml-4">Tasks</span>
</button>

          <button 
            onClick={() => {
                setActiveTab('emails');
                navigate('/EmailSummary'); // Navigate when button is clicked
              }}  
            className={`w-full flex items-center p-4 hover:bg-gray-800 ${activeTab === 'emails' ? 'bg-gray-800' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="hidden md:block ml-4">Emails</span>
          </button>

          <button 
           
           onClick={() => {
               setActiveTab('chats');
               navigate('/ChatInterface'); // Navigate when button is clicked
             }}  
           className={`w-full flex items-center p-4 hover:bg-gray-800 ${activeTab === 'chats' ? 'bg-gray-800' : ''}`}
         >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h6M21 12c0 4.418-4.03 8-9 8-1.7 0-3.29-.437-4.65-1.2L3 21l1.2-4.35C3.44 15.29 3 13.7 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
</svg>
           <span className="hidden md:block ml-4">Chat</span>
         </button>
          <button 
           
            onClick={() => {
                setActiveTab('settings');
                navigate('/Settings'); // Navigate when button is clicked
              }}  
            className={`w-full flex items-center p-4 hover:bg-gray-800 ${activeTab === 'settings' ? 'bg-gray-800' : ''}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:block ml-4">Settings</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow px-6 py-4">
          <h1 className="text-2xl font-semibold">Settings & Customization</h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Integrations Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Integrations</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 11H15V8H17V11H20V13H17V16H15V13H12V11Z" fill="#4285F4"/>
                      <path d="M6 8C6.82843 8 7.5 7.32843 7.5 6.5C7.5 5.67157 6.82843 5 6 5C5.17157 5 4.5 5.67157 4.5 6.5C4.5 7.32843 5.17157 8 6 8Z" fill="#0F9D58"/>
                      <path d="M6 19C6.82843 19 7.5 18.3284 7.5 17.5C7.5 16.6716 6.82843 16 6 16C5.17157 16 4.5 16.6716 4.5 17.5C4.5 18.3284 5.17157 19 6 19Z" fill="#FBBC05"/>
                      <path d="M8.5 12C8.5 12.8284 7.82843 13.5 7 13.5C6.17157 13.5 5.5 12.8284 5.5 12C5.5 11.1716 6.17157 10.5 7 10.5C7.82843 10.5 8.5 11.1716 8.5 12Z" fill="#EA4335"/>
                      <path d="M12.5 7.5L9.5 11L12.5 14.5" stroke="#4285F4" strokeWidth="1.5"/>
                    </svg>
                    <span>Google Docs</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={integrations.googleDocs} onChange={() => toggleIntegration('googleDocs')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z" stroke="#DB4437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M22 6L12 13L2 6" stroke="#DB4437" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Gmail</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={integrations.gmail} onChange={() => toggleIntegration('gmail')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#E44332" fillOpacity="0.1"/>
                      <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="#E44332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 11L11 13L15 9" stroke="#E44332" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>Todoist</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={integrations.todoist} onChange={() => toggleIntegration('todoist')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect width="24" height="24" rx="4" fill="#0079BF" fillOpacity="0.1"/>
                      <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#0079BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <rect x="7" y="7" width="3" height="5" rx="1" fill="#0079BF"/>
                      <rect x="14" y="7" width="3" height="8" rx="1" fill="#0079BF"/>
                    </svg>
                    <span>Trello</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={integrations.trello} onChange={() => toggleIntegration('trello')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="mt-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Connect New Integration
                  </button>
                </div>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Urgent Tasks</p>
                    <p className="text-sm text-gray-500">Get notified when tasks are marked as high urgency</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications.urgentTasks} onChange={() => toggleNotification('urgentTasks')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">All Tasks</p>
                    <p className="text-sm text-gray-500">Get notified for any task update</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications.allTasks} onChange={() => toggleNotification('allTasks')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Urgent Emails</p>
                    <p className="text-sm text-gray-500">Get notified for emails marked as important</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications.urgentEmails} onChange={() => toggleNotification('urgentEmails')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">All Emails</p>
                    <p className="text-sm text-gray-500">Get notified for any new email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications.allEmails} onChange={() => toggleNotification('allEmails')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Recommendations</p>
                    <p className="text-sm text-gray-500">Get notified when new recommendations are available</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={notifications.recommendations} onChange={() => toggleNotification('recommendations')} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Theme Settings */}
            <div className="bg-white shadow rounded-lg p-6 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
              <div className="flex items-center space-x-8">
                <div className={`flex flex-col items-center cursor-pointer ${theme === 'light' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setTheme('light')}>
                  <div className="w-32 h-20 border rounded-lg bg-white mb-2 flex items-center justify-center">
                    <div className="w-24 h-12 bg-gray-100 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">Light Mode</span>
                </div>
                
                <div className={`flex flex-col items-center cursor-pointer ${theme === 'dark' ? 'opacity-100' : 'opacity-50'}`} onClick={() => setTheme('dark')}>
                  <div className="w-32 h-20 border rounded-lg bg-gray-800 mb-2 flex items-center justify-center">
                    <div className="w-24 h-12 bg-gray-700 rounded"></div>
                  </div>
                  <span className="text-sm font-medium">Dark Mode</span>
                </div>
                
                <div className="ml-auto">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} className="sr-only peer" />
                    <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">Toggle Theme</span>
                  </label>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-end">
                  <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded mr-2 hover:bg-gray-300 transition-colors">
                    Reset to Defaults
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;