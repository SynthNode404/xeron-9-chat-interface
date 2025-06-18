
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import ChatMessageItem from './ChatMessageItem';

interface ChatWindowProps {
  messages: ChatMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex-grow p-4 space-y-2 overflow-y-auto bg-gray-800/50 rounded-t-lg h-[calc(100vh-250px)] md:h-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800/50">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p className="text-lg">Communication channel open.</p>
          <p className="text-sm">Transmit your query to XERON-9.</p>
        </div>
      )}
      {messages.map((msg) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;
