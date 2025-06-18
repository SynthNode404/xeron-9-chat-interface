
import { GoogleGenAI, Chat } from "@google/genai";
import { XERON9_SYSTEM_INSTRUCTION, GEMINI_MODEL_NAME } from '../constants';

let ai: GoogleGenAI | null = null;
let chatInstance: Chat | null = null;

const getAI = (): GoogleGenAI => {
  if (!ai) {
    if (!process.env.API_KEY) {
      // This case should ideally be handled by the environment providing the key.
      // For the purpose of this exercise, we'll throw an error if it's missing,
      // as the prompt specifies it's assumed to be available.
      throw new Error("API_KEY environment variable not found. Ensure it is set in your environment.");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const initXeron9Chat = (): Chat => {
  if (chatInstance) {
    return chatInstance;
  }
  const genAI = getAI();
  chatInstance = genAI.chats.create({
    model: GEMINI_MODEL_NAME,
    config: {
      systemInstruction: XERON9_SYSTEM_INSTRUCTION,
    },
  });
  return chatInstance;
};

export const sendMessageToXeron9Stream = async (
  chat: Chat,
  message: string
) => {
  try {
    const result = await chat.sendMessageStream({ message });
    return result; // Stream of GenerateContentResponse
  } catch (error) {
    console.error("Error sending message to XERON-9:", error);
    throw error; // Re-throw to be handled by the UI
  }
};
