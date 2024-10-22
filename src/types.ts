export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export type Subscription = {
  id?: string;
  name: string;
  price: number;
  paymentDate?: string;
  status?: SubscriptionStatus;
  cancelUrl?: string;
};
