"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, ExternalLink } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-3 shadow-md"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Pixel Perfect UI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#services"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Services
          </Link>
          <Link
            href="#work"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Our Work
          </Link>
          <Link
            href="#pricing"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="#process"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Process
          </Link>
          <Link
            href="/blogs"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#contact"
            className="text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </Link>
          <Link
            href="https://webscraper.example.com"
            className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Web Scraping
            <ExternalLink className="h-3 w-3" />
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button className="hidden md:flex">Get Started</Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md p-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <Link
              href="#services"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="#work"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Work
            </Link>
            <Link
              href="#pricing"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#process"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Process
            </Link>
            <Link
              href="/blogs"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-foreground/80 hover:text-foreground transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="https://webscraper.example.com"
              className="text-foreground/80 hover:text-foreground transition-colors py-2 flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Web Scraping
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Button className="mt-2" onClick={() => setIsMobileMenuOpen(false)}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
