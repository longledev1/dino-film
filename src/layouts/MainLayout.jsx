import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import ScrollToTop from "@/components/ScrollToTop";
import { ToastProvider } from "@/context/ToastContext";
import DisclaimerModal from "@/components/DisclaimerModal";

const MainLayout = () => {
  return (
    <ToastProvider>
      <DisclaimerModal />
      <div className="relative min-h-screen bg-[#181b24] flex flex-col justify-between">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};

export default MainLayout;
