
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Church } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-10">
          {/* Church Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Our Parish</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Church className="mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>St. Mary's Church, Byalakere</span>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Diocese of Mandya</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 flex-shrink-0" />
                <a href="tel:+11234567890" className="transition hover:text-accent hover:underline">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 flex-shrink-0" />
                <a href="mailto:info@stmaryschurch.org" className="transition hover:text-accent hover:underline">
                  info@stmaryschurch.org
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">Quick Links</h3>
            <ul className="grid grid-cols-1 gap-y-2">
              <li>
                <Link to="/" className="transition hover:text-accent flex items-center">
                  <span className="mr-2">•</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="transition hover:text-accent flex items-center">
                  <span className="mr-2">•</span> About Us
                </Link>
              </li>
              <li>
                <Link to="/mass-services" className="transition hover:text-accent flex items-center">
                  <span className="mr-2">•</span> Mass Schedule
                </Link>
              </li>
              <li>
                <Link to="/events" className="transition hover:text-accent flex items-center">
                  <span className="mr-2">•</span> Events & Announcements
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-accent flex items-center">
                  <span className="mr-2">•</span> Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Vicar's Message */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4 border-b border-white/20 pb-2">From Our Vicar</h3>
            <p className="text-white/80 leading-relaxed italic">
              "A word from Fr. Vijoy Kallingal, ISch, guiding our parish with love and spiritual wisdom."
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/70">
          <p>
            &copy; {currentYear} St. Mary's Church, Byalakere. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <span className="mx-2">|</span>
            <Link to="/terms" className="hover:text-white">Terms of Use</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
