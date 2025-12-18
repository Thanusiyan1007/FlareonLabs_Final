import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import logoFrame from "../assets/logo_frame1.svg";

export default function LoaderCircle({ size = 110, text = "100% · Unique Designs · 100% . Client Satisfaction ·" }) {
  const svgRef = useRef(null);
  const idRef = useRef(`circlePath-${Math.random().toString(36).slice(2)}`);
  const id = idRef.current;
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
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-zinc-950 z-[9999]">
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
          src={logoFrame}
          alt="Center Icon"
          title="Center Icon"
          className="absolute top-1/2 left-1/2 w-10 h-10 md:w-12 md:h-12 object-contain transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </div>
  );
}
