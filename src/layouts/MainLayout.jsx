import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; //
const MainLayout = () => {
  return (
    <div className="relative bg-[#181b24]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
