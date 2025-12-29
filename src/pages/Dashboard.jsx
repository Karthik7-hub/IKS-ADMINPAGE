import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Home, BookOpen, Microscope, Database, Newspaper, Handshake } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    const cards = [
        { title: "Home", path: "/home-edit", icon: <Home size={24} />, color: "bg-blue-50 text-blue-600" },
        { title: "People", path: "/people", icon: <Users size={24} />, color: "bg-indigo-50 text-indigo-600" },
        { title: "Academics", path: "/academics", icon: <BookOpen size={24} />, color: "bg-green-50 text-green-600" },
        { title: "Research", path: "/research", icon: <Microscope size={24} />, color: "bg-purple-50 text-purple-600" },
        { title: "Knowledge Repository", path: "/knowledge-repo", icon: <Database size={24} />, color: "bg-orange-50 text-orange-600" },
        { title: "Upcoming & In News", path: "/news", icon: <Newspaper size={24} />, color: "bg-pink-50 text-pink-600" },
        { title: "Collaborators", path: "/collaborators", icon: <Handshake size={24} />, color: "bg-teal-50 text-teal-600" },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(card.path)}
                        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-100 transition-all cursor-pointer flex flex-col items-center text-center gap-4 group"
                    >
                        <div className={`p-4 rounded-full ${card.color} group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <h3 className="font-medium text-lg text-gray-700">{card.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;