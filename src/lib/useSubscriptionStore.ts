import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { Subscription } from "@/types";

interface SubscriptionStore {
  subscriptions: Subscription[];
  subscription: Subscription | null;
  addSubscription: (subscription: Subscription) => void;
  setSubscription: (subscription: Subscription | null) => void;
  updateSubscription: (subscription: Subscription) => void;
  removeSubscription: (id: string) => void;
}

const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set) => ({
      subscriptions: [],
      subscription: null,
      setSubscription: (subscription) => {
        set({ subscription });
      },
      addSubscription: (subscription) => {
        set((state) => ({
          subscriptions: [
            ...state.subscriptions,
            {
              ...subscription,
              id: uuidv4(),
              paymentDate: subscription.paymentDate
                ? new Date(subscription.paymentDate).toISOString()
                : new Date().toISOString(),
            },
          ],
        }));
      },

      updateSubscription: (subscription) => {
        set((state) => ({
          subscriptions: state.subscriptions.map((sub) =>
            sub.id === subscription.id ? subscription : sub
          ),
        }));
      },

      removeSubscription: (id) => {
        set((state) => ({
          subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
        }));
      },
    }),
    {
      name: "subscription-storage",
    }
  )
);

export default useSubscriptionStore;
