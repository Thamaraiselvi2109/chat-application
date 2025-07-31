import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, deleteRoom, selectRoom, setSearchTerm } from '../../store/slices/RoomsSlice';
import { X } from 'lucide-react';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { list, searchTerm, selected } = useSelector((state) => state.rooms);
    const [newRoom, setNewRoom] = useState('');

    const filteredRooms = list.filter((room) =>
        room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className=" w-[] md:w-[260px] 
            h-[250px] md:h-full 
            fixed md:static bottom-0 left-0 
            z-20 p-3 overflow-y-auto 
            bg-white dark:bg-gray-900 
            shadow md:shadow-none border-t md:border-t-0
            border-gray-200 dark:border-white/10">

            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Chats</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search rooms..."
                className="w-full mb-4 px-3 py-2 rounded-md 
                           border border-gray-300 dark:border-white/10 
                           bg-white dark:bg-gray-700 
                           text-gray-800 dark:text-white 
                           placeholder:text-gray-400 dark:placeholder:text-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-violet-500"
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />

            {/* Room List */}
            <ul className="space-y-2 mb-5">
                {filteredRooms.map((room) => (
                    <li
                        key={room}
                        className="flex justify-between items-center group px-2 py-1 rounded hover:bg-violet-100 dark:hover:bg-gray-700"
                    >
                        <span
                            className={`cursor-pointer text-sm md:text-base 
                                ${selected === room
                                    ? 'text-violet-600 font-semibold'
                                    : 'text-gray-800 dark:text-white'}`}
                            onClick={() => dispatch(selectRoom(room))}
                        >
                            {room}
                        </span>

                        {room !== 'General' && (
                            <button
                                onClick={() => dispatch(deleteRoom(room))}
                                className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                                title="Delete Room"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            {/* New Room Input (responsive) */}
            <div className="flex flex-col sm:flex-row gap-2">
                <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="New room"
                    className="w-full sm:flex-1 px-3 py-2 rounded-md 
                               border border-gray-300 dark:border-white/10 
                               bg-white dark:bg-gray-700 
                               text-gray-800 dark:text-white 
                               placeholder:text-gray-400 dark:placeholder:text-gray-300 
                               focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
                <button
                    onClick={() => {
                        if (newRoom.trim()) {
                            dispatch(addRoom(newRoom));
                            setNewRoom('');
                        }
                    }}
                    className="px-4 py-2 rounded-md text-white bg-violet-600 hover:bg-violet-700 transition w-full sm:w-auto"
                >
                    +
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
