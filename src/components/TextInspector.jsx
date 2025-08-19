import React, { useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea } from './common';

const TextInspector = () => {
    const [input, setInput] = usePersistentState('text-inspector-input', '');
    const stats = useMemo(() => {
        if (!input) return { characters: 0, words: 0, lines: 0 };
        const trimmedInput = input.trim();
        const words = trimmedInput ? trimmedInput.split(/\s+/).length : 0;
        return { characters: input.length, words, lines: input.split('\n').length };
    }, [input]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow min-h-[200px]"><ToolTextarea label="Your Text" value={input} onChange={setInput} placeholder="Paste your text here to see statistics..." /></div>
            <div className="flex-shrink-0 mt-4 p-4 bg-slate-100 dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md flex justify-around items-center">
                <div className="text-center"><p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{stats.characters}</p><p className="text-sm text-gray-500 dark:text-gray-400">Characters</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{stats.words}</p><p className="text-sm text-gray-500 dark:text-gray-400">Words</p></div>
                <div className="text-center"><p className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">{stats.lines}</p><p className="text-sm text-gray-500 dark:text-gray-400">Lines</p></div>
                <button onClick={() => setInput('')} className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-md transition-colors">Clear</button>
            </div>
        </div>
    );
};

export default TextInspector;