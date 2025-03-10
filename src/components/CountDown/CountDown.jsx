import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function CountDown() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const id = useRef(null);

    function handleSubmit() {
        if (!target) return;
        id.current = setInterval(() => {
            setDiff(new Date(target) - new Date());
        }, 1000);
    }

    useEffect(() => {
        if (diff < 0) {
            clearInterval(id.current);
            setDiff(0);
        }
    }, [diff]);

    const getDays = () => Math.floor(diff / (1000 * 60 * 60 * 24));
    const getHours = () => Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const getMinutes = () => Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const getSeconds = () => Math.floor((diff % (1000 * 60)) / 1000);

    return (
        <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">⏳ Countdown Timer</h1>

            <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full max-w-xl justify-center items-center">
                <motion.input
                    type="datetime-local"
                    onChange={(e) => setTarget(e.target.value)}
                    className="border border-gray-600 p-2 rounded-md text-white bg-gray-800 w-full sm:w-auto"
                    whileFocus={{ scale: 1.05 }}
                />
                <motion.button
                    whileHover={{ scale: 1.05, rotateY: 360 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSubmit}
                    disabled={!target}
                    className={`px-6 py-2 text-xl rounded-full font-semibold transition-all ${
                        !target ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                    Start
                </motion.button>
            </div>

            {target && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white text-black p-4 rounded-xl shadow-lg w-full max-w-2xl"
                >
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        {[
                            { label: "Days", value: getDays() },
                            { label: "Hours", value: getHours() },
                            { label: "Minutes", value: getMinutes() },
                            { label: "Seconds", value: getSeconds() },
                        ].map((item, i) => (
                            <motion.li
                                key={i}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                                className="flex flex-col items-center"
                            >
                                <span className="text-4xl md:text-5xl font-bold">{item.value}</span>
                                <span className="text-sm md:text-base">{item.label}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </div>
    );
}

export default CountDown;
