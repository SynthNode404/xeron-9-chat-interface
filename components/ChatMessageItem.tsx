
import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import Xeron9Avatar from './ui/Xeron9Avatar';
import LoadingSpinner from './ui/LoadingSpinner';

interface ChatMessageItemProps {
  message: ChatMessage;
}

const UserIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-gray-400">
    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
  </svg>
);

const ChatMessageItem: React.FC<ChatMessageItemProps> = ({ message }) => {
  const isUser = message.sender === MessageSender.USER;
  const isXeron9 = message.sender === MessageSender.XERON9;

  // Split text by newlines and render each line in a <p> tag to preserve formatting.
  // Also handle markdown-like code blocks for XERON-9 if needed, though system prompt discourages this.
  const formattedText = message.text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      {index < message.text.split('\n').length - 1 && <br />}
    </React.Fragment>
  ));

  return (
    <div className={`flex my-3 gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {isXeron9 && <Xeron9Avatar className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />}
      
      <div 
        className={`
          max-w-[70%] p-3 rounded-xl shadow
          ${isUser ? 'bg-sky-600 text-white rounded-br-none' : 'bg-gray-700 text-gray-200 rounded-bl-none'}
        `}
      >
        {message.isStreaming && message.text.length === 0 ? (
          <div className="flex items-center space-x-2">
            <LoadingSpinner size="sm" color="text-cyan-300" />
            <span className="text-xs text-cyan-300 italic">XERON-9 is formulating...</span>
          </div>
        ) : (
          <p className="text-sm whitespace-pre-wrap break-words">{formattedText}</p>
        )}
      </div>

      {isUser && <UserIcon />}
    </div>
  );
};

export default ChatMessageItem;
