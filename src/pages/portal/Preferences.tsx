import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Preferences = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Preferences</h1>
        <p className="text-muted-foreground mt-1">Customize your cleaning and communication preferences.</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-lg">Cleaning Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Priority Areas</Label>
            <Textarea placeholder="e.g., Kitchen counters, master bathroom, living room floors" rows={2} />
          </div>
          <div className="space-y-2">
            <Label>Product Sensitivity</Label>
            <Select defaultValue="none">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No restrictions</SelectItem>
                <SelectItem value="eco">Eco-friendly products only</SelectItem>
                <SelectItem value="fragrance-free">Fragrance-free products</SelectItem>
                <SelectItem value="both">Eco-friendly & fragrance-free</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>"Avoid" List</Label>
            <Textarea placeholder="e.g., Don't move items on office desk, avoid child's playroom" rows={2} />
          </div>
          <div className="space-y-2">
            <Label>Pets in Home?</Label>
            <Select defaultValue="no">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="no">No pets</SelectItem>
                <SelectItem value="dog">Dog(s)</SelectItem>
                <SelectItem value="cat">Cat(s)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Pet Notes</Label>
            <Input placeholder="e.g., Friendly golden retriever, may bark" />
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-lg">Communication Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div><Label>Email Reminders</Label><p className="text-xs text-muted-foreground">Receive appointment reminders via email</p></div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div><Label>SMS Reminders</Label><p className="text-xs text-muted-foreground">Receive text message reminders</p></div>
            <Switch defaultChecked />
          </div>
          <div className="space-y-2">
            <Label>Reminder Timing</Label>
            <Select defaultValue="24h">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">24 hours before</SelectItem>
                <SelectItem value="2h">2 hours before</SelectItem>
                <SelectItem value="both">Both (24h and 2h)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Preferred Contact Method</Label>
            <Select defaultValue="email">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button onClick={() => toast({ title: "Preferences saved!" })}>Save Preferences</Button>
    </div>
  );
};

export default Preferences;
