import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCountries } from "../../lib/getCountries";
import { storePhoneNo } from "../../store/slices/DetailsSlice";

const Contact = () => {
    const { codes, loading, error } = useSelector((state) => state.country);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [selectedCode, setSelectedCode] = useState("");
    const [phone, setPhone] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        if (codes.length > 0 && !selectedCode) {
            const india = codes.find((c) => c.name.toLowerCase() === "india");
            if (india) setSelectedCode(india.dialCode);
        }
    }, [codes, selectedCode]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const indianPhoneRegex = /^[6-9]\d{9}$/;

        if (!selectedCode) {
            setErrorMsg("Please select a country code.");
            return;
        }

        if (selectedCode === "+91" && !indianPhoneRegex.test(phone)) {
            setErrorMsg("Please enter a valid 10-digit Indian phone number.");
            return;
        }

        const number = `${selectedCode}${phone}`;
        const secretCode = Math.floor(1000 + Math.random() * 9000);
        dispatch(storePhoneNo({ number, secretCode }));

        navigate("/otp-verification");
    };

    if (loading === "failed") {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-[340px] md:w-[500px] max-w-md p-5 rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-white/10 shadow-xl border border-white/30 dark:border-white/10">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-8 text-center">
                    Login here
                </h1>

                {loading === "pending" ? (
                    <p className="text-center text-gray-700 dark:text-gray-300">Loading countries...</p>
                ) : (
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Country code and phone input */}
                        <div className="flex gap-3">
                            <div className="relative w-2/5">
                                <select
                                    className="w-full py-2 px-3 pr-8 rounded-lg bg-white dark:bg-[#15031e] border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
                                    onChange={(e) => setSelectedCode(e.target.value)}
                                    value={selectedCode}
                                >
                                    <option value="">Code</option>
                                    {codes.map((c) => (
                                        <option key={`${c.name}-${c.dialCode}`} value={c.dialCode}>
                                            {c.dialCode} ({c.name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <input type="tel" placeholder="Phone number"
                                className="w-3/5 py-2 px-3 rounded-lg bg-white dark:bg-[#15031e] border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500" value={phone}
                                onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <button type="submit" disabled={!phone}
                            className={`w-full py-2 rounded-lg text-white font-medium transition-colors ${phone ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-400 cursor-not-allowed'}`}> Submit </button>
                        {errorMsg && (
                            <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );
};

export default Contact;
