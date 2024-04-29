import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Sigin from "./Components/Signin/Sigin";
import Sigup from "./Components/Signup/Signup";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [{ path: "", element: <Home /> },
    {path: "/signin", element: <Sigin />},
    {path: "/signup", element: <Sigup />},

  ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
