"use client";

import { useState } from "react";
import { scheduleEvents } from "../../data/calendarData";
import { generateCalendarDays } from "../../utils/calendarUtils";

type CalendarProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function Calendar({
  selectedDate,
  onSelectDate,
}: CalendarProps) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(7);

  const calendarDays = generateCalendarDays(year, month);

  const handlePrevMonth = () => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
      return;
    }

    setMonth(month - 1);
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
      return;
    }

    setMonth(month + 1);
  };

  const getDateText = (day: string) => {
    return `${year}-${String(month).padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  return (
    <section className="px-5 py-6">
      <div className="mb-5 flex items-center justify-between">
        <button onClick={handlePrevMonth} className="text-4xl">
          ‹
        </button>

        <h2 className="text-3xl font-black">
          {year}年{month}月
        </h2>

        <button onClick={handleNextMonth} className="text-4xl">
          ›
        </button>
      </div>

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
                <div key={`${i}-${index}`} className="relative flex justify-center">
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
    </section>
  );
}