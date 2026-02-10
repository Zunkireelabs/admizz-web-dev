import Image from "next/image";

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface StatsProps {
  stats: Stat[];
}

export default function Stats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col items-center text-center p-6">
          <Image src={stat.icon} alt={stat.label} width={64} height={64} />
          <p className="mt-4 text-3xl font-bold text-navy">{stat.value}</p>
          <p className="mt-2 text-sm text-gray-dark">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
