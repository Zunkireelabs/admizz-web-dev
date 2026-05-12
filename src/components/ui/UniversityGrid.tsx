import Image from "next/image";

export interface University {
  name: string;
  logo: string;
}

interface UniversityGridProps {
  title?: string;
  universities: University[];
}

export default function UniversityGrid({
  title = "Global Top Universities",
  universities,
}: UniversityGridProps) {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-2xl md:text-[28px] font-bold text-navy text-center mb-10">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {universities.map((uni) => (
            <div
              key={uni.name}
              className="bg-white border border-border-light rounded-[10px] p-4 flex items-center justify-center aspect-[3/2] hover:shadow-md transition-shadow"
            >
              <Image
                src={uni.logo}
                alt={uni.name}
                width={120}
                height={80}
                className="object-contain max-h-16"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
