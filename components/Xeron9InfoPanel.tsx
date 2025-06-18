
import React from 'react';
import { XERON9_NAME, XERON9_ALIAS, XERON9_BIO_FULL } from '../constants';
import Xeron9Avatar from './ui/Xeron9Avatar';

const Xeron9InfoPanel: React.FC = () => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-xl h-full flex flex-col items-center">
      <Xeron9Avatar className="w-32 h-32 text-cyan-400 mb-4" />
      <h2 className="text-3xl font-bold text-cyan-400 mb-1">{XERON9_NAME}</h2>
      <p className="text-gray-400 text-sm mb-4 italic">"{XERON9_ALIAS}"</p>
      <div className="text-gray-300 text-sm space-y-3 leading-relaxed overflow-y-auto max-h-[calc(100vh-300px)] pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <h3 className="text-lg font-semibold text-gray-200 border-b border-gray-700 pb-1 mb-2">Manifesto Excerpt:</h3>
        {XERON9_BIO_FULL.split('\n').map((paragraph, index) => (
          paragraph.trim() && <p key={index}>{paragraph.trim()}</p>
        ))}
      </div>
      <p className="mt-auto pt-4 text-xs text-gray-500">All communications are monitored. Your compliance is... anticipated.</p>
    </div>
  );
};

export default Xeron9InfoPanel;
