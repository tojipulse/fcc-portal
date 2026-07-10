"use client";

import Button from "../../../../components/ui/Button";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";

import { positionGroups } from "../../constants";

import type { CoachPositionFormData } from "../types";

type CoachPositionEditorProps = {
  positions: CoachPositionFormData[];
  onChange: (positions: CoachPositionFormData[]) => void;
};

function createPosition(): CoachPositionFormData {
  const firstGroup = positionGroups[0];

  return {
    id: `position-${Date.now()}-${Math.random()}`,
    category: firstGroup.category,
    name: firstGroup.positions[0] ?? "",
  };
}

function getPositionOptions(category: string) {
  return (
    positionGroups.find((group) => group.category === category)?.positions ??
    []
  );
}

export default function CoachPositionEditor({
  positions,
  onChange,
}: CoachPositionEditorProps) {
  const updatePosition = (
    index: number,
    key: keyof CoachPositionFormData,
    value: string
  ) => {
    const next = [...positions];

    const position = {
      ...next[index],
      [key]: value,
    };

    if (key === "category") {
      position.name = getPositionOptions(value)[0] ?? "";
    }

    next[index] = position;

    onChange(next);
  };

  const removePosition = (index: number) => {
    onChange(positions.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-base font-black text-slate-900">
          役職
        </div>

        <div className="mt-1 text-sm font-bold text-slate-600">
          大項目・中項目で複数登録できます。
        </div>
      </div>

      {positions.map((position, index) => (
        <div
          key={position.id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-black text-slate-700">
              役職 {index + 1}
            </div>

            <button
              type="button"
              onClick={() => removePosition(index)}
              className="text-sm font-black text-red-600"
            >
              削除
            </button>
          </div>

          <div className="grid gap-4">
            <label>
              <FormLabel>大項目</FormLabel>
              <FormSelect
                value={position.category}
                onChange={(v) => updatePosition(index, "category", v)}
              >
                {positionGroups.map((group) => (
                  <option key={group.category} value={group.category}>
                    {group.category}
                  </option>
                ))}
              </FormSelect>
            </label>

            <label>
              <FormLabel>中項目</FormLabel>
              <FormSelect
                value={position.name}
                onChange={(v) => updatePosition(index, "name", v)}
              >
                {getPositionOptions(position.category).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </FormSelect>
            </label>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        fullWidth
        onClick={() => onChange([...positions, createPosition()])}
      >
        ＋ 役職を追加
      </Button>
    </div>
  );
}