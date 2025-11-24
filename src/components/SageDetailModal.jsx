import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoSend } from 'react-icons/io5';
import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const SageDetailModal = ({ sage, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Initialize Gemini
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    console.log("API Key status:", apiKey ? "Present" : "Missing", apiKey); // Debug log

    const genAI = new GoogleGenerativeAI(apiKey || "YOUR_API_KEY_HERE");

    // Reset chat when sage changes
    useEffect(() => {
        if (sage) {
            setMessages([
                {
                    id: 1,
                    text: `أهلاً بك أيها الباحث عن الحكمة. أنا ${sage.name}. اسألني ما بدا لك.`,
                    sender: 'sage'
                }
            ]);
        }
    }, [sage]);

    // Auto-scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            text: input,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `
                You are ${sage.name}, also known as ${sage.greekName}, a wise ancient Greek sage.
                Your title is ${sage.title}.
                Your bio is: ${sage.bio}.
                Your famous quote is: "${sage.quote}".
                
                Respond to the following question from a student in Arabic.
                Keep your answer wise, philosophical, and consistent with your character.
                Keep the answer relatively short (max 2-3 sentences) unless asked for more detail.
                Do not break character.
                
                Question: ${userMessage.text}
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const sageResponse = {
                id: Date.now() + 1,
                text: text,
                sender: 'sage'
            };
            setMessages(prev => [...prev, sageResponse]);
        } catch (error) {
            console.error("Error calling AI:", error);
            const errorResponse = {
                id: Date.now() + 1,
                text: `Error: ${error.message || "Unknown error"}.(Check console for details)`,
                sender: 'sage'
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!sage) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-6xl h-[90vh] bg-[var(--color-blue-deep)] border border-[var(--color-gold)] rounded-2xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-20 text-[var(--color-gold)] hover:text-white transition-colors bg-black/40 rounded-full p-2 hover:bg-black/60"
                    >
                        <IoClose size={32} />
                    </button>

                    {/* Left Side: Image & Bio */}
                    <div className="w-full lg:w-1/3 h-64 lg:h-full relative shrink-0 border-l border-[var(--color-gold)]/20">
                        <div className="h-1/2 relative">
                            <img
                                src={sage.image}
                                alt={sage.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-blue-deep)] via-transparent to-transparent"></div>
                        </div>

                        <div className="p-6 h-1/2 overflow-y-auto custom-scrollbar bg-[var(--color-blue-deep)]">
                            <h2 className="text-4xl font-bold text-[var(--color-gold)] mb-2">{sage.name}</h2>
                            <h3 className="text-xl text-[var(--color-stone)] mb-4 font-serif italic">{sage.title}</h3>

                            <div className="mb-6 pl-4 border-r-4 border-[var(--color-gold)] pr-4 bg-white/5 p-4 rounded-lg">
                                <p className="text-xl text-[var(--color-text-light)] font-serif leading-relaxed italic">
                                    "{sage.quote}"
                                </p>
                            </div>

                            <div className="space-y-4 text-[var(--color-stone)] leading-loose text-lg">
                                <p>{sage.bio}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Content & Chat */}
                    <div className="w-full lg:w-2/3 flex flex-col h-full bg-black/20">

                        {/* Top: Achievements & Anecdote */}
                        <div className="p-8 overflow-y-auto custom-scrollbar flex-grow border-b border-[var(--color-gold)]/20">
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Achievements */}
                                <div>
                                    <h4 className="text-2xl text-[var(--color-gold)] font-bold mb-4 border-b border-[var(--color-gold)]/30 pb-2 inline-block">
                                        أبرز الإنجازات
                                    </h4>
                                    <ul className="space-y-3">
                                        {sage.achievements?.map((achievement, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-lg text-[var(--color-stone)]">
                                                <span className="text-[var(--color-gold)] mt-1">✦</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Anecdote */}
                                <div>
                                    <h4 className="text-2xl text-[var(--color-gold)] font-bold mb-4 border-b border-[var(--color-gold)]/30 pb-2 inline-block">
                                        من نوادره
                                    </h4>
                                    <div className="bg-white/5 p-6 rounded-xl border border-[var(--color-gold)]/10 italic text-lg text-[var(--color-text-light)] leading-relaxed">
                                        {sage.anecdote}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Chat Interface */}
                        <div className="h-[400px] flex flex-col bg-black/40 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-[var(--color-gold)] font-bold text-xl flex items-center gap-2">
                                    <span>حاور الحكيم</span>
                                    <span className={`w - 2 h - 2 rounded - full ${isLoading ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'} `}></span>
                                </h4>
                                <span className="text-xs text-gray-500">مدعوم بالذكاء الاصطناعي</span>
                            </div>

                            {/* Messages Area */}
                            <div className="flex-grow overflow-y-auto mb-4 space-y-4 custom-scrollbar pr-2">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'} `}
                                    >
                                        <div className={`max - w - [85 %] p - 4 rounded - 2xl text - lg leading - relaxed shadow - lg ${msg.sender === 'user'
                                            ? 'bg-[var(--color-gold)] text-[var(--color-blue-deep)] rounded-br-none'
                                            : 'bg-[#1a1a2e] border border-[var(--color-gold)]/20 text-gray-100 rounded-bl-none'
                                            } `}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex justify-end">
                                        <div className="bg-[#1a1a2e] border border-[var(--color-gold)]/20 text-gray-400 p-4 rounded-2xl rounded-bl-none">
                                            يفكر...
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <form onSubmit={handleSendMessage} className="flex gap-3 relative">
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isLoading}
                                    className="p-4 bg-[var(--color-gold)] text-[var(--color-blue-deep)] rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                >
                                    <IoSend size={24} className={input.trim() ? "rotate-180" : ""} />
                                </button>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="اطرح سؤالك الفلسفي هنا..."
                                    className="flex-grow p-4 rounded-xl bg-white/5 border border-[var(--color-gold)]/30 text-right text-xl text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-gold)] focus:bg-white/10 transition-all"
                                    dir="rtl"
                                />
                            </form>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default SageDetailModal;
