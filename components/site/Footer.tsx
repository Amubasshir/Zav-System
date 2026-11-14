import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { site } from "@/lib/site";

const LEGAL = [
  { href: "/privacy", label: "Privacy policy" },
  { href: "/terms", label: "Terms" },
  { href: "/sms-terms", label: "SMS terms" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Logo className="h-7" />
          <p className="mt-3 text-sm text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Legal" className="flex flex-wrap gap-x-6 gap-y-2">
          {LEGAL.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted underline-offset-4 hover:text-ink hover:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="font-mono text-xs text-muted">© 2026 {site.name}</p>
      </Container>
    </footer>
  );
}
