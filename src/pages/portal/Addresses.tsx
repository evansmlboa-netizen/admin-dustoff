import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Trash2, Star } from "lucide-react";
import { sampleAddresses, type Address } from "@/data/seedData";

const Addresses = () => {
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [adding, setAdding] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold">Addresses</h1>
          <p className="text-muted-foreground mt-1">Manage your property addresses.</p>
        </div>
        <Button onClick={() => setAdding(!adding)}><Plus className="h-4 w-4 mr-1" />{adding ? "Cancel" : "Add Address"}</Button>
      </div>

      {adding && (
        <Card className="shadow-card border-primary/20">
          <CardHeader><CardTitle className="font-display text-lg">New Address</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Label</Label><Input placeholder="e.g. Home, Office" /></div>
              <div className="space-y-2"><Label>Property Type</Label>
                <Select defaultValue="house"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="apartment">Apartment</SelectItem><SelectItem value="house">House</SelectItem><SelectItem value="office">Office</SelectItem></SelectContent></Select>
              </div>
            </div>
            <div className="space-y-2"><Label>Street Address</Label><Input placeholder="123 Main St" /></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2"><Label>Apt/Unit</Label><Input placeholder="Apt 2B" /></div>
              <div className="space-y-2"><Label>City</Label><Input placeholder="Springfield" /></div>
              <div className="space-y-2"><Label>State</Label><Input placeholder="IL" /></div>
              <div className="space-y-2"><Label>ZIP</Label><Input placeholder="62704" /></div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Gate Code</Label><Input placeholder="Optional" /></div>
              <div className="space-y-2"><Label>Parking Notes</Label><Input placeholder="Optional" /></div>
            </div>
            <Button onClick={() => setAdding(false)}>Save Address</Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {addresses.map((addr) => (
          <Card key={addr.id} className="shadow-soft">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-display font-semibold">{addr.label}</p>
                    {addr.isDefault && <Badge variant="secondary" className="text-xs"><Star className="h-3 w-3 mr-1" />Default</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{addr.street}{addr.apt ? `, ${addr.apt}` : ""}, {addr.city}, {addr.state} {addr.zip}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{addr.propertyType} · {addr.bedrooms} bed · {addr.bathrooms} bath{addr.gateCode ? ` · Gate: ${addr.gateCode}` : ""}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
