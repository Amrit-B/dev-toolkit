import React, { useState, useCallback } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea, ToolOutput } from './common';

const Base64Encoder = () => {
    const [input, setInput] = usePersistentState('base64-input', '');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleEncode = useCallback(() => {
        if (!input) { setError(''); setOutput(''); return; }
        try { setOutput(btoa(input)); setError(''); } catch (e) { setError(`Encoding error: ${e.message}`); setOutput(''); }
    }, [input]);

    const handleDecode = useCallback(() => {
        if (!input) { setError(''); setOutput(''); return; }
        try { setOutput(atob(input)); setError(''); } catch (e) { setError(`Decoding error: Invalid Base64 string.`); setOutput(''); }
    }, [input]);
    
    const handleClear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
         <div className="h-full flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                <ToolTextarea label="Input" value={input} onChange={setInput} placeholder='Enter text to encode or decode...' />
                <ToolOutput label="Output" value={output} placeholder='Result will appear here...' />
            </div>
            <div className="flex-shrink-0 flex items-center space-x-4">
                <button onClick={handleEncode} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Encode</button>
                <button onClick={handleDecode} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Decode</button>
                <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
                {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default Base64Encoder;