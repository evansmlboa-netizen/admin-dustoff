import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Plus, Pause, XCircle } from "lucide-react";

const Payments = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Payments & Billing</h1>
        <p className="text-muted-foreground mt-1">Manage your payment methods and subscriptions.</p>
      </div>

      {/* Payment Methods */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-lg">Payment Methods</CardTitle>
            <Button variant="outline" size="sm"><Plus className="h-4 w-4 mr-1" />Add Card</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-border rounded-xl">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium text-sm">Visa •••• 4242</p>
                <p className="text-xs text-muted-foreground">Expires 12/27</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">Default</Badge>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-lg">Active Subscription</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-accent rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display font-semibold">Bi-weekly Standard Cleaning</p>
                <p className="text-sm text-muted-foreground">742 Evergreen Terrace</p>
              </div>
              <Badge className="bg-primary/10 text-primary">Active</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground">Frequency</p><p className="font-medium">Every 2 weeks</p></div>
              <div><p className="text-muted-foreground">Next Billing</p><p className="font-medium">Mar 5, 2026</p></div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Pause className="h-4 w-4 mr-1" />Pause</Button>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive"><XCircle className="h-4 w-4 mr-1" />Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tip Policy */}
      <Card className="shadow-soft">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">About Tips:</strong> Tips are optional and always go directly to your assigned cleaning team. You can add a tip during booking or after service completion.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;
