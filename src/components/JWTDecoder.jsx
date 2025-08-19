import React, { useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea, ToolOutput } from './common';

const JWTDecoder = () => {
    const [token, setToken] = usePersistentState('jwt-token', '');

    const { header, payload, error } = useMemo(() => {
        if (!token.trim()) {
            return { header: '', payload: '', error: '' };
        }
        const parts = token.split('.');
        if (parts.length !== 3) {
            return { header: '', payload: '', error: 'Invalid JWT: Token must have 3 parts.' };
        }
        try {
            const headerDecoded = JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
            const payloadDecoded = JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))), null, 2);
            return { header: headerDecoded, payload: payloadDecoded, error: '' };
        } catch (e) {
            return { header: '', payload: '', error: 'Invalid JWT: Cannot decode token.' };
        }
    }, [token]);

    const handleClear = () => {
        setToken('');
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-grow flex flex-col space-y-4 min-h-[300px] md:min-h-0">
                <div className="flex-1 flex flex-col">
                   <ToolTextarea label="Encoded JWT" value={token} onChange={setToken} placeholder="Paste your JWT here..." />
                </div>
                <div className="grid md:grid-cols-2 gap-4 flex-1">
                   <ToolOutput label="Header" value={header} placeholder="Decoded header..." />
                   <ToolOutput label="Payload" value={payload} placeholder="Decoded payload..." />
                </div>
            </div>
            <div className="flex-shrink-0 flex items-center space-x-4">
                <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
                {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
            </div>
        </div>
    );
};

export default JWTDecoder;