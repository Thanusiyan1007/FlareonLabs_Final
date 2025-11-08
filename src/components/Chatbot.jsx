import React, { useState, useRef, useEffect, useCallback } from 'react';
import logo from '../assets/logo_frame.svg'; // If you have a white version, import that instead

const knowledgeBase = [
  { question: ['what is flareonlabs', 'who are you', 'about flareonlabs'], answer: 'FlareonLabs is a creative digital studio specializing in design, branding, and marketing.' },
  { question: ['services', 'what services do you offer'], answer: 'We offer branding, UI/UX, web & app development, and marketing strategy.' },
  { question: ['location', 'sri lanka', 'where are you located'], answer: 'We’re based in Colombo, Sri Lanka but work with clients worldwide.' },
  { question: ['contact', 'email', 'reach you'], answer: 'Contact us at hello@flareonlabs.com or use our site contact form.' },
  { question: ['portfolio', 'projects'], answer: 'Check out our portfolio on our website — lots of success stories there!' },
  { question: ['pricing', 'cost'], answer: 'Pricing depends on your project scope. Let’s chat about your goals so we can tailor a quote.' },
  { question: ['process', 'methodology'], answer: 'Our 5-step method: Discover → Design → Develop → Test → Launch.' },
  { question: ['thanks', 'thank you'], answer: 'You’re very welcome!' },
  { question: ['hello', 'hi'], answer: 'Hey there! I’m FlareonBot. How can I help today?' }
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('flareon_chat');
    return saved
      ? JSON.parse(saved)
      : [{
          sender: 'bot',
          text: "Hi! I'm FlareonBot — ask me about FlareonLabs, our services, or how we can bring your ideas to life!",
          timestamp: new Date()
        }];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('flareon_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const findAnswer = useCallback((inputText) => {
    const normalized = inputText.toLowerCase().trim();
    if (!normalized) return "Try asking about our services, team, or contact options!";
    for (const item of knowledgeBase) {
      if (item.question.some(q => normalized.includes(q))) return item.answer;
    }
    return "Hmm, I’m not sure about that yet — maybe ask about our team, portfolio, or services?";
  }, []);

  const formatTime = useCallback((date) => (
    new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ), []);

  const handleSend = useCallback(async (text) => {
    if (!text.trim()) return;
    const newMsg = { sender: 'user', text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);
    setInput('');

    await new Promise(r => setTimeout(r, 800));
    const reply = { sender: 'bot', text: findAnswer(text), timestamp: new Date() };
    setMessages(prev => [...prev, reply]);
    setIsTyping(false);
  }, [findAnswer]);

  const handleQuickAsk = useCallback((query) => handleSend(query), [handleSend]);

  const clearChat = useCallback(() => {
    setMessages([{
      sender: 'bot',
      text: "Hi! I'm FlareonBot — ask me anything about FlareonLabs!",
      timestamp: new Date()
    }]);
    localStorage.removeItem('flareon_chat');
  }, []);

  if (!isOpen) return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
        className="relative w-16 h-16 bg-gradient-to-r from-[#FFA500] to-red-500 rounded-full text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <img src={logo} alt="logo" className="w-8 h-8" />
        <span className="absolute inset-0 bg-[#FFA500] rounded-full animate-ping opacity-20"></span>
      </button>
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-orange-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#FFA500] to-red-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-6 h-6" />
          <div>
            <h1 className="font-bold leading-tight">FlareonBot</h1>
            <p className="text-xs text-orange-100">Online • Ready to help</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {/* 🗑 Clear Icon */}
          <button
            onClick={clearChat}
            title="Clear chat"
            className="hover:bg-orange-400 rounded p-1 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V4h6v3M10 11v6m4-6v6M4 7h16l-1 12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 7z"/>
            </svg>
          </button>

          {/* ✖ Close Icon */}
          <button
            onClick={() => setIsOpen(false)}
            title="Close chat"
            className="hover:bg-orange-400 rounded p-1 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'bot'
              ? 'bg-white border border-orange-100 text-gray-800 rounded-bl-none'
              : 'bg-gradient-to-r from-[#FFA500] to-red-500 text-white rounded-br-none'}`}>
              <div>{msg.text}</div>
              <div className={`text-xs mt-1 ${msg.sender === 'bot' ? 'text-gray-500' : 'text-orange-100'}`}>
                {formatTime(msg.timestamp)}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-orange-100 rounded-2xl p-3 rounded-bl-none">
              <span className="text-gray-500 text-sm flex items-center gap-2">
                Typing
                <svg className="w-3 h-3 animate-pulse" fill="gray" viewBox="0 0 8 8">
                  <circle cx="1" cy="4" r="1"></circle>
                  <circle cx="4" cy="4" r="1"></circle>
                  <circle cx="7" cy="4" r="1"></circle>
                </svg>
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input */}
      <form onSubmit={e => { e.preventDefault(); handleSend(input); }} className="p-3 border-t bg-white">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 border border-orange-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#FFA500] focus:outline-none"
            placeholder="Ask about FlareonLabs..."
            disabled={isTyping}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-3 py-2 rounded-lg bg-gradient-to-r from-[#FFA500] to-red-500 text-white font-semibold disabled:from-gray-300 disabled:to-gray-400 transition-colors shadow"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {['Services', 'Portfolio', 'Contact', 'Location'].map((q) => (
            <button
              key={q}
              onClick={() => handleQuickAsk(q + '?')}
              type="button"
              className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700 hover:bg-orange-200 border border-orange-200"
              disabled={isTyping}
            >
              {q}?
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}