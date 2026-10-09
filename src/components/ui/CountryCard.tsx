import Image from "next/image";
import Link from "next/link";

export interface CountryCardProps {
  name: string;
  image: string;
  href: string;
  description?: string;
  prefetch?: boolean;
}

export default function CountryCard({ name, image, href, description, prefetch = false }: CountryCardProps) {
  const isComingSoon = href === "/coming-soon/";

  return (
    <Link
      href={href}
      prefetch={prefetch}
      className="group block rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        {isComingSoon && (
          <div className="absolute top-2 right-2 bg-white/90 text-[11px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full" style={{ color: "#0D1282" }}>
            Coming Soon
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-sm lg:text-base leading-tight">{name}</h3>
        </div>
      </div>
      {description && (
        <div className="px-3 py-3">
          <p className="text-[13px] text-gray-dark leading-relaxed">{description}</p>
        </div>
      )}
    </Link>
  );
}
