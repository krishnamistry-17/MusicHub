// AuthLayout.js
import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900"> {/* Change background as needed */}
            {children}
        </div>
    );
};

export default AuthLayout;
