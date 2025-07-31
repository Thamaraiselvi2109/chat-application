// components/protected/DashboardProtected.jsx
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const DashboardProtected = ({ children }) => {
    const isOtpValid = useSelector((state) => state.details.isOtpValid);

    if (!isOtpValid) {
        return <Navigate to="/otp-verification" replace />;
    }

    return children;
};

export default DashboardProtected;
