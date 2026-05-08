"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Header } from "@/features/dashboard/components/layout/header";
import { AppSidebar } from "@/features/dashboard/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>
      <AppSidebar />
      <div className="flex min-h-svh flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
