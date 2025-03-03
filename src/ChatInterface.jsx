import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const ChatInterface = () => {
    const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hello! How can I help you with your tasks and emails today?", timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      let responseText = '';
      
      if (inputMessage.toLowerCase().includes('top task')) {
        responseText = "Your top task is \"Complete quarterly report\" which is due today with high urgency.";
      } else if (inputMessage.toLowerCase().includes('email')) {
        responseText = "You have 3 unread emails. The most urgent one is from John Smith about the project contracts that need to be prepared by Friday.";
      } else if (inputMessage.toLowerCase().includes('recommend')) {
        responseText = "Based on your schedule and priorities, I recommend completing the quarterly report today as it has high urgency and is due soon.";
      } else {
        responseText = "I'm here to help you manage your tasks and emails. You can ask me about your top tasks, recent emails, or request recommendations for what to focus on next.";
      }
      
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
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
          <h1 className="text-2xl font-semibold">Chat Assistant</h1>
        </header>
        
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg h-chat">
              {/* Chat Interface */}
              <div className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="px-6 py-4 border-b flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-semibold">AI Assistant</h3>
                      <p className="text-xs text-gray-500">Always available</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isMinimized ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                </div>
                
                {/* Messages Container */}
                {!isMinimized && (
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-xs md:max-w-md rounded-lg px-4 py-2 ${
                              message.sender === 'user' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-800'
                            }`}
                          >
                            <div className="text-sm">{message.text}</div>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-blue-200' : 'text-gray-500'
                            }`}>
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                )}
                
                {/* Input Box */}
                {!isMinimized && (
                  <div className="border-t px-4 py-3">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="What's my top task?"
                      />
                      <button 
                        type="submit" 
                        className="ml-2 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            
            {/* Example Queries Section */}
            <div className="mt-6 bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Example Queries</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer" 
                     onClick={() => setInputMessage("What's my top task?")}>
                  <p className="text-sm">What's my top task?</p>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setInputMessage("Do I have any urgent emails?")}>
                  <p className="text-sm">Do I have any urgent emails?</p>
                </div>
                <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                     onClick={() => setInputMessage("What do you recommend I work on today?")}>
                  <p className="text-sm">What do you recommend I work on today?</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatInterface;