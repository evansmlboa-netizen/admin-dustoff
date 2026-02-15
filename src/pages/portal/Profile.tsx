import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User, Shield, Trash2 } from "lucide-react";

const Profile = () => {
  const { user, updateProfile, logout } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account details.</p>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><User className="h-5 w-5 text-primary" />Personal Info</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="space-y-2"><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" /></div>
          </div>
          <div className="space-y-2"><Label>Email</Label><Input value={user?.email || ""} disabled className="opacity-60" /></div>
          <Button onClick={() => { updateProfile({ name, phone }); toast({ title: "Profile updated!" }); }}>Save Changes</Button>
        </CardContent>
      </Card>

      {user?.provider === "email" && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><Shield className="h-5 w-5 text-primary" />Password</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Current Password</Label><Input type="password" placeholder="••••••••" /></div>
            <div className="space-y-2"><Label>New Password</Label><Input type="password" placeholder="Min. 6 characters" /></div>
            <Button variant="outline">Update Password</Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-lg">Connected Accounts</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {user?.provider === "google" && <div className="flex items-center justify-between p-3 bg-accent rounded-lg"><span className="text-sm font-medium">Google</span><Badge variant="secondary">Connected</Badge></div>}
            {user?.provider === "apple" && <div className="flex items-center justify-between p-3 bg-accent rounded-lg"><span className="text-sm font-medium">Apple</span><Badge variant="secondary">Connected</Badge></div>}
            {user?.provider === "email" && <p className="text-sm text-muted-foreground">No social accounts connected.</p>}
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-soft border-destructive/20">
        <CardContent className="p-4 flex items-center justify-between">
          <div>
            <p className="font-display font-semibold text-destructive">Delete Account</p>
            <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          </div>
          <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
