import Image from "next/image";
import Link from "next/link";

export interface CountryCardProps {
  name: string;
  image: string;
  href: string;
}

export default function CountryCard({ name, image, href }: CountryCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-[10px] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg">{name}</h3>
        </div>
      </div>
    </Link>
  );
}
