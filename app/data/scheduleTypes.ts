export type ScheduleType = {
  id: string;
  name: string;
  icon: string;
  order: number;
};

export const scheduleTypes: ScheduleType[] = [
  {
    id: "practice",
    name: "通常練習",
    icon: "⚽",
    order: 1,
  },
  {
    id: "practice_match",
    name: "練習試合",
    icon: "🤝",
    order: 2,
  },
  {
    id: "tournament",
    name: "大会",
    icon: "🏆",
    order: 3,
  },
  {
    id: "event",
    name: "イベント",
    icon: "🎉",
    order: 4,
  },
];