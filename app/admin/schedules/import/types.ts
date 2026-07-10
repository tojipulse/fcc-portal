export type ParsedScheduleItem = {
  id: string;
  rawText: string;
  dateLabel: string;
  gradeIds: string[];
  gradeLabel: string;
  place: string;
  timeText: string;
  startTime: string;
  endTime: string;
  error?: string;
};

export type ScheduleChangeType =
  | "location"
  | "time"
  | "belongings"
  | "canceled";

export type ScheduleImportResult = {
  items: ParsedScheduleItem[];
  errors: ParsedScheduleItem[];
  successItems: ParsedScheduleItem[];
};