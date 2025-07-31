import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { storeUserOtp } from "../../store/slices/DetailsSlice";

const Otp = () => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const secretCode = useSelector((state) => state.details.secretCode);
    const isOtpValid = useSelector((state) => state.details.isOtpValid);

    const handleVerify = () => {
        dispatch(storeUserOtp(otp));
    };

    useEffect(() => {
        if (isOtpValid === false) {
            toast.error("Incorrect OTP. Please try again.");
            toast.info(`The correct OTP is: ${secretCode}`);
        }

        if (isOtpValid === true) {
            const timer = setTimeout(() => navigate("/"), 300);
            return () => clearTimeout(timer);
        }
    }, [isOtpValid, secretCode, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full flex flex-col items-center max-w-md p-6 sm:p-8 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-white/10 shadow-xl border border-white/30 dark:border-white/10">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
                    OTP Verification
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
                    Enter the 4-digit code sent to your phone number
                </p>

                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    shouldAutoFocus
                    inputType="tel"
                    renderSeparator={<span className="mx-3 text-gray-500"></span>}
                    renderInput={(props) => (
                        <input
                            {...props}
                            className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#15031e] text-center text-2xl text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                            style={{ width: '40px', height: '40px' }}
                        />
                    )}
                />

                {isOtpValid === false && (
                    <p className="text-red-500 mt-4">Incorrect OTP. Please try again.</p>
                )}

                <button
                    className="mt-8 w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-semibold transition"
                    disabled={otp.length !== 4}
                    onClick={handleVerify}
                >
                    Verify OTP
                </button>
            </div>
        </div>
    );
};

export default Otp;
