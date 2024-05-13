import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Sigin from "./Components/Signin/Sigin";
import Sigup from "./Components/Signup/Signup";
import { QueryClient, QueryClientProvider } from "react-query";
import Shop from "./Components/Shop/Shop";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/signin", element: <Sigin /> },
      { path: "/signup", element: <Sigup /> },
    ],
  },
]);
let clientQuery = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
