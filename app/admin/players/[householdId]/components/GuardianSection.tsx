"use client";

import { useState } from "react";

import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/form/FormInput";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";

import type { GuardianEditFormData } from "../types";

type GuardianSectionProps = {
  open: boolean;
  guardians: GuardianEditFormData[];
  onToggle: () => void;
  onChange: (guardians: GuardianEditFormData[]) => void;
};

const relationships = ["父", "母", "祖父", "祖母", "その他"];

function createGuardian(): GuardianEditFormData {
  return {
    id: `guardian-${Date.now()}-${Math.random()}`,
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    relationship: "父",
    phone: "",
    email: "",
    loginId: "",
    password: "",
    role: "guardian",
  };
}

function getGuardianName(guardian: GuardianEditFormData) {
  const name = `${guardian.lastName} ${guardian.firstName}`.trim();

  return name || "未入力の保護者";
}

export default function GuardianSection({
  open,
  guardians,
  onToggle,
  onChange,
}: GuardianSectionProps) {
  const [openGuardianIds, setOpenGuardianIds] = useState<string[]>([]);

  const toggleGuardian = (id: string) => {
    setOpenGuardianIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id]
    );
  };

  const updateGuardian = (
    index: number,
    key: keyof GuardianEditFormData,
    value: string
  ) => {
    const next = [...guardians];

    next[index] = {
      ...next[index],
      [key]: value,
    } as GuardianEditFormData;

    onChange(next);
  };

  const addGuardian = () => {
    const guardian = createGuardian();

    onChange([...guardians, guardian]);
    setOpenGuardianIds((current) => [...current, guardian.id]);
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
            👨‍👩‍👧 保護者・大人
          </div>

          <div className="mt-1 text-sm font-bold text-slate-600">
            登録済み：{guardians.length}名
          </div>
        </div>

        <div className="text-2xl font-black text-slate-400">
          {open ? "⌃" : "＞"}
        </div>
      </button>

      {open && (
        <div className="mt-5 space-y-4">
          {guardians.map((guardian, index) => {
            const isOpen = openGuardianIds.includes(guardian.id);

            return (
              <div
                key={guardian.id}
                className="rounded-xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => toggleGuardian(guardian.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div>
                    <div className="font-black text-slate-900">
                      {getGuardianName(guardian)}（{guardian.relationship}）
                    </div>

                    <div className="mt-1 flex gap-3 text-sm font-bold text-slate-600">
                      {guardian.phone && <span>📞 {guardian.phone}</span>}
                      {guardian.email && <span>✉️ {guardian.email}</span>}
                    </div>
                  </div>

                  <div className="text-xl font-black text-slate-400">
                    {isOpen ? "⌃" : "＞"}
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-200 p-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <label>
                        <FormLabel>姓</FormLabel>
                        <FormInput
                          value={guardian.lastName}
                          onChange={(v) =>
                            updateGuardian(index, "lastName", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>名</FormLabel>
                        <FormInput
                          value={guardian.firstName}
                          onChange={(v) =>
                            updateGuardian(index, "firstName", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>せい</FormLabel>
                        <FormInput
                          value={guardian.lastNameKana}
                          onChange={(v) =>
                            updateGuardian(index, "lastNameKana", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>めい</FormLabel>
                        <FormInput
                          value={guardian.firstNameKana}
                          onChange={(v) =>
                            updateGuardian(index, "firstNameKana", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>続柄</FormLabel>
                        <FormSelect
                          value={guardian.relationship}
                          onChange={(v) =>
                            updateGuardian(index, "relationship", v)
                          }
                        >
                          {relationships.map((relationship) => (
                            <option key={relationship} value={relationship}>
                              {relationship}
                            </option>
                          ))}
                        </FormSelect>
                      </label>

                      <label>
                        <FormLabel>電話番号</FormLabel>
                        <FormInput
                          value={guardian.phone}
                          onChange={(v) =>
                            updateGuardian(index, "phone", v)
                          }
                        />
                      </label>

                      <label className="md:col-span-2">
                        <FormLabel>メールアドレス</FormLabel>
                        <FormInput
                          value={guardian.email}
                          onChange={(v) =>
                            updateGuardian(index, "email", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>ログインID</FormLabel>
                        <FormInput value={guardian.loginId} disabled />
                      </label>

                      <label>
                        <FormLabel>初期パスワード</FormLabel>
                        <FormInput value={guardian.password} disabled />
                      </label>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Button
            type="button"
            variant="secondary"
            onClick={addGuardian}
            fullWidth
          >
            ＋ 大人を追加
          </Button>
        </div>
      )}
    </Card>
  );
}