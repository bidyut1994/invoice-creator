import { create } from "zustand";
import { persist } from "zustand/middleware";

// Generate a deterministic invoice number
const generateInvoiceNumber = () => {
  // Use a fixed seed for consistent generation
  const seed = 10000;
  const baseNumber = Math.floor(seed + Math.random() * 90000);
  return baseNumber.toString().padStart(5, "0");
};

const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
};

const useInvoiceStore = create(
  persist(
    (set) => ({
      activeTab: "company-details",
      setActiveTab: (tab) => set({ activeTab: tab }),

      color: "#0369a1",
      setColor: (color) => set({ color }),

      companyDetails: getLocalStorage("companyDetails", {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        website: "",
        logoUrl: "",
      }),

      setCompanyDetails: (details) =>
        set((state) => ({
          companyDetails: { ...state.companyDetails, ...details },
        })),

      customerDetails: {
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
      },

      setCustomerDetails: (details) =>
        set((state) => ({
          customerDetails: { ...state.customerDetails, ...details },
        })),

      invoiceDetails: {
        invoiceNumber: "#10009",
        issueDate: new Date().toLocaleDateString("en-GB"),
      },

      setInvoiceDetails: (details) =>
        set((state) => ({
          invoiceDetails: { ...state.invoiceDetails, ...details },
        })),

      items: [],
      setItems: (items) => set({ items }),

      subtotal: 0,
      setSubtotal: (subtotal) => set({ subtotal }),

      taxRate: 0,
      setTaxRate: (taxRate) => set({ taxRate }),

      taxAmount: 0,
      setTaxAmount: (taxAmount) => set({ taxAmount }),

      total: 0,
      setTotal: (total) => set({ total }),

      currency: "USD",
      setCurrency: (currency) => set({ currency }),

      status: "draft",
      setStatus: (status) => set({ status }),

      resetStore: () =>
        set({
          activeTab: "company-details",
          companyDetails: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
            website: "",
            logoUrl: "",
          },
          customerDetails: {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
            country: "",
          },
          invoiceDetails: {
            invoiceNumber: "",
            issueDate: "",
            dueDate: "",
            notes: "",
            terms: "",
          },
          items: [],
          subtotal: 0,
          taxRate: 0,
          taxAmount: 0,
          total: 0,
          currency: "USD",
          status: "draft",
        }),
    }),
    {
      name: "company-details-storage",
      partialize: (state) => ({ companyDetails: state.companyDetails }),
      skipHydration: true,
    }
  )
);

export default useInvoiceStore;
