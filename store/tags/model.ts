import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchTagStore = create(
  persist<{
    value: string;
    valueChanged: (value: string) => void;
  }>(
    (set) => ({
      value: "",
      valueChanged: (value) => set({ value }),
    }),
    { name: "search-tag-storage" }
  )
);
