import { create } from "zustand";

const useInvoiceStore = create((set) => ({
  activeTab: "company-details",
  setActiveTab: (activeTab) => set({ activeTab }),

  color: "#0369a1",
  setColor: (color) => set({ color }),

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
}));

export default useInvoiceStore;
