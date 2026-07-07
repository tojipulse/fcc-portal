import { scheduleEvents } from "../../data/calendarData";

type CalendarGridProps = {
  calendarDays: string[][];
  year: number;
  month: number;
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function CalendarGrid({
  calendarDays,
  year,
  month,
  selectedDate,
  onSelectDate,
}: CalendarGridProps) {
  const getDateText = (day: string) => {
    return `${year}-${String(month).padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <>
      <div className="grid grid-cols-7 text-center text-lg font-bold">
        {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
          <div key={d} className={d === "日" ? "text-red-600" : ""}>
            {d}
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-5">
        {calendarDays.map((week, i) => (
          <div key={i} className="grid grid-cols-7 text-center text-3xl">
            {week.map((day, index) => {
              const dateText = day ? getDateText(day) : "";
              const selected = dateText === selectedDate;
              const hasDot = scheduleEvents.some(
                (event) => event.date === dateText
              );
              const isSunday = index === 0;

              return (
                <div
                  key={`${i}-${index}`}
                  className="relative flex justify-center"
                >
                  <button
                    disabled={day === ""}
                    onClick={() => onSelectDate(dateText)}
                    className={
                      selected
                        ? "flex h-12 w-12 items-center justify-center rounded-full bg-red-600 text-white"
                        : isSunday && day !== ""
                          ? "text-red-700"
                          : ""
                    }
                  >
                    {day}
                  </button>

                  {hasDot && (
                    <span className="absolute bottom-[-8px] h-2 w-2 rounded-full bg-red-600" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </>
  );
}