"use client";

import Link from "next/link";

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "API", href: "/docs" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
    { label: "COPPA", href: "/coppa" },
  ],
  social: [
    { label: "Twitter", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
    { label: "Zalo", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-[family-name:var(--font-sans)] text-2xl font-bold text-primary">
                Korgy
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Create interactive quizzes with AI and host games for students.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-primary">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-primary">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-primary">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 font-[family-name:var(--font-sans)] text-sm font-semibold text-primary">
              Connect
            </h3>
            <ul className="space-y-3">
              {footerLinks.social.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Korgy. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for teachers & students worldwide 🌎
          </p>
        </div>
      </div>
    </footer>
  );
}
