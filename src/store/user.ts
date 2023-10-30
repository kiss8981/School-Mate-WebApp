import { create } from "zustand";

export type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

type UserStore = {
  me: User | null;
  add: (data: User) => void;
  remove: () => void;
};

export const useUserStore = create<UserStore>(set => ({
  me: null,
  add: (data: User) => set(state => ({ me: data })),
  remove: () => set(state => ({ me: null })),
}));
