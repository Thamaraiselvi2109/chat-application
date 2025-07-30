import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/slices/ThemeSlice';
import { Sun, Moon } from 'lucide-react';
import logo from '../../assets/kuvaka.svg';
import logoblack from '../../assets/kuvaka_black.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {
    const dispatch = useDispatch();
    const isDark = useSelector((state) => state.theme.isDark);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const baseStyle = 'transition-all duration-300 backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] dark:border-white/10';
    const stickyStyle = 'sticky top-0 z-50';
    const relativeStyle = 'relative';

    return (
        <div className={`${baseStyle} ${isSticky ? stickyStyle : relativeStyle}`}>
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <img
                            src={isDark ? logo : logoblack}
                            alt="kuvaka"
                            className="h-10 sm:h-12 md:h-16 w-auto"
                        />
                    </div>

                    {/*Toggle Button */}
                    <button
                        onClick={() => dispatch(toggleTheme())}
                        className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
                    >
                        {isDark ? (
                            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                        ) : (
                            <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
