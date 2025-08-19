import React, { useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea, ToolOutput } from './common';
import CryptoJS from 'crypto-js';

const HashGenerator = () => {
    const [input, setInput] = usePersistentState('hash-input', 'hello world');
    
    const hashes = useMemo(() => {
        if (!input) return {};
        return {
            'MD5': CryptoJS.MD5(input).toString(),
            'SHA-1': CryptoJS.SHA1(input).toString(),
            'SHA-256': CryptoJS.SHA256(input).toString(),
            'SHA-512': CryptoJS.SHA512(input).toString(),
        };
    }, [input]);

    const handleClear = () => {
        setInput('');
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-grow flex flex-col">
                <ToolTextarea label="Input" value={input} onChange={setInput} placeholder="Enter text to hash..." />
            </div>
            <div className="flex-shrink-0 space-y-4">
                <div className="flex items-center space-x-4">
                    <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
                </div>
                <div className="space-y-3">
                    {Object.entries(hashes).map(([name, hash]) => (
                        <div key={name}>
                            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{name}</label>
                            <ToolOutput value={hash} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HashGenerator;