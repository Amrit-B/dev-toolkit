import { useState, useEffect } from 'react';

export const usePersistentState = (key, defaultValue) => {
    const [state, setState] = useState(() => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
};