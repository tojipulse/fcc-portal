"use client";

import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/form/FormInput";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";

import {
  coachLicenses,
  refereeLicenses,
} from "../../constants";

import type { CoachLicenseFormData } from "../types";

type CoachLicenseEditorProps = {
  licenses: CoachLicenseFormData[];
  onChange: (licenses: CoachLicenseFormData[]) => void;
};

const licenseCategories = [
  { id: "coach", label: "コーチ資格" },
  { id: "referee", label: "審判資格" },
  { id: "other", label: "その他" },
];

function createLicense(): CoachLicenseFormData {
  return {
    id: `license-${Date.now()}-${Math.random()}`,
    category: "coach",
    name: coachLicenses[0] ?? "",
    registrationNumber: "",
    acquiredDate: "",
    expireDate: "",
  };
}

function getLicenseOptions(category: string) {
  if (category === "referee") return refereeLicenses;
  if (category === "coach") return coachLicenses;

  return ["その他"];
}

export default function CoachLicenseEditor({
  licenses,
  onChange,
}: CoachLicenseEditorProps) {
  const updateLicense = (
    index: number,
    key: keyof CoachLicenseFormData,
    value: string
  ) => {
    const next = [...licenses];

    const license = {
      ...next[index],
      [key]: value,
    };

    if (key === "category") {
      license.name = getLicenseOptions(value)[0] ?? "";
    }

    next[index] = license;

    onChange(next);
  };

  const removeLicense = (index: number) => {
    onChange(licenses.filter((_, currentIndex) => currentIndex !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="text-base font-black text-slate-900">
          資格
        </div>

        <div className="mt-1 text-sm font-bold text-slate-600">
          JFA IDとは別に、資格ごとの登録番号も任意で管理します。
        </div>
      </div>

      {licenses.map((license, index) => (
        <div
          key={license.id}
          className="rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-black text-slate-700">
              資格 {index + 1}
            </div>

            <button
              type="button"
              onClick={() => removeLicense(index)}
              className="text-sm font-black text-red-600"
            >
              削除
            </button>
          </div>

          <div className="grid gap-4">
            <label>
              <FormLabel>資格区分</FormLabel>
              <FormSelect
                value={license.category}
                onChange={(v) => updateLicense(index, "category", v)}
              >
                {licenseCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </FormSelect>
            </label>

            <label>
              <FormLabel>資格名</FormLabel>
              <FormSelect
                value={license.name}
                onChange={(v) => updateLicense(index, "name", v)}
              >
                {getLicenseOptions(license.category).map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </FormSelect>
            </label>

            <label>
              <FormLabel>資格登録番号</FormLabel>
              <FormInput
                value={license.registrationNumber}
                onChange={(v) =>
                  updateLicense(index, "registrationNumber", v)
                }
                placeholder="任意"
              />
            </label>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <FormLabel>取得日</FormLabel>
                <FormInput
                  type="date"
                  value={license.acquiredDate}
                  onChange={(v) =>
                    updateLicense(index, "acquiredDate", v)
                  }
                />
              </label>

              <label>
                <FormLabel>有効期限</FormLabel>
                <FormInput
                  type="date"
                  value={license.expireDate}
                  onChange={(v) => updateLicense(index, "expireDate", v)}
                />
              </label>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        fullWidth
        onClick={() => onChange([...licenses, createLicense()])}
      >
        ＋ 資格を追加
      </Button>
    </div>
  );
}