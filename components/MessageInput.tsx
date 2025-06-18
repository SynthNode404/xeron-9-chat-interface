
import React, { useState } from 'react';
import SendIcon from './ui/SendIcon';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isSending: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isSending }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() && !isSending) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-800 border-t border-gray-700 rounded-b-lg">
      <div className="flex items-center space-x-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Transmit to XERON-9..."
          className="flex-grow p-3 bg-gray-700 text-gray-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:outline-none placeholder-gray-500 disabled:opacity-50"
          disabled={isSending}
          aria-label="Message input"
        />
        <button
          type="submit"
          disabled={isSending || !inputValue.trim()}
          className="p-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 focus:ring-2 focus:ring-cyan-400 focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
          aria-label="Send message"
        >
          {isSending ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SendIcon />
          )}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
