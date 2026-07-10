type CalendarProps = {
  selectedDate: number;
  eventDates?: number[];
  onSelect: (date: number) => void;
};

export default function Calendar({
  selectedDate,
  eventDates = [],
  onSelect,
}: CalendarProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-xl font-black">2026年7月</div>
        <div className="text-sm font-bold text-slate-500">今月</div>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-2 text-center text-sm font-bold">
        {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
          <div key={day} className="text-slate-500">
            {day}
          </div>
        ))}

        {Array.from({ length: 35 }).map((_, index) => {
          const date = index + 1;
          const active = date === selectedDate;
          const hasEvent = eventDates.includes(date);

          return (
            <button
              key={date}
              onClick={() => onSelect(date)}
              className={`relative aspect-square rounded-xl font-black ${
                active
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-slate-800"
              }`}
            >
              <span>{date}</span>

              {hasEvent && (
                <span
                  className={`absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                    active ? "bg-white" : "bg-blue-600"
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}