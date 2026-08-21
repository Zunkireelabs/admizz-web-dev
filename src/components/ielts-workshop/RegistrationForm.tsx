import CTAForm from "@/components/ui/CTAForm";
import { event } from "./content";

// Reuses the site's standard CRM-backed enquiry form. Submissions from this page
// are tagged with formSource so they're attributable in the CRM. Swap for a
// dedicated per-event form later without touching any other section.
export default function RegistrationForm() {
  return (
    <CTAForm
      title={event.ctaText}
      colorScheme="light"
      formSource={event.registrationFormSource}
    />
  );
}
