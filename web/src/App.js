import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

function App() {
  const isLoggedIn = Cookies.get('token') || false;
  const navigate = useNavigate();

  useEffect(() => {
    const route = window.location.pathname;

    const authRoutes = ['/login', '/register'];

    if (!isLoggedIn) {
      if (!authRoutes.includes(route.toLowerCase())) navigate('/login');
    } else {
      if (authRoutes.includes(route.toLowerCase())) navigate('/');
    }
  }, []);

  return (
    <div className='flex flex-row w-full h-full bg-primary'>
      <ToastContainer theme='dark' />
      <Outlet />
    </div>
  );
}

export default App; 