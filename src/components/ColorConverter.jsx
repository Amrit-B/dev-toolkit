import React, { useState, useMemo } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { ToolOutput } from './common';

const ColorConverter = () => {
    const [color, setColor] = usePersistentState('color-converter-color', '#4f46e5');
    const [error, setError] = useState('');

    const formats = useMemo(() => {
        try {
            setError('');
            if (!/^#([0-9A-F]{3}){1,2}$/i.test(color)) {
                throw new Error('Invalid HEX code');
            }
            
            let r, g, b;
            let hex = color.substring(1);
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join('');
            }
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);

            const r_norm = r / 255, g_norm = g / 255, b_norm = b / 255;
            const max = Math.max(r_norm, g_norm, b_norm), min = Math.min(r_norm, g_norm, b_norm);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r_norm: h = (g_norm - b_norm) / d + (g_norm < b_norm ? 6 : 0); break;
                    case g_norm: h = (b_norm - r_norm) / d + 2; break;
                    case b_norm: h = (r_norm - g_norm) / d + 4; break;
                }
                h /= 6;
            }
            
            return {
                hex: color,
                rgb: `${r}, ${g}, ${b}`,
                hsl: `${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%`
            };

        } catch (e) {
            setError(e.message);
            return { hex: color, rgb: 'N/A', hsl: 'N/A' };
        }
    }, [color]);

    return (
        <div className="h-full flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Color Picker</label>
                        <input type="color" value={formats.hex} onChange={e => setColor(e.target.value)} className="w-full h-12 p-1 bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md cursor-pointer" />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">HEX</label>
                        <ToolOutput value={formats.hex} />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">RGB</label>
                        <ToolOutput value={formats.rgb} />
                    </div>
                     <div>
                        <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">HSL</label>
                        <ToolOutput value={formats.hsl} />
                    </div>
                </div>
            </div>
             {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
        </div>
    );
};

export default ColorConverter;