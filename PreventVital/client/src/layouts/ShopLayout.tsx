import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/TopBar";

const ShopLayout = () => {
    return (
        <div className="font-sans min-h-screen flex flex-col">
            <div className="sticky top-0 z-50 flex flex-col bg-background relative">
                <TopBar />
                <Header className="!relative !top-auto !left-auto !right-auto border-b" />
            </div>
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ShopLayout;
