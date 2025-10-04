"use client";

import { useState, useCallback } from "react";
import {
  ProgramsHero,
  LearningPaths,
  ProgramBenefits
} from "@/components/programs";

export default function ProgramsPage() {
  const [selectedPath, setSelectedPath] = useState("technical");

  const handlePathChange = useCallback((path) => {
    setSelectedPath(path);
  }, []);

  return (
    <>
      <ProgramsHero />
      <LearningPaths selectedPath={selectedPath} onPathChange={handlePathChange} />
      <ProgramBenefits />
    </>
  );
}
