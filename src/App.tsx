import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Post from './pages/Post.tsx';
import Details from './pages/Details.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import {PostProvider} from './contexts/postContext.tsx';
import { UserProvider } from './contexts/userContext.tsx';
import VerifyEmail from './components/VerifyEmail.tsx';
import Update from './pages/Update.tsx';


function App() {

  const Layout = () => {
  
    return (
      <>
      <UserProvider>
        <PostProvider>
        <Navbar />
        <Outlet />
        <Footer />
        </PostProvider>
        </UserProvider>
      </>
    )
  }
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/details/:id",
          element: <Details />
        },
        {
          path: "/post",
          element: <Post />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/update/:id",
          element: <Update />
        },
        {
          path: "/users/:id/verify/:token",
           element: <VerifyEmail />
        }
      ]
    },
  ]);
  

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  )
}

export default App
