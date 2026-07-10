"use client";

type MonthSwitcherProps = {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

export default function MonthSwitcher({
  currentMonth,
  onPrevMonth,
  onNextMonth,
}: MonthSwitcherProps) {
  const label = `${currentMonth.getFullYear()}年 ${
    currentMonth.getMonth() + 1
  }月`;

  return (
    <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-sm">
      <button
        onClick={onPrevMonth}
        className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
      >
        前月
      </button>

      <div className="text-lg font-bold text-gray-900">{label}</div>

      <button
        onClick={onNextMonth}
        className="rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-700"
      >
        翌月
      </button>
    </div>
  );
}