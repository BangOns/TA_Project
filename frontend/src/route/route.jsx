import Layout from "@/Mycomponents/Container_Dashboard";
import Dashboard_Admin from "@/Page/Dashboard_Admin";
import Dashboard_Student from "@/Page/Dashboard_Student";
import Login from "@/Page/Login";
import Register from "@/Page/Register";
import Cookies from "js-cookie";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Root />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function Root() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />}>
          <Route path="/admin" element={<Dashboard_Admin />} />
          <Route path="/student" element={<Dashboard_Student />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default function PrivateRoutes() {
  const cookies = Cookies.get("token");
  return <>{cookies ? <Outlet /> : <Navigate to={"/"} />}</>;
}
