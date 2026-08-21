import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;