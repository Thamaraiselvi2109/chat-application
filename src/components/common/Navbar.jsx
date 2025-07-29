import { useDispatch } from 'react-redux';
import logo from '../../assets/kuvaka.svg'
import { toggleTheme } from '../../store/slices/ThemeSlice';


const Navbar = () => {
    const dispatch = useDispatch();
    return (
        <div className='container mx-auto py-5'>
            <div className='flex justify-between'>
                <img src={logo} alt="kuvaka" />
                <button onClick={() => dispatch(toggleTheme())} className="px-4 py-2 bg-gray-300 dark:bg-gray-800 text-black dark:text-white rounded">Toggle Theme</button>
            </div>
        </div>
    );
}

export default Navbar;
