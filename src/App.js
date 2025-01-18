import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

// jan 9
function App() {
  return (
    <div className="w-full h-screen bg-dark_color space-y-1">
      <div className="h-[15%] ">
        <Navbar />
      </div>
      <div className="h-[84%] ">
        <Outlet></Outlet> 
      </div>
    </div>
  );
}

export default App;
