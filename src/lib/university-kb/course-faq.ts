import { formatMoney } from "./countries";
import type { CourseDetailData } from "@/components/university-kb/CourseDetail";

export interface CourseFaq {
  question: string;
  answer: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function durationLabel(months: number) {
  if (months % 12 === 0) return `${months / 12} year${months === 12 ? "" : "s"}`;
  return `${months} months`;
}

function span(min: number, max: number, fmt: (n: number) => string) {
  return min === max ? fmt(min) : `${fmt(min)} to ${fmt(max)}`;
}

function list(items: string[]) {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * Q&A for a course page, built only from the figures the page itself shows
 * (partner universities, listed fees, durations, intakes), so the answers can
 * never disagree with the table below them.
 */
export function buildCourseFaqs(data: CourseDetailData): CourseFaq[] {
  const { name, offers, currency } = data;
  if (offers.length === 0) return [];
  const faqs: CourseFaq[] = [];

  // 1. Who offers it
  const names = offers.map((o) => o.university.name);
  const shown = names.slice(0, 6);
  const more = names.length - shown.length;
  faqs.push({
    question: `Which universities offer ${name}?`,
    answer: `${name} is offered by ${names.length} Admizz partner universit${names.length === 1 ? "y" : "ies"}: ${list(shown)}${more > 0 ? `, and ${more} more` : ""}. You can compare them in the list on this page.`,
  });

  // 2. Fees
  const yearly = offers.filter((o) => o.course.fee !== undefined && o.course.per === "year").map((o) => o.course.fee as number);
  const total = offers.filter((o) => o.course.fee !== undefined && o.course.per === "total").map((o) => o.course.fee as number);
  const parts: string[] = [];
  if (yearly.length) parts.push(`${span(Math.min(...yearly), Math.max(...yearly), (n) => formatMoney(n, currency))} a year`);
  if (total.length) parts.push(`${span(Math.min(...total), Math.max(...total), (n) => formatMoney(n, currency))} for the whole course`);
  if (parts.length) {
    faqs.push({
      question: `How much does ${name} cost?`,
      answer: `Across our partner universities the listed tuition for ${name} is ${list(parts)}. Fees differ by university, and some listings are "from" prices, so confirm the exact fee with the university or your Admizz counsellor before you apply.`,
    });
  }

  // 3. Duration
  const months = offers.map((o) => o.course.durationMonths).filter((m) => m > 0);
  if (months.length) {
    faqs.push({
      question: `How long is ${name}?`,
      answer: Math.min(...months) === Math.max(...months)
        ? `${name} takes ${durationLabel(months[0])} at our partner universities.`
        : `${name} takes ${span(Math.min(...months), Math.max(...months), durationLabel)} depending on the university.`,
    });
  }

  // 4. Intakes
  const intakeMonths = Array.from(new Set(offers.flatMap((o) => o.course.intakes))).sort((a, b) => MONTHS.indexOf(a) - MONTHS.indexOf(b));
  if (intakeMonths.length) {
    faqs.push({
      question: `When can I start ${name}?`,
      answer: `Partner universities list ${list(intakeMonths)} ${intakeMonths.length === 1 ? "as the intake" : "intakes"} for ${name}. Check each university's entry in the list for its exact start months.`,
    });
  }

  // 5. Placement versions
  const placement = offers.filter((o) => o.course.placement).length;
  if (placement > 0) {
    faqs.push({
      question: `Can I study ${name} with a placement year?`,
      answer: `${placement} of the ${offers.length} listed universities mark ${name} as including a placement. Look for the placement label in the list.`,
    });
  }

  return faqs;
}
