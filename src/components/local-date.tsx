"use client";

import { formatRelative } from "date-fns";

interface LocalDateProps {
  date: string | Date;
}

export function LocalDate({ date }: LocalDateProps) {
  return <>{formatRelative(new Date(date), new Date())}</>;
}
