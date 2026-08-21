import { createBrowserRouter } from "react-router";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home/Home";
import ShowtimeSelection from "../pages/ShowtimeSelection/ShowtimeSelection";
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
        path: "seat-selection/:id",
        element: <SeatSelection />,
      }
    ],
  },
]);

export default router;