import { Outlet } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import './index.css';

export default function App(){
return (
<>
<Header />
<Outlet />
<Footer />
</>
);
}