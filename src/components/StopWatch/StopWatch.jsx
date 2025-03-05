import { useEffect, useState } from "react";




function StopWatch() {

    const [count, setCount] = useState(0)
    const [running, setRunning] = useState(false)

    useEffect(() => {
        let interval;
        if (running) {
            interval = setInterval(() => {
                setCount((prevTime) => prevTime + 10)
            }, 10)
        } else if (!running) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    }, [running])

    return (
        <div className="main">
            <div className="container">
                <div className="time">
                    <span>{("0" + Math.floor((count / 60000) % 60)).slice(-2)}: </span>
                    <span>{("0" + Math.floor((count / 1000) % 60)).slice(-2)}: </span>
                    <span>{("0" + ((count / 10) % 100)).slice(-2)} </span>
                </div>
                {running ? <button onClick={() => { setRunning(false) }}>stop</button> : <button onClick={() => { setRunning(true) }}>start</button>}


                <button onClick={() => { setCount(0) }}>reset</button>
            </div>
        </div>
    )
}

export default StopWatch;