export type AttendanceStatus =
  | "attend"
  | "absent"
  | "pending"
  | "";

export type Attendance = {
  id: string;
  scheduleId: string;
  playerId: string;
  status: AttendanceStatus;
  comment?: string;
  updatedAt?: string;
};

export const attendances: Attendance[] = [
  {
    id: "attendance-1",
    scheduleId: "schedule-1",
    playerId: "player-2",
    status: "",
  },
  {
    id: "attendance-2",
    scheduleId: "schedule-2",
    playerId: "player-2",
    status: "attend",
    updatedAt: "2026-07-08 18:00",
  },
  {
    id: "attendance-3",
    scheduleId: "schedule-3",
    playerId: "player-1",
    status: "pending",
    comment: "仕事の都合で調整中",
    updatedAt: "2026-07-08 19:10",
  },
  {
    id: "attendance-4",
    scheduleId: "schedule-4",
    playerId: "player-3",
    status: "absent",
    comment: "体調不良",
    updatedAt: "2026-07-07 20:30",
  },
];