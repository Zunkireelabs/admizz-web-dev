import type { ApplicationStage, RequiredDocument } from "../types";

// Standard UK document checklist and application flow. Use these for a
// university until its own specifics are confirmed, then override per profile.
export const UK_STANDARD_DOCUMENTS: RequiredDocument[] = [
  { name: "All academic documents" },
  { name: "CV" },
  { name: "Letters of recommendation (LOR)" },
  { name: "Passport" },
  { name: "Statement of purpose" },
  { name: "English language certificate", optional: true },
  { name: "Medium of instruction (MOI) letter", optional: true },
];

export const UK_STANDARD_STAGES: ApplicationStage[] = [
  { title: "Application initiated" },
  { title: "Application submitted", document: "Acknowledgement / reference number" },
  { title: "Conditional offer received", document: "Conditional offer letter" },
  { title: "Unconditional offer received", document: "Unconditional offer letter" },
  { title: "Deposit paid", document: "Payment receipt" },
  { title: "CAS issued", document: "CAS letter" },
  { title: "Visa applied", document: "Visa application confirmation" },
];
