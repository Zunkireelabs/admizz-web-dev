"use client";

import { useEffect } from "react";
import { captureUtmAttribution } from "@/lib/attribution/utmStorage";

export default function UtmAttributionCapture() {
  useEffect(() => {
    captureUtmAttribution();
  }, []);

  return null;
}
