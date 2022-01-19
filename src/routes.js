import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import NotFound from './pages/Page404';
import Cart from './pages/Cart';
import Favourites from './pages/Favourites';
// -------------------------------------------------3---------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element:  <DashboardLayout />,
      children: [
        { path: '', element:  <Navigate to="/dashboard/app" replace />},
        { path: 'app', element:  <DashboardApp />},
        { path: 'products', element: <Products />},
        { path: 'products/:id', element: <Products />},
        { path: 'cart', element: <Cart />},
        { path: 'favourites', element: <Favourites />},
        { path: 'blog', element: <Blog /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
