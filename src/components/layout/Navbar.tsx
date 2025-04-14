"use client"

import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMember } from "@/contexts/MemberContext";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavItem = ({ to, children, onClick }: NavItemProps) => (
  <li>
    <Link href={to} className="nav-link" onClick={onClick}>
      {children}
    </Link>
  </li>
);

const Navbar = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useMember();
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
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary"
          >
            <span className="animate-float inline-block">🕊️</span>
            <span>St. Mary&apos;s</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-4">
            <NavItem to="/">{t("navHome")}</NavItem>
            <NavItem to="/about">{t("navAbout")}</NavItem>
            <NavItem to="/mass-services">{t("navMass")}</NavItem>
            <NavItem to="/events">{t("navEvents")}</NavItem>
            <NavItem to="/pious-associations">{t("navMinistries")}</NavItem>
            <NavItem to="/gallery">{t("navGallery")}</NavItem>
            <NavItem to="/contact">{t("navContact")}</NavItem>
          </ul>

          {/* Action buttons and language selector */}
          <div className="hidden md:flex items-center space-x-2">
            <LanguageSelector />
            {/* <Link to="/donate">
              <Button variant="outline" size="sm">{t("navDonate")}</Button>
            </Link>
            <Link to={isAuthenticated ? "/member-portal" : "/login"}>
              <Button size="sm">{isAuthenticated ? "My Account" : t("navLogin")}</Button>
            </Link> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSelector />
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
              <NavItem to="/" onClick={closeMenu}>{t("navHome")}</NavItem>
              <NavItem to="/about" onClick={closeMenu}>{t("navAbout")}</NavItem>
              <NavItem to="/mass-services" onClick={closeMenu}>{t("navMass")}</NavItem>
              <NavItem to="/events" onClick={closeMenu}>{t("navEvents")}</NavItem>
              <NavItem to="/pious-associations" onClick={closeMenu}>{t("navMinistries")}</NavItem>
              <NavItem to="/gallery" onClick={closeMenu}>{t("navGallery")}</NavItem>
              <NavItem to="/contact" onClick={closeMenu}>{t("navContact")}</NavItem>
              {/* <NavItem to="/donate" onClick={closeMenu}>{t("navDonate")}</NavItem> */}
              {/* <NavItem to={isAuthenticated ? "/member-portal" : "/login"} onClick={closeMenu}>
                {isAuthenticated ? "My Account" : t("navLogin")}
              </NavItem> */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
