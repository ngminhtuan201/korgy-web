"use client";

import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const notifications = [
  {
    id: "1",
    title: "Welcome to Korgy 👋",
    description: "Get started by creating your first set.",
    date: "Just now",
    isRead: false,
  },
];

export function Notifications() {
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 w-4 justify-center p-0 text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        {/* <PopoverHeader>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs text-muted-foreground">
                {unreadCount} new
              </span>
            )}
          </div>
        </PopoverHeader> */}

        <div className="space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex flex-col gap-1 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">
                  {notification.title}
                </span>
                {/* {!notification.isRead && (
                  <span className="h-2 w-2 rounded-full bg-tertiary" />
                )} */}
              </div>
              <span className="text-xs text-muted-foreground">
                {notification.description}
              </span>
              {/* <span className="text-xs text-muted-foreground">
                {notification.date}
              </span> */}
            </div>
          ))}
        </div>
        {notifications.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            No notifications
          </p>
        )}
      </PopoverContent>
    </Popover>
  );
}
