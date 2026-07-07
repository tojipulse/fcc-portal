type CalendarHeaderProps = {
  year: number;
  month: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function CalendarHeader({
  year,
  month,
  onPrevMonth,
  onNextMonth,
}: CalendarHeaderProps) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <button onClick={onPrevMonth} className="text-4xl">
        ‹
      </button>

      <h2 className="text-3xl font-black">
        {year}年{month}月
      </h2>

      <button onClick={onNextMonth} className="text-4xl">
        ›
      </button>
    </div>
  );
}