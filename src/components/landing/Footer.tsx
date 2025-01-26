import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">LinkUp</h2>
            <p className="text-gray-300">Connecting people, one link at a time.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-6 w-6 text-gray-400 transition-colors hover:text-white" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 transition-colors hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-gray-300 transition-colors hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 transition-colors hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-gray-300 transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 transition-colors hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-4 text-gray-300">Stay updated with our latest features and news.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow rounded-l-md bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="rounded-r-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                aria-label="Subscribe to newsletter"
              >
                <Mail className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} LinkUp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
