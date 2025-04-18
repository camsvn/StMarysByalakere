
import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Church } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata", year: "numeric" });

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Our Parish</h3>
            <ul className="space-y-3">
            <li className="flex items-start">
                <Church className="mr-2 h-5 w-5 min-w-5 mt-0.5 flex-shrink-0" />
                <span>St. Mary&apos;s Church, Byalakere</span>
              </li>
              <li className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 min-w-5" />
                <span>Thrithwa Elizebeth Mane, No.170/1, Kalathamana Halli, Byalakere Village, Shivakote Post, Bangalore - 560 089</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                <a href="tel:+919553873361" className="hover:underline">
                +91 9553873361
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                <a href="mailto:smcparishb@gmail.com" className="hover:underline">
                smcparishb@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/mass-services" className="hover:underline">Mass Schedule</Link>
              </li>
              <li>
                <Link href="/events" className="hover:underline">Events & Announcements</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Our Prayer */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Our Prayer</h3>
            <p className="text-white/80 leading-relaxed italic">{t("ourPrayer")}</p>
          </div>

          {/* Connect With Us */}
          {/* <div>
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="hover:text-accent transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            </div>
            <p>Subscribe to our newsletter for updates on events and announcements.</p>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 mt-6 text-center text-sm text-white/70">
          <p>
            &copy; {currentYear} St. Mary&apos;s Church Byalakere. All rights reserved. 
            <br />
            Maintained by <a className="underline hover:text-white" href="https://www.decare.team/">DeCare Software</a>, designed with <a className="underline hover:text-white" href="https://lovable.dev/">Lovable</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
