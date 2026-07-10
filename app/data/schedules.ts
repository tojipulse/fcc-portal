import type { Schedule } from "../types/schedule";

export const schedules: Schedule[] = [
  {
    id: "schedule-001",
    date: 12,
    eventDate: "2026-07-12",
    dateLabel: "7/12（土）",

    targetGradeIds: ["2"],
    targetPlayerIds: [],

    attendanceGradeIds: ["2"],
    attendancePlayerIds: [],

    takesAttendance: true,

    scheduleTypeId: "practice",
    title: "通常練習",
    time: "09:00〜11:00",
    place: "瑞光小学校",
    belongings: "水筒、ボール、すねあて、タオル",
    note: "暑さ対策のため、多めに飲み物を持参してください。",
  },
  {
    id: "schedule-002",
    date: 12,
    eventDate: "2026-07-12",
    dateLabel: "7/12（土）",

    targetGradeIds: ["kids"],
    targetPlayerIds: [],

    attendanceGradeIds: ["kids"],
    attendancePlayerIds: [],

    takesAttendance: false,

    scheduleTypeId: "practice",
    title: "キッズ練習",
    time: "10:00〜11:00",
    place: "瑞光小学校 中庭",
    belongings: "水筒、タオル、動きやすい服装",
    note: "保護者の方は近くで見守りをお願いします。",
  },
  {
    id: "schedule-003",
    date: 13,
    eventDate: "2026-07-13",
    dateLabel: "7/13（日）",

    targetGradeIds: ["2", "3"],
    targetPlayerIds: [],

    attendanceGradeIds: ["2", "3"],
    attendancePlayerIds: [],

    takesAttendance: true,

    scheduleTypeId: "practice_match",
    title: "練習試合",
    time: "13:00〜16:00",
    place: "東尾久グランド",
    joint: true,
    belongings: "試合用具一式、ユニフォーム、水筒",
    note: "集合時間は12:30です。",
    answerDeadline: "2026-07-10",
  },
  {
    id: "schedule-004",
    date: 16,
    eventDate: "2026-07-16",
    dateLabel: "7/16（水）",

    targetGradeIds: ["5"],
    targetPlayerIds: [],

    attendanceGradeIds: ["5"],
    attendancePlayerIds: [],

    takesAttendance: true,

    scheduleTypeId: "practice",
    title: "5年 通常練習",
    time: "17:00〜19:00",
    place: "瑞光小学校",
    belongings: "水筒、ボール、すねあて",
  },
  {
    id: "schedule-005",
    date: 18,
    eventDate: "2026-07-18",
    dateLabel: "7/18（金）",

    targetGradeIds: ["6"],
    targetPlayerIds: [],

    attendanceGradeIds: ["6"],
    attendancePlayerIds: [],

    takesAttendance: true,

    scheduleTypeId: "practice_match",
    title: "6年 練習試合",
    time: "18:00〜20:00",
    place: "南千住広場",
    belongings: "試合用具一式、水筒",
    answerDeadline: "2026-07-15",
  },
  {
    id: "schedule-006",
    date: 21,
    eventDate: "2026-07-21",
    dateLabel: "7/21（月祝）",

    targetGradeIds: ["all"],
    targetPlayerIds: [],

    attendanceGradeIds: ["all"],
    attendancePlayerIds: [],

    takesAttendance: true,

    scheduleTypeId: "event",
    title: "夏休みイベント",
    time: "10:00〜14:00",
    place: "地区会館",
    belongings: "飲み物、タオル",
    note: "みんなで昼食、BINGO、かき氷を予定しています。",
    answerDeadline: "2026-07-18",
  },
];