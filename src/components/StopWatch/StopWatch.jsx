import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function StopWatch() {
    const [count, setCount] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setCount((prevTime) => prevTime + 10);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [running]);

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col justify-center items-center p-4">
            <div className="text-5xl md:text-7xl lg:text-8xl text-white font-mono mb-8 text-center">
                <span>{("0" + Math.floor((count / 60000) % 60)).slice(-2)}:</span>
                <span>{("0" + Math.floor((count / 1000) % 60)).slice(-2)}:</span>
                <span>{("0" + ((count / 10) % 100)).slice(-2)}</span>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRunning(!running)}
                    className={`px-6 py-3 text-xl rounded-xl shadow-md text-white ${
                        running ? "bg-red-600" : "bg-blue-600"
                    }`}
                >
                    {running ? "Stop" : "Start"}
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCount(0)}
                    className="px-6 py-3 text-xl rounded-xl bg-purple-600 text-white shadow-md"
                >
                    Reset
                </motion.button>
            </div>
        </div>
    );
}

export default StopWatch;
