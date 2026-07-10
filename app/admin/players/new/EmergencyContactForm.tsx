"use client";

import FormInput from "../../../components/ui/form/FormInput";
import FormLabel from "../../../components/ui/form/FormLabel";

import type { EmergencyContact } from "./types";

type EmergencyContactFormProps = {
  contacts: EmergencyContact[];
  onChange: (contacts: EmergencyContact[]) => void;
};

export default function EmergencyContactForm({
  contacts,
  onChange,
}: EmergencyContactFormProps) {
  const updateContact = (
    index: number,
    key: keyof EmergencyContact,
    value: string
  ) => {
    const next = [...contacts];

    next[index] = {
      ...next[index],
      [key]: value,
    };

    onChange(next);
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow">
      <div className="text-lg font-black text-slate-900">
        緊急連絡先
      </div>

      <div className="mt-4 space-y-6">
        {contacts.map((contact, index) => (
          <div
            key={contact.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="mb-4 text-base font-black text-slate-800">
              緊急連絡先 {index + 1}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <FormLabel>氏名</FormLabel>

                <FormInput
                  value={contact.name}
                  onChange={(v) =>
                    updateContact(index, "name", v)
                  }
                />
              </label>

              <label>
                <FormLabel>続柄</FormLabel>

                <FormInput
                  value={contact.relationship}
                  onChange={(v) =>
                    updateContact(index, "relationship", v)
                  }
                />
              </label>

              <label className="md:col-span-2">
                <FormLabel>電話番号</FormLabel>

                <FormInput
                  value={contact.phone}
                  onChange={(v) =>
                    updateContact(index, "phone", v)
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}