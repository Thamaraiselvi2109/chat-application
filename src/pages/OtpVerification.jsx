import { useEffect } from 'react';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Otp from '../components/auth/Otp';

const OtpVerification = () => {
  const { secretCode } = useSelector((state) => state.details);

  useEffect(() => {
    toast.success("OTP sent successfully!");

    const timer = setTimeout(() => {
      toast.info(`your Otp is: ${secretCode}`);
    }, 5000); // 5 seconds delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [secretCode]);

  return (
    <div className="relative h-[70vh] flex justify-center items-center">
      <Otp />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default OtpVerification;
