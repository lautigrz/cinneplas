import { Outlet } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import ScrollToTop from "../ui/ScrollToTop";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-(--color-background) text-white">
      <ScrollToTop />
      <NavBar />

      <main className="flex-1 bg-(--color-background)">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;