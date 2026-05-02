"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Gamepad2,
  GraduationCap,
  LayoutDashboard,
  Rocket,
  Search,
  Settings,
  TableOfContents,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Discover", href: "/discover", icon: Search },
  { name: "Playsets", href: "/sets", icon: TableOfContents },
  { name: "Sessions", href: "/sessions", icon: Gamepad2 },
  { name: "Classes", href: "/classes", icon: GraduationCap },
];

function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu className="gap-1">
      {navigation.map((item) => {
        const isActive = pathname === item.href;
        return (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={item.href} className="bg-red">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function SidebarSettings() {
  const pathname = usePathname();
  const isActive = pathname === "/settings";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={isActive}>
          <Link href="/settings">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="font-bold text-2xl text-center">Korgy</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarNav />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Preferences</SidebarGroupLabel>
          <SidebarSettings />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenuButton asChild>
            <Button className="w-full py-5">
              <span className="font-semibold">Upgrade to Pro</span>
              <Rocket />
            </Button>
          </SidebarMenuButton>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}

export { useSidebar, SidebarProvider, SidebarTrigger };
