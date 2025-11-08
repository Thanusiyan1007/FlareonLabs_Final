import { useState } from "react";
import ryziteImg from "../assets/logop1.png";
import webImg1 from "../assets/12.png";

export default function OurWorksStatic() {
  const [activeCategory, setActiveCategory] = useState("Branding & Identity");
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      category: "Branding & Identity",
      title: "Ryzite Logo Redesign",
      image: ryziteImg,
      description:
        "We redesigned the Ryzite logo to create a modern, clean, and memorable brand identity.",
      subDescription:
        "The new design reflects Ryzite's innovative spirit and helps the brand stand out in a competitive market.",
    },
    {
      category: "Web Design & Development",
      title: "Web Project",
      image: webImg1,
      description:
        "A modern web development project showcasing our expertise.",
      subDescription: "Built with the latest technologies and best practices.",
    },
  ];

  const filteredProjects = projects.filter(
    (project) => activeCategory === project.category
  );

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + 1 >= filteredProjects.length ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? filteredProjects.length - 1 : prev - 1
    );
  };

  const categories = [
    "Branding & Identity",
    "Web Design & Development",
    "Digital Strategy",
  ];

  return (
    <section
      id="works"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 font-syne text-gray-800"
    >
      {/* Title Section */}
      <div className="text-center px-2">
        <h2 className="text-3xl md:text-4xl font-extrabold font-poppins">
          Our <span className="text-[#FFA500]">Works</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Our works are all about turning ideas into visuals that connect with people.
        </p>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setCurrentIndex(0);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-lg border font-medium text-xs sm:text-sm transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#FFA500] border-[#FFA500] text-white shadow-lg shadow-orange-200"
                  : "border-gray-300 text-gray-600 hover:border-[#FFA500] hover:text-[#FFA500] hover:bg-orange-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Project Card */}
      <div className="relative w-full mt-10 flex justify-center items-center overflow-hidden">
        {/* Navigation Buttons */}
        <div className="absolute top-2 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={handlePrevious}
            className="p-2 rounded-md bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 shadow hover:bg-white active:scale-95 transition"
          >
            ↑
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-md bg-white/95 backdrop-blur-sm border border-gray-200 text-gray-700 shadow hover:bg-white active:scale-95 transition"
          >
            ↓
          </button>
        </div>

        {/* Project Card */}
        {filteredProjects.length > 0 && (
          <div
            className="shadow-xl p-5 sm:p-6 lg:p-8 rounded-2xl border border-gray-100 bg-white/90 backdrop-blur-md transition-all duration-300 w-full max-w-3xl"
          >
            <div className="flex flex-col lg:flex-row items-center gap-5 sm:gap-8">
              {/* Image Section */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-xl border border-gray-100">
                  <img
                    src={filteredProjects[currentIndex].image}
                    alt={filteredProjects[currentIndex].title}
                    className="w-full h-[240px] sm:h-[300px] object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="w-full lg:w-1/2 text-center lg:text-left space-y-3 sm:space-y-4">
                <span className="inline-block text-xs sm:text-sm font-semibold text-[#FFA500] bg-orange-50 px-3 py-1.5 rounded-lg">
                  {filteredProjects[currentIndex].category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {filteredProjects[currentIndex].title}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  {filteredProjects[currentIndex].description}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  {filteredProjects[currentIndex].subDescription}
                </p>

                <button className="inline-flex items-center justify-center gap-2 text-sm sm:text-base bg-[#FFA500] hover:bg-[#ff9900] text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition-all font-semibold hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                  View Work
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {filteredProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-[#FFA500] w-6" : "bg-gray-300 w-2"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
}
