export interface Address {
  id: string;
  label: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  gateCode?: string;
  parking?: string;
  propertyType: "apartment" | "house" | "office";
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  floors?: number;
  isDefault: boolean;
}

export interface Appointment {
  id: string;
  addressId: string;
  address: string;
  serviceType: string;
  addOns: string[];
  date: string;
  timeWindow: string;
  status: "Scheduled" | "Confirmed" | "In Progress" | "Completed" | "Cancelled";
  total: number;
  tip: number;
  notes?: string;
  paymentStatus: "Paid" | "Pending" | "Failed";
}

export interface Invoice {
  id: string;
  appointmentId: string;
  date: string;
  address: string;
  serviceType: string;
  addOns: string[];
  subtotal: number;
  discount: number;
  tax: number;
  tip: number;
  total: number;
  paymentMethod: string;
  status: "Paid" | "Pending";
}

export const serviceTypes = [
  { id: "standard", name: "Standard Cleaning", description: "Regular cleaning for a well-maintained home.", price: 120 },
  { id: "deep", name: "Deep Cleaning", description: "Thorough top-to-bottom cleaning.", price: 220 },
  { id: "move", name: "Move-In / Move-Out", description: "Complete cleaning for moving transitions.", price: 300 },
  { id: "recurring", name: "Recurring Cleaning", description: "Scheduled regular cleaning at a discount.", price: 100 },
  { id: "commercial", name: "Commercial", description: "Office and commercial spaces.", price: 0, comingSoon: true },
];

export const addOns = [
  { id: "sweep-mop", name: "Sweeping & Mopping", price: 25 },
  { id: "dusting", name: "Dusting", price: 20 },
  { id: "windows", name: "Window Cleaning", price: 35 },
  { id: "trash", name: "Trash Services", price: 15 },
  { id: "floor-care", name: "Floor Care", price: 30 },
  { id: "bathroom", name: "Bathroom Cleaning", price: 25 },
  { id: "oven", name: "Inside Oven", price: 40, optional: true },
  { id: "fridge", name: "Inside Fridge", price: 35, optional: true },
  { id: "baseboards", name: "Baseboards", price: 30, optional: true },
  { id: "interior-windows", name: "Interior Windows", price: 45, optional: true },
];

export const timeWindows = [
  "8:00 AM – 11:00 AM",
  "11:00 AM – 2:00 PM",
  "2:00 PM – 5:00 PM",
];

export const sampleAddresses: Address[] = [
  {
    id: "addr_1",
    label: "Home",
    street: "742 Evergreen Terrace",
    city: "Springfield",
    state: "IL",
    zip: "62704",
    propertyType: "house",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    floors: 2,
    isDefault: true,
  },
  {
    id: "addr_2",
    label: "Office",
    street: "100 Industrial Way",
    apt: "Suite 204",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    propertyType: "office",
    bedrooms: 0,
    bathrooms: 1,
    sqft: 900,
    floors: 1,
    isDefault: false,
    gateCode: "4521",
  },
];

export const sampleAppointments: Appointment[] = [
  {
    id: "apt_1",
    addressId: "addr_1",
    address: "742 Evergreen Terrace, Springfield, IL",
    serviceType: "Standard Cleaning",
    addOns: ["Sweeping & Mopping", "Dusting"],
    date: "2026-02-20",
    timeWindow: "8:00 AM – 11:00 AM",
    status: "Confirmed",
    total: 165,
    tip: 20,
    notes: "Please use fragrance-free products",
    paymentStatus: "Paid",
  },
  {
    id: "apt_2",
    addressId: "addr_1",
    address: "742 Evergreen Terrace, Springfield, IL",
    serviceType: "Deep Cleaning",
    addOns: ["Bathroom Cleaning", "Inside Oven", "Window Cleaning"],
    date: "2026-01-15",
    timeWindow: "11:00 AM – 2:00 PM",
    status: "Completed",
    total: 320,
    tip: 30,
    paymentStatus: "Paid",
  },
  {
    id: "apt_3",
    addressId: "addr_2",
    address: "100 Industrial Way Suite 204, Springfield, IL",
    serviceType: "Standard Cleaning",
    addOns: ["Trash Services"],
    date: "2026-01-05",
    timeWindow: "2:00 PM – 5:00 PM",
    status: "Completed",
    total: 135,
    tip: 15,
    paymentStatus: "Paid",
  },
];

export const sampleInvoices: Invoice[] = [
  {
    id: "inv_1001",
    appointmentId: "apt_1",
    date: "2026-02-20",
    address: "742 Evergreen Terrace, Springfield, IL",
    serviceType: "Standard Cleaning",
    addOns: ["Sweeping & Mopping", "Dusting"],
    subtotal: 165,
    discount: 0,
    tax: 0,
    tip: 20,
    total: 185,
    paymentMethod: "Visa •••• 4242",
    status: "Paid",
  },
  {
    id: "inv_1002",
    appointmentId: "apt_2",
    date: "2026-01-15",
    address: "742 Evergreen Terrace, Springfield, IL",
    serviceType: "Deep Cleaning",
    addOns: ["Bathroom Cleaning", "Inside Oven", "Window Cleaning"],
    subtotal: 320,
    discount: 0,
    tax: 0,
    tip: 30,
    total: 350,
    paymentMethod: "Visa •••• 4242",
    status: "Paid",
  },
  {
    id: "inv_1003",
    appointmentId: "apt_3",
    date: "2026-01-05",
    address: "100 Industrial Way Suite 204, Springfield, IL",
    serviceType: "Standard Cleaning",
    addOns: ["Trash Services"],
    subtotal: 135,
    discount: 0,
    tax: 0,
    tip: 15,
    total: 150,
    paymentMethod: "Visa •••• 4242",
    status: "Paid",
  },
];
