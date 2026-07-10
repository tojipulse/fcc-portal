"use client";

import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/form/FormInput";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";

import { guardians } from "../../../../data/guardians";

import type { AddMode } from "../types";

type BasicInfoSectionProps = {
  mode: AddMode;
  selectedGuardianId: string;
  name: string;
  kana: string;
  phone: string;
  email: string;
  jfaId: string;
  onModeChange: (mode: AddMode) => void;
  onSelectedGuardianIdChange: (value: string) => void;
  onNameChange: (value: string) => void;
  onKanaChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onJfaIdChange: (value: string) => void;
};

export default function BasicInfoSection({
  mode,
  selectedGuardianId,
  name,
  kana,
  phone,
  email,
  jfaId,
  onModeChange,
  onSelectedGuardianIdChange,
  onNameChange,
  onKanaChange,
  onPhoneChange,
  onEmailChange,
  onJfaIdChange,
}: BasicInfoSectionProps) {
  const targetGuardian = guardians.find(
    (guardian) => guardian.id === selectedGuardianId
  );

  return (
    <>
      <Card>
        <div className="mb-3 text-sm font-black text-slate-700">
          登録方法
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant={mode === "existing" ? "primary" : "secondary"}
            fullWidth
            onClick={() => onModeChange("existing")}
          >
            既存保護者
          </Button>

          <Button
            type="button"
            variant={mode === "new" ? "primary" : "secondary"}
            fullWidth
            onClick={() => onModeChange("new")}
          >
            新規コーチ
          </Button>
        </div>
      </Card>

      <Card>
        <div className="mb-4 text-base font-black text-slate-900">
          基本情報
        </div>

        <div className="space-y-4">
          {mode === "existing" && (
            <label>
              <FormLabel>保護者から選択</FormLabel>
              <FormSelect
                value={selectedGuardianId}
                onChange={onSelectedGuardianIdChange}
              >
                <option value="">選択してください</option>

                {guardians.map((guardian) => (
                  <option key={guardian.id} value={guardian.id}>
                    {guardian.name}
                  </option>
                ))}
              </FormSelect>
            </label>
          )}

          {mode === "existing" && targetGuardian && (
            <div className="rounded-xl bg-blue-50 p-3 text-sm font-bold text-blue-800">
              選択中：{targetGuardian.name}
            </div>
          )}

          {mode === "new" && (
            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <FormLabel>氏名</FormLabel>
                <FormInput
                  value={name}
                  onChange={onNameChange}
                  placeholder="例：山田 太郎"
                />
              </label>

              <label>
                <FormLabel>ふりがな</FormLabel>
                <FormInput
                  value={kana}
                  onChange={onKanaChange}
                  placeholder="例：やまだ たろう"
                />
              </label>

              <label>
                <FormLabel>電話番号</FormLabel>
                <FormInput value={phone} onChange={onPhoneChange} />
              </label>

              <label>
                <FormLabel>メールアドレス</FormLabel>
                <FormInput value={email} onChange={onEmailChange} />
              </label>
            </div>
          )}

          <label>
            <FormLabel>JFA ID</FormLabel>
            <FormInput
              value={jfaId}
              onChange={onJfaIdChange}
              placeholder="例：JFA000000000000"
            />
          </label>
        </div>
      </Card>
    </>
  );
}