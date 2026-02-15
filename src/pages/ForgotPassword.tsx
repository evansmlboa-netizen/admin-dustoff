import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const { forgotPassword } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    await forgotPassword(email);
    setSent(true);
    toast({ title: "Check your email", description: "We've sent a password reset link." });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-primary">
            <Sparkles className="h-8 w-8" />
            <span className="text-2xl font-display font-bold tracking-tight">Dust Off Cleaning</span>
          </div>
        </div>
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="font-display text-xl">Reset Password</CardTitle>
            <CardDescription>Enter your email and we'll send a reset link.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sent ? (
              <div className="text-center space-y-4 py-4">
                <p className="text-sm text-muted-foreground">A reset link has been sent to <strong>{email}</strong>. Check your inbox.</p>
                <Link to="/login"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" />Back to Sign In</Button></Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <Button type="submit" className="w-full">Send Reset Link</Button>
                <Link to="/login" className="block text-center text-sm text-primary hover:underline">Back to Sign In</Link>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
