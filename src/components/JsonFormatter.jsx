import React, { useState, useCallback } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolTextarea, ToolOutput, LoadingSpinner } from './common';

const JsonFormatter = () => {
    const [input, setInput] = usePersistentState('json-input', '{\n  "hello": "world"\n}');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [prompt, setPrompt] = usePersistentState('json-prompt', 'an array of 3 users with a name and email');
    const [isLoading, setIsLoading] = useState(false);

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

    const handleGenerateData = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setError('');
        try {
            const fullPrompt = `Generate a valid JSON object based on the following description. Respond with ONLY the JSON code, without any markdown formatting or extra text: ${prompt}`;
            let chatHistory = [{ role: "user", parts: [{ text: fullPrompt }] }];
            const payload = { contents: chatHistory };
            const apiKey =  import.meta.env.VITE_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            
            const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
            
            JSON.parse(cleanedText);
            setInput(cleanedText);

        } catch (e) {
            setError(`AI generation failed: ${e.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                <input 
                    type="text"
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Describe the mock data you want..."
                    className="w-full flex-grow bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md p-2 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button onClick={handleGenerateData} disabled={isLoading} className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-purple-400">
                    {isLoading ? <LoadingSpinner /> : '✨ Generate Mock Data'}
                </button>
            </div>

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