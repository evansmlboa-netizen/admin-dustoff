import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Gift, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Referrals = () => {
  const { toast } = useToast();
  const referralCode = "DUSTOFF-FRIEND25";

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Referrals</h1>
        <p className="text-muted-foreground mt-1">Share the clean. Earn rewards.</p>
      </div>

      <Card className="shadow-card text-center">
        <CardContent className="py-12 space-y-6">
          <Gift className="h-16 w-16 text-primary mx-auto" />
          <div>
            <h2 className="text-xl font-display font-bold">Refer a Friend, Get $25 Off</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">Share your referral code with friends. When they book their first cleaning, you both get $25 off your next service.</p>
          </div>
          <div className="flex items-center gap-2 justify-center max-w-sm mx-auto">
            <Input value={referralCode} readOnly className="text-center font-mono font-bold" />
            <Button variant="outline" size="icon" onClick={() => { navigator.clipboard.writeText(referralCode); toast({ title: "Copied!" }); }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Coming soon: Track your referrals and rewards here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Referrals;
