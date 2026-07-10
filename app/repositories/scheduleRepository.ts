import { schedules } from "../data/schedules";

export function getSchedules() {
  return [...schedules];
}

export function getSchedule(scheduleId: string) {
  return schedules.find((schedule) => schedule.id === scheduleId);
}

export function getSchedulesByMonth(displayMonth: Date) {
  return schedules.filter((schedule) => {
    const date = new Date(`${schedule.eventDate}T00:00:00`);

    return (
      date.getFullYear() === displayMonth.getFullYear() &&
      date.getMonth() === displayMonth.getMonth()
    );
  });
}

export function getSchedulesByDateNumber(date: number) {
  return schedules.filter((schedule) => schedule.date === date);
}

export function getUpcomingSchedules(today = new Date()) {
  const todayOnly = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return schedules.filter((schedule) => {
    const scheduleDate = new Date(`${schedule.eventDate}T00:00:00`);
    return scheduleDate >= todayOnly;
  });
}