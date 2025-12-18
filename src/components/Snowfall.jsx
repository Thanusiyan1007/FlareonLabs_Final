import React, { useEffect, useRef } from "react";

const Snowfall = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const numFlakes = 70; // increase for denser snowfall

    for (let i = 0; i < numFlakes; i++) {
      const flake = document.createElement("div");
      flake.textContent = "❄"; // snowflake character

      // Random size, opacity, speed, drift
      const size = 8 + Math.random() * 18; // px
      flake.style.fontSize = `${size}px`;
      flake.style.opacity = 0.3 + Math.random() * 0.7;
      flake.style.left = `${Math.random() * 100}%`;
      flake.style.top = `${-10 + Math.random() * 10}%`;
      const duration = 8 + Math.random() * 7; // 8-15s
      const delay = Math.random() * 5; // stagger start

      // Keyframes with slight horizontal drift
      flake.style.animation = `fall-drift ${duration}s linear ${delay}s infinite`;

      flake.className = "absolute select-none pointer-events-none text-white";

      container.appendChild(flake);
    }

    return () => {
      container.innerHTML = ""; // cleanup
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 overflow-hidden"
      />
      <style>{`
        @keyframes fall-drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(15px, 25vh) rotate(45deg); }
          50% { transform: translate(-10px, 50vh) rotate(90deg); }
          75% { transform: translate(10px, 75vh) rotate(135deg); }
          100% { transform: translate(0, 110vh) rotate(180deg); }
        }
      `}</style>
    </>
  );
};

export default Snowfall;
