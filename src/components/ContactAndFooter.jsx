import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import {
  PhoneIcon,
  LinkIcon,
  StarIcon,
  GlobeAltIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

export default function ContactAndFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const serviceId = "service_pc25lwk";
    const templateId = "template_hq6efha";
    const publicKey = "Xj1ny2pSYZZRkRCWc";

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      alert("Thanks for contacting FlareonLabs! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      alert("Oops! Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-sm text-gray-800">
      {/* CONTACT SECTION */}
      <section id="contact" className="w-full py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-poppins">
              Contact <span className="text-[#FFA500]">FlareonLabs</span>
            </h2>
            <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600 max-w-3xl mx-auto leading-relaxed font-syne">
              Whether you’re looking to create your next logo, build a brand,
              design a modern UI/UX experience, or plan a social media campaign
              — FlareonLabs is ready to bring your vision to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* MAP */}
            <div className="h-full">
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-300 bg-white/40 backdrop-blur-sm">
                <iframe
                  title="FlareonLabs Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63320.88709009499!2d79.81500584863279!3d6.927078616306816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25960c8fbe5a3%3A0x2e3a8e18f0a7a443!2sColombo!5e0!3m2!1sen!2slk!4v1689378246484!5m2!1sen!2slk"
                  className="w-full h-[450px] border-0"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* CONTACT FORM */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl border border-gray-300 p-5 lg:p-6 h-[450px]">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 mb-3 font-poppins">
                  Let's Talk About Your Project
                </h3>
                <p className="text-gray-600 font-syne text-sm">
                  Fill out the form below and we'll get back to you within 24
                  hours.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-xs font-medium text-gray-700 mb-3 font-poppins"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500] outline-none transition-all duration-300 text-sm font-syne bg-white/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-3 font-poppins"
                  >
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500] outline-none transition-all duration-300 text-sm font-syne bg-white/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-medium text-gray-700 mb-3 font-poppins"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFA500] focus:border-[#FFA500] outline-none transition-all duration-300 resize-none text-sm font-syne bg-white/60"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFA500] text-white py-3 px-4 rounded-lg font-medium text-sm transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-poppins"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1A1A1A] text-white font-syne">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
          {/* Top section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 mb-10">
            {/* Brand Info */}
            <div className="text-center md:text-left space-y-3">
              <h3 className="text-2xl font-bold font-poppins tracking-tight">
                <span className="text-[#FFA500]">Flareon</span>Labs
              </h3>
              <p className="text-gray-400 text-sm max-w-xs mx-auto md:mx-0 leading-relaxed">
                Creating digital experiences that inspire and empower brands
                worldwide.
              </p>

              {/* WhatsApp Click */}
              <a
                href="https://wa.me/94717050289"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-poppins text-gray-300 hover:text-[#FFA500] transition-all duration-300 text-sm font-medium"
              >
                <PhoneIcon className="w-4 h-4" />
                +94 71 705 0289
              </a>
            </div>

            {/* Navigation & Social Links */}
            <div className="flex flex-col sm:flex-row sm:justify-center md:justify-start gap-6 text-center md:text-left">
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  Quick Links
                </h4>
                <ul className="space-y-2">
                  {[
                    { name: "Home", href: "#home" },
                    { name: "About Us", href: "#about" },
                    { name: "Services", href: "#services" },
                    { name: "Our Works", href: "#works" },
                    { name: "Contact", href: "#contact" },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#FFA500] transition-colors text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                  Connect
                </h4>
                <div className="flex justify-center md:justify-start space-x-4">
                  {[
                    {
                      icon: <LinkIcon className="w-5 h-5" />,
                      href: "https://www.linkedin.com/company/flareon-labs",
                    },
                    {
                      icon: <StarIcon className="w-5 h-5" />,
                      href: "https://www.instagram.com/flareonlabs",
                    },
                    {
                      icon: <GlobeAltIcon className="w-5 h-5" />,
                      href: "https://flareonlabs.com",
                    },
                    {
                      icon: <HeartIcon className="w-5 h-5" />,
                      href: "https://www.behance.net/flareonlabs",
                    },
                  ].map(({ icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-white/10 hover:bg-[#FFA500]/10 hover:text-[#FFA500] transition-all duration-300"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-700/40 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="text-gray-400 text-sm order-2 sm:order-1">
              © 2025 FlareonLabs. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 order-1 sm:order-2 font-light">
              Crafted with by{" "}
              <span className="text-[#FFA500] font-medium">FlareonLabs</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
