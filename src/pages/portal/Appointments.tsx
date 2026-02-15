import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, List, RefreshCw, X, MapPin, CreditCard } from "lucide-react";
import { sampleAppointments } from "@/data/seedData";

const statusColors: Record<string, string> = {
  Scheduled: "bg-blue-100 text-blue-800",
  Confirmed: "bg-primary/10 text-primary",
  "In Progress": "bg-yellow-100 text-yellow-800",
  Completed: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

const Appointments = () => {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [selected, setSelected] = useState<string | null>(null);
  const apt = sampleAppointments.find((a) => a.id === selected);

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your cleaning schedule.</p>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "list" ? "default" : "outline"} size="sm" onClick={() => setView("list")}><List className="h-4 w-4 mr-1" />List</Button>
          <Button variant={view === "calendar" ? "default" : "outline"} size="sm" onClick={() => setView("calendar")}><CalendarDays className="h-4 w-4 mr-1" />Calendar</Button>
        </div>
      </div>

      {selected && apt ? (
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display">{apt.serviceType}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}><X className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-3">
                <div><p className="text-muted-foreground">Status</p><Badge className={statusColors[apt.status]}>{apt.status}</Badge></div>
                <div><p className="text-muted-foreground">Date & Time</p><p className="font-medium">{apt.date} · {apt.timeWindow}</p></div>
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><p className="font-medium">{apt.address}</p></div>
              </div>
              <div className="space-y-3">
                <div><p className="text-muted-foreground">Add-ons</p><p className="font-medium">{apt.addOns.join(", ") || "None"}</p></div>
                <div className="flex items-start gap-2"><CreditCard className="h-4 w-4 text-muted-foreground mt-0.5" /><div><p className="font-medium">${apt.total.toFixed(2)}</p><p className="text-xs text-muted-foreground">Tip: ${apt.tip.toFixed(2)} · {apt.paymentStatus}</p></div></div>
                {apt.notes && <div><p className="text-muted-foreground">Notes</p><p className="text-sm">{apt.notes}</p></div>}
              </div>
            </div>
            <div className="flex gap-3 flex-wrap pt-2">
              {(apt.status === "Scheduled" || apt.status === "Confirmed") && (
                <>
                  <Button variant="outline" size="sm">Reschedule</Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">Cancel</Button>
                </>
              )}
              <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-1" />Rebook</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sampleAppointments.map((a) => (
            <Card key={a.id} className="shadow-soft hover:shadow-card transition-shadow cursor-pointer" onClick={() => setSelected(a.id)}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display font-semibold">{a.serviceType}</p>
                    <p className="text-sm text-muted-foreground">{a.date} · {a.timeWindow}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={statusColors[a.status]}>{a.status}</Badge>
                  <p className="text-sm font-medium mt-1">${a.total.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointments;
