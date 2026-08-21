import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import ShowtimeSelection from "./pages/ShowtimeSelection/ShowtimeSelection";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/movie/:id" element={<ShowtimeSelection />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;