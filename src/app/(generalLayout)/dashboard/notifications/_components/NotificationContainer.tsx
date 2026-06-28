"use client";

import { NotificationCard } from "./NotificationCard";

const NotificationContainer = () => {
  return (
    <div className="min-h-screen bg-background p-6 w-1/2">
      <div className="flex justify-between">
        <h1 className="text-foreground text-2xl font-bold mb-6">
          Notifications
        </h1>
      </div>
      <div className="space-y-3">
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
      </div>
    </div>
  );
};

export default NotificationContainer;
