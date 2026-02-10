"use client";

import { useState, type FormEvent } from "react";

export interface CTAFormProps {
  /** Card title */
  title?: string;
  /** Submit button label */
  submitLabel?: string;
  /** Pre-select a study destination */
  defaultDestination?: string;
  /** Visual variant */
  variant?: "card" | "inline";
  /** Called on form submission */
  onSubmit?: (data: CTAFormData) => void;
}

export interface CTAFormData {
  fullName: string;
  email: string;
  phone: string;
  destination: string;
  studyLevel: string;
}

const destinations = [
  "Australia",
  "Canada",
  "Denmark",
  "Dubai",
  "France",
  "India",
  "New Zealand",
  "South Korea",
  "UK",
  "USA",
];

const studyLevels = ["Diploma", "Bachelors", "Masters"];

const inputClass =
  "w-full h-[40px] px-3 border border-border-input rounded-[10px] text-xs font-montserrat text-black placeholder:text-[#888888] focus:outline-none focus:ring-1 focus:ring-blue-dark";

const selectClass =
  "w-full h-[40px] px-3 border border-border-input rounded-[10px] text-xs font-montserrat text-gray-medium focus:outline-none focus:ring-1 focus:ring-blue-dark";

export default function CTAForm({
  title = "Book Your Free Consultation",
  submitLabel = "Submit",
  defaultDestination = "",
  variant = "card",
  onSubmit,
}: CTAFormProps) {
  const [formData, setFormData] = useState<CTAFormData>({
    fullName: "",
    email: "",
    phone: "",
    destination: defaultDestination,
    studyLevel: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  const update = (field: keyof CTAFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const wrapperClass =
    variant === "card"
      ? "bg-white rounded-[10px] p-6 text-black border border-[#b5bbc294]"
      : "";

  return (
    <div className={wrapperClass}>
      {title && (
        <h3 className="text-lg font-bold text-navy mb-4">{title}</h3>
      )}
      <form className="space-y-3" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={formData.fullName}
          onChange={(e) => update("fullName", e.target.value)}
          className={inputClass}
        />
        <input
          type="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
        />
        <input
          type="tel"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass}
        />
        <select
          value={formData.destination}
          onChange={(e) => update("destination", e.target.value)}
          className={selectClass}
        >
          <option value="">Preferred Study Destination</option>
          {destinations.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select
          value={formData.studyLevel}
          onChange={(e) => update("studyLevel", e.target.value)}
          className={selectClass}
        >
          <option value="">Interested Study Level</option>
          {studyLevels.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-dark text-white font-semibold text-[15px] py-3 rounded-[10px] hover:bg-blue-royal transition-colors"
        >
          {submitLabel}
        </button>
      </form>
    </div>
  );
}
