import type { ReactNode } from "react";
import { universityProfiles, EXPLORE_BASE_PATH, compareId } from "@/lib/university-kb";
import CompareTray from "@/components/university-kb/CompareTray";

export default function ExploreUniversitiesLayout({ children }: { children: ReactNode }) {
  const trayUniversities = universityProfiles.map((u) => ({
    id: compareId(u.country, u.slug),
    name: u.name,
    logo: u.logo,
  }));

  return (
    <>
      {children}
      <CompareTray universities={trayUniversities} comparePath={`${EXPLORE_BASE_PATH}/compare`} />
    </>
  );
}
