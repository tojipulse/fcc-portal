"use client";

import FormInput from "../../../components/ui/form/FormInput";
import FormLabel from "../../../components/ui/form/FormLabel";

import type { HouseholdFormData } from "./types";

type HouseholdFormProps = {
  value: HouseholdFormData;
  onChange: (value: HouseholdFormData) => void;
};

export default function HouseholdForm({ value }: HouseholdFormProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <div className="text-lg font-black text-slate-900">ログイン情報</div>

      <div className="mt-2 text-xs font-bold leading-5 text-slate-600">
        ログインIDと初期パスワードは自動生成されます。
      </div>

      <div className="mt-4 space-y-4">
        <label className="block">
          <FormLabel>ログインID</FormLabel>

          <FormInput value={value.loginId} readOnly />
        </label>

        <label className="block">
          <FormLabel>初期パスワード</FormLabel>

          <FormInput value={value.password} readOnly />
        </label>
      </div>
    </section>
  );
}