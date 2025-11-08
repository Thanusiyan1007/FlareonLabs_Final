import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Pricing from "./components/Pricing";
import ContactAndFooter from "./components/ContactAndFooter";
import Chatbot from "./components/Chatbot"; // 👈 import your chatbot

// Register ScrollTrigger plugin for GSAP
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const mainRef = useRef(null);

  // Section references
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const worksRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page initial fade-in
      gsap.from(mainRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      // Hero section
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 85%",
        },
      });

      // About section
      gsap.from(aboutRef.current, {
        opacity: 0,
        x: -100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
        },
      });

      // Services section
      gsap.from(servicesRef.current, {
        opacity: 0,
        x: 100,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: servicesRef.current,
          start: "top 85%",
        },
      });

      // Works section
      gsap.from(worksRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: worksRef.current,
          start: "top 85%",
        },
      });

      // Pricing section
      gsap.from(pricingRef.current, {
        opacity: 0,
        y: 80,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: pricingRef.current,
          start: "top 85%",
        },
      });

      // Contact section
      gsap.from(contactRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 90%",
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-transparent">
      <Navbar />

      {/* Page Sections */}
      <section id="home">
        <div ref={heroRef}>
          <Hero />
        </div>
        <div ref={aboutRef}>
          <About />
        </div>
        <div ref={servicesRef}>
          <Services />
        </div>
        <div ref={worksRef}>
          <Works />
        </div>
        <div ref={pricingRef}>
          <Pricing />
        </div>
        <div ref={contactRef}>
          <ContactAndFooter />
        </div>
      </section>

      {/* Chatbot — fixed bottom-right corner */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 50,
        }}
      >
        <Chatbot />
      </div>
    </div>
  );
}