// @ts-nocheck
import { motion } from 'framer-motion';
import LottieRaw from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import { FaPaperPlane, FaRobot } from 'react-icons/fa';
import aiLogo from '../assets/ai-logo.json';
import { askGemini } from '../lib/gemini';
import SEO from './SEO';

// lottie
const Lottie = LottieRaw.default ?? LottieRaw;

const suggestions = [
  'What is AI?',
  'How to learn React?',
  'Tell me about web development',
];

const AiChatSection = () => {
  const [messages, setMessages] = useState([
    {
      role: 'ai',
      text: "Hi 👋 I'm Sifat AI Assistant. Ask me anything.",
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const handleSend = async (customPrompt = '') => {
    const prompt = customPrompt || input;

    if (!prompt.trim()) return;
    if (loading) return;

    const userMessage = {
      role: 'user',
      text: prompt,
    };

    setMessages((prev) => [...prev, userMessage]);

    setInput('');
    setLoading(true);

    try {
      const reply = await askGemini(prompt);

      const aiMessage = {
        role: 'ai',
        text: reply || 'No response received.',
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);

      let message = '⚠️ AI is currently unavailable.';

      if (
        error?.message?.includes('429') ||
        error?.message?.includes('quota')
      ) {
        message = '⚠️ Gemini API quota exceeded. Please try again later.';
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: message,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-24 bg-[#0a0a0a]">
      {/* title */}
      <SEO
        title="AI chat"
        description="Explore AI-powered chat, features integrated into this portfolio, showcasing practical implementation of artificial intelligence in modern web applications."
        keywords="AI section, artificial intelligence, AI tools, machine learning demo, AI integration"
        image="/og-ai-section.png"
        url="https://sifatcoder.vercel.app/ai-chat"
      />
      <div className="max-w-[900px] mx-auto">
        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#646cff40] bg-[#646cff10] text-[#8f98ff] text-xs font-semibold uppercase tracking-[2px] mb-5">
            <FaRobot />
            Smart AI Experience
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-16">
              <Lottie animationData={aiLogo} loop />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              AI <span className="text-[#646cff]">Assistant</span>
            </h2>
          </div>

          <p className="text-slate-400 mt-4">
            Ask anything and get instant AI powered answers.
          </p>
        </div>

        {/* CHAT CARD */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 mb-5">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => handleSend(item)}
                className="px-3 py-2 rounded-full bg-slate-800 border border-slate-700 hover:border-[#646cff] text-slate-300 text-sm"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="h-[420px] overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm whitespace-pre-wrap leading-7 ${
                    msg.role === 'user'
                      ? 'bg-[#646cff] text-white'
                      : 'bg-slate-800 border border-slate-700 text-slate-200'
                  }`}
                >
                  {msg.role === 'ai' && (
                    <div className="flex items-center gap-2 text-[#646cff] mb-2">
                      <FaRobot />
                      Sifat AI
                    </div>
                  )}

                  {msg.text}
                </div>
              </motion.div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 border border-slate-700 rounded-2xl px-4 py-3 flex gap-2">
                  <span className="animate-bounce">•</span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '.1s' }}
                  >
                    •
                  </span>
                  <span
                    className="animate-bounce"
                    style={{ animationDelay: '.2s' }}
                  >
                    •
                  </span>
                </div>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          {/* Input */}
          <div className="mt-5 flex gap-3">
            <input
              type="text"
              value={input}
              placeholder="Ask anything..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-slate-800 border border-slate-700 focus:border-[#646cff] outline-none text-white px-4 py-3 rounded-xl"
            />

            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="bg-[#646cff] hover:bg-[#5563ff] px-5 rounded-xl text-white disabled:opacity-50"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiChatSection;
