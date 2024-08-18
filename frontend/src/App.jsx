import { RouterProvider } from "react-router-dom";

import { Chart, registerables } from "chart.js";
import { router } from "./route/route";
Chart.register(...registerables);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
