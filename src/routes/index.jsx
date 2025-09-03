import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Checklist from "../pages/Checklist";
import Steps from "../pages/Steps";
import Register from "../pages/Register";
import PersonRegister from "../pages/Person-register";
import PersonChecklist from "../pages/Person-checklist";
import NotFound from "../pages/NotFound";
import PersonLogin from "../pages/Person-login";
import PersonSteps from "../pages/Person-steps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "checklist", element: <Checklist /> },
      { path: "steps", element: <Steps /> },
      { path: "register", element: <Register /> },
      { path: "person-register", element: <PersonRegister /> },
      { path: "person-checklist", element: <PersonChecklist /> },
      { path: "person-login", element: <PersonLogin /> },
      { path: "person-steps", element: <PersonSteps /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
