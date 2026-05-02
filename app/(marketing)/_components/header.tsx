"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/auth-provider";

export function Header() {
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-sans)] text-3xl font-bold text-primary">
            Korgy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          {!isAuthenticated ? (
            <>
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="hidden sm:inline-flex"
                  size="lg"
                >
                  Log In
                </Button>
              </Link>
              <Link href={"/register"}>
                <Button size="lg">Get Started Free</Button>
              </Link>
            </>
          ) : (
            <Button size="lg" asChild><Link href={"/dashboard"}>Go to Dashboard</Link></Button>
          )}
        </div>
      </div>
    </header>
  );
}
