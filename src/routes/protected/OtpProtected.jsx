import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

const OtpProtected = ({ children }) => {
    const {number} = useSelector((state) => state.details)
    if(!number){
        return <Navigate to="/" replace/>;
    }
     return children;
}

export default OtpProtected;
