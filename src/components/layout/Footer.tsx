
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Church Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">St Mary’s Church Byalakere</h3>
            <ul className="space-y-2">
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
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">About Us</Link>
              </li>
              <li>
                <Link to="/mass-services" className="hover:underline">Mass Schedule</Link>
              </li>
              <li>
                <Link to="/events" className="hover:underline">Events & Announcements</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
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
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 mt-6 text-center text-sm">
          <p>
            &copy; {currentYear} St. Mary's Church Byalakere. All rights reserved. 
            <br />
            Maintained by <a className="underline" href="https://www.decare.team/">DeCare Software</a>, designed with <a className="underline" href="https://lovable.dev/">Lovable</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
