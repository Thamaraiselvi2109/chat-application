import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/ChatSlice';
import { LogOut } from '../auth/LogOut';
import { Menu } from 'lucide-react';

const ChatWindow = ({ onToggleSidebar }) => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const scrollContainerRef = useRef(null);

    const [input, setInput] = useState('');
    const [filePreview, setFilePreview] = useState(null);
    const [isBotTyping, setIsBotTyping] = useState(false);

    const selectedRoom = useSelector((state) => state.rooms.selected);
    const messages = useSelector((state) => state.chat.messages[selectedRoom] || []);

    const botReplies = [
        "Hello there!",
        "I'm a bot, how can I assist you?",
        "Interesting...",
        "Please wait while I process that.",
        "Sure, I can help with that!"
    ];

    const getCurrentTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const handleSend = () => {
        if (!selectedRoom) return;

        if (input.trim()) {
            dispatch(sendMessage({
                room: selectedRoom,
                message: { text: input, sender: 'user', timestamp: getCurrentTime() }
            }));
            setInput('');
            sendBotReply();
        }

        if (filePreview) {
            dispatch(sendMessage({
                room: selectedRoom,
                message: { text: filePreview, sender: 'user', type: 'file', timestamp: getCurrentTime() }
            }));
            setFilePreview(null);
            sendBotReply();
        }
    };

    const sendBotReply = () => {
        setIsBotTyping(true);
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];

        setTimeout(() => {
            dispatch(sendMessage({
                room: selectedRoom,
                message: { text: randomReply, sender: 'bot', timestamp: getCurrentTime() }
            }));
            setIsBotTyping(false);
        }, 2000);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isBotTyping]);

    const scrollToTop = () => {
        scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!selectedRoom) {
        return (
            <div className="h-[calc(100vh-100px)] flex items-center justify-center text-gray-500">
                Select a room to start chatting
            </div>
        );
    }

    return (
        <main className="flex flex-col h-[calc(100vh-70px)] md:h-[calc(100vh-100px)] rounded-2xl shadow overflow-hidden">
            {/* Header */}
            <header className="p-4 border-b flex justify-between items-center bg-white dark:bg-gray-800">
                <h2 className="text-lg font-semibold truncate text-gray-800 dark:text-white">{selectedRoom}</h2>
                <div className="flex items-center gap-2">
                    <LogOut />
                    <button
                        className="md:hidden bg-[#9333ea] text-white p-2 rounded-full"
                        onClick={onToggleSidebar}
                        title="Open Chat List"
                    >
                        <Menu size={18} />
                    </button>
                </div>
            </header>

            {/* Messages */}
            <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                            <div className={`p-3 rounded max-w-[75%] shadow 
                                ${msg.sender === 'user'
                                    ? 'bg-[#9333ea] text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'}`}>
                                {msg.type === 'file' ? (
                                    <img src={msg.text} alt="uploaded file" className="max-w-xs rounded" />
                                ) : (
                                    msg.text
                                )}
                            </div>
                            <span className="text-xs text-gray-500 mt-1">{msg.timestamp}</span>
                        </div>
                    ))}

                    {filePreview && (
                        <div className="bg-yellow-100 text-sm text-yellow-900 p-2 rounded max-w-xs ml-auto">
                            Preview:
                            <img src={filePreview} alt="preview" className="mt-1 rounded" />
                        </div>
                    )}

                    {isBotTyping && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="bg-gray-300 dark:bg-gray-700 px-3 py-2 rounded-full animate-pulse">
                                Bot is typing...
                            </span>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>
            </div>

            <button
                onClick={scrollToTop}
                className="absolute bottom-[110px] right-6 bg-gray-300 dark:bg-gray-700 px-2 py-1 text-sm rounded shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                title="Scroll to top"
            >
                ↑ Top
            </button>

            {/* Input */}
            <footer className="p-4 border-t flex gap-2 items-center bg-white dark:bg-gray-800">
                <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-gray-300 dark:bg-gray-700 p-2 rounded"
                    title="Attach File"
                >
                    📎
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                />
                <input
                    type="text"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2 border rounded bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#9333ea] text-white px-4 py-2 rounded hover:bg-[#7e22ce]"
                >
                    Send
                </button>
            </footer>
        </main>
    );
};

export default ChatWindow;
