"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Button from "../../../components/ui/Button";
import PageBackButton from "../../../../components/ui/PageBackButton";

import { guardians as guardianData } from "../../../data/guardians";
import { players as playerData } from "../../../data/players";

import GuardianSection from "./components/GuardianSection";
import HouseholdSection from "./components/HouseholdSection";
import PlayerSection from "./components/PlayerSection";

import type {
  EmergencyContactFormData,
  GuardianEditFormData,
  HouseholdEditFormData,
  PlayerEditFormData,
  SectionId,
} from "./types";

const relationLabels: Record<string, string> = {
  father: "父",
  mother: "母",
  grandfather: "祖父",
  grandmother: "祖母",
  other: "その他",
};

function splitName(name: string) {
  const parts = name.split(/[ 　]/).filter(Boolean);

  return {
    lastName: parts[0] ?? "",
    firstName: parts.slice(1).join("") || "",
  };
}

function createEmergencyContact(index: number): EmergencyContactFormData {
  return {
    id: `emergency-${index + 1}`,
    name: "",
    relationship: index === 0 ? "父" : "母",
    phone: "",
  };
}

function createHouseholdForm(): HouseholdEditFormData {
  return {
    postalCode: "",
    address: "",
    emergencyContacts: [createEmergencyContact(0), createEmergencyContact(1)],
  };
}

function createGuardianForms(householdId: string): GuardianEditFormData[] {
  return guardianData
    .filter((guardian) => guardian.householdId === householdId)
    .map((guardian) => {
      const name = splitName(guardian.name);

      return {
        id: guardian.id,
        lastName: name.lastName,
        firstName: name.firstName,
        lastNameKana: "",
        firstNameKana: "",
        relationship: relationLabels[guardian.relation] ?? "その他",
        phone: "",
        email: "",
        loginId: guardian.loginId,
        password: "fcc2026",
        role: "guardian",
      };
    });
}

function createPlayerForms(householdId: string): PlayerEditFormData[] {
  return playerData
    .filter((player) => player.householdId === householdId)
    .map((player) => ({
      id: player.id,
      lastName: "",
      firstName: player.firstName,
      lastNameKana: "",
      firstNameKana: "",
      nickname: player.firstName,
      gradeId: player.gradeId,
      birthday: "",
      school: "",
      medicalNotes: "",
      memo: "",
      status: player.isActive ? "active" : "retired",
      retirementDate: player.leftAt ?? "",
    }));
}

function getHouseholdId(params: ReturnType<typeof useParams>) {
  const value = params.householdId;

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default function HouseholdEditPage() {
  const params = useParams();
  const householdId = getHouseholdId(params);

  const [openSections, setOpenSections] = useState<SectionId[]>([
    "household",
    "guardians",
    "players",
  ]);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [household, setHousehold] =
    useState<HouseholdEditFormData>(createHouseholdForm());

  const [guardians, setGuardians] = useState<GuardianEditFormData[]>(
    createGuardianForms(householdId)
  );

  const [players, setPlayers] = useState<PlayerEditFormData[]>(
    createPlayerForms(householdId)
  );

  const toggleSection = (sectionId: SectionId) => {
    setOpenSections((current) =>
      current.includes(sectionId)
        ? current.filter((id) => id !== sectionId)
        : [...current, sectionId]
    );
  };

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      console.log({
        householdId,
        household,
        guardians,
        players,
      });
    }, 500);
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/players" />
      </section>

      <AppHeader title="家庭管理" subtitle="家庭情報の確認・編集" />

      <section className="space-y-5 px-4 py-5">
        <HouseholdSection
          open={openSections.includes("household")}
          value={household}
          onToggle={() => toggleSection("household")}
          onChange={(value) => {
            setSaved(false);
            setHousehold(value);
          }}
        />

        <GuardianSection
          open={openSections.includes("guardians")}
          guardians={guardians}
          onToggle={() => toggleSection("guardians")}
          onChange={(value) => {
            setSaved(false);
            setGuardians(value);
          }}
        />

        <PlayerSection
          open={openSections.includes("players")}
          players={players}
          onToggle={() => toggleSection("players")}
          onChange={(value) => {
            setSaved(false);
            setPlayers(value);
          }}
        />

        {saved && (
          <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
            保存しました
          </div>
        )}

        <Button fullWidth onClick={handleSave} disabled={saving || saved}>
          {saving ? "保存中..." : saved ? "保存済み" : "保存する"}
        </Button>
      </section>
    </PageContainer>
  );
}