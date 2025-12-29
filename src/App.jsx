import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import PeopleManager from './pages/PeopleManager';
import ComingSoon from './pages/ComingSoon';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <nav className="bg-white shadow-sm border-b px-4 md:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 sticky top-0 z-40">
      <h1 className="text-lg md:text-xl font-bold text-indigo-700 tracking-wide text-center sm:text-left">
        IKS Admin Panel
      </h1>
      <div className="text-xs md:text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        Administrator
      </div>
    </nav>

    {/* Main Content: Less padding on mobile */}
    <main className="p-4 md:p-6 max-w-7xl mx-auto">
      {children}
    </main>
  </div>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/people" element={<PeopleManager />} />
          <Route path="/academics" element={<ComingSoon title="Academics" />} />
          <Route path="/research" element={<ComingSoon title="Research" />} />
          <Route path="/knowledge-repo" element={<ComingSoon title="Knowledge Repository" />} />
          <Route path="/news" element={<ComingSoon title="Upcoming & In News" />} />
          <Route path="/collaborators" element={<ComingSoon title="Collaborators" />} />
          <Route path="/home-edit" element={<ComingSoon title="Home Page Edit" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;