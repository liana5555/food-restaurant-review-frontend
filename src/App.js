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
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Outlet, Link } from "react-router-dom";

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