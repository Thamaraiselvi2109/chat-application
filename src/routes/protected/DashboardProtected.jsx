import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const DashboardProtected = ({ children }) => {
    const {secretCode, userOtp} = useSelector((state) => state.details)
    if(secretCode !== userOtp){
        return <Navigate to="/" replace/>;
    }
     return children;
}

export default DashboardProtected;
