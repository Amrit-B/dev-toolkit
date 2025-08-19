import React, { useState, useCallback } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea, ToolOutput } from './common';

const JsonFormatter = () => {
    const [input, setInput] = usePersistentState('json-input', '{\n  "hello": "world"\n}');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');

    const handleFormat = useCallback(() => {
        if (!input.trim()) { setOutput(''); setError(''); return; }
        try {
            const formatted = JSON.stringify(JSON.parse(input), null, 2);
            setOutput(formatted);
            setError('');
        } catch (e) {
            setOutput('');
            setError(`Invalid JSON: ${e.message}`);
        }
    }, [input]);
    
    const handleMinify = useCallback(() => {
         if (!input.trim()) { setOutput(''); setError(''); return; }
        try {
            const minified = JSON.stringify(JSON.parse(input));
            setOutput(minified);
            setError('');
        } catch (e) {
            setOutput('');
            setError(`Invalid JSON: ${e.message}`);
        }
    }, [input]);

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow min-h-[200px] md:min-h-0">
                <ToolTextarea label="JSON Input" value={input} onChange={setInput} placeholder='Paste your JSON here...' />
                <ToolOutput label="Formatted Output" value={output} placeholder='Formatted JSON will appear here...' />
            </div>
            <div className="flex-shrink-0 flex flex-wrap items-center gap-4">
                <button onClick={handleFormat} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Format</button>
                <button onClick={handleMinify} className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Minify</button>
                <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
                {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default JsonFormatter;