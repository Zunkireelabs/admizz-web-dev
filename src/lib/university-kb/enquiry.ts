// University enquiry submission.
//
// NOT CONNECTED YET: the CRM form for university enquiries hasn't been set up,
// so this only simulates a successful submit. When it exists, post to
//   https://edgex.zunkireelabs.com/api/public/submit/admizz/<form-slug>
// the same way src/components/ui/register-form/RegisterForm.tsx does
// (Bearer API key + UTM attribution from src/lib/attribution/utmStorage.ts).

export interface UniversityEnquiry {
  fullName: string;
  phoneCountryCode: string;
  phone: string;
  email: string;
  studyLevel: string;
  preferredIntake: string;
  university: string;
  universitySlug: string;
  course?: string;
  message?: string;
  pageUrl: string;
}

export async function submitUniversityEnquiry(enquiry: UniversityEnquiry): Promise<void> {
  // TODO(crm): replace with the real CRM request once the form slug and key exist.
  if (process.env.NODE_ENV !== "production") {
    console.info("[university-enquiry] not sent — CRM not connected yet", enquiry);
  }
  await new Promise((resolve) => setTimeout(resolve, 700));
}
