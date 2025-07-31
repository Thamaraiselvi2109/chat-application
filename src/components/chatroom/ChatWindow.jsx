import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/slices/ChatSlice';

const ChatWindow = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const selectedRoom = useSelector((state) => state.rooms.selected);
    const messages = useSelector((state) => state.chat.messages[selectedRoom] || []);

    const handleSend = () => {
        if (input.trim()) {
            dispatch(sendMessage({ room: selectedRoom, message: input }));
            setInput('');
        }
    };

    return (
        <main className="flex flex-col h-[calc(100vh-100px)] backdrop-blur-md bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden">
            {/* Header */}
            <header className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-4 border-b border-white/20 dark:border-white/10">
                <h2 className="text-lg font-semibold truncate">{selectedRoom}</h2>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className="bg-[#9333ea] text-white p-3 rounded w-max max-w-[75%] ml-auto shadow"
                        >
                            {msg}
                        </div>
                    ))}
                </div>
            </div>

            {/* Input */}
            <footer className="p-4 border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md flex gap-2">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 px-4 py-2 border rounded bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-black dark:text-white placeholder:text-gray-600 dark:placeholder:text-gray-300"
                />
                <button
                    onClick={handleSend}
                    className="bg-[#9333ea] hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </footer>
        </main>
    );
};

export default ChatWindow;
