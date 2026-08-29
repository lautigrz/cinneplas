import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import ShowtimeSelection from "../pages/ShowtimeSelection/ShowtimeSelection";
import TicketSelection from "../pages/TicketSelection/TicketSelection";
import SeatSelection from "../pages/SeatSelection/Seatselection";

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
      }
    ],
  },
]);

export default router;