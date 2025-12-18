import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import hero4 from "../assets/hero4.jpg";
import hero5 from "../assets/hero5.jpg";

export default function Hero() {
  const words = ["FlareonLabs", "Innovation", "Futuristic Designs"];
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const speed = 120;

  const heroRef = useRef(null);
  const leftRef = useRef(null);
  const gridRef = useRef(null);
  const scrollBtnRef = useRef(null);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(leftRef.current.querySelectorAll(".fade-item"), {
        opacity: 0,
        y: 30,
        stagger: 0.25,
        duration: 0.8,
      }).from(
        gridRef.current.querySelectorAll("img"),
        {
          opacity: 0,
          scale: 0.9,
          y: 40,
          stagger: 0.15,
          duration: 0.8,
        },
        "+=0.2"
      );
    }, heroRef);

    gsap.to(scrollBtnRef.current, {
      y: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      duration: 1.5,
    });

    return () => ctx.revert();
  }, []);

  // Typewriter
  useEffect(() => {
    const word = words[index];
    if (!deleting && displayText.length < word.length) {
      const t = setTimeout(
        () => setDisplayText(word.slice(0, displayText.length + 1)),
        speed
      );
      return () => clearTimeout(t);
    } else if (deleting && displayText.length > 0) {
      const t = setTimeout(
        () => setDisplayText(word.slice(0, displayText.length - 1)),
        speed / 2
      );
      return () => clearTimeout(t);
    } else {
      if (!deleting) {
        const t = setTimeout(() => setDeleting(true), 1500);
        return () => clearTimeout(t);
      } else {
        setDeleting(false);
        setIndex((p) => (p + 1) % words.length);
      }
    }
  }, [displayText, deleting, index]);

  const handleScrollDown = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="flex flex-col lg:flex-row items-center justify-center max-w-7xl mx-auto px-6 pt-30  pb-36 relative"
    >
      {/* LEFT COLUMN */}
      <div
        ref={leftRef}
        className="w-full lg:w-[60%] text-center lg:text-left space-y-6 font-[Syne] lg:pr-8"
      >
        <button className="fade-item border border-dashed border-[#FFA500] text-[#FFA500] px-6 py-2 rounded-lg text-sm font-medium">
          Spark Your Vision with Us
        </button>

        <h1 className="fade-item text-3xl sm:text-4xl lg:text-6xl font-poppins font-extrabold leading-tight">
          Unlock <br />
          Creativity with <br />
          <span className="text-[#FFA500] border-r-2 border-[#FFA500] pr-1 animate-pulse">
            {displayText}
          </span>
        </h1>

        <p className="fade-item text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed text-[15px] sm:text-base">
          FlareonLabs is a creative studio crafting modern, user-focused digital
          experiences. We blend design, innovation, and strategy to help brands
          stand out with a futuristic touch. Every project we create is driven
          by passion, precision, and a spark of originality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
          {/* Scroll to Services section */}
          <button
            onClick={() => {
              const servicesSection = document.getElementById("services");
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="bg-black text-white px-6 py-3 rounded-lg font-syne font-medium hover:bg-gray-900 transition"
          >
            Explore Our Services
          </button>

          {/* Redirect to Google Form */}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc8wWXgLVX5Aw4NvPiGz7tDlRyT6-AMeHNuQLTndbNTeSNLGg/viewform?usp=sharing&ouid=106538584809014552424"
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-[#FFA500] text-[#FFA500] px-6 py-3 rounded-lg font-syne font-medium hover:bg-orange-50 transition text-center"
          >
            Book Service
          </a>
        </div>
      </div>

      {/* RIGHT COLUMN — BENTO GRID */}
      <div ref={gridRef} className="w-full lg:w-[40%] mt-12 lg:mt-0 space-y-4">
        <div className="grid grid-cols-[55%_41%] gap-4">
          <img
            src={hero1}
            alt="Creative work"
            title="Creative work"
            className="w-full h-[150px] rounded-xl object-cover"
          />
          <img
            src={hero2}
            alt="Digital art"
            title="Digital art"
            className="w-full h-[150px] rounded-xl object-cover"
          />
        </div>
        <img
          src={hero3}
          alt="Teamwork"
          title="Teamwork"
          className="w-full h-[150px] rounded-xl object-cover"
        />
        <div className="grid grid-cols-[20%_76%] gap-4">
          <img
            src={hero4}
            alt="Brand illustration"
            title="Brand illustration"
            className="w-full h-[150px] rounded-xl object-cover"
          />
          <img
            src={hero5}
            alt="Modern design"
            title="Modern design"
            className="w-full h-[150px] rounded-xl object-cover"
          />
        </div>
      </div>

      {/* CTA-STYLE SCROLL BUTTON (RIGHT SIDE) */}
      <div
        ref={scrollBtnRef}
        onClick={handleScrollDown}
        className="absolute bottom-10 right-10 z-20"
      >
        <button className="flex items-center gap-2 bg-[#FFA500] text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-orange-500 transition-all duration-300 group">
          Scroll Down
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 transform group-hover:translate-y-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
