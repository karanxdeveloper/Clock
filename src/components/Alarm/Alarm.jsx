import { useEffect, useRef, useState } from "react";
import alarmSound from "../../AlarmSound/alarmSound.mp3";
import { motion, AnimatePresence } from "framer-motion";

function Alarm() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const intervalId = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        const savedTarget = localStorage.getItem("alarmTime");
        if (savedTarget) {
            const remaining = new Date(savedTarget) - new Date();
            if (remaining > 0) {
                setTarget(savedTarget);
                setDiff(remaining);
                setIsRunning(true);

                intervalId.current = setInterval(() => {
                    const newRemaining = new Date(savedTarget) - new Date();
                    setDiff(newRemaining);
                }, 1000);
            } else {
                localStorage.removeItem("alarmTime");
            }
        }
    }, []);

    useEffect(() => {
        if (diff <= 0 && target !== null && isRunning) {
            clearInterval(intervalId.current);
            localStorage.removeItem("alarmTime");
            setIsRunning(false);
            setDiff(0);
            if (audioRef.current) {
                audioRef.current.play();
            }
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        }
    }, [diff, target, isRunning]);

    function handleStart() {
        if (!target) return;

        const timeDiff = new Date(target) - new Date();
        if (timeDiff <= 0) {
            alert("Please select a future date and time.");
            return;
        }

        localStorage.setItem("alarmTime", target);
        clearInterval(intervalId.current);
        setIsRunning(true);
        setDiff(timeDiff);

        intervalId.current = setInterval(() => {
            const remaining = new Date(target) - new Date();
            setDiff(remaining);
        }, 1000);
    }

    function stopAlarm() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    const getDays = () => Math.floor(diff / (1000 * 60 * 60 * 24));
    const getHours = () => Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const getMinutes = () => Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const getSeconds = () => Math.floor((diff % (1000 * 60)) / 1000);

    return (
// Your same Alarm logic, keep as-is (audio, timer, etc.)

    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4 flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">⏰ Alarm Clock</h1>

        <div className="flex flex-wrap justify-center gap-4 w-full max-w-xl">
            <motion.input
                type="datetime-local"
                onChange={(e) => setTarget(e.target.value)}
                className="border px-4 py-2 w-full md:w-auto text-white bg-gray-800 rounded-xl text-lg"
            />
            <motion.button
                onClick={handleStart}
                disabled={!target}
                className={`px-5 py-2 rounded-xl text-lg ${
                    !target ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                } text-white`}
            >
                Set Alarm
            </motion.button>
            <motion.button
                onClick={stopAlarm}
                className="px-5 py-2 text-lg rounded-xl bg-red-600 text-white"
            >
                Stop
            </motion.button>
            <motion.button
                onClick={() => {
                    setTarget(null);
                    setIsRunning(false);
                    setDiff(0);
                    localStorage.removeItem("alarmTime");
                }}
                className="px-5 py-2 text-lg rounded-xl bg-purple-600 text-white"
            >
                Reset
            </motion.button>
        </div>

        {isRunning && (
            <motion.div className="bg-gray-100 text-black p-4 mt-6 rounded-xl w-full max-w-md text-center">
                <ul className="flex justify-around text-base md:text-lg">
                    {[getDays(), getHours(), getMinutes(), getSeconds()].map((val, i) => (
                        <li key={i}>
                            <div className="text-3xl font-semibold">{val}</div>
                            <div>{["Days", "Hours", "Minutes", "Seconds"][i]}</div>
                        </li>
                    ))}
                </ul>
            </motion.div>
        )}

        {showConfetti && (
            <motion.div className="absolute top-10 text-4xl">🎉 Time’s up!</motion.div>
        )}

        <audio ref={audioRef} src={alarmSound} preload="auto" />
    </div>
);

}

export default Alarm;
