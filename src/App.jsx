import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import CardInfo from "./features/cards/CardInfo";
import Error from "./ui/Error";
import SignIn from "./ui/SignIn";
import User from "./ui/User";
import PrivateRoute from "./auth/PrivateRoute";
import Hearts from "./features/user/Hearts";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <SignIn /> },
      { path: "/user", element: <PrivateRoute Component={User} /> },
      { path: "/user/favorites", element: <PrivateRoute Component={Hearts} /> },
      { path: "/card/:id", element: <CardInfo /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
