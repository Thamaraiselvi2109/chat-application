import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/ChatSlice';
import { LogOut } from '../auth/LogOut';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const fileInputRef = useRef(null);
    const [input, setInput] = useState('');
    const [filePreview, setFilePreview] = useState(null);

    const selectedRoom = useSelector((state) => state.rooms.selected);
    const messages = useSelector((state) => state.chat.messages[selectedRoom] || []);

    const botReplies = [
        "Hello there!",
        "I'm a bot, how can I assist you?",
        "Interesting...",
        "Please wait while I process that.",
        "Sure, I can help with that!"
    ];

    const handleSend = () => {
        if (!selectedRoom) return;

        if (input.trim()) {
            dispatch(sendMessage({ room: selectedRoom, message: { text: input, sender: 'user' } }));
            setInput('');
            sendBotReply();
        }

        if (filePreview) {
            dispatch(sendMessage({ room: selectedRoom, message: { text: filePreview, sender: 'user', type: 'file' } }));
            setFilePreview(null);
            sendBotReply();
        }
    };

    const sendBotReply = () => {
        const randomReply = botReplies[Math.floor(Math.random() * botReplies.length)];
        setTimeout(() => {
            dispatch(sendMessage({ room: selectedRoom, message: { text: randomReply, sender: 'bot' } }));
        }, 1000);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFilePreview(reader.result); // base64 image
            };
            reader.readAsDataURL(file);
        }
    };

    if (!selectedRoom) {
        return (
            <div className="h-[calc(100vh-100px)] flex items-center justify-center text-gray-500">
                Select a room to start chatting
            </div>
        );
    }

    return (
        <main className="flex flex-col h-[calc(100vh-100px)] bg-white/20 dark:bg-white/10 rounded-2xl shadow overflow-hidden">
            {/* Header */}
            <header className="p-4 border-b flex justify-between">
                <h2 className="text-lg font-semibold truncate">{selectedRoom}</h2>
                <LogOut/>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded w-max max-w-[75%] shadow ${
                                msg.sender === 'user'
                                    ? 'bg-[#9333ea] text-white ml-auto'
                                    : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white mr-auto'
                            }`}
                        >
                            {msg.type === 'file' ? (
                                <img src={msg.text} alt="uploaded file" className="max-w-xs rounded" />
                            ) : (
                                msg.text
                            )}
                        </div>
                    ))}

                    {filePreview && (
                        <div className="bg-yellow-100 text-sm text-yellow-900 p-2 rounded max-w-xs ml-auto">
                            Preview:
                            <img src={filePreview} alt="preview" className="mt-1 rounded" />
                        </div>
                    )}
                </div>
            </div>

            {/* Input */}
            <footer className="p-4 border-t flex gap-2 items-center">
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
                    className="flex-1 px-4 py-2 border rounded bg-white/50 dark:bg-gray-700/50"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#9333ea] text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </footer>
        </main>
    );
};

export default ChatWindow;
