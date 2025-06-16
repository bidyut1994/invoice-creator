import { create } from "zustand";

const useSidebarStore = create((set) => ({
  active: "company-details",
  setActive: (active) => set({ active }),
}));

export default useSidebarStore;
