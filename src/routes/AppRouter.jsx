import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import OtpVerification from '../pages/OtpVerification';
import Home from '../pages/Home';

import OtpProtected from './protected/OtpProtected';
import DashboardProtected from './protected/DashboardProtected';
import NotFound from '../pages/NotFound';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/otp-verification" element={
          <OtpProtected>
            <OtpVerification />
          </OtpProtected>
        } />
        <Route path="/" element={
          <DashboardProtected>
            <Home />
          </DashboardProtected>
        } />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
