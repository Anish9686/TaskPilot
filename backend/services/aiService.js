import { GoogleGenerativeAI } from '@google/generative-ai';

export const generateTaskDescription = async (title) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Generate a professional, concise, and developer-friendly task description for a task titled: "${title}". The description should be 1-2 sentences long and focus on technical implementation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to generate task description using AI');
  }
};
