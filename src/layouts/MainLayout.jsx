import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom"; //
import { Suspense } from "react";
import Loading from "@/components/Loading";
const MainLayout = () => {
  return (
    <div className="relative bg-[#181b24]">
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Footer />
    </div>
  );
};

export default MainLayout;
