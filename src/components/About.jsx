import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import logoFrame from "../assets/logo_frame.svg";

gsap.registerPlugin(ScrollTrigger);

// Hook: element in view
function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

// Hook: count-up animation
function useCountUp(target = 0, start = false, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTs = 0;
    const step = (ts) => {
      if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      setVal(Math.round(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

// Circular badge
function CircleBadge({
  size = 150,
  text = "100% · Unique Designs · 100% · Client Satisfaction ·",
  imageSrc = "/logo.png",
}) {
  const idRef = useRef(`circlePath-${Math.random().toString(36).slice(2)}`);
  const id = idRef.current;
  const svgRef = useRef(null);
  const r = (size - 20) / 2;

  useEffect(() => {
    if (svgRef.current) {
      gsap.to(svgRef.current, {
        rotation: 360,
        repeat: -1,
        ease: "none",
        duration: 12,
        transformOrigin: "50% 50%",
      });
    }
  }, []);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <defs>
          <path
            id={id}
            d={`M ${size / 2},${size / 2} m -${r},0 
            a ${r},${r} 0 1,1 ${r * 2},0 
            a ${r},${r} 0 1,1 -${r * 2},0`}
          />
        </defs>
        <text fill="#6B7280" fontSize="10" letterSpacing="1" fontWeight="500">
          <textPath href={`#${id}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      <img
        src={imageSrc}
        alt="Center Icon"
        title="Center Icon"
        className="absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 object-contain transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

// Stat chip
function StatChip({ value, label, startCount = false }) {
  const num = useCountUp(value, startCount, 1000);
  return (
    <div className="w-[200px] sm:w-[230px] h-[70px] flex flex-col items-center justify-center rounded-lg bg-[#FFA500] text-black shadow-sm scale-0 opacity-0 stat-chip">
      <div className="text-2xl sm:text-3xl font-extrabold">{num}+</div>
      <div className="text-sm font-medium text-center leading-tight px-2">
        {label}
      </div>
    </div>
  );
}

// MAIN SECTION
export default function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const cardsRef = useRef([]);
  const inView = useInView(sectionRef, 0.25);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade-in
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
        },
      });

      // Paragraph fade-up
      gsap.from(paragraphRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
        },
      });

      // Cards slide-in
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 60,
        stagger: 0.2,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 85%",
        },
      });

      // Stat chips bounce scale
      gsap.to(".stat-chip", {
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".stat-chip",
          start: "top 90%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="max-w-7xl mx-auto px-5 md:px-8  pb-10"
    >
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-extrabold tracking-tight font-poppins"
        >
          About <span className="text-[#FFA500]">FlareonLabs</span>
        </h2>
        <p
          ref={paragraphRef}
          className="mt-4 max-w-3xl mx-auto text-gray-600 font-syne text-sm md:text-base leading-relaxed"
        >
          At FlareonLabs, we help businesses, startups, and creators bring their
          ideas to life through beautiful and easy-to-use digital experiences.
          Our team blends creativity, smart strategy, and modern technology to
          design work that doesn’t just look amazing — it works perfectly and
          feels effortless to use.
        </p>
      </div>

      {/* Stats Section */}
      <div className="relative flex flex-col items-center justify-center mt-4 mb-4">
        <StatChip
          value={5}
          label="Years of Team Experience"
          startCount={inView}
        />

        {/* Circle + chips */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 mt-10">
          {/* Left chip */}
          <div className="order-2 md:order-1 flex flex-col items-center gap-4">
            <StatChip value={3} label="Projects Completed" startCount={inView} />
          </div>

          {/* Circle badge */}
          <div className="order-1 md:order-2">
            <CircleBadge
              size={110}
              text="100% · Unique Designs · 100% · Client Satisfaction ·"
              imageSrc={logoFrame} // ✅ Corrected here
            />
          </div>

          {/* Right chip */}
          <div className="order-3 md:order-3 flex flex-col items-center gap-4">
            <StatChip value={5} label="Happy Partners Grown with Us" startCount={inView} />
          </div>
        </div>
      </div>

      {/* Vision / Mission / Promise */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 font-poppins"
        ref={(el) => (cardsRef.current = el ? Array.from(el.children) : [])}
      >
        {/* Card 1 */}
        <div className="rounded-2xl border border-gray-300 p-6 text-center md:text-left bg-white/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center">
              <img src={icon1} alt="Vision Icon" title="Vision Icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-0">
              Our Vision
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-syne text-sm md:text-base">
            To bring creativity and innovation together, shaping digital
            experiences that help brands stand out and connect with people in
            meaningful ways.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-2xl border border-gray-300 p-6 text-center md:text-left bg-white/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center">
              <img src={icon2} alt="Mission Icon" title="Mission Icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-0">
              Our Mission
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-syne text-sm md:text-base">
            To design unique digital solutions that are smart, simple, and
            powerful — helping businesses and creators grow through creativity
            and technology.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-2xl border border-gray-300 p-6 text-center md:text-left bg-white/40 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
            <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center">
              <img src={icon3} alt="Promise Icon" title="Promise Icon" className="w-6 h-6" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold mt-2 md:mt-0">
              Our Promise
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed font-syne text-sm md:text-base">
            We focus on every detail to deliver designs that are one-of-a-kind,
            high in quality, and crafted to make our clients truly happy.
          </p>
        </div>
      </div>
    </section>
  );
}
