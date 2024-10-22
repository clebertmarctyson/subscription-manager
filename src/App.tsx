import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Moon, PlusIcon, Sun } from "lucide-react";
import { CreateSubscriptionDialog } from "@/components/CreateSubscriptionDialog";
import { SubscriptionCard } from "@/components/SubscriptionCard";
import { SubscriptionSkeleton } from "@/components/SubscriptionSkeleton";

import useSubscriptionStore from "@/lib/useSubscriptionStore";

import { SubscriptionStatus } from "@/types";

import { useTheme } from "@/components/ThemeProvider";

type FilterStatus = "ALL" | SubscriptionStatus;

export default function App() {
  const { theme, setTheme } = useTheme();

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("ALL");

  const { subscriptions } = useSubscriptionStore();

  const filteredSubscriptions = subscriptions?.filter((subscription) =>
    filterStatus === "ALL"
      ? true
      : subscription.status === (filterStatus as SubscriptionStatus)
  );

  const totalMonthlyCost = filteredSubscriptions?.reduce(
    (total, subscription) => total + Number(subscription.price),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="fixed top-4 right-4">
          <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </div>

        <h1 className="text-center text-3xl font-bold mb-4 sm:mb-0">
          Subscription Manager
        </h1>
        <div className="flex flex-col items-center sm:flex-row justify-between my-16 gap-4">
          <CreateSubscriptionDialog>
            <Button
              variant="secondary"
              className="w-full sm:w-auto mb-4 sm:mb-0"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              <span>Add Subscription</span>
            </Button>
          </CreateSubscriptionDialog>

          <div className="backdrop-blur-sm rounded-lg px-4 py-2 text-right">
            <span className="text-lg font-semibold mr-2">
              Total Monthly Cost:
            </span>
            <span className="text-2xl font-bold">
              ${totalMonthlyCost?.toFixed(2)}
            </span>
          </div>

          <Select
            value={filterStatus}
            onValueChange={(value: FilterStatus) => setFilterStatus(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Subscriptions</SelectItem>
              <SelectItem value={SubscriptionStatus.ACTIVE}>Active</SelectItem>
              <SelectItem value={SubscriptionStatus.INACTIVE}>
                Inactive
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSubscriptions?.length === 0
            ? [...Array(3)].map((_, index) => (
                <SubscriptionSkeleton key={index} />
              ))
            : filteredSubscriptions?.map((subscription) => (
                <SubscriptionCard
                  key={subscription?.id}
                  subscription={subscription}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
