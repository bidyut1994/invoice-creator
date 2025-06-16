import { create } from "zustand";

// Generate a deterministic invoice number
const generateInvoiceNumber = () => {
  // Use a fixed seed for consistent generation
  const seed = 10000;
  const baseNumber = Math.floor(seed + Math.random() * 90000);
  return baseNumber.toString().padStart(5, "0");
};

const useInvoiceStore = create((set) => ({
  activeTab: "company-details",
  setActiveTab: (tab) => set({ activeTab: tab }),

  color: "#0369a1",
  setColor: (color) => set({ color }),

  // Company Details
  companyDetails: {
    ...JSON.parse(
      localStorage.getItem("companyDetails") ||
        JSON.stringify({
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
        })
    ),
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
    // invoiceNumber: `#1${generateInvoiceNumber()}`,
    invoiceNumber: `#10009`,
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
      activeTab: "company-details",
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
      items: [],
      tax: {
        rate: 0,
        amount: 0,
      },
      total: 0,
    }),
}));

export default useInvoiceStore;
