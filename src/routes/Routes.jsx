import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import ErrorPage from "../pages/ErrorPage";
import JobDetails from "../components/JobDetails";
import AddJob from "../pages/AddJob";
import MyBids from "../pages/MyBids";
import MyPostedJob from "../pages/MyPostedJob";
import BidRequests from "../pages/BidRequests";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/registration",
        element: <Register></Register>
      },
      {
        path: "/job/:id",
        element: <PrivateRoute><JobDetails></JobDetails></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: "/update/:id",
        element: <PrivateRoute><UpdateJob></UpdateJob></PrivateRoute>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: "/add-job",
        element: <PrivateRoute><AddJob></AddJob></PrivateRoute>
      },
      {
        path: "/my-bids",
        element: <PrivateRoute><MyBids></MyBids></PrivateRoute>
      },
      {
        path: "/my-posted-jobs",
        element: <PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>
      },
      {
        path: "/bid-request",
        element: <PrivateRoute><BidRequests></BidRequests></PrivateRoute>
      },

    ],
  },
]);

export default router