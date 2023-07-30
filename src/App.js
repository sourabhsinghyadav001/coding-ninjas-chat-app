import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Screen } from "./Components/Screen";
import "./global.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Chat } from "./Components/Chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Screen />,
    children: [{ path: "chat/:id", element: <Chat /> }],
  },
]);
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
