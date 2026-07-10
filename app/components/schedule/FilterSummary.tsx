import FilterButton from "../filter/FilterButton";

type FilterSummaryProps = {
  chips: string[];
  onOpenFilter: () => void;
};

export default function FilterSummary({
  chips,
  onOpenFilter,
}: FilterSummaryProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0 flex-1">
        <div className="text-xs font-black text-slate-700">
          表示対象
        </div>

        <div className="mt-1 flex max-h-16 flex-wrap gap-2 overflow-hidden">
          {chips.length > 0 ? (
            chips.map((chip) => (
              <span
                key={chip}
                className="max-w-[140px] truncate rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700"
              >
                {chip}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black text-slate-700">
              未選択
            </span>
          )}
        </div>
      </div>

      <FilterButton onClick={onOpenFilter} />
    </div>
  );
}