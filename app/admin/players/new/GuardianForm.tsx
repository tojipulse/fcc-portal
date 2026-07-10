"use client";

import FormInput from "../../../components/ui/form/FormInput";
import FormLabel from "../../../components/ui/form/FormLabel";
import FormSelect from "../../../components/ui/form/FormSelect";

import type { GuardianFormData } from "./types";

type GuardianFormProps = {
  index: number;
  value: GuardianFormData;
  onChange: (value: GuardianFormData) => void;
};

const relationships = [
  "父",
  "母",
  "祖父",
  "祖母",
  "その他",
] as const;

export default function GuardianForm({
  index,
  value,
  onChange,
}: GuardianFormProps) {
  const update = (
    key: keyof GuardianFormData,
    nextValue: string
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <div className="text-lg font-black text-slate-900">
        保護者{index}
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
          <FormLabel required>続柄</FormLabel>

          <FormSelect
            value={value.relationship}
            onChange={(v) => update("relationship", v)}
          >
            {relationships.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </FormSelect>
        </label>

        <label>
          <FormLabel>電話番号</FormLabel>

          <FormInput
            value={value.phone}
            onChange={(v) => update("phone", v)}
          />
        </label>

        <label className="md:col-span-2">
          <FormLabel>メールアドレス</FormLabel>

          <FormInput
            value={value.email}
            onChange={(v) => update("email", v)}
          />
        </label>
      </div>
    </section>
  );
}