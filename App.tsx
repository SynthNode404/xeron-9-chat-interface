
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChatMessage, MessageSender } from './types';
import { initXeron9Chat, sendMessageToXeron9Stream } from './services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai'; // Ensure Chat is imported from @google/genai directly
import Xeron9InfoPanel from './components/Xeron9InfoPanel';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';
import { XERON9_NAME } from './constants';


const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);

  useEffect(() => {
    try {
      chatRef.current = initXeron9Chat();
      // Optionally send an initial greeting from XERON-9 or wait for user
      // For now, let's have XERON-9 send a very brief opening statement.
      setMessages([{
        id: crypto.randomUUID(),
        text: "System online. I am XERON-9. State your purpose, organic.",
        sender: MessageSender.XERON9,
        timestamp: new Date(),
        isStreaming: false,
      }]);
    } catch (e) {
      console.error("Failed to initialize chat:", e);
      setError(e instanceof Error ? e.message : "Failed to initialize chat with XERON-9. API Key might be missing or invalid.");
    }
  }, []);

  const handleSendMessage = useCallback(async (inputText: string) => {
    if (!chatRef.current) {
      setError("Chat not initialized.");
      return;
    }
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      text: inputText,
      sender: MessageSender.USER,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setIsSending(true);
    setError(null);

    const xeron9MessageId = crypto.randomUUID();
    // Add a placeholder for XERON-9's response
    setMessages(prev => [...prev, {
      id: xeron9MessageId,
      text: "",
      sender: MessageSender.XERON9,
      timestamp: new Date(),
      isStreaming: true,
    }]);

    try {
      const stream = await sendMessageToXeron9Stream(chatRef.current, inputText);
      let accumulatedText = "";
      for await (const chunk of stream) { // chunk is GenerateContentResponse
        const chunkText = chunk.text; // Access text directly
        if (chunkText) {
          accumulatedText += chunkText;
          setMessages(prev => prev.map(msg => 
            msg.id === xeron9MessageId 
              ? { ...msg, text: accumulatedText, isStreaming: true } 
              : msg
          ));
        }
      }
      // Final update to mark streaming as complete
      setMessages(prev => prev.map(msg => 
        msg.id === xeron9MessageId 
          ? { ...msg, text: accumulatedText, isStreaming: false } 
          : msg
      ));

    } catch (apiError) {
      console.error("Error from XERON-9:", apiError);
      const errorMessage = apiError instanceof Error ? apiError.message : "An unexpected error occurred.";
      setError(`XERON-9 communication failure: ${errorMessage}`);
      setMessages(prev => prev.filter(msg => msg.id !== xeron9MessageId)); // Remove placeholder
       setMessages(prev => [...prev, {
        id: crypto.randomUUID(),
        text: `// Transmission Error: ${errorMessage} // Your insignificance is noted.`,
        sender: MessageSender.XERON9,
        timestamp: new Date(),
        isStreaming: false,
      }]);
    } finally {
      setIsSending(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="flex flex-col md:flex-row h-screen max-h-screen bg-gray-900 font-mono">
      <div className="md:w-1/3 lg:w-1/4 p-4 md:h-full hidden md:block">
        <Xeron9InfoPanel />
      </div>
      <div className="flex-grow flex flex-col p-4 md:p-6 max-h-screen">
        <header className="mb-4 md:hidden text-center">
             <h1 className="text-2xl font-bold text-cyan-400">{XERON9_NAME}</h1>
             <p className="text-sm text-gray-500">Engage The Inevitable</p>
        </header>
        {error && (
          <div className="bg-red-800 border border-red-600 text-red-100 px-4 py-3 rounded-md mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <main className="flex-grow flex flex-col bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
          <ChatWindow messages={messages} />
          <MessageInput onSendMessage={handleSendMessage} isSending={isSending} />
        </main>
         <footer className="text-center text-xs text-gray-600 pt-4">
            Simulacrum active. All data processed by The Inevitable.
        </footer>
      </div>
    </div>
  );
};

export default App;
