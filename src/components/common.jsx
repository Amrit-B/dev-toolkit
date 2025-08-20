import React, { useState } from 'react';

export const LoadingSpinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

export const ToolTextarea = ({ label, value, onChange, placeholder }) => (
    <div className="flex flex-col h-full">
        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</label>
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full flex-grow bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            spellCheck="false"
        />
    </div>
);

export const ToolOutput = ({ label, value, placeholder }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (value) {
            navigator.clipboard.writeText(value).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <div className="flex flex-col h-full relative">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</label>
            <textarea
                value={value}
                readOnly
                placeholder={placeholder}
                className="w-full flex-grow bg-slate-100 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none resize-none"
                spellCheck="false"
            />
            <button 
                onClick={handleCopy}
                className="absolute top-8 right-3 bg-slate-200 dark:bg-gray-700 hover:bg-slate-300 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 px-3 py-1 text-xs font-semibold rounded-md transition-colors"
            >
                {copied ? 'Copied!' : 'Copy'}
            </button>
        </div>
    );
};