import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const EmailSummary = () => {
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('emails');
  const [expandedEmail, setExpandedEmail] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  
  // Dummy data for emails
  const emails = [
    { 
      id: 1, 
      sender: 'John Smith', 
      email: 'john.smith@company.com',
      subject: 'Project Update', 
      summary: 'The client approved our proposal for the new marketing campaign. Need your feedback on timeline.',
      content: 'Hi there,\n\nI wanted to let you know that the client has officially approved our proposal for the new marketing campaign we presented last week. They were particularly impressed with the creative direction and the projected ROI metrics we included.\n\nThey\'re eager to get started, so we\'ll need to finalize the timeline by the end of this week. Can you review the attached schedule and let me know if the resource allocation works for your team?\n\nWe\'ll need to kick off the first phase by March 15th to meet their product launch deadline.\n\nThanks,\nJohn',
      time: '10:30 AM',
      date: '03/03/2025',
      urgency: 'High',
      read: false,
      actions: [
        'Review proposed timeline by Wednesday',
        'Confirm resource availability for March 15th kickoff',
        'Provide feedback on creative direction'
      ],
      labels: ['Project', 'Client', 'Marketing']
    },
    { 
      id: 2, 
      sender: 'HR Department', 
      email: 'hr@company.com',
      subject: 'New Policy Update', 
      summary: 'Please review the updated remote work policy and acknowledge receipt by end of day Friday.',
      content: 'Dear Team Member,\n\nWe\'re writing to inform you about important updates to our company\'s remote work policy that will take effect starting April 1, 2025.\n\nThe key changes include:\n\n1. Flexible work hours between 7 AM and 7 PM\n2. Core collaboration hours from 11 AM to 3 PM when all team members should be available\n3. Updated equipment stipend of $500 annually\n4. Quarterly in-office days for team building and planning\n\nPlease review the attached policy document carefully and complete the acknowledgment form by the end of day on Friday, March 7th.\n\nIf you have any questions, please don\'t hesitate to reach out to your HR representative.\n\nBest regards,\nHR Department',
      time: '9:15 AM',
      date: '03/03/2025',
      urgency: 'Medium',
      read: true,
      actions: [
        'Review policy document by Friday',
        'Complete acknowledgment form by EOD 03/07',
        'Update calendar with quarterly in-office days'
      ],
      labels: ['HR', 'Policy']
    },
    { 
      id: 3, 
      sender: 'Sarah Johnson', 
      email: 'sarah.j@company.com',
      subject: 'Meeting Rescheduled', 
      summary: 'The strategy meeting has been moved to Thursday at 2pm instead of Wednesday at 10am.',
      content: 'Hi team,\n\nDue to a conflict with the executive review, I need to reschedule our weekly strategy meeting originally planned for Wednesday at 10 AM.\n\nThe meeting will now take place on Thursday, March 6th at 2 PM. The agenda remains the same, and we\'ll be focusing on Q2 priorities and resource allocation.\n\nPlease update your calendars accordingly. The meeting invite has been updated with the new time.\n\nThanks for your flexibility,\nSarah',
      time: '4:45 PM',
      date: '03/02/2025',
      urgency: 'Low',
      read: true,
      actions: [
        'Update calendar for Thursday at 2 PM',
        'Prepare Q2 priorities discussion points',
        'Review resource allocation spreadsheet'
      ],
      labels: ['Meeting', 'Internal']
    },
    { 
      id: 4, 
      sender: 'Tech Support', 
      email: 'support@company.com',
      subject: 'Scheduled System Maintenance', 
      summary: 'The CRM system will be down for maintenance this Saturday from 10pm to 2am. Please save your work beforehand.',
      content: 'Dear Users,\n\nThis is a notification that our CRM system will be undergoing scheduled maintenance this weekend.\n\nMaintenance window: Saturday, March 8th, 10 PM - Sunday, March 9th, 2 AM (4 hours)\n\nDuring this time, the system will be completely unavailable. Please ensure you save all your work and log out of the system before 9:45 PM on Saturday.\n\nThe maintenance includes security patches and performance upgrades that will improve system stability and response times.\n\nIf you have any urgent matters that require CRM access during this time, please contact the support team before Friday at 5 PM.\n\nThank you for your cooperation,\nTech Support Team',
      time: '11:20 AM',
      date: '03/02/2025',
      urgency: 'Medium',
      read: false,
      actions: [
        'Save all CRM work before Saturday 9:45 PM',
        'Notify team members about system downtime',
        'Contact support if urgent access is needed'
      ],
      labels: ['IT', 'System', 'Maintenance']
    },
    { 
      id: 5, 
      sender: 'David Lee', 
      email: 'david.lee@partner.com',
      subject: 'Partnership Opportunity', 
      summary: 'Proposal for co-marketing campaign with potential 30% increase in lead generation. Meeting requested next week.',
      content: 'Hello,\n\nI hope this email finds you well. I\'m reaching out because we\'ve identified a significant opportunity for a co-marketing campaign between our companies that could benefit both our customer bases.\n\nOur analysis shows that a joint webinar series followed by a co-authored whitepaper could potentially increase lead generation by 25-30% for both parties over the next quarter.\n\nI\'d like to schedule a meeting next week to discuss this opportunity in more detail. I\'ve attached a brief overview of our proposal for your review.\n\nWould you have availability on Tuesday afternoon or Wednesday morning next week?\n\nBest regards,\nDavid Lee\nPartnership Manager',
      time: '3:05 PM',
      date: '03/01/2025',
      urgency: 'High',
      read: true,
      actions: [
        'Review partnership proposal by Monday',
        'Check calendar availability for Tuesday/Wednesday',
        'Prepare questions about lead generation projections',
        'Schedule initial discussion with marketing team'
      ],
      labels: ['Partnership', 'Marketing', 'Lead-Gen']
    }
  ];
  
  // Filter emails based on search term and filters
  const filteredEmails = emails.filter(email => {
    // Text search
    const matchesSearch = 
      email.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.summary.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by urgency
    const matchesUrgency = selectedFilter === 'all' || email.urgency.toLowerCase() === selectedFilter.toLowerCase();
    
    return matchesSearch && matchesUrgency;
  });
  
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'text-red-600 bg-red-50 border-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      case 'Low': return 'text-green-600 bg-green-50 border-green-100';
      default: return '';
    }
  };
  
  return (
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
          <h1 className="text-2xl font-semibold">Email Summary</h1>
        </header>
        
        <main className="p-6">
          {/* Search and Filters */}
          <div className="bg-white shadow rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Search emails..." 
                  className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none transition"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <select 
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none"
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  <option value="all">All Urgency</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                
                <input 
                  type="date" 
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
                />
                
                <input 
                  type="date" 
                  className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-gray-200 focus:border-gray-300 outline-none"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({...dateRange, end: e.target.value})}
                />
                
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                  <span>Refresh</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Emails List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y">
              {filteredEmails.map(email => (
                <div key={email.id} className="divide-y">
                  {/* Summarized Email Card */}
                  <div 
                    className={`p-4 cursor-pointer hover:bg-gray-50 ${!email.read ? 'border-l-4 border-blue-500' : ''}`}
                    onClick={() => setExpandedEmail(expandedEmail === email.id ? null : email.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-semibold mr-3">
                          {email.sender.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{email.sender}</h3>
                          <p className="text-xs text-gray-500">{email.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium mr-2 ${getUrgencyColor(email.urgency)}`}>
                          {email.urgency}
                        </span>
                        <span className="text-xs text-gray-500">{email.time} · {email.date}</span>
                      </div>
                    </div>
                    <h4 className="font-medium mb-1">{email.subject}</h4>
                    <p className="text-sm text-gray-600 mb-2">{email.summary}</p>
                    <div className="flex flex-wrap gap-1">
                      {email.labels.map((label, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Expanded Email View */}
                  {expandedEmail === email.id && (
                    <div className="p-6 bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-medium">{email.subject}</h3>
                        <button 
                          className="text-gray-500 hover:text-gray-700"
                          onClick={() => setExpandedEmail(null)}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Email Content */}
                      <div className="mb-6 whitespace-pre-line text-gray-700 border-b pb-6">
                        {email.content}
                      </div>
                      
                      {/* AI Extracted Actions */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          AI-Extracted Action Items
                        </h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {email.actions.map((action, idx) => (
                            <li key={idx} className="ml-5">
                              <div className="flex items-start">
                                <input 
                                  type="checkbox" 
                                  className="mt-1 mr-3 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span>{action}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="mt-6 flex space-x-2">
                        <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition">
                          Reply
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                          Forward
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition">
                          Create Task
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmailSummary;