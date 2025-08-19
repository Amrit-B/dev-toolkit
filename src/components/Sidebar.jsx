import React from 'react';

const Sidebar = ({ tools, activeToolId, setActiveToolId, theme, toggleTheme, closeSidebar }) => {
    const handleToolClick = (toolId) => {
        setActiveToolId(toolId);
        if (closeSidebar) {
            closeSidebar();
        }
    };

    return (
        <aside className="w-64 bg-slate-100 dark:bg-gray-800 p-4 flex flex-col border-r border-slate-200 dark:border-gray-700">
            <h1 
                className="text-xl font-bold text-gray-800 dark:text-white mb-6 cursor-pointer"
                onClick={() => handleToolClick('welcome')}
            >
                Dev Toolkit
            </h1>
            <nav className="flex flex-col space-y-2 flex-grow">
                {tools.map(tool => (
                    <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool.id)}
                        className={`text-left px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            activeToolId === tool.id
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                        }`}
                    >
                        {tool.name}
                    </button>
                ))}
            </nav>
            <div className="mt-4">
                <button 
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-gray-700"
                >
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd" /></svg>
                    )}
                    <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;