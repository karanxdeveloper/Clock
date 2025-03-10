import { Link } from "react-router-dom"

function Navbar() {
  return (

    <>
        <div className="w-[100vw] p-3 bg-purple-500 flex justify-around items-center">
            <h1 className="text-2xl">Timex</h1>
            <ul className="flex gap-[2rem] text-2xl text-white">
                <li><Link to={"/"}>Alarm</Link></li>
                <li><Link to={"/stopwatch"}>StopWatch</Link></li>
                <li><Link to={"/countdown"}>CountDown</Link></li>
            </ul>
        </div>
    
    </>

  )
}

export default Navbar