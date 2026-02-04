import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <div className="sticky top-0 z-50 flex flex-col bg-background relative">
                <Header className="!relative !top-auto !left-auto !right-auto border-b" />
            </div>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
