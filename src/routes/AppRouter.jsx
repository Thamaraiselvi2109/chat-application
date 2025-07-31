import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import OtpVerification from '../pages/OtpVerification';
import Home from '../pages/Home';

import OtpProtected from './protected/OtpProtected';
import DashboardProtected from './protected/DashboardProtected';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/otp-verification" element={
          <OtpProtected>
            <OtpVerification />
          </OtpProtected>
        } />
        <Route path="/dashboard" element={
          <DashboardProtected>
            <Home />
          </DashboardProtected>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
