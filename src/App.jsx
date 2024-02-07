import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./ui/Home";
import CardInfo from "./features/cards/CardInfo";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/card/:id", element: <CardInfo />, errorElement: <Error /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
