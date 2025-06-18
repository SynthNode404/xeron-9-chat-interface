
export enum MessageSender {
  USER = 'user',
  XERON9 = 'xeron9',
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  isStreaming?: boolean;
}
