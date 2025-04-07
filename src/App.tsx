
import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import GroundsList from "./pages/GroundsList";
import GroundDetails from "./pages/GroundDetails";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import BookingConfirmation from "./pages/BookingConfirmation";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageGrounds from "./pages/admin/ManageGrounds";
import ManageOwners from "./pages/admin/ManageOwners";
import ManageInventory from "./pages/admin/ManageInventory";

// Super Admin Pages
import SuperAdminLogin from "./pages/admin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/admin/SuperAdminDashboard";

// Owner Pages
import OwnerLogin from "./pages/owner/OwnerLogin";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import GroundBookings from "./pages/owner/GroundBookings";
import OwnerInventory from "./pages/owner/OwnerInventory";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Optional: Add any global initialization logic here
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/grounds" element={<GroundsList />} />
            <Route path="/grounds/:id" element={<GroundDetails />} />
            <Route path="/booking/:groundId" element={<BookingPage />} />
            <Route path="/payment/:bookingId" element={<PaymentPage />} />
            <Route path="/confirmation/:bookingId" element={<BookingConfirmation />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/grounds" element={<ManageGrounds />} />
            <Route path="/admin/owners" element={<ManageOwners />} />
            <Route path="/admin/inventory" element={<ManageInventory />} />
            
            {/* Super Admin Routes */}
            <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            
            {/* Owner Routes */}
            <Route path="/owner/login" element={<OwnerLogin />} />
            <Route path="/owner/dashboard" element={<OwnerDashboard />} />
            <Route path="/owner/bookings" element={<GroundBookings />} />
            <Route path="/owner/inventory" element={<OwnerInventory />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
