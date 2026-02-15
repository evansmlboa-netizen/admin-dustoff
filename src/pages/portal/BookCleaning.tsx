import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowLeft, ArrowRight, Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { sampleAddresses, serviceTypes, addOns as addOnsList, timeWindows } from "@/data/seedData";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const steps = ["Property", "Service", "Add-ons", "Schedule", "Review & Pay", "Confirmed"];

const BookCleaning = () => {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Step 1 state
  const [selectedAddr, setSelectedAddr] = useState(sampleAddresses[0]?.id || "");
  const [propertyType, setPropertyType] = useState("house");
  const [bedrooms, setBedrooms] = useState("3");
  const [bathrooms, setBathrooms] = useState("2");

  // Step 2 state
  const [selectedService, setSelectedService] = useState("");

  // Step 3 state
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Step 4 state
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [frequency, setFrequency] = useState("one-time");

  // Step 5 state
  const [promoCode, setPromoCode] = useState("");
  const [tipPercent, setTipPercent] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState("");
  const [notes, setNotes] = useState("");

  const service = serviceTypes.find((s) => s.id === selectedService);
  const chosenAddOns = addOnsList.filter((a) => selectedAddOns.includes(a.id));
  const subtotal = (service?.price || 0) + chosenAddOns.reduce((s, a) => s + a.price, 0);
  const tipAmount = tipPercent !== null ? subtotal * (tipPercent / 100) : Number(customTip) || 0;
  const total = subtotal + tipAmount;

  const canNext = () => {
    if (step === 0) return !!selectedAddr;
    if (step === 1) return !!selectedService;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return true;
  };

  const next = () => { if (canNext() && step < 5) setStep(step + 1); };
  const prev = () => { if (step > 0) setStep(step - 1); };

  const handleConfirm = () => {
    toast({ title: "Booking Confirmed!", description: `Confirmation #DC-${Date.now().toString().slice(-6)}` });
    setStep(5);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold">Book a Cleaning</h1>
        <p className="text-muted-foreground mt-1">Schedule your next cleaning in a few easy steps.</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
              i < step ? "bg-primary text-primary-foreground" : i === step ? "bg-primary/10 text-primary border border-primary/30" : "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <CheckCircle2 className="h-3.5 w-3.5" /> : <span>{i + 1}</span>}
              <span className="hidden sm:inline">{s}</span>
            </div>
            {i < steps.length - 1 && <div className="w-4 h-px bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: Property */}
      {step === 0 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" />Select Property</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Choose Address</Label>
              <Select value={selectedAddr} onValueChange={setSelectedAddr}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {sampleAddresses.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.label} — {a.street}, {a.city}</SelectItem>
                  ))}
                  <SelectItem value="new">+ Add New Address</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="office">Office</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{[0,1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Select value={bathrooms} onValueChange={setBathrooms}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{[1,2,3,4,5].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Service */}
      {step === 1 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">Choose Service Type</CardTitle></CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {serviceTypes.map((s) => (
                <button
                  key={s.id}
                  disabled={s.comingSoon}
                  onClick={() => setSelectedService(s.id)}
                  className={`text-left p-4 rounded-xl border-2 transition-all ${
                    selectedService === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                  } ${s.comingSoon ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-semibold">{s.name}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{s.description}</p>
                    </div>
                    {s.comingSoon ? <Badge variant="secondary">Coming Soon</Badge> : <span className="font-display font-bold text-lg">${s.price}</span>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Add-ons */}
      {step === 2 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">Add-ons</CardTitle></CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-3">
              {addOnsList.map((a) => {
                const checked = selectedAddOns.includes(a.id);
                return (
                  <label
                    key={a.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Checkbox checked={checked} onCheckedChange={(v) => {
                      setSelectedAddOns(v ? [...selectedAddOns, a.id] : selectedAddOns.filter((x) => x !== a.id));
                    }} />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{a.name}</p>
                      {a.optional && <span className="text-xs text-muted-foreground">(Optional)</span>}
                    </div>
                    <span className="text-sm font-semibold">+${a.price}</span>
                  </label>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Schedule */}
      {step === 3 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display flex items-center gap-2"><Calendar className="h-5 w-5 text-primary" />Schedule</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {selectedService === "recurring" && (
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} min={new Date().toISOString().split("T")[0]} />
            </div>
            <div className="space-y-2">
              <Label>Time Window</Label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {timeWindows.map((tw) => (
                  <button
                    key={tw}
                    onClick={() => setSelectedTime(tw)}
                    className={`flex items-center justify-center gap-2 p-3 rounded-lg border-2 text-sm font-medium transition-all ${
                      selectedTime === tw ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/30"
                    }`}
                  >
                    <Clock className="h-4 w-4" />{tw}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review & Pay */}
      {step === 4 && (
        <Card className="shadow-card">
          <CardHeader><CardTitle className="font-display">Review & Checkout</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{service?.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{selectedDate}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{selectedTime}</span></div>
              {chosenAddOns.length > 0 && (
                <div className="flex justify-between"><span className="text-muted-foreground">Add-ons</span><span className="font-medium text-right">{chosenAddOns.map(a => a.name).join(", ")}</span></div>
              )}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              {chosenAddOns.map((a) => (
                <div key={a.id} className="flex justify-between text-muted-foreground"><span className="pl-4">+ {a.name}</span><span>${a.price.toFixed(2)}</span></div>
              ))}

              {/* Tip Selector */}
              <div className="pt-3 space-y-2">
                <Label>Tip for your cleaning team</Label>
                <p className="text-xs text-muted-foreground">Tips are optional and go directly to your cleaning team.</p>
                <div className="flex gap-2 flex-wrap">
                  {[10, 15, 20].map((p) => (
                    <Button key={p} variant={tipPercent === p ? "default" : "outline"} size="sm" onClick={() => { setTipPercent(p); setCustomTip(""); }}>
                      {p}%
                    </Button>
                  ))}
                  <Button variant={tipPercent === null ? "default" : "outline"} size="sm" onClick={() => setTipPercent(null)}>Custom</Button>
                </div>
                {tipPercent === null && (
                  <Input type="number" placeholder="Enter tip amount" value={customTip} onChange={(e) => setCustomTip(e.target.value)} className="w-40" />
                )}
                <div className="flex justify-between"><span>Tip</span><span>${tipAmount.toFixed(2)}</span></div>
              </div>

              {/* Promo code */}
              <div className="pt-2 flex gap-2">
                <Input placeholder="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} className="flex-1" />
                <Button variant="outline" size="sm">Apply</Button>
              </div>

              <div className="flex justify-between font-display font-bold text-lg pt-3 border-t border-border">
                <span>Total</span><span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Notes for your cleaner</Label>
              <Textarea placeholder="Any special instructions..." value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
            </div>

            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Payment methods: Card, Apple Pay, Google Pay (placeholder integration)</p>
              <Button className="w-full" size="lg" onClick={handleConfirm}>Confirm & Pay ${total.toFixed(2)}</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 6: Confirmation */}
      {step === 5 && (
        <Card className="shadow-card text-center">
          <CardContent className="py-12 space-y-6">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto">
              <Sparkles className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold">Booking Confirmed!</h2>
              <p className="text-muted-foreground mt-2">Confirmation #DC-{Date.now().toString().slice(-6)}</p>
            </div>
            <div className="text-sm space-y-1">
              <p><strong>Service:</strong> {service?.name}</p>
              <p><strong>Date:</strong> {selectedDate} · {selectedTime}</p>
              <p><strong>Total:</strong> ${total.toFixed(2)}</p>
            </div>
            <p className="text-xs text-muted-foreground">Cancellation policy: 24-hour notice required to avoid fees.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="outline">Add to Calendar</Button>
              <Button onClick={() => navigate("/portal/appointments")}>View Appointments</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      {step < 5 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={prev} disabled={step === 0}><ArrowLeft className="h-4 w-4 mr-1" />Back</Button>
          {step < 4 ? (
            <Button onClick={next} disabled={!canNext()}>Next<ArrowRight className="h-4 w-4 ml-1" /></Button>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default BookCleaning;
