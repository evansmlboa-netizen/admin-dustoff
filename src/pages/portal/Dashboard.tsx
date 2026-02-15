import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarPlus, RefreshCw, MapPin, CreditCard, ShieldCheck, Bell, CalendarDays, FileText } from "lucide-react";
import { sampleAppointments, sampleInvoices } from "@/data/seedData";

const Dashboard = () => {
  const upcoming = sampleAppointments.find((a) => a.status === "Confirmed" || a.status === "Scheduled");
  const recentInvoices = sampleInvoices.slice(0, 3);

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your cleaning overview.</p>
      </div>

      {/* Upcoming Appointment */}
      {upcoming && (
        <Card className="shadow-card border-primary/20">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-primary" />
                Upcoming Appointment
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary">{upcoming.status}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div><p className="text-muted-foreground">Date & Time</p><p className="font-medium">{upcoming.date}<br />{upcoming.timeWindow}</p></div>
              <div><p className="text-muted-foreground">Address</p><p className="font-medium">{upcoming.address}</p></div>
              <div><p className="text-muted-foreground">Service</p><p className="font-medium">{upcoming.serviceType}</p><p className="text-muted-foreground text-xs mt-1">{upcoming.addOns.join(", ")}</p></div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/portal/book">
          <Card className="shadow-soft hover:shadow-card transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <CalendarPlus className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Book Now</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/portal/book">
          <Card className="shadow-soft hover:shadow-card transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <RefreshCw className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Rebook Last</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/portal/addresses">
          <Card className="shadow-soft hover:shadow-card transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <MapPin className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Add Address</span>
            </CardContent>
          </Card>
        </Link>
        <Link to="/portal/payments">
          <Card className="shadow-soft hover:shadow-card transition-shadow cursor-pointer h-full">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <CreditCard className="h-8 w-8 text-primary" />
              <span className="text-sm font-medium">Payment Method</span>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Invoices */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="font-display text-lg flex items-center gap-2"><FileText className="h-5 w-5 text-primary" />Recent Invoices</CardTitle>
              <Link to="/portal/invoices" className="text-sm text-primary hover:underline">View all</Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{inv.serviceType}</p>
                    <p className="text-xs text-muted-foreground">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${inv.total.toFixed(2)}</p>
                    <Badge variant="secondary" className="text-xs">{inv.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="font-display text-lg flex items-center gap-2"><Bell className="h-5 w-5 text-primary" />Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex gap-3 p-3 bg-accent rounded-lg"><Bell className="h-4 w-4 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Appointment Reminder</p><p className="text-muted-foreground text-xs">Your cleaning is scheduled for Feb 20 at 8–11 AM</p></div></div>
              <div className="flex gap-3 p-3 bg-accent rounded-lg"><CreditCard className="h-4 w-4 text-primary shrink-0 mt-0.5" /><div><p className="font-medium">Payment Confirmed</p><p className="text-muted-foreground text-xs">$350.00 paid for Deep Cleaning on Jan 15</p></div></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center gap-3 p-4 bg-accent rounded-xl">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <div>
          <p className="font-display font-semibold">Bonded & Insured</p>
          <p className="text-sm text-muted-foreground">Dust Off Cleaning LLC is fully bonded and insured for your peace of mind.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
