interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      <h2 className="text-2xl md:text-[28px] font-bold text-navy">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-gray-dark text-[15px] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
