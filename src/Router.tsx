import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import App from "./App";
import { HomePage } from "./Pages/HomePage";

const router = createBrowserRouter([
  {
    path: "OnlineShop",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "*",
        element: <Navigate to={""} replace={true} />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={router} />;
};
