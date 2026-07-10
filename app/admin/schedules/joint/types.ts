export type ScheduleStatus = "scheduled" | "canceled";

export type ScheduleItem = {
  id: string;
  date: string;
  dateLabel: string;
  gradeId: string;
  gradeLabel: string;
  typeId: string;
  typeLabel: string;
  subTypeId: string;
  subTypeLabel: string;
  placeId: string;
  placeLabel: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  belongings: string;
  memo: string;
  jointGroupId?: string;
};

export type DateScheduleGroup = {
  date: string;
  dateLabel: string;
  schedules: ScheduleItem[];
};

export type JointValidationResult = {
  canCreate: boolean;
  messages: string[];
};

export type JointDateSelection = {
  date: string;
  selectedIds: string[];
  selectedSchedules: ScheduleItem[];
  validation: JointValidationResult;
};