import './scss/App.scss';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Posts from './pages/Posts'
import Home from './pages/Home';
import Write from './pages/Write';
import Restaurants from './pages/Restaurants'
import SingleRestaurant from './pages/SingleRestaurant';
import UserProfile from './pages/UserProfile';
import ManageReports from './pages/ManageReports';
import ManageUsers from './pages/ManageUsers';
import Chat from './pages/Chat';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Outlet, Link } from "react-router-dom";
import ManageReservations from './pages/ManageReservations';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    //errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/posts/:id",
        element: <Posts />,
      },
      {path: "/write",
        element: <Write />
      },
      {
        path: "/restaurants",
        element: <Restaurants/>
      },
      {
        path: "/restaurants/:id",
        element: <SingleRestaurant/>
      },
      {
        path: "/user/:id",
        element: <UserProfile />
      },
      {
        path: "/admin/manage_users",
        element: <ManageUsers />
      },
      {
        path: "/admin/manage_reports",
        element: <ManageReports />
      },
      {
        path: "/restaurant_worker/manage_reservations",
        element: <ManageReservations />
      },
      {
        path: "/chat",
        element: <Chat />

      }


      
    ],
  },
  

]);


function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;


function Layout () {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}