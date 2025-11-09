/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';

interface AdjustmentPanelProps {
  onRemix: (prompt: string) => void;
  isLoading: boolean;
}

const examplePrompts = [
    'Change background to a beach',
    'Make the shirt red',
    'Add a denim jacket',
    'Add sunglasses',
];

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ onRemix, isLoading }) => {
    const [prompt, setPrompt] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (prompt.trim() && !isLoading) {
            onRemix(prompt.trim());
        }
    };

    const handleExampleClick = (example: string) => {
        setPrompt(example);
        if (!isLoading) {
            onRemix(example);
        }
    };

    return (
        <div className="pt-6 border-t border-gray-400/50">
            <h2 className="text-xl font-serif tracking-wider text-gray-800 mb-3">Magic Edit</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'change shirt to red' or 'add sunglasses'"
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-800 focus:border-gray-800 transition-colors bg-white/50"
                    disabled={isLoading}
                    aria-label="Magic Edit prompt"
                />
                <button
                    type="submit"
                    className="mt-2 w-full text-center bg-gray-900 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 ease-in-out hover:bg-gray-700 active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={isLoading || !prompt.trim()}
                >
                    {isLoading ? 'Applying...' : 'Apply Edit'}
                </button>
            </form>
            <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Or try an example:</p>
                <div className="grid grid-cols-2 gap-2">
                    {examplePrompts.map((p) => (
                        <button
                            key={p}
                            onClick={() => handleExampleClick(p)}
                            disabled={isLoading}
                            className="text-left text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-md transition-colors disabled:opacity-50"
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdjustmentPanel;