import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Categories from "./pages/Categories";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import NonAuth from "./layouts/NonAuth";
import Root from "./layouts/Root";
import Users from "./pages/Users/Users";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '',
        element: <Dashboard />,
        children: [
          {
            path: '',
            element: <HomePage />
          },
          {
            path: 'users',
            element: <Users />
          },
          {
            path: 'categories',
            element: <Categories />
          },


        ]
      },

      {
        path: '/auth',
        element: <NonAuth />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
        ]
      },

    ]
  },



])