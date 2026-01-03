import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";

const ShopLayout = () => {
    return (
        <div className="font-sans min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow pt-16"> {/* Add padding for fixed header */}
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default ShopLayout;
