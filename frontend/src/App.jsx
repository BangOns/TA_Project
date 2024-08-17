import Navbar_header from "@/Mycomponents/Navbar/Navbar_header";
import Navbar_aside from "@/Mycomponents/Navbar/Navbar_aside";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard_Admin from "./Page/Dashboard_Admin";
import Dashboard_Student from "./Page/Dashboard_Student";
import Container_Dashboard from "./Mycomponents/Container_Dashboard";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar_header />
        <Navbar_aside />
        <Container_Dashboard>
          <Routes>
            <Route path="/" element={<Dashboard_Admin />} />
            <Route path="/student" element={<Dashboard_Student />} />
          </Routes>
        </Container_Dashboard>
      </BrowserRouter>
    </div>
  );
};

export default App;
