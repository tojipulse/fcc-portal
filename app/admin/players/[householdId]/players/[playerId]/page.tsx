"use client";

import Link from "next/link";
import { useState } from "react";

import AppHeader from "../../../../../components/layout/AppHeader";
import PageContainer from "../../../../../components/layout/PageContainer";
import Card from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import PageBackButton from "../../../../../../components/ui/PageBackButton";

import FormInput from "../../../../../components/ui/form/FormInput";
import FormLabel from "../../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../../components/ui/form/FormSelect";
import FormTextarea from "../../../../../components/ui/form/FormTextarea";

type PlayerEditPageProps = {
  params: {
    householdId: string;
    playerId: string;
  };
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

function getTodayText() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function PlayerEditPage({ params }: PlayerEditPageProps) {
  const { householdId, playerId } = params;

  const [lastName, setLastName] = useState("戸島");
  const [firstName, setFirstName] = useState("維吹");
  const [lastNameKana, setLastNameKana] = useState("とじま");
  const [firstNameKana, setFirstNameKana] = useState("いぶき");
  const [nickname, setNickname] = useState("いぶき");
  const [gradeId, setGradeId] = useState("2");

  const [birthday, setBirthday] = useState("");
  const [school, setSchool] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [address, setAddress] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");
  const [memo, setMemo] = useState("");

  const [retired, setRetired] = useState(false);
  const [retirementDate, setRetirementDate] = useState("");

  const [saved, setSaved] = useState(false);

  const toggleRetired = () => {
    const nextRetired = !retired;
    setRetired(nextRetired);
    setRetirementDate(nextRetired ? getTodayText() : "");
    setSaved(false);
  };

  const save = () => {
    setSaved(true);

    console.log({
      householdId,
      playerId,
      lastName,
      firstName,
      lastNameKana,
      firstNameKana,
      nickname,
      gradeId,
      birthday,
      school,
      postalCode,
      address,
      medicalNotes,
      memo,
      retired,
      retirementDate,
    });
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath={`/admin/players/${householdId}`} />
      </section>

      <AppHeader title="選手編集" subtitle={`${firstName}の情報`} />

      <section className="space-y-5 px-4 py-5">
        {saved && (
          <Card>
            <div className="text-center text-sm font-black text-green-700">
              保存しました
            </div>
          </Card>
        )}

        <Card>
          <div className="text-lg font-black text-slate-900">基本情報</div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label>
              <FormLabel required>姓</FormLabel>
              <FormInput value={lastName} onChange={setLastName} />
            </label>

            <label>
              <FormLabel required>名</FormLabel>
              <FormInput value={firstName} onChange={setFirstName} />
            </label>

            <label>
              <FormLabel required>せい</FormLabel>
              <FormInput value={lastNameKana} onChange={setLastNameKana} />
            </label>

            <label>
              <FormLabel required>めい</FormLabel>
              <FormInput value={firstNameKana} onChange={setFirstNameKana} />
            </label>

            <label>
              <FormLabel required>学年</FormLabel>
              <FormSelect value={gradeId} onChange={setGradeId}>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.name}
                  </option>
                ))}
              </FormSelect>
            </label>

            <label>
              <FormLabel required>ニックネーム</FormLabel>
              <FormInput value={nickname} onChange={setNickname} />
            </label>

            <label>
              <FormLabel>生年月日</FormLabel>
              <FormInput type="date" value={birthday} onChange={setBirthday} />
            </label>

            <label>
              <FormLabel>小学校</FormLabel>
              <FormInput value={school} onChange={setSchool} />
            </label>
          </div>
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">住所</div>

          <div className="mt-4 grid gap-4">
            <label>
              <FormLabel>郵便番号</FormLabel>
              <FormInput value={postalCode} onChange={setPostalCode} />
            </label>

            <label>
              <FormLabel>住所</FormLabel>
              <FormInput value={address} onChange={setAddress} />
            </label>
          </div>
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">健康情報</div>

          <div className="mt-4">
            <FormLabel>既往症・アレルギー</FormLabel>
            <FormTextarea
              value={medicalNotes}
              onChange={setMedicalNotes}
              rows={4}
            />
          </div>
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">在籍状況</div>

          <button
            type="button"
            onClick={toggleRetired}
            className={`mt-4 w-full rounded-xl border px-4 py-3 text-left text-sm font-black ${
              retired
                ? "border-slate-400 bg-slate-100 text-slate-800"
                : "border-green-300 bg-green-50 text-green-700"
            }`}
          >
            {retired ? "☑ 退団済み" : "☐ 在籍中"}
          </button>

          {retired && (
            <label className="mt-4 block">
              <FormLabel>退団日</FormLabel>
              <FormInput
                type="date"
                value={retirementDate}
                onChange={setRetirementDate}
              />
            </label>
          )}
        </Card>

        <Card>
          <div className="text-lg font-black text-slate-900">備考</div>

          <div className="mt-4">
            <FormTextarea value={memo} onChange={setMemo} rows={4} />
          </div>
        </Card>

        <Button fullWidth onClick={save}>
          保存
        </Button>

        <Link href={`/admin/players/${householdId}`}>
          <Button variant="secondary" fullWidth>
            家庭編集へ戻る
          </Button>
        </Link>
      </section>
    </PageContainer>
  );
}