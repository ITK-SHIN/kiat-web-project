import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Checklist from '../pages/Checklist';
import Steps from '../pages/Steps';
import Register from '../pages/Register';


const router = createBrowserRouter([
{
path: '/',
element: <App />,
children: [
{ index: true, element: <Home /> },
{ path: 'login', element: <Login /> },
{ path: 'checklist', element: <Checklist /> },
{ path: 'steps', element: <Steps /> },
{ path: 'register', element: <Register /> }
]
}
]);


export default router;