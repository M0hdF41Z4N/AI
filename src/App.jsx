import { Routes, Route } from "react-router-dom";
import TaskManagement from "./TaskManagement"; // Ensure this exists
import Dashboard from "./Dashboard"; // If you have a dashboard
import EmailSummary from './EmailSummary'
import ChatInterface from './ChatInterface'
import Settings from './Settings'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/TaskManagement" element={<TaskManagement />} />
      <Route path="/EmailSummary" element={<EmailSummary />} />
      <Route path="/ChatInterface" element={<ChatInterface />} />
      <Route path="/Settings" element={<Settings />} />



    </Routes>
  );
}

export default App;
