import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// initialize EmailJS once (use your public key)
const SERVICE_ID = "service_pc25lwk";
const TEMPLATE_ID = "template_qisgmmi";
const PUBLIC_KEY = "Xj1ny2pSYZZRkRCWc";
emailjs.init(PUBLIC_KEY);

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$199",
      duration: "One-time Project",
      description: "Perfect for small businesses starting their digital journey.",
    },
    {
      name: "Professional",
      price: "$599",
      duration: "Full Brand Package",
      popular: true,
      description: "Ideal for brands needing design, web, and marketing synergy.",
    },
    {
      name: "Enterprise",
      price: "Custom",
      duration: "Tailored for Large Projects",
      description: "Advanced strategy and design for enterprise-level clients.",
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [formSent, setFormSent] = useState(null); // null | "success" | "error"
  const [sending, setSending] = useState(false);
  const formRef = useRef();
  const [selectedPlan, setSelectedPlan] = useState("");
  const openModal = (planName) => {
    setSelectedPlan(planName);
    setFormSent(null);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current)
      .then(
        () => {
          setFormSent("success");
          setSending(false);
          formRef.current.reset();
          // close modal after short delay
          setTimeout(() => setShowModal(false), 1200);
        },
        (err) => {
          console.error("EmailJS error:", err);
          setFormSent("error");
          setSending(false);
        }
      );
  };

  return (
    <section className="py-4 bg-white" id="pricing">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="font-extrabold font-poppins text-3xl md:text-4xl sm:text-4xl text-gray-900 mb-4">
            Our <span className="text-[#FFA500]">Pricing</span>
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm md:text-base max-w-2xl mx-auto font-syne">
            Flexible digital solutions for every stage of your brand’s journey.{" "}
            <br />{" "}
            <div className="text-[#FFA500]">
              Choose your perfect plan today
            </div>
          </p>
        </div>

        {/* Pricing Cards - Minimal Enhancement */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-10 ">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col mx-auto w-full max-w-sm rounded-xl border transition-all duration-300 p-8 group ${
                plan.popular
                  ? "bg-white border-[#FFA500] shadow-lg scale-105"
                  : "bg-white border-gray-200 hover:border-[#FFA500] hover:shadow-md"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[#FFA500] text-white px-4 py-1 rounded-full text-sm font-semibold font-syne shadow-lg">
                    Popular
                  </span>
                </div>
              )}

              {/* Card Content */}
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="mb-4 font-poppins">
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      plan.popular ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed font-syne ${
                      plan.popular ? "text-gray-600" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price Section */}
                <div className="mb-8 flex flex-col font-poppins">
                  <span
                    className={`text-5xl font-extrabold mb-2  ${
                      plan.popular ? "text-gray-900" : "text-gray-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-lg ${
                      plan.popular ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    {plan.duration}
                  </span>
                </div>

                {/* Features List */}
                <div className="mb-4 flex-1 space-y-3 font-poppins">
                  {plan.name === "Starter" && (
                    <>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Basic Design</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">1 Revision</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">3 Day Delivery</span>
                      </div>
                    </>
                  )}
                  {plan.name === "Professional" && (
                    <>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Premium Design</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Unlimited Revisions</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Brand Strategy</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">7 Day Delivery</span>
                      </div>
                    </>
                  )}
                  {plan.name === "Enterprise" && (
                    <>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Custom Solutions</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Dedicated Team</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">24/7 Support</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="w-2 h-2 bg-[#FFA500] rounded-full mr-3"></span>
                        <span className="text-gray-600">Flexible Timeline</span>
                      </div>
                    </>
                  )}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => openModal(plan.name)}
                  className={`py-3 px-6 rounded-lg font-semibold text-base transition-all duration-300 w-full font-syne ${
                    plan.popular
                      ? "bg-[#FFA500] text-white hover:bg-orange-600"
                      : "bg-orange-50 text-[#FFA500] hover:bg-[#FFA500] hover:text-white"
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-lg max-w-lg w-full p-6 relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
              aria-label="Close"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-2">
              Get Started — {selectedPlan}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Fill details and submit. You will receive confirmation after
              submission.
            </p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-3">
              <input type="hidden" name="plan" value={selectedPlan} />
              <div>
                <label className="text-xs text-gray-700">Full name</label>
                <input
                  name="user_name"
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs text-gray-700">Email</label>
                <input
                  name="user_email"
                  type="email"
                  required
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="text-xs text-gray-700">
                  Project details / Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="mt-1 w-full border rounded px-3 py-2"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#FFA500] text-white px-4 py-2 rounded font-semibold"
                >
                  {sending ? "Sending..." : "Send"}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded border"
                >
                  Cancel
                </button>
                {formSent === "success" && (
                  <span className="text-green-600 text-sm">
                    Sent — check your email.
                  </span>
                )}
                {formSent === "error" && (
                  <span className="text-red-600 text-sm">
                    Failed to send. Try again.
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}