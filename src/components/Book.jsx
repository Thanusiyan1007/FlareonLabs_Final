import { useNavigate } from "react-router-dom";

export default function Book() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800 font-syne px-5">
      <h1 className="text-3xl md:text-4xl font-bold text-[#FFA500] mb-4">
        Book Your Service
      </h1>
      <p className="max-w-lg text-center text-gray-600 mb-8">
        Please fill out your details or contact us to confirm your booking.
      </p>

      {/* Simple back button */}
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-[#FFA500] text-white rounded-lg hover:bg-[#e69500] transition duration-300 font-semibold"
      >
        ← Back to Services
      </button>
    </section>
  );
}