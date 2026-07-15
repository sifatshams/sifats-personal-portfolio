// @ts-nocheck
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);

export const askGemini = async (prompt) => {
  try {
    if (!prompt?.trim()) {
      return 'Please enter a prompt.';
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const result = await model.generateContent(prompt);

    const response = result.response;

    return response.text();
  } catch (error) {
    console.error('Gemini Error:', error);

    return '⚠️ AI is currently unavailable. Please try again.';
  }
};
