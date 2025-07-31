import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearDetails } from "../../store/slices/DetailsSlice";

export const LogOut = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(clearDetails());
        navigate('/');
    };

    return (
        <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
            Logout
        </button>
    );
};

