"use client";

import FormInput from "../../../components/ui/form/FormInput";
import FormLabel from "../../../components/ui/form/FormLabel";
import FormSelect from "../../../components/ui/form/FormSelect";
import FormTextarea from "../../../components/ui/form/FormTextarea";

import type { PlayerFormData } from "./types";

type PlayerFormProps = {
  index: number;
  value: PlayerFormData;
  onChange: (value: PlayerFormData) => void;
};

const grades = [
  { id: "kids", name: "キッズ" },
  { id: "1", name: "1年" },
  { id: "2", name: "2年" },
  { id: "3", name: "3年" },
  { id: "4", name: "4年" },
  { id: "5", name: "5年" },
  { id: "6", name: "6年" },
];

export default function PlayerForm({
  index,
  value,
  onChange,
}: PlayerFormProps) {
  const update = (
    key: keyof PlayerFormData,
    nextValue: string | boolean
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <div className="text-lg font-black text-slate-900">
        選手{index}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label>
          <FormLabel required>姓</FormLabel>
          <FormInput
            value={value.lastName}
            onChange={(v) => update("lastName", v)}
          />
        </label>

        <label>
          <FormLabel required>名</FormLabel>
          <FormInput
            value={value.firstName}
            onChange={(v) => update("firstName", v)}
          />
        </label>

        <label>
          <FormLabel required>せい</FormLabel>
          <FormInput
            value={value.lastNameKana}
            onChange={(v) => update("lastNameKana", v)}
          />
        </label>

        <label>
          <FormLabel required>めい</FormLabel>
          <FormInput
            value={value.firstNameKana}
            onChange={(v) => update("firstNameKana", v)}
          />
        </label>

        <label>
          <FormLabel required>学年</FormLabel>
          <FormSelect
            value={value.gradeId}
            onChange={(v) => update("gradeId", v)}
          >
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </FormSelect>
        </label>

        <label>
          <FormLabel required>ニックネーム</FormLabel>
          <FormInput
            value={value.nickname}
            onChange={(v) => update("nickname", v)}
          />
        </label>

        <label>
          <FormLabel>生年月日</FormLabel>
          <FormInput
            type="date"
            value={value.birthday}
            onChange={(v) => update("birthday", v)}
          />
        </label>

        <label>
          <FormLabel>小学校</FormLabel>
          <FormInput
            value={value.school}
            onChange={(v) => update("school", v)}
          />
        </label>

        <label>
          <FormLabel>郵便番号</FormLabel>
          <FormInput
            value={value.postalCode}
            onChange={(v) => update("postalCode", v)}
          />
        </label>

        <label className="md:col-span-2">
          <FormLabel>住所</FormLabel>
          <FormInput
            value={value.address}
            onChange={(v) => update("address", v)}
          />
        </label>

        <label className="md:col-span-2">
          <FormLabel>既往症・アレルギー</FormLabel>
          <FormTextarea
            value={value.medicalNotes}
            onChange={(v) => update("medicalNotes", v)}
            rows={4}
          />
        </label>

        <label className="md:col-span-2">
          <FormLabel>備考</FormLabel>
          <FormTextarea
            value={value.memo}
            onChange={(v) => update("memo", v)}
            rows={4}
          />
        </label>
      </div>
    </section>
  );
}