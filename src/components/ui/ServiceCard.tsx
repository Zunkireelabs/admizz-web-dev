import Image from "next/image";

export interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white border border-border-light rounded-[10px] p-6 text-center hover:shadow-md transition-shadow">
      <Image
        src={icon}
        alt={title}
        width={108}
        height={108}
        className="mx-auto"
      />
      <h3 className="mt-4 text-lg font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-gray-dark leading-relaxed">
        {description}
      </p>
    </div>
  );
}
