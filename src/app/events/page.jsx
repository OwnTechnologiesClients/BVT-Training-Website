"use client";

import { useState, useCallback } from "react";
import {
  EventsHero,
  EventsTimeline,
  EventTypes
} from "@/components/events";

export default function EventsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("upcoming");

  const handleTimeframeChange = useCallback((timeframe) => {
    setSelectedTimeframe(timeframe);
  }, []);

  return (
    <>
      <EventsHero />
      <EventTypes />
      <EventsTimeline selectedTimeframe={selectedTimeframe} onTimeframeChange={handleTimeframeChange} />
    </>
  );
}
