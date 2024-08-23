import { RouterProvider } from "react-router-dom";

import { Chart, registerables } from "chart.js";
import { router } from "./route/route";
import { ToastContainer, Zoom } from "react-toastify";
Chart.register(...registerables);
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer transition={Zoom} />
    </>
  );
};

export default App;
