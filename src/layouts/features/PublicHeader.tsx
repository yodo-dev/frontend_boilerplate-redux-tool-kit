import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search } from '@/assets/icons';

const PublicHeader: React.FC = memo(() => {
    return (
        <header className=" sticky top-0 z-40 border-b bg-topbar/90 backdrop-blur">
            <div className="max-w-6xl mx-auto h-topbar px-4 flex items-center gap-4">
                <Link to="/" className="font-semibold">Home</Link>
                <Link to="/about" className="font-semibold">About</Link>
                <Link to="/contact" className="font-semibold">Contact</Link>
                <div className="ml-auto flex items-center gap-3 text-gray-600">
                    <Search size={18} />
                    <Bell size={18} />
                    <Link to="/login" className="text-blue-600">Login</Link>
                </div>
            </div>
        </header>
    );
});

export default PublicHeader;


