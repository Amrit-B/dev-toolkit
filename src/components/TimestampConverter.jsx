import React, { useState, useCallback, useEffect } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';

const TimestampConverter = () => {
    const [timestamp, setTimestamp] = usePersistentState('timestamp-input', '');
    const [dateString, setDateString] = useState('');
    const [error, setError] = useState('');

    const updateFromTimestamp = useCallback((ts) => {
        if (ts.trim() === '') { setDateString(''); setError(''); return; }
        const num = parseInt(ts, 10);
        if (isNaN(num) || String(num).length < 10) { setError('Invalid timestamp'); setDateString(''); return; }
        const date = new Date(num * 1000);
        if (isNaN(date.getTime())) { setError('Invalid timestamp'); setDateString(''); } else { setDateString(date.toString()); setError(''); }
    }, []);

    useEffect(() => { updateFromTimestamp(timestamp); }, [timestamp, updateFromTimestamp]);

    const handleSetToNow = () => {
        const nowTimestamp = Math.floor(new Date().getTime() / 1000);
        setTimestamp(nowTimestamp.toString());
    };
    
    const handleClear = () => {
        setTimestamp('');
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-shrink-0 flex items-center space-x-4">
                <button onClick={handleSetToNow} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition-colors">Set to Now</button>
                <button onClick={handleClear} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Unix Timestamp (seconds)</label>
                    <input type="text" value={timestamp} onChange={(e) => setTimestamp(e.target.value)} placeholder="e.g., 1672531200" className="w-full bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Human Readable Date</label>
                    <div className="w-full h-full bg-slate-100 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-3 text-gray-800 dark:text-gray-200">
                        {dateString ? (<><p><strong>Your Timezone:</strong> {dateString}</p><p className="mt-2"><strong>UTC:</strong> {new Date(parseInt(timestamp, 10) * 1000).toUTCString()}</p></>) : (<span className="text-gray-500">Date will appear here...</span>)}
                    </div>
                </div>
            </div>
            <div className="flex-shrink-0">{error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}</div>
        </div>
    );
};

export default TimestampConverter;