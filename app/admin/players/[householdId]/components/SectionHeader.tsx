type SectionHeaderProps = {
  title: string;
  description?: string;
  open: boolean;
  onToggle: () => void;
};

export default function SectionHeader({
  title,
  description,
  open,
  onToggle,
}: SectionHeaderProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between text-left"
    >
      <div>
        <div className="text-lg font-black text-slate-900">
          {title}
        </div>

        {description && (
          <div className="mt-1 text-sm font-bold text-slate-600">
            {description}
          </div>
        )}
      </div>

      <div className="text-2xl font-black text-slate-400">
        {open ? "⌃" : "＞"}
      </div>
    </button>
  );
}