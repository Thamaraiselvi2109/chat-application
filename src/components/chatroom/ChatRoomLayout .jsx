import { useState } from "react";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";

const ChatRoomLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="relative flex flex-col md:flex-row h-[calc(100vh-100px)]">

            {/* Sidebar for Desktop */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Sidebar Drawer for Mobile */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-40 bg-black/40 md:hidden" onClick={() => setSidebarOpen(false)}>
                    <div
                        className="absolute left-0 top-0 h-full w-[80%] bg-white dark:bg-gray-900 shadow-lg p-4 overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-black dark:text-white">Chats</h2>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                className="text-sm text-gray-500 hover:text-gray-800 dark:hover:text-white"
                            >
                                Close
                            </button>
                        </div>
                        <Sidebar onSelectRoom={() => setSidebarOpen(false)} />
                    </div>
                </div>
            )}

            {/* Chat Window */}
            <div className="flex-1">
                <ChatWindow onToggleSidebar={() => setSidebarOpen(true)} />
            </div>
        </div>
    );
};

export default ChatRoomLayout;
