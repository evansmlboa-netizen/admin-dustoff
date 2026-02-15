import React from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard, CalendarPlus, CalendarDays, CreditCard, FileText,
  MapPin, Settings2, Gift, HeadphonesIcon, User, LogOut, Sparkles, Menu, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { to: "/portal", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/portal/book", icon: CalendarPlus, label: "Book a Cleaning" },
  { to: "/portal/appointments", icon: CalendarDays, label: "Appointments" },
  { to: "/portal/payments", icon: CreditCard, label: "Payments & Billing" },
  { to: "/portal/invoices", icon: FileText, label: "Invoices" },
  { to: "/portal/addresses", icon: MapPin, label: "Addresses" },
  { to: "/portal/preferences", icon: Settings2, label: "Preferences" },
  { to: "/portal/referrals", icon: Gift, label: "Referrals" },
  { to: "/portal/support", icon: HeadphonesIcon, label: "Support" },
  { to: "/portal/profile", icon: User, label: "Profile" },
];

const PortalLayout = () => {
  const { user, isLoading, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!user) return <Navigate to="/login" replace />;

  const isActive = (to: string, exact?: boolean) => exact ? location.pathname === to : location.pathname.startsWith(to);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b border-border">
        <Link to="/portal" className="flex items-center gap-2 text-primary">
          <Sparkles className="h-6 w-6" />
          <span className="font-display font-bold text-lg">Dust Off</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif transition-colors ${
              isActive(item.to, item.exact)
                ? "bg-primary text-primary-foreground"
                : "text-foreground/70 hover:bg-accent hover:text-foreground"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border">
        <button
          onClick={() => { logout(); setMobileOpen(false); }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-serif w-full text-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-border bg-sidebar flex-col shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/20" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar shadow-card">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur border-b border-border px-4 lg:px-8 h-16 flex items-center justify-between">
          <button className="lg:hidden p-2 -ml-2" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div className="lg:hidden flex items-center gap-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-display font-bold">Dust Off</span>
          </div>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">Hi, {user.name}</span>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
