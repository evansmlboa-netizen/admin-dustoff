import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MessageCircle, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Support & Contact</h1>
        <p className="text-muted-foreground mt-1">We're here to help. Reach out anytime.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <Card className="shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <Phone className="h-8 w-8 text-primary mx-auto" />
            <p className="font-display font-semibold">Call Us</p>
            <p className="text-sm text-muted-foreground">(555) 123-4567</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <Mail className="h-8 w-8 text-primary mx-auto" />
            <p className="font-display font-semibold">Email Us</p>
            <p className="text-sm text-muted-foreground">support@dustoff.com</p>
          </CardContent>
        </Card>
        <Card className="shadow-soft text-center">
          <CardContent className="p-6 space-y-2">
            <MessageCircle className="h-8 w-8 text-primary mx-auto" />
            <p className="font-display font-semibold">Live Chat</p>
            <p className="text-sm text-muted-foreground">Coming Soon</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card">
        <CardHeader><CardTitle className="font-display text-lg">Send a Message</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><Label>Subject</Label><Input placeholder="How can we help?" /></div>
          <div className="space-y-2"><Label>Message</Label><Textarea placeholder="Describe your issue or question..." rows={4} /></div>
          <Button onClick={() => toast({ title: "Message sent!", description: "We'll respond within 24 hours." })}>Submit</Button>
        </CardContent>
      </Card>

      <Card className="shadow-soft">
        <CardHeader><CardTitle className="font-display text-lg flex items-center gap-2"><HelpCircle className="h-5 w-5 text-primary" />FAQs</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            ["How do I cancel an appointment?", "You can cancel up to 24 hours before your scheduled cleaning from the Appointments page."],
            ["What's your cancellation policy?", "Cancellations within 24 hours may incur a fee. Please review our Terms of Service for details."],
            ["How do tips work?", "Tips are optional and go directly to your cleaning team. You can add them during booking or after service."],
          ].map(([q, a]) => (
            <div key={q} className="p-3 bg-accent rounded-lg">
              <p className="font-medium">{q}</p>
              <p className="text-muted-foreground mt-1">{a}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Support;
