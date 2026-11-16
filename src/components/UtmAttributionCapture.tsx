"use client";

import { useEffect } from "react";
import { captureUtmAttribution } from "@/lib/attribution/utmStorage";
import { captureClickIds } from "@/lib/tracking/clickIds";

export default function UtmAttributionCapture() {
  useEffect(() => {
    captureUtmAttribution();
    captureClickIds();
  }, []);

  return null;
}
