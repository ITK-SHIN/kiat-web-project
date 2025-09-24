import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ActivityOverview from '../pages/Activity-overview';
import Checklist from '../pages/Checklist';
import Home from '../pages/Home';
import IntroductionOverview from '../pages/Introduction-overview';
import IntroductionRelevantLaw from '../pages/Introduction-relevant-law';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import NoticeExamination from '../pages/Notice-examination';
import PersonChecklist from '../pages/Person-checklist';
import PersonLogin from '../pages/Person-login';
import PersonRegister from '../pages/Person-register';
import PersonSteps from '../pages/Person-steps';
import Register from '../pages/Register';
import Steps from '../pages/Steps';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'checklist', element: <Checklist /> },
      { path: 'steps', element: <Steps /> },
      { path: 'register', element: <Register /> },
      { path: 'person-register', element: <PersonRegister /> },
      { path: 'person-checklist', element: <PersonChecklist /> },
      { path: 'person-login', element: <PersonLogin /> },
      { path: 'person-steps', element: <PersonSteps /> },
      { path: 'introduction-overview', element: <IntroductionOverview /> },
      { path: 'introduction-relevant-law', element: <IntroductionRelevantLaw /> },
      { path: 'notice-examination', element: <NoticeExamination /> },
      { path: 'activity-overview', element: <ActivityOverview /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
