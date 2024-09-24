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
        element: <JobDetails></JobDetails>,
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
      },
      {
        path: "/add-job",
        element: <AddJob></AddJob>
      },
      {
        path: "/my-bids",
        element: <MyBids></MyBids>
      },
      {
        path: "/my-posted-jobs",
        element: <MyPostedJob></MyPostedJob>
      },
      {
        path: "/bid-request",
        element: <BidRequests></BidRequests>
      },

    ],
  },
]);

export default router