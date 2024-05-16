import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Sigin from "./Components/Signin/Sigin";
import Sigup from "./Components/Signup/Signup";
import { QueryClient, QueryClientProvider } from "react-query";
import Shop from "./Components/Shop/Shop";
import { AuthProvidor } from "./context/Auth";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import { Toaster } from "react-hot-toast";
import WishList from "./Components/Wishlist/WishList.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Checkout from "./Components/checkout/Checkout.jsx";
import Orders from "./Components/Orders/Orders.jsx";
import ProductDetails from "./Components/productDetails/ProductDetails.jsx";
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "/contactus", element: <Contact /> },
      {
        path: "shop",
        element: (
      
            <Shop />
        
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <WishList />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ProductDeteals/:id",
        element: <ProductDetails />,
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
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
        <AuthProvidor>
          <RouterProvider router={router} />
        </AuthProvidor>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
