import type { Metadata } from "next";
import { Fredoka } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/features/auth/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Korgy - Tạo câu hỏi tương tác bằng AI",
  description:
    "Nền tảng gamified giúp giáo viên tạo câu hỏi trắc nghiệm nhanh chóng với AI. Host game trực tiếp và theo dõi học sinh trong thời gian thực.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fredoka.variable} h-full antialiated`}>
      <body className="min-h-full flex flex-col font-[family-name:var(--font-fredoka)]">
        <AuthProvider>
          <Toaster duration={3000} />
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
