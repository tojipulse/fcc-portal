export function generateCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  const startDayOfWeek = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const calendarDays = [];
  let week = [];

  for (let i = 0; i < startDayOfWeek; i++) {
    week.push("");
  }

  for (let day = 1; day <= daysInMonth; day++) {
    week.push(String(day));

    if (week.length === 7) {
      calendarDays.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    while (week.length < 7) {
      week.push("");
    }

    calendarDays.push(week);
  }

  return calendarDays;
}

export function formatJapaneseDate(dateText: string) {
  const date = new Date(dateText);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const weekDay = weekDays[date.getDay()];

  return `${month}月${day}日（${weekDay}）`;
}