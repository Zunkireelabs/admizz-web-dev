export default function FlagStripe({
  width = 4,
  height = "100%",
  className = "",
  colors = ["#FF6B1A", "#FFFFFF", "#138808"],
}: {
  width?: number;
  height?: string | number;
  className?: string;
  colors?: [string, string, string];
}) {
  const [c1, c2, c3] = colors;
  return (
    <div
      className={className}
      style={{
        width,
        height,
        background: `linear-gradient(to bottom, ${c1} 0%, ${c1} 33.33%, ${c2} 33.33%, ${c2} 66.66%, ${c3} 66.66%, ${c3} 100%)`,
        borderRadius: 2,
      }}
      aria-hidden="true"
    />
  );
}
