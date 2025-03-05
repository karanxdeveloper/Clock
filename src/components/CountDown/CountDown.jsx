import { useEffect, useRef, useState } from "react";

function CountDown() {
    const [target, setTarget] = useState(null);
    const [diff, setDiff] = useState(0);
    const id = useRef(null);

    function handleSubmit() {
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
        <>
            <div id='main' className="w-screen text-white h-[45vh] justify-center flex flex-col gap-4 items-center">
                <h1 className="text-2xl font-bold">Countdown Timer App</h1>
                
                <div id='input' className="border-none flex gap-5">
                    <input
                        type="datetime-local"
                        id='datetime'
                        onChange={(e) => setTarget(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <button 
                        id='submit' 
                        onClick={handleSubmit} 
                        className="px-7 text-xl  ml-2 border-[3px] bg-blue-600 text-white bg-cadetblue border-none rounded-md"
                    >
                        Start
                    </button>
                </div>

                <div id='display' className="w-5/5 mt-8 text-white bg-dodgerblue text-black rounded-xl flex flex-col items-center p-4 md:w-3/5 sm:w-[90vw]">
                    <ul className="w-full flex justify-around items-center list-none">
                        <li className="flex flex-col justify-center items-center">
                            <span id='days' className="text-5xl text-center">{getDays()}</span>
                            Days
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <span id='hours' className="text-5xl text-center">{getHours()}</span>
                            Hours
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <span id='minutes' className="text-5xl text-center">{getMinutes()}</span>
                            Minutes
                        </li>
                        <li className="flex flex-col justify-center items-center">
                            <span id='seconds' className="text-5xl text-center">{getSeconds()}</span>
                            Seconds
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default CountDown;
