import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download } from "lucide-react";
import { sampleInvoices } from "@/data/seedData";

const Invoices = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const inv = sampleInvoices.find((i) => i.id === selected);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">Invoices & Receipts</h1>
        <p className="text-muted-foreground mt-1">View and download your cleaning receipts.</p>
      </div>

      {selected && inv ? (
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="font-display">Invoice {inv.id}</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelected(null)}>← Back</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div><p className="text-muted-foreground">Date</p><p className="font-medium">{inv.date}</p></div>
              <div><p className="text-muted-foreground">Address</p><p className="font-medium">{inv.address}</p></div>
              <div><p className="text-muted-foreground">Payment</p><p className="font-medium">{inv.paymentMethod}</p></div>
              <div><p className="text-muted-foreground">Status</p><Badge variant="secondary">{inv.status}</Badge></div>
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span>{inv.serviceType}</span><span>${inv.subtotal.toFixed(2)}</span></div>
              {inv.addOns.map((a) => (
                <div key={a} className="flex justify-between text-muted-foreground"><span className="pl-4">+ {a}</span></div>
              ))}
              {inv.discount > 0 && <div className="flex justify-between text-primary"><span>Discount</span><span>-${inv.discount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span>Tip</span><span>${inv.tip.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-lg border-t pt-2"><span>Total</span><span>${inv.total.toFixed(2)}</span></div>
            </div>
            <Button variant="outline"><Download className="h-4 w-4 mr-1" />Download PDF</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sampleInvoices.map((inv) => (
            <Card key={inv.id} className="shadow-soft hover:shadow-card transition-shadow cursor-pointer" onClick={() => setSelected(inv.id)}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium text-sm">{inv.serviceType} — {inv.id}</p>
                    <p className="text-xs text-muted-foreground">{inv.date} · {inv.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${inv.total.toFixed(2)}</p>
                  <Badge variant="secondary" className="text-xs">{inv.status}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoices;
