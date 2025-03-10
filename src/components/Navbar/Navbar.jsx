import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const routes = [
  { name: "Alarm", path: "/" },
  { name: "StopWatch", path: "/stopwatch" },
  { name: "CountDown", path: "/countdown" },
];

function Navbar() {
  const location = useLocation();

  return (
    <div className="w-full bg-purple-500 py-5 px-5 flex flex-col md:flex-row justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-white">Timex</h1>

      <ul className="flex flex-wrap justify-center gap-4 mt-2 md:mt-0">
        {routes.map((route) => {
          const isActive = location.pathname === route.path;

          return (
            <li key={route.path} className="relative">
              {isActive && (
                <motion.div
                  layoutId="highlight"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              <Link to={route.path} className="relative px-4 py-2 z-10 text-white text-lg">
                {route.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
