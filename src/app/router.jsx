import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import ShowtimeSelection from "../pages/ShowtimeSelection/ShowtimeSelection";
import TicketSelection from "../pages/TicketSelection/TicketSelection";
import SeatSelection from "../pages/SeatSelection/Seatselection";
import CreateRoom from "../pages/Admin/CreateRoom";
import CinemaDashboard from "../pages/Admin/CinemaDashboard";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Checkout from "../pages/Checkout/Checkout";
import OAuthCallback from "../components/auth/OAuthCallback";
import { AdminGuard } from "../components/auth/Guards";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "movie/:id",
        element: <ShowtimeSelection />,
      },
      {
        path: "tickets/:id",
        element: <TicketSelection />,
      },
      {
        path: "booking/:id",
        element: <SeatSelection />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
      {
        path: "oauth/callback",
        element: <OAuthCallback />,
      },
      {
        element: <AdminGuard />,
        children: [
          {
            path: "admin",
            element: <AdminDashboard />,
          },
          {
            path: "admin/cinemas",
            element: <CinemaDashboard />,
          },
          {
            path: "admin/create-room",
            element: <CreateRoom />,
          },
        ],
      },
    ],
  },
]);

export default router;