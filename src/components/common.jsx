import React, { useState } from 'react';

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