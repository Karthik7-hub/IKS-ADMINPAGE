// src/components/Layout.jsx
import React from 'react';
import '../css/Layout.css';
import { NavLink } from 'react-router-dom';
import {
    Home, Users, BookOpen, FlaskConical,
    Database, Newspaper, Handshake
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`
        }
    >
        <Icon size={20} />
        <span className="font-medium">{label}</span>
    </NavLink>
);

const Layout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-blue-900">IKS Admin</h1>
                    <p className="text-xs text-gray-400 mt-1">Content Management System</p>
                </div>

                <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                    <SidebarItem to="/" icon={Home} label="Dashboard" />
                    <SidebarItem to="/people" icon={Users} label="People" />
                    <SidebarItem to="/academics" icon={BookOpen} label="Academics" />
                    <SidebarItem to="/research" icon={FlaskConical} label="Research" />
                    <SidebarItem to="/repository" icon={Database} label="Know. Repository" />
                    <SidebarItem to="/news" icon={Newspaper} label="Upcoming & News" />
                    <SidebarItem to="/collaborators" icon={Handshake} label="Collaborators" />
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button className="w-full py-2 px-4 text-sm text-red-600 hover:bg-red-50 rounded-lg transition">
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;