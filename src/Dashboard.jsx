import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate()

  
  // Dummy data
  const tasks = [
    { id: 1, title: 'Complete quarterly report', status: 'In Progress', deadline: 'Today', urgency: 'High' },
    { id: 2, title: 'Review marketing strategy', status: 'To Do', deadline: 'Tomorrow', urgency: 'Medium' },
    { id: 3, title: 'Schedule team meeting', status: 'Done', deadline: 'Yesterday', urgency: 'Low' },
    { id: 4, title: 'Prepare client presentation', status: 'To Do', deadline: 'Mar 5', urgency: 'High' },
    { id: 5, title: 'Update project documentation', status: 'In Progress', deadline: 'Mar 7', urgency: 'Medium' },
  ];
  
  const emails = [
    { id: 1, sender: 'John Smith', subject: 'Project Update', summary: 'The client approved our proposal. Need you to prepare contracts by Friday.', time: '10:30 AM' },
    { id: 2, sender: 'HR Department', subject: 'New Policy Update', summary: 'Please review the updated remote work policy and acknowledge by EOD.', time: '9:15 AM' },
    { id: 3, sender: 'Sarah Johnson', subject: 'Meeting Rescheduled', summary: 'The strategy meeting has been moved to Thursday at 2pm.', time: 'Yesterday' },
  ];
  
  const recommendations = [
    { id: 1, text: 'Complete quarterly report today as it has high urgency' },
    { id: 2, text: 'Respond to John Smith\'s email about contract preparation' },
    { id: 3, text: 'Block time for the rescheduled strategy meeting on Thursday' },
  ];
  
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return '';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Done': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'To Do': return 'bg-gray-100 text-gray-800';
      default: return '';
    }
  };

  return (
    <>
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Left Sidebar */}
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
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>
        
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task List Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-2">Task</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Deadline</th>
                      <th className="px-4 py-2">Urgency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map(task => (
                      <tr key={task.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium">{task.title}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(task.status)}`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">{task.deadline}</td>
                        <td className={`px-4 py-3 ${getUrgencyColor(task.urgency)}`}>{task.urgency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Email Summary Section */}
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Email Summary</h2>
                <button className="text-gray-500 hover:text-gray-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                  </svg>
                </button>
              </div>
              <div className="space-y-4">
                {emails.map(email => (
                  <div key={email.id} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{email.sender}</h3>
                      <span className="text-xs text-gray-500">{email.time}</span>
                    </div>
                    <p className="text-sm font-medium mb-1">{email.subject}</p>
                    <p className="text-sm text-gray-600">{email.summary}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recommendations Section */}
            <div className="bg-white shadow rounded-lg p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map(rec => (
                  <div key={rec.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-start">
                      <div className="mr-3 mt-1">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm">{rec.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default Dashboard
