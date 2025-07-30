import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import AppRouter from './routes/AppRouter';
import Navbar from './components/common/Navbar';

function App() {
  const { isDark } = useSelector((state) => state.theme);

  // Add or remove the 'dark' class from <html> tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className="app">
      <Navbar/>
      <AppRouter/>
    </div>
  );
}

export default App;
