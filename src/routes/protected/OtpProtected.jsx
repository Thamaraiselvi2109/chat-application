import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const OtpProtected = ({ children }) => {
    const phone = useSelector((state) => state.details.number)
    if(!phone){
        return <Navigate to="/" replace />;
    }
     return children;
}

export default OtpProtected;
