import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import ShowtimeSelection from "./pages/ShowtimeSelection/ShowtimeSelection";
import CreateRoom from "./pages/Admin/CreateRoom";
import CinemaDashboard from "./pages/Admin/CinemaDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<ShowtimeSelection />} />
                <Route path="/admin/cinemas" element={<CinemaDashboard />} />
                <Route path="/admin/create-room" element={<CreateRoom />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;