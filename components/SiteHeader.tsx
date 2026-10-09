import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

type SiteHeaderProps = {
  links?: Array<{ href: string; label: string }>;
};

const DEFAULT_LINKS = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader({ links = DEFAULT_LINKS }: SiteHeaderProps) {
  return (
    <header className="flex items-center justify-between pt-8 sm:pt-10">
      <Link href="/" aria-label="Home" className="inline-flex">
        <Logo size={26} />
      </Link>
      <nav className="flex items-center gap-5 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="link text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </nav>
    </header>
  );
}
