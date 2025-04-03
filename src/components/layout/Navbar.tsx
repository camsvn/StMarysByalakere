
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem = ({ to, children, onClick }: NavItemProps) => (
  <li>
    <Link to={to} className="nav-link" onClick={onClick}>
      {children}
    </Link>
  </li>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary"
          >
            <span className="animate-float inline-block">🕊️</span>
            <span>St. Mary's</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-6">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/mass-services">Mass & Services</NavItem>
            <NavItem to="/events">Events</NavItem>
            <NavItem to="/ministries">Ministries</NavItem>
            <NavItem to="/gallery">Gallery</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md animate-fade-in py-4">
            <ul className="flex flex-col space-y-4 px-4">
              <NavItem to="/" onClick={closeMenu}>Home</NavItem>
              <NavItem to="/about" onClick={closeMenu}>About Us</NavItem>
              <NavItem to="/mass-services" onClick={closeMenu}>Mass & Services</NavItem>
              <NavItem to="/events" onClick={closeMenu}>Events</NavItem>
              <NavItem to="/ministries" onClick={closeMenu}>Ministries</NavItem>
              <NavItem to="/gallery" onClick={closeMenu}>Gallery</NavItem>
              <NavItem to="/contact" onClick={closeMenu}>Contact</NavItem>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
