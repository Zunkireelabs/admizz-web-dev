import { abertayUniversity } from "./abertay-university";
import { angliaRuskinUniversity } from "./anglia-ruskin-university";
import { bangorUniversity } from "./bangor-university";
import { bangorUniversityInternationalCollege } from "./bangor-university-international-college";
import { bppUniversity } from "./bpp-university";
import { canterburyChristChurchUniversity } from "./canterbury-christ-church-university";
import { edinburghNapierUniversityInternationalCollege } from "./edinburgh-napier-university-international-college";
import { londonSouthBankUniversity } from "./london-south-bank-university";
import { universityOfBradfordInternationalCollege } from "./university-of-bradford-international-college";
import { universityOfDundeeInternationalCollege } from "./university-of-dundee-international-college";
import { universityOfGreenwichInternationalCollege } from "./university-of-greenwich-international-college";
import { universityOfHuddersfield } from "./university-of-huddersfield";
import { universityOfKentInternationalCollege } from "./university-of-kent-international-college";
import { universityOfTheWestOfEngland } from "./university-of-the-west-of-england";
import { astonUniversityOncampus } from "./aston-university-oncampus";
import { universityOfHullOncampus } from "./university-of-hull-oncampus";
import { universityOfPortsmouthInternationalCollegePortsmouth } from "./university-of-portsmouth-international-college-portsmouth";

import type { UniversityProfile } from "../../types";

// Add-only profiles from the Admizz UK partner sheet. Kept apart from ../imported so the
// Route2Uni importer (which rewrites that folder's index) can never drop them.
export const excelProfiles: UniversityProfile[] = [
  abertayUniversity,
  angliaRuskinUniversity,
  bangorUniversity,
  bangorUniversityInternationalCollege,
  bppUniversity,
  canterburyChristChurchUniversity,
  edinburghNapierUniversityInternationalCollege,
  londonSouthBankUniversity,
  universityOfBradfordInternationalCollege,
  universityOfDundeeInternationalCollege,
  universityOfGreenwichInternationalCollege,
  universityOfHuddersfield,
  universityOfKentInternationalCollege,
  universityOfTheWestOfEngland,
  astonUniversityOncampus,
  universityOfHullOncampus,
  universityOfPortsmouthInternationalCollegePortsmouth,
];
