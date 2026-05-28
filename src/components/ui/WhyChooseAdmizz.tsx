export default function WhyChooseAdmizz() {
  return (
    <section
      className="py-12 px-5 text-white"
      style={{ background: "linear-gradient(135deg, #001353 0%, #0066cc 100%)" }}
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-[32px] font-bold text-center mb-2.5">
          Why Choose Admizz?
        </h2>
        <p className="text-center text-base text-white/80 mb-9">
          Unlike single-country consultancies, we offer:
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-[950px] mx-auto mb-8">
          {/* Card 1 */}
          <div className="bg-white/10 backdrop-blur-[10px] border border-white/15 rounded-[14px] p-6 text-center transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h3 className="text-[17px] font-bold mb-2.5">Multi-Destination Expertise</h3>
            <p className="text-sm text-white/85 leading-relaxed m-0">
              11+ countries, one consultancy. Not limited to single-country advice.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/10 backdrop-blur-[10px] border border-white/15 rounded-[14px] p-6 text-center transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </svg>
            </div>
            <h3 className="text-[17px] font-bold mb-2.5">Switch Without Losing Time</h3>
            <p className="text-sm text-white/85 leading-relaxed m-0">
              Change your destination and keep your intake timeline intact.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/10 backdrop-blur-[10px] border border-white/15 rounded-[14px] p-6 text-center transition-all duration-300 hover:bg-white/15 hover:-translate-y-1">
            <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
              </svg>
            </div>
            <h3 className="text-[17px] font-bold mb-2.5">Transparent Guidance</h3>
            <p className="text-sm text-white/85 leading-relaxed m-0">
              Real talk on visa strength, finances &amp; realistic backup options.
            </p>
          </div>
        </div>

        {/* Trust Bar */}
        <div className="flex justify-center items-center gap-4 flex-wrap text-sm text-white/90">
          <span>&#127942; ICEF Accredited</span>
          <span>&#8226;</span>
          <span>&#127891; 2,000+ Students Enrolled</span>
          <span>&#8226;</span>
          <span>&#127758; 50+ Partner Universities</span>
        </div>
      </div>
    </section>
  );
}
