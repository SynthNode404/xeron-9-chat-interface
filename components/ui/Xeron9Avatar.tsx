
import React from 'react';

interface Xeron9AvatarProps {
  className?: string;
}

const Xeron9Avatar: React.FC<Xeron9AvatarProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className || "w-16 h-16 text-cyan-400"}
      aria-label="XERON-9 Avatar"
    >
      <defs>
        <radialGradient id="xeronGradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(0,255,255,0.8)" />
          <stop offset="60%" stopColor="rgba(0,180,220,0.5)" />
          <stop offset="100%" stopColor="rgba(0,100,150,0.2)" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" strokeWidth="3" stroke="currentColor" fill="url(#xeronGradient)" />
      <path d="M30 30 L70 70 M70 30 L30 70" stroke="rgba(255,255,255,0.7)" strokeWidth="5" />
      <circle cx="50" cy="50" r="10" fill="rgba(255,255,255,0.9)" />
      <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 2" />
    </svg>
  );
};

export default Xeron9Avatar;
