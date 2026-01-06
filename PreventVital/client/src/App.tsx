
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

// Layouts - Legacy & New
import Layout from "./app/layout";
import SuperAdminLayout from './layouts/SuperAdminLayout';
import CorporateLayout from './layouts/CorporateLayout';
import ShopLayout from './layouts/ShopLayout';
// import ProductList from './pages/shop/ProductList';
// import Cart from './pages/shop/Cart';
// import Checkout from './pages/shop/Checkout';
import CatalogPage from "./features/shop/pages/CatalogPage";
import ProductDetailPage from "./features/shop/pages/ProductDetailPage";
import CartPage from "./features/shop/pages/CartPage";
import CheckoutPage from "./features/shop/pages/CheckoutPage";
import OrderSuccessPage from "./features/shop/pages/OrderSuccessPage";

import CreatorLayout from './layouts/CreatorLayout';
import CreatorDashboard from './pages/creator/Dashboard';
import ProgramBuilder from './pages/creator/ProgramBuilder';
import CorporateDashboard from './pages/corporate/Dashboard';
import EmployeeManagement from './pages/corporate/EmployeeManagement';


// Legacy Pages
import Homepage from "./app/homepage/page";
import DiseasePreventionProgramsPage from "./app/disease-prevention-programs/page";
import AiHealthAssessmentPage from "./app/ai-health-assessment/page";
import MedicalProfessionalPortalPage from "./app/medical-professional-portal/page";
import PartnershipPortalPage from "./app/partnership-portal/page";
import TherapeuticProgramsPage from "./app/therapeutic-programs/page";
import NotFound from "./app/not-found";
import AboutUs from "./pages/AboutUs";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import WellnessPhilosophy from "./pages/WellnessPhilosophy";

// New Auth & Admin Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import SuperAdminDashboard from './pages/super-admin/Dashboard';
import GlobalConfig from './pages/super-admin/GlobalConfig';
import UserManagement from './pages/super-admin/UserManagement';
import Approvals from './pages/super-admin/Approvals';

// Stubs for other roles
// New Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import RiskCalculator from './pages/admin/RiskCalculator';
import { Outlet } from "react-router-dom";

import CustomerDashboard from './pages/customer/CustomerDashboard';

const queryClient = new QueryClient();

const App = () => (
    <HelmetProvider>
        <QueryClientProvider client={queryClient}>
            <TooltipProvider>
                <Toaster />
                <Sonner />

                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>

                        {/* PUBLIC/SHOP ROUTE GROUP (Using ShopLayout or Main Layout?) 
                For now, keeping legacy routes under existing Layout, and wrapping standard Shop pages under ShopLayout if distinct.
                Given "ShopLayout" was requested for the public shop, let's overlap.
            */}

                        <Route path="/shop" element={<ShopLayout />}>
                            <Route index element={<CatalogPage />} />
                        </Route>
                        <Route element={<Layout />}>
                            <Route path="/products" element={<CatalogPage />} />
                            <Route path="/products/:slug" element={<ProductDetailPage />} />
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/checkout" element={<CheckoutPage />} />
                            <Route path="/order-confirmation/:orderId" element={<OrderSuccessPage />} />
                            <Route path="/" element={<Homepage />} />
                            <Route path="/homepage" element={<Homepage />} />
                            <Route path="/disease-prevention-programs" element={<DiseasePreventionProgramsPage />} />
                            <Route path="/ai-health-assessment" element={<AiHealthAssessmentPage />} />
                            <Route path="/medical-professional-portal" element={<MedicalProfessionalPortalPage />} />
                            <Route path="/partnership-portal" element={<PartnershipPortalPage />} />
                            <Route path="/therapeutic-programs-center" element={<TherapeuticProgramsPage />} />

                            {/* Legacy Routes */}
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/team" element={<Team />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/wellness-philosophy" element={<WellnessPhilosophy />} />
                        </Route>

                        {/* AUTH */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />

                        {/* SUPER ADMIN ROUTE GROUP */}
                        <Route path="/super-admin" element={
                            <ProtectedRoute allowedRoles={['super_admin']}>
                                <SuperAdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<SuperAdminDashboard />} />
                            <Route path="config" element={<GlobalConfig />} />
                            <Route path="users" element={<UserManagement />} />
                            <Route path="approvals" element={<Approvals />} />
                        </Route>

                        {/* ADMIN ROUTE GROUP */}
                        <Route path="/admin" element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <div className="min-h-screen bg-gray-50 pb-12">
                                    <nav className="bg-white border-b px-6 py-4 mb-4 flex justify-between items-center sticky top-0 z-30">
                                        <div className="flex items-center gap-2">
                                            <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">PV</div>
                                            <span className="font-bold text-lg hidden md:block">PreventVital Admin</span>
                                        </div>
                                        <div>
                                            {/* Minimal Header for Admin - Logout is handled by global header in other layouts, but here we inline a simple nav or assume global header applies? 
                                                Actually, Admin Dashboard probably needs its own Layout or just a wrapper. 
                                                For simplicity, I'm adding a container wrapper here.
                                            */}
                                        </div>
                                    </nav>
                                    <div className="px-4">
                                        <Outlet />
                                    </div>
                                </div>
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="risk-calculator" element={<RiskCalculator />} />
                        </Route>

                        {/* CREATOR ROUTE GROUP */}
                        <Route path="/creator" element={
                            <ProtectedRoute allowedRoles={['content_creator', 'super_admin']}>
                                <CreatorLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<CreatorDashboard />} />
                            <Route path="programs/new" element={<ProgramBuilder />} />
                            <Route path="programs" element={<div className="p-8">My Programs List (Stub)</div>} />
                            <Route path="earnings" element={<div className="p-8">Earnings History (Stub)</div>} />
                        </Route>

                        {/* CORPORATE ROUTE GROUP */}
                        <Route path="/corporate/:tenantId" element={
                            <ProtectedRoute allowedRoles={['corporate_admin']}>
                                <CorporateLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Navigate to="dashboard" replace />} />
                            <Route path="dashboard" element={<CorporateDashboard />} />
                            <Route path="employees" element={<EmployeeManagement />} /> {/* Note: Need to add link in Sidebar */}
                        </Route>

                        {/* CUSTOMER ROUTE GROUP */}
                        <Route path="/account/*" element={
                            <ProtectedRoute allowedRoles={['customer']}>
                                <CustomerDashboard />
                            </ProtectedRoute>
                        } />

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </QueryClientProvider>
    </HelmetProvider>
);

export default App;
