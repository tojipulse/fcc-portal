"use client";

import { useEffect, useState } from "react";
import SelectableRow from "../ui/SelectableRow";
import { grades } from "../../data/grades";

export type FilterValues = {
  gradeIds: string[];
};

type FilterSheetProps = {
  open: boolean;
  values: FilterValues;
  defaultGradeIds: string[];
  onApply: (values: FilterValues) => void;
  onClose: () => void;
};

export default function FilterSheet({
  open,
  values,
  defaultGradeIds,
  onApply,
  onClose,
}: FilterSheetProps) {
  const [draftValues, setDraftValues] = useState<FilterValues>(values);

  useEffect(() => {
    if (open) {
      setDraftValues(values);
    }
  }, [open, values]);

  if (!open) return null;

  const toggleGrade = (gradeId: string) => {
    if (gradeId === "all") {
      setDraftValues({ gradeIds: ["all"] });
      return;
    }

    const currentGradeIds = draftValues.gradeIds.filter(
      (item) => item !== "all"
    );

    const nextGradeIds = currentGradeIds.includes(gradeId)
      ? currentGradeIds.filter((item) => item !== gradeId)
      : [...currentGradeIds, gradeId];

    setDraftValues({
      gradeIds: nextGradeIds,
    });
  };

  const resetFilters = () => {
    setDraftValues({
      gradeIds: defaultGradeIds,
    });
  };

  const applyFilters = () => {
    onApply(draftValues);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/40" onClick={onClose} />

      <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
        <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-300" />

        <h2 className="text-xl font-black text-slate-900">表示フィルター</h2>

        <section className="mt-6">
          <h3 className="mb-1 text-base font-black text-slate-900">
            学年で全体表示
          </h3>

          <div className="mb-3 text-xs font-bold leading-5 text-slate-600">
            選んだ学年の予定を全て表示します。所属学年は標準で選択されます。
          </div>

          <div className="space-y-2">
            {grades.map((grade) => {
              const isDefaultGrade = defaultGradeIds.includes(grade.id);
              const label =
                grade.id === "all"
                  ? grade.name
                  : isDefaultGrade
                    ? `${grade.name}（所属）`
                    : grade.name;

              return (
                <SelectableRow
                  key={grade.id}
                  label={label}
                  selected={draftValues.gradeIds.includes(grade.id)}
                  onClick={() => toggleGrade(grade.id)}
                />
              );
            })}
          </div>
        </section>

        <div className="sticky bottom-0 mt-8 bg-white pt-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-800"
            >
              リセット
            </button>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-800"
            >
              キャンセル
            </button>

            <button
              type="button"
              onClick={applyFilters}
              className="rounded-xl bg-blue-600 py-3 text-sm font-bold text-white"
            >
              適用
            </button>
          </div>
        </div>
      </div>
    </>
  );
}