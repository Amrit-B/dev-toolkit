import React, { useState, useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea } from './common';

const RegexTester = () => {
    const [pattern, setPattern] = usePersistentState('regex-pattern', '\\b[A-Z]+\\b');
    const [testString, setTestString] = usePersistentState('regex-test-string', 'The QUICK brown FOX jumps over the LAZY dog.');
    const [flags, setFlags] = usePersistentState('regex-flags', { g: true, i: false, m: false });
    const [error, setError] = useState('');

    const handleFlagChange = (flag) => {
        setFlags(prev => ({ ...prev, [flag]: !prev[flag] }));
    };
    
    const handleClear = () => {
        setPattern('');
        setTestString('');
        setError('');
    };

    const matchCount = useMemo(() => {
        if (!pattern || !testString) return 0;
        try {
            const flagString = Object.keys(flags).filter(f => flags[f]).join('');
            const regex = new RegExp(pattern, flagString);
            setError('');
            return (testString.match(regex) || []).length;
        } catch(e) {
            setError(`Invalid Regex: ${e.message}`);
            return 0;
        }
    }, [pattern, testString, flags]);
    
    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-shrink-0">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Regular Expression</label>
                <input type="text" value={pattern} onChange={e => setPattern(e.target.value)} placeholder="e.g., \b[A-Z]+\b" className="w-full font-mono bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="flex-shrink-0 flex items-center space-x-6">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Flags:</label>
                {['g', 'i', 'm'].map(flag => (
                    <label key={flag} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" checked={flags[flag]} onChange={() => handleFlagChange(flag)} className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500" />
                        <span className="font-mono">{flag}</span>
                    </label>
                ))}
            </div>
             <div className="flex-grow flex flex-col min-h-[200px]">
                <ToolTextarea label="Test String" value={testString} onChange={setTestString} placeholder="Text to test against..." />
            </div>
            <div className="flex-shrink-0 flex items-center justify-between">
                {error ? <p className="text-red-500 dark:text-red-400 text-sm">{error}</p> : <div></div>}
                <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Matches found: <span className="font-bold text-indigo-600 dark:text-indigo-400">{matchCount}</span></p>
                    <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear All</button>
                </div>
            </div>
        </div>
    );
};

export default RegexTester;