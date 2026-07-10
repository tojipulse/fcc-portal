"use client";

import { useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import FormTextarea from "../../../components/ui/form/FormTextarea";
import FormLabel from "../../../components/ui/form/FormLabel";
import PageBackButton from "../../../../components/ui/PageBackButton";

import { gradeFilters } from "../constants";

import CoachLicenseEditor from "./components/CoachLicenseEditor";
import CoachPositionEditor from "./components/CoachPositionEditor";
import BasicInfoSection from "./sections/BasicInfoSection";
import StatusSection from "./sections/StatusSection";

import type {
  AddMode,
  CoachLicenseFormData,
  CoachPositionFormData,
  CoachStatus,
} from "./types";

export default function CoachNewPage() {
  const [mode, setMode] = useState<AddMode>("existing");
  const [selectedGuardianId, setSelectedGuardianId] = useState("");
  const [status, setStatus] = useState<CoachStatus>("active");
  const [name, setName] = useState("");
  const [kana, setKana] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [jfaId, setJfaId] = useState("");
  const [grades, setGrades] = useState<string[]>([]);
  const [licenses, setLicenses] = useState<CoachLicenseFormData[]>([]);
  const [positions, setPositions] = useState<CoachPositionFormData[]>([]);
  const [memo, setMemo] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const canSave =
    mode === "existing" ? selectedGuardianId !== "" : name.trim() !== "";

  const markChanged = () => {
    setSaved(false);
  };

  const toggleGrade = (gradeId: string) => {
    markChanged();

    setGrades((current) =>
      current.includes(gradeId)
        ? current.filter((id) => id !== gradeId)
        : [...current, gradeId]
    );
  };

  const handleSave = () => {
    if (!canSave) return;

    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      console.log({
        mode,
        selectedGuardianId,
        status,
        name,
        kana,
        phone,
        email,
        jfaId,
        grades,
        licenses,
        positions,
        memo,
      });
    }, 500);
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/coaches" />
      </section>

      <AppHeader title="コーチ登録・修正" subtitle="基本情報・資格・役職" />

      <section className="space-y-5 px-4 py-5">
        <BasicInfoSection
          mode={mode}
          selectedGuardianId={selectedGuardianId}
          name={name}
          kana={kana}
          phone={phone}
          email={email}
          jfaId={jfaId}
          onModeChange={(value) => {
            markChanged();
            setMode(value);
          }}
          onSelectedGuardianIdChange={(value) => {
            markChanged();
            setSelectedGuardianId(value);
          }}
          onNameChange={(value) => {
            markChanged();
            setName(value);
          }}
          onKanaChange={(value) => {
            markChanged();
            setKana(value);
          }}
          onPhoneChange={(value) => {
            markChanged();
            setPhone(value);
          }}
          onEmailChange={(value) => {
            markChanged();
            setEmail(value);
          }}
          onJfaIdChange={(value) => {
            markChanged();
            setJfaId(value);
          }}
        />

        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            担当学年
          </div>

          <div className="flex flex-wrap gap-2">
            {gradeFilters
              .filter((grade) => grade.id !== "all")
              .map((grade) => (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => toggleGrade(grade.id)}
                  className={`rounded-full px-4 py-2 text-sm font-black ${
                    grades.includes(grade.id)
                      ? "bg-red-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {grade.label}
                </button>
              ))}
          </div>
        </Card>

        <Card>
          <CoachLicenseEditor
            licenses={licenses}
            onChange={(value) => {
              markChanged();
              setLicenses(value);
            }}
          />
        </Card>

        <Card>
          <CoachPositionEditor
            positions={positions}
            onChange={(value) => {
              markChanged();
              setPositions(value);
            }}
          />
        </Card>

        <Card>
          <label>
            <FormLabel>備考</FormLabel>
            <FormTextarea
              value={memo}
              onChange={(value) => {
                markChanged();
                setMemo(value);
              }}
              placeholder="コーチに関する補足事項"
            />
          </label>
        </Card>

        <StatusSection
          status={status}
          onChange={(value) => {
            markChanged();
            setStatus(value);
          }}
        />

        {saved && (
          <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
            保存しました
          </div>
        )}

        <Button
          fullWidth
          onClick={handleSave}
          disabled={!canSave || saving || saved}
        >
          {saving ? "保存中..." : saved ? "保存済み" : "保存する"}
        </Button>
      </section>
    </PageContainer>
  );
}