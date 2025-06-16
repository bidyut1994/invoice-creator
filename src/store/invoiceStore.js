import { create } from "zustand";

// Generate a consistent invoice number
const generateInvoiceNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${timestamp}${random}`.slice(-5);
};

const useInvoiceStore = create((set) => ({
  activeTab: "company-details",
  setActiveTab: (tab) => set({ activeTab: tab }),

  color: "#0369a1",
  setColor: (color) => set({ color }),

  // Company Details
  companyDetails: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    companyLogoUrl: null,
    companyEmail: "",
    companyPhone: "",
    companyWebsite: null,
  },
  setCompanyDetails: (details) =>
    set((state) => ({
      companyDetails: { ...state.companyDetails, ...details },
    })),

  // Customer Details
  customerDetails: {
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  },
  setCustomerDetails: (details) =>
    set((state) => ({
      customerDetails: { ...state.customerDetails, ...details },
    })),

  // Invoice Details
  invoiceDetails: {
    invoiceNumber: `#1${generateInvoiceNumber()}`,
    invoiceDate: new Date()
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-"),
    dueDate: "",
    notes: "",
    terms: "",
  },
  setInvoiceDetails: (details) =>
    set((state) => ({
      invoiceDetails: { ...state.invoiceDetails, ...details },
    })),

  // Items
  items: [],
  setItems: (items) => set({ items }),

  // Tax
  tax: {
    rate: 0,
    amount: 0,
  },
  setTax: (tax) => set({ tax }),

  // Total
  total: 0,
  setTotal: (total) => set({ total }),

  // Reset all data
  resetAll: () =>
    set({
      activeTab: "company",
      companyDetails: {
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        companyEmail: "",
        companyPhone: "",
        companyWebsite: "",
        companyLogoUrl: "",
      },
      customerDetails: {
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
      },
      invoiceDetails: {
        invoiceNumber: `#${generateInvoiceNumber()}`,
        invoiceDate: new Date()
          .toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "-"),
        dueDate: "",
        notes: "",
        terms: "",
      },
      items: [],
      tax: {
        rate: 0,
        amount: 0,
      },
      total: 0,
    }),
}));

export default useInvoiceStore;
