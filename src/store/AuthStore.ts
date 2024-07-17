import { persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";

type AuthStore = {
  tempPassword?: string;
  setTempPassword: (pass: string) => void;
};

export const useAuthStore = createWithEqualityFn<AuthStore>()(
  persist(
    (set) => ({
      tempPassword: undefined,
      setTempPassword: (tempPassword) => set({ tempPassword }),
    }),
    { name: "auth-store" }
  ),
  shallow
);
