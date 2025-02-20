import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Menu } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

export function MainNav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    {
      href: "/",
      label: "Home",
      active: location.pathname === "/",
    },
    {
      href: "/gallery",
      label: "Gallery",
      active: location.pathname === "/gallery",
    },
    {
      href: "/blog",
      label: "Blog",
      active: location.pathname === "/blog",
    },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-6">
        <Link to="/" className="font-semibold text-lg whitespace-nowrap">
          PixelPerfectUI
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-primary" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1 max-w-sm mx-4 hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input className="pl-9 w-full" placeholder="Search designs..." />
      </div>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b md:hidden p-4">
          <nav className="flex flex-col space-y-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2",
                  route.active ? "text-primary" : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input className="pl-9 w-full" placeholder="Search designs..." />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
