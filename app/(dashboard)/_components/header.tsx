"use client";

import { LogOut, Sparkles, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Notifications } from "./notifications";
import { SidebarTrigger } from "./sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {/* Sidebar trigger is handled by shadcn sidebar */}
      </div>

      <div className="flex items-center gap-4">
        <Button
          variant={"secondary"}
          size="lg"
          className="py-5.5 px-4 text-md mr-2"
        >
          <Sparkles className="mr-1" fill="currentColor" />
          Generate with AI
        </Button>

        <Notifications />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar size="lg">
              <AvatarImage src={"/avatar.jpeg"}></AvatarImage>
              <AvatarFallback>AV</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <User2Icon />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
