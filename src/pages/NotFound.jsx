import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();
    const goBack = () =>{
        navigate('/')
    }
    return (
    <div className="h-[75vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-purple-600">404</h1>
        <p className="mt-4 text-2xl text-gray-800 dark:text-gray-200">Page Not Found</p>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Sorry, the page you are looking for does not exist.</p>
        <button onClick={goBack} className="bg-[#9333ea] text-white px-4 my-5 py-2 rounded">Go Home</button>
      </div>
    </div>
  );
};

export default NotFound;
