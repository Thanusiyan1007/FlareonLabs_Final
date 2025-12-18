import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import brandingImg from "../assets/branding.jpg";
import webImg from "../assets/webdesign.jpg";
import strategyImg from "../assets/strategy.jpeg";
import book from "../assets/book.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const cardsRef = useRef([]);

  const cards = [
    {
      title: "Branding & Identity",
      img: brandingImg,
      imgAlt: "FlareonLabs Branding & Identity Visual",
      imgTitle: "Branding & Identity",
      desc: `Your brand is more than just a logo — it's your story. We design a visual identity that communicates your purpose and connects with your audience.`,
      tags: ["Logo Design", "Color Strategy", "Typography", "Brand Guidelines"],
    },
    {
      title: "Web Design & Development",
      img: webImg,
      imgAlt: "FlareonLabs Web Design & Development",
      imgTitle: "Web Design & Development",
      desc: `We build sleek, modern, and responsive websites using React & Tailwind CSS. Designs are aesthetic, functional, and lightning‑fast.`,
      tags: ["UI/UX Design", "Development", "Tailwind CSS", "API Integration"],
    },
    {
      title: "Digital Strategy",
      img: strategyImg,
      imgAlt: "FlareonLabs Digital Strategy Services",
      imgTitle: "Digital Strategy",
      desc: `We craft marketing strategies powered by creativity and data, keeping your brand visible, consistent, and ahead of competition.`,
      tags: ["Content Creation", "SM Management", "Advertising", "Consulting"],
    },
  ];

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

      // Title fade-up
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
      gsap.from(paraRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.4,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paraRef.current,
          start: "top 85%",
        },
      });

      // Cards slide-in with stagger
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="max-w-7xl mx-auto px-5 pb-12 md:px-8 font-syne text-gray-800"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2
          ref={titleRef}
          className="text-3xl md:text-4xl font-extrabold font-poppins"
        >
          Our <span className="text-[#FFA500]">Services</span>
        </h2>
        <p
          ref={paraRef}
          className="mt-4 text-sm sm:text-base max-w-2xl mx-auto text-gray-600 leading-relaxed font-syne"
        >
          At FlareonLabs, we turn ideas into digital experiences that inspire.
          Our team blends creativity, technology, and strategy to help brands
          grow, connect, and stand out online.
        </p>
      </div>

      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        ref={(el) => (cardsRef.current = el ? Array.from(el.children) : [])}
      >
        {cards.map(({ title, img, desc, tags }) => (
          <div
            key={title}
            className="border border-gray-200 rounded-2xl p-6 flex flex-col items-start bg-white text-left min-h-[500px]"
          >
            <img
              src={img}
              alt={title}
              className="rounded-xl w-full h-56 object-cover mb-6"
            />
            <h3 className="text-lg md:text-xl font-semibold text-[#FFA500] font-poppins">
              {title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mt-3">{desc}</p>

            <div className="grid grid-cols-2 gap-2 mt-auto pt-4 w-full">
              {tags.map((t) => (
                <span
                  key={t}
                  className="text-[12px] md:text-sm border border-gray-300 rounded-lg px-3 py-1 bg-gray-50 text-center"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
