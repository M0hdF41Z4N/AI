import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'

const TaskManagement = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete quarterly report', description: 'Analyze Q1 performance and prepare slides', status: 'In Progress', deadline: '2025-03-05', urgency: 'High', project: 'Finance', assignee: 'You', linkedItems: ['Q1 Data Spreadsheet', 'Previous Report'] },
    { id: 2, title: 'Review marketing strategy', description: 'Evaluate current campaigns and suggest improvements', status: 'To Do', deadline: '2025-03-07', urgency: 'Medium', project: 'Marketing', assignee: 'You', linkedItems: ['Campaign Analytics', 'Competitor Analysis'] },
    { id: 3, title: 'Schedule team meeting', description: 'Coordinate with team members for weekly sync', status: 'Done', deadline: '2025-03-02', urgency: 'Low', project: 'Admin', assignee: 'You', linkedItems: ['Meeting Agenda'] },
    { id: 4, title: 'Prepare client presentation', description: 'Create slides for upcoming client meeting', status: 'To Do', deadline: '2025-03-09', urgency: 'High', project: 'Sales', assignee: 'You', linkedItems: ['Product Specs', 'Client Requirements'] },
    { id: 5, title: 'Update project documentation', description: 'Ensure all docs are current with latest changes', status: 'In Progress', deadline: '2025-03-12', urgency: 'Medium', project: 'Development', assignee: 'You', linkedItems: ['API Documentation', 'User Manual'] },
  ]);
  
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('deadline');
  const [searchTerm, setSearchTerm] = useState('');
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    deadline: '',
    urgency: 'Medium',
    project: '',
    assignee: 'You',
    linkedItems: []
  });
  
  const dragItem = useRef();
  const dragOverItem = useRef();
  
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
  
  const handleDragStart = (e, position) => {
    dragItem.current = position;
  };
  
  const handleDragEnter = (e, position) => {
    dragOverItem.current = position;
  };
  
  const handleDrop = () => {
    const copyListItems = [...tasks];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTasks(copyListItems);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };
  
  const handleAddNewTask = () => {
    setIsEditing(false);
    setEditFormData({
      title: '',
      description: '',
      status: 'To Do',
      deadline: '',
      urgency: 'Medium',
      project: '',
      assignee: 'You',
      linkedItems: []
    });
    setShowModal(true);
  };
  
  const handleEditTask = () => {
    if (!selectedTask) return;
    
    setIsEditing(true);
    setEditFormData({
      ...selectedTask,
      linkedItems: selectedTask.linkedItems ? selectedTask.linkedItems.join(', ') : ''
    });
    setShowModal(true);
  };
  
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    const formattedTask = {
      ...editFormData,
      linkedItems: typeof editFormData.linkedItems === 'string' ? 
        editFormData.linkedItems.split(',').map(item => item.trim()).filter(item => item !== '') : 
        editFormData.linkedItems
    };
    
    if (isEditing) {
      const updatedTasks = tasks.map(task => 
        task.id === selectedTask.id ? { ...formattedTask, id: task.id } : task
      );
      setTasks(updatedTasks);
      setSelectedTask({ ...formattedTask, id: selectedTask.id });
    } else {
      const newTask = {
        ...formattedTask,
        id: Math.max(...tasks.map(t => t.id), 0) + 1
      };
      setTasks([...tasks, newTask]);
    }
    
    setShowModal(false);
  };
  
  const handleDeleteTask = () => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.filter(task => task.id !== selectedTask.id);
    setTasks(updatedTasks);
    setSelectedTask(null);
  };
  
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filterBy === 'all' || task.status === filterBy;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'deadline') {
      return new Date(a.deadline) - new Date(b.deadline);
    } else if (sortBy === 'urgency') {
      const urgencyOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
      return urgencyOrder[a.urgency] - urgencyOrder[b.urgency];
    } else if (sortBy === 'project') {
      return a.project.localeCompare(b.project);
    }
    return 0;
  });
  
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
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Task Management</h1>
          <button 
            onClick={handleAddNewTask}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Add New Task
          </button>
        </header>
        
        <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Task List with Filters */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Tasks</h2>
                
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      className="pl-8 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-2.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  
                  <select 
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                  
                  <select 
                    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="deadline">Sort by Deadline</option>
                    <option value="urgency">Sort by Urgency</option>
                    <option value="project">Sort by Project</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="overflow-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
              <ul className="divide-y divide-gray-200">
                {sortedTasks.map((task, index) => (
                  <li 
                    key={task.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer ${selectedTask && selectedTask.id === task.id ? 'bg-gray-50' : ''}`}
                    onClick={() => handleTaskClick(task)}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnter={(e) => handleDragEnter(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnd={handleDrop}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-600 truncate">{task.description}</p>
                        <div className="flex items-center mt-2 text-xs">
                          <span className={`px-2 py-1 rounded-full ${getStatusColor(task.status)} mr-2`}>
                            {task.status}
                          </span>
                          <span className={`${getUrgencyColor(task.urgency)} mr-2`}>
                            {task.urgency}
                          </span>
                          <span className="text-gray-500 mr-2">
                            {new Date(task.deadline).toLocaleDateString()}
                          </span>
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {task.project}
                          </span>
                        </div>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </li>
                ))}
                {sortedTasks.length === 0 && (
                  <li className="p-8 text-center text-gray-500">
                    No tasks found. Try changing your filters or add a new task.
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          {/* Task Details Panel */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {selectedTask ? (
              <div className="h-full flex flex-col">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Task Details</h2>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleEditTask}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleDeleteTask}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="p-6 overflow-auto flex-1">
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-2">{selectedTask.title}</h3>
                    <p className="text-gray-600">{selectedTask.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 font-medium mb-1">Status</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 font-medium mb-1">Urgency</h4>
                      <span className={`${getUrgencyColor(selectedTask.urgency)}`}>
                        {selectedTask.urgency}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 font-medium mb-1">Deadline</h4>
                      <span>{new Date(selectedTask.deadline).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 font-medium mb-1">Assignee</h4>
                      <span>{selectedTask.assignee}</span>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-gray-500 font-medium mb-1">Project</h4>
                      <span>{selectedTask.project}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xs uppercase text-gray-500 font-medium mb-2">Linked Items</h4>
                    {selectedTask.linkedItems && selectedTask.linkedItems.length > 0 ? (
                      <ul className="space-y-2">
                        {selectedTask.linkedItems.map((item, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                            <span className="text-blue-600 hover:underline cursor-pointer">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">No linked items</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 p-6 text-center">
                <div>
                  <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p>Select a task to view details</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Add/Edit Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold">{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    name="title"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={editFormData.title}
                    onChange={handleFormChange}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={editFormData.description}
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                      value={editFormData.status}
                      onChange={handleFormChange}
                    >
                      <option>To Do</option>
                      <option>In Progress</option>
                      <option>Done</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Urgency</label>
                    <select
                      name="urgency"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                      value={editFormData.urgency}
                      onChange={handleFormChange}
                    >
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                    <input
                      type="date"
                      name="deadline"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                      value={editFormData.deadline}
                      onChange={handleFormChange}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project</label>
                    <input
                      type="text"
                      name="project"
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                      value={editFormData.project}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Linked Items (comma separated)</label>
                  <input
                    type="text"
                    name="linkedItems"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                    value={typeof editFormData.linkedItems === 'string' ? 
                      editFormData.linkedItems : 
                      editFormData.linkedItems.join(', ')}
                    onChange={handleFormChange}
                    placeholder="Document1, Email2, etc."
                  />
                </div>
              </div>
              
              <div className="px-6 py-4 border-t bg-gray-50 flex justify-end">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="mr-2 px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                >
                  {isEditing ? 'Save Changes' : 'Add Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;