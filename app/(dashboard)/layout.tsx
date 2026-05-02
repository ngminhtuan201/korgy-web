"use client";

import { Header } from "./_components/header";
import { AppSidebar } from "./_components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

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
