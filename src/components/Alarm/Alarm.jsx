import { useEffect, useRef, useState } from "react";
import alarmSound from "../../AlarmSound/alarmSound.mp3";

function Alarm() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    const intervalId = useRef(null);
    const audioRef = useRef(null);

    // --- Restore alarm from localStorage when component mounts ---
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
                localStorage.removeItem("alarmTime"); // clear expired alarm
            }
        }
    }, []);

    // --- Main countdown and alarm trigger ---
    useEffect(() => {
        if (diff <= 0 && target !== null && isRunning) {
            clearInterval(intervalId.current);
            localStorage.removeItem("alarmTime");
            setIsRunning(false);
            setDiff(0);
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
    }, [diff, target, isRunning]);

    // --- Start alarm handler ---
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

    // --- Stop alarm sound ---
    function stopAlarm() {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }

    // --- Time calculations ---
    const getDays = () => Math.floor(diff / (1000 * 60 * 60 * 24));
    const getHours = () => Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const getMinutes = () => Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const getSeconds = () => Math.floor((diff % (1000 * 60)) / 1000);

    return (
        <div className="w-screen text-white min-h-[45vh] flex flex-col gap-4 justify-center items-center">
            <h1 className="text-2xl font-bold">Alarm Clock</h1>

            <div className="flex gap-5">
                <input
                    type="datetime-local"
                    onChange={(e) => setTarget(e.target.value)}
                    className="border p-2 rounded-md text-white"
                />
                <button
                    onClick={handleStart}
                    disabled={!target}
                    className={`px-5 py-2 rounded-md text-white ${
                        !target ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
                    }`}
                >
                    Set Alarm
                </button>
                <button
                    onClick={stopAlarm}
                    className="px-5 py-2 bg-red-600 rounded-md text-white"
                >
                    Stop Alarm
                </button>
            </div>

            {isRunning && (
                <div className="bg-gray-100 text-black p-4 rounded-lg mt-4">
                    <ul className="flex gap-5 text-center">
                        <li>
                            <span className="text-3xl">{getDays()}</span>
                            <div>Days</div>
                        </li>
                        <li>
                            <span className="text-3xl">{getHours()}</span>
                            <div>Hours</div>
                        </li>
                        <li>
                            <span className="text-3xl">{getMinutes()}</span>
                            <div>Minutes</div>
                        </li>
                        <li>
                            <span className="text-3xl">{getSeconds()}</span>
                            <div>Seconds</div>
                        </li>
                    </ul>
                </div>
            )}

            {/* Hidden audio element */}
            <audio ref={audioRef} src={alarmSound} preload="auto" />
        </div>
    );
}

export default Alarm;
