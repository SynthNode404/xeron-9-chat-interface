
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'md', color = 'text-cyan-400' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[3px]',
    lg: 'w-8 h-8 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]} ${color} border-solid`}
        role="status"
        aria-label="Loading..."
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
