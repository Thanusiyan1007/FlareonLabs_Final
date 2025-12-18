// src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import logo from "../assets/logo.svg";

gsap.registerPlugin(ScrollToPlugin);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Our Works", href: "#works" },
    { name: "Pricing", href: "#pricing" },
  ];

  // FIXED: Works in JavaScript (no TypeScript!)
  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);

    setTimeout(() => {
      let target = document.querySelector(href);
      let attempts = 0;
      const maxAttempts = 15;

      const tryScroll = () => {
        target = document.querySelector(href);
        if (target) {
          gsap.to(window, {
            duration: 1.2,
            scrollTo: { y: target, offsetY: 90, autoKill: false },
            ease: "power2.out",
          });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 150);
        }
      };

      tryScroll();
    }, 350);
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/94717050289", "_blank");
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 font-syne transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? "bg-white/80 border-b border-gray-200 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="FlareonLabs Logo"
            title="FlareonLabs Logo"
            className="h-8 w-auto sm:h-10 cursor-pointer"
            onClick={(e) => handleSmoothScroll(e, "#home")}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 lg:space-x-10 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="hover:text-orange-500 transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <button
          onClick={openWhatsApp}
          className="hidden md:inline-block bg-[#FFA500] text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition-all shadow-md"
        >
          Let's Talk
        </button>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none z-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 overflow-hidden transition-all duration-400 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100 py-5" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <ul className="flex flex-col space-y-5 px-6 text-gray-700 font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="block py-2 hover:text-orange-500 transition-colors text-lg"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={openWhatsApp}
              className="w-full bg-[#FFA500] text-white py-3 rounded-2xl hover:bg-orange-600 transition-all font-semibold shadow-lg"
            >
              Let's Talk
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}