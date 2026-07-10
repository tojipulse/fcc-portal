"use client";

import Card from "../../../../components/ui/Card";
import FormInput from "../../../../components/ui/form/FormInput";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";

import type {
  EmergencyContactFormData,
  HouseholdEditFormData,
} from "../types";

type HouseholdSectionProps = {
  open: boolean;
  value: HouseholdEditFormData;
  onToggle: () => void;
  onChange: (value: HouseholdEditFormData) => void;
};

const relationships = ["父", "母", "祖父", "祖母", "その他"];

export default function HouseholdSection({
  open,
  value,
  onToggle,
  onChange,
}: HouseholdSectionProps) {
  const updateValue = (
    key: keyof HouseholdEditFormData,
    nextValue: string
  ) => {
    onChange({
      ...value,
      [key]: nextValue,
    });
  };

  const updateEmergencyContact = (
    index: number,
    key: keyof EmergencyContactFormData,
    nextValue: string
  ) => {
    const nextContacts = [...value.emergencyContacts];

    nextContacts[index] = {
      ...nextContacts[index],
      [key]: nextValue,
    };

    onChange({
      ...value,
      emergencyContacts: nextContacts,
    });
  };

  return (
    <Card>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <div className="text-lg font-black text-slate-900">
            🏠 家庭情報
          </div>

          <div className="mt-1 text-sm font-bold text-slate-600">
            緊急連絡先・住所
          </div>
        </div>

        <div className="text-2xl font-black text-slate-400">
          {open ? "⌃" : "＞"}
        </div>
      </button>

      {open && (
        <div className="mt-5 space-y-5">
          <section className="rounded-xl bg-slate-50 p-4">
            <div className="mb-3 text-base font-black text-slate-900">
              緊急連絡先
            </div>

            <div className="space-y-4">
              {value.emergencyContacts.map((contact, index) => (
                <div
                  key={contact.id}
                  className="rounded-xl border border-slate-200 bg-white p-4"
                >
                  <div className="mb-3 text-sm font-black text-slate-700">
                    緊急連絡先{index + 1}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label>
                      <FormLabel>氏名</FormLabel>
                      <FormInput
                        value={contact.name}
                        onChange={(v) =>
                          updateEmergencyContact(index, "name", v)
                        }
                      />
                    </label>

                    <label>
                      <FormLabel>続柄</FormLabel>
                      <FormSelect
                        value={contact.relationship}
                        onChange={(v) =>
                          updateEmergencyContact(index, "relationship", v)
                        }
                      >
                        {relationships.map((relationship) => (
                          <option key={relationship} value={relationship}>
                            {relationship}
                          </option>
                        ))}
                      </FormSelect>
                    </label>

                    <label className="md:col-span-2">
                      <FormLabel>電話番号</FormLabel>
                      <FormInput
                        value={contact.phone}
                        onChange={(v) =>
                          updateEmergencyContact(index, "phone", v)
                        }
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl bg-slate-50 p-4">
            <div className="mb-3 text-base font-black text-slate-900">
              住所
            </div>

            <div className="grid gap-4">
              <label>
                <FormLabel>郵便番号</FormLabel>
                <FormInput
                  value={value.postalCode}
                  onChange={(v) => updateValue("postalCode", v)}
                  placeholder="例：116-0000"
                />
              </label>

              <label>
                <FormLabel>住所</FormLabel>
                <FormInput
                  value={value.address}
                  onChange={(v) => updateValue("address", v)}
                  placeholder="例：荒川区南千住..."
                />
              </label>
            </div>
          </section>
        </div>
      )}
    </Card>
  );
}