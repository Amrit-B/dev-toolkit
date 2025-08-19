import React from 'react';

const Welcome = () => (
    <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome to the Developer Toolkit!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            This is a collection of simple, client-side tools to help with common development tasks. 
            Select a tool from the sidebar to get started. All data is processed in your browser, so nothing is ever sent to a server.
        </p>
    </div>
);

export default Welcome;