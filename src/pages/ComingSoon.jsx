import React from 'react';
import { ArrowLeft, Construction } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoon = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-orange-50 p-6 rounded-full mb-4">
                <Construction size={48} className="text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">{title}</h2>
            <p className="text-gray-500 mb-8 max-w-md">
                This module is currently under development. You will be able to manage {title.toLowerCase()} data here soon.
            </p>
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-indigo-600 font-medium hover:underline"
            >
                <ArrowLeft size={18} /> Back to Dashboard
            </button>
        </div>
    );
};

export default ComingSoon;