import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import OtpVerification from '../pages/OtpVerification';
import OtpProtected from './protected/OtpProtected';
import Home from '../pages/Home';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/otp-verification" element={<OtpProtected><OtpVerification /></OtpProtected>} />
        <Route path="/dashboard" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
