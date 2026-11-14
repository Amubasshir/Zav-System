import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";

const NAV = [
  { href: "/#included", label: "What you get" },
  { href: "/#how", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

/**
 * Sticky bar. Its job is to keep "Book a demo" on screen at every scroll
 * position and screen size. No menu button, so it needs no JavaScript.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg">
      <Container className="flex h-14 items-center justify-between gap-4">
        <Link href="/" aria-label="ZAV home" className="flex items-center">
          <Logo className="h-6" />
        </Link>

        <nav aria-label="Main" className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted max-[380px]:hidden">
            $199/mo
          </span>
          <ButtonLink href="/#book" size="sm">
            Book a demo
          </ButtonLink>
        </div>
      </Container>
    </header>
  );
}
