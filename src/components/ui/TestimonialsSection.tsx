const testimonials = [
  {
    name: "Niraj Bhattarai",
    university: "University of West of Scotland",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal -> UK",
    text: "From university selection to visa approval, Admizz Education provided exceptional support and made my journey to the UK effortless. I highly recommend them to anyone looking for a trustworthy study abroad partner.",
    rating: 5,
  },
  {
    name: "Yousuf Abdirahman Mohamed",
    university: "Kalinga Institute of Industrial Technology",
    originFlag: "so",
    destFlag: "in",
    route: "Somalia -> India",
    text: "I appreciated your unlimited help for my MBA career. It was very tough but I gained a very solid educational background. Thanks Admizz!",
    rating: 5,
  },
  {
    name: "Basant Khadka",
    university: "Weber State University",
    originFlag: "np",
    destFlag: "us",
    route: "Nepal -> USA",
    text: "The journey to college can be overwhelming, but Admizz Education made applying to Weber State University effortless. Thanks to their guidance.",
    rating: 5,
  },
  {
    name: "Satyam Jaiswal",
    university: "University of Greenwich",
    originFlag: "np",
    destFlag: "gb",
    route: "Nepal -> UK",
    text: "Admizz Education made my dream of studying in the UK a reality with their expert guidance and seamless support. Their team ensured every step of my application visa process was smooth and stress-free.",
    rating: 5,
  },
];

function toEmoji(code: string) {
  return [...code.toUpperCase()].map((c) => String.fromCodePoint(c.charCodeAt(0) + 127397)).join("");
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-yellow" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({
  name,
  text,
  rating,
  university,
  originFlag,
  destFlag,
  route,
}: {
  name: string;
  text: string;
  rating: number;
  university?: string;
  originFlag?: string;
  destFlag?: string;
  route?: string;
}) {
  return (
    <div className="bg-white rounded-[30px] p-2 shadow-sm">
      <div className="bg-[#F8F8F8] rounded-[30px] p-6">
        <Stars count={rating} />
        <p className="mt-3 text-sm text-gray-dark leading-relaxed">
          &ldquo;{text}&rdquo;
        </p>
        <div className="mt-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-royal/10 flex items-center justify-center text-sm font-bold text-blue-royal shrink-0">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-[15px] font-bold text-[#0D1282]">{name}</p>
            {university && (
              <p className="text-[13px] text-gray-dark leading-snug">{university}</p>
            )}
            {route && (
              <div className="flex items-center gap-1.5 mt-0.5">
                {originFlag && (
                  <span className="text-sm leading-none">{toEmoji(originFlag)}</span>
                )}
                <span className="text-[13px] text-gray-dark">{route}</span>
                {destFlag && (
                  <span className="text-sm leading-none">{toEmoji(destFlag)}</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          className="text-2xl md:text-[30px] font-bold text-[#0D1282] mb-3"
          style={{ fontFamily: "var(--font-rubik), sans-serif" }}
        >
          Our Success Stories &amp; Testimonials
        </h2>
        <p className="text-sm md:text-base text-gray-dark mb-10 leading-relaxed">
          Hear from our satisfied students and partners who have achieved great
          success through our expert guidance, personalized support, and
          comprehensive services in navigating their academic and career goals.
        </p>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {/* Left column — 2 cards stacked */}
          <div className="flex flex-col gap-6">
            {testimonials.slice(0, 2).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>

          {/* Center — YouTube video + quote */}
          <div className="flex flex-col items-center gap-5">
            <span className="inline-flex items-center gap-2 border border-[#949494] rounded-full py-3 px-7 text-base font-medium text-black">
              <span className="w-2 h-2 rounded-full bg-black" />
              Student
            </span>
            <div className="bg-white rounded-[30px] p-2 w-full">
              <div className="bg-[#F8F8F8] rounded-[30px] overflow-hidden">
                <div className="relative w-full" style={{ paddingBottom: "130%" }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube.com/embed/AW3Zmubc-tU"
                    title="Ashok Upreti - Student Testimonial"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
            <div className="text-center px-2">
              <p className="text-base font-bold text-[#0D1282]">Ashok Upreti</p>
              <p className="mt-2 text-sm text-gray-dark leading-relaxed">
                &ldquo;Admizz Education&apos;s dedicated team guided me through
                every challenge, ensuring I secured admission to my dream
                university. Their professional and personalized approach made the
                entire process smooth and hassle-free.&rdquo;
              </p>
            </div>
          </div>

          {/* Right column — 2 cards stacked */}
          <div className="flex flex-col gap-6">
            {testimonials.slice(2, 4).map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
