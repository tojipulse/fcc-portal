export type Schedule = {
  id: string;
  date: number;
  eventDate: string;
  dateLabel: string;

  targetGradeIds: string[];
  targetPlayerIds: string[];

  attendanceGradeIds: string[];
  attendancePlayerIds: string[];

  takesAttendance: boolean;

  scheduleTypeId: string;
  title: string;
  time: string;
  place: string;
  joint?: boolean;
  belongings?: string;
  note?: string;
  answerDeadline?: string;
};