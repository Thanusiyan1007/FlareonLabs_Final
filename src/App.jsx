import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Works from "./components/Works";
import Pricing from "./components/Pricing";
import ContactAndFooter from "./components/ContactAndFooter";
import Chatbot from "./components/Chatbot";
import LoaderCircle from "./components/LoaderCircle.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const mainRef = useRef(null);

  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const worksRef = useRef(null);
  const pricingRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    // simulate loading (or wait for images/assets)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const ctx = gsap.context(() => {
        gsap.from(mainRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });
        gsap.from(heroRef.current, { opacity: 0, y: 80, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: heroRef.current, start: "top 85%" } });
        gsap.from(aboutRef.current, { opacity: 0, x: -100, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: aboutRef.current, start: "top 85%" } });
        gsap.from(servicesRef.current, { opacity: 0, x: 100, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: servicesRef.current, start: "top 85%" } });
        gsap.from(worksRef.current, { opacity: 0, scale: 0.9, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: worksRef.current, start: "top 85%" } });
        gsap.from(pricingRef.current, { opacity: 0, y: 80, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: pricingRef.current, start: "top 85%" } });
        gsap.from(contactRef.current, { opacity: 0, y: 60, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: contactRef.current, start: "top 90%" } });
      }, mainRef);

      return () => ctx.revert();
    }
  }, [loading]);

  return (
    <>
      {loading && <LoaderCircle />} {/* Show CircleBadge as loader */}
      {!loading && (
        <div ref={mainRef} className="bg-transparent">
          <Navbar />
          <section id="home">
            <div ref={heroRef}><Hero /></div>
            <div ref={aboutRef}><About /></div>
            <div ref={servicesRef}><Services /></div>
            <div ref={worksRef}><Works /></div>
            <div ref={pricingRef}><Pricing /></div>
            <div ref={contactRef}><ContactAndFooter /></div>
          </section>
          <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 50 }}>
            <Chatbot />
          </div>
        </div>
      )}
    </>
  );
}
