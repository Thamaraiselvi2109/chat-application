import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, selectRoom, setSearchTerm } from '../../store/slices/RoomsSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { list, searchTerm, selected } = useSelector((state) => state.rooms);
    const [newRoom, setNewRoom] = useState('');

    const filteredRooms = list.filter((room) =>
        room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <aside className="
  w-full md:w-[250px] 
  h-[250px] md:h-full 
  fixed md:static bottom-0 left-0 
  z-20 bg-white/60 dark:bg-gray-800/60 
  backdrop-blur-md p-4 overflow-y-auto 
  border-t md:border-t-0 md:border-r 
  border-white/30 dark:border-white/10
">

            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Chats</h2>

            <input
                type="text"
                placeholder="Search rooms..."
                className="w-full mb-3 p-2 rounded border border-white/30 dark:border-white/10 
                           bg-white/40 dark:bg-gray-700/40 
                           text-black dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 
                           backdrop-blur"
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />

            <ul className="space-y-2 mb-4">
                {filteredRooms.map((room) => (
                    <li
                        key={room}
                        className={`cursor-pointer hover:text-blue-500 
                            ${selected === room ? 'font-bold text-[#9333ea]' : 'text-black dark:text-white'}`}
                        onClick={() => dispatch(selectRoom(room))}
                    >
                        {room}
                    </li>
                ))}
            </ul>

            <div className="flex gap-2">
                <input
                    type="text"
                    value={newRoom}
                    onChange={(e) => setNewRoom(e.target.value)}
                    placeholder="New room"
                    className="flex-1 p-2 border border-white/30 dark:border-white/10 
                               rounded bg-white/40 dark:bg-gray-700/40 
                               text-black dark:text-white placeholder:text-gray-700 dark:placeholder:text-gray-300 
                               backdrop-blur"
                />
                <button
                    onClick={() => {
                        if (newRoom.trim()) {
                            dispatch(addRoom(newRoom));
                            setNewRoom('');
                        }
                    }}
                    className="px-3 bg-[#9333ea] py-2 text-white rounded hover:opacity-90 transition"
                >
                    +
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
