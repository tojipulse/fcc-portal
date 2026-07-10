"use client";

type MonthSwitcherProps = {
  label: string;
  onPrevious: () => void;
  onNext: () => void;
};

export default function MonthSwitcher({
  label,
  onPrevious,
  onNext,
}: MonthSwitcherProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-black text-slate-700 transition hover:bg-slate-100"
      >
        ◀
      </button>

      <div className="text-lg font-black text-slate-900">
        {label}
      </div>

      <button
        type="button"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-lg font-black text-slate-700 transition hover:bg-slate-100"
      >
        ▶
      </button>
    </div>
  );
}