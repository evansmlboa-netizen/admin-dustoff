import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PortalLayout from "./components/PortalLayout";
import Dashboard from "./pages/portal/Dashboard";
import BookCleaning from "./pages/portal/BookCleaning";
import Appointments from "./pages/portal/Appointments";
import Payments from "./pages/portal/Payments";
import Invoices from "./pages/portal/Invoices";
import Addresses from "./pages/portal/Addresses";
import Preferences from "./pages/portal/Preferences";
import Referrals from "./pages/portal/Referrals";
import Support from "./pages/portal/Support";
import Profile from "./pages/portal/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/portal" element={<PortalLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="book" element={<BookCleaning />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="payments" element={<Payments />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="addresses" element={<Addresses />} />
              <Route path="preferences" element={<Preferences />} />
              <Route path="referrals" element={<Referrals />} />
              <Route path="support" element={<Support />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
