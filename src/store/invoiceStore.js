import { create } from "zustand";
import { persist } from "zustand/middleware";

const generateInvoiceNumber = () => {
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
      companyDetailsTab: {
        completed: false,
        active: true,
      },
      customerDetailsTab: {
        completed: false,
        active: false,
      },
      productDetailsTab: {
        completed: false,
        active: false,
      },
      paymentDetailsTab: {
        completed: false,
        active: false,
      },

      setCompanyDetailsTab: (tab) =>
        set((state) => ({
          companyDetailsTab: { ...state.companyDetailsTab, ...tab },
        })),
      setCustomerDetailsTab: (tab) =>
        set((state) => ({
          customerDetailsTab: { ...state.customerDetailsTab, ...tab },
        })),
      setProductDetailsTab: (tab) =>
        set((state) => ({
          productDetailsTab: { ...state.productDetailsTab, ...tab },
        })),
      setPaymentDetailsTab: (tab) =>
        set((state) => ({
          paymentDetailsTab: { ...state.paymentDetailsTab, ...tab },
        })),
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

      setCompanyDetails: (details) =>
        set((state) => ({
          companyDetails: { ...state.companyDetails, ...details },
        })),

      customerDetails: {
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        customerAddress: "",
        customerCity: "",
        customerState: "",
        customerZip: "",
        customerCountry: "",
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

      discountRate: 0,
      setDiscountRate: (discountRate) => set({ discountRate }),

      taxAmount: 0,
      setTaxAmount: (taxAmount) => set({ taxAmount }),

      total: 0,
      setTotal: (total) => set({ total }),

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
          discountRate: 0,
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

// Auto-fill localStorage with example data after 2s if empty (client-side only)
if (typeof window !== "undefined") {
  setTimeout(() => {
    const existing = localStorage.getItem("companyDetails");
    if (!existing || existing === "{}") {
      localStorage.setItem("companyDetails");
      // Optionally, trigger a reload or state update if needed
    }
  }, 2000);

  const companyDetails = localStorage.getItem("companyDetails");
  if (companyDetails && companyDetails.includes("oklch")) {
    // Remove or reset the problematic data

    console.log("oklch available");

    localStorage.removeItem("companyDetails");
    // Optionally, reload the page or reset Zustand state
    window.location.reload();
  }
}

export default useInvoiceStore;
