// TestimonialsHeader.tsx (tidak berubah, tetap seperti ini)
function TestimonialsHeader() {
  return (
    <div className="text-center mb-12"> {/* ubah dari mb-16 ke mb-12 agar lebih hemat ruang */}
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
        <span className="block bg-linear-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] bg-clip-text text-transparent animate-gradient-x">
          Testimonials
        </span>
      </h2>
      <p className="text-xl text-[#ffffea]/70 max-w-2xl mx-auto">
        What clients and colleagues say about working with me
      </p>
    </div>
  );
}

export default TestimonialsHeader;