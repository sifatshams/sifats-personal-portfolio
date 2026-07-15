import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useResetPasswordStore = create(
  persist(
    (set) => ({
      email: null,

      setEmail: (email) =>
        set({
          email,
        }),

      clearEmail: () =>
        set({
          email: null,
        }),
    }),
    {
      name: 'reset-password-storage',
    },
  ),
);

export default useResetPasswordStore;
