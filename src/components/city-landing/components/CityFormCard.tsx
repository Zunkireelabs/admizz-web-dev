import CRMFormEmbed from "@/components/ui/CRMFormEmbed";

export default function CityFormCard() {
  return (
    <div
      className="rounded-[24px] overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #F0ECF9, #FFFFFF)",
        border: "1px solid #D4955A",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.25), 0 8px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div className="px-5 pt-3 pb-1 text-center">
        <h3
          className="text-[14px] font-bold"
          style={{
            color: "#001353",
            fontFamily: "var(--font-rubik), sans-serif",
          }}
        >
          Talk to a counsellor today
        </h3>
      </div>
      <div className="pb-3">
        <CRMFormEmbed height={540} mobileHeight={400} formSource="city-landing" />
      </div>
    </div>
  );
}
