"use client";

import { useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Button from "../../../components/ui/Button";
import PageBackButton from "../../../../components/ui/PageBackButton";

import HouseholdForm from "./HouseholdForm";
import GuardianForm from "./GuardianForm";
import PlayerForm from "./PlayerForm";
import EmergencyContactForm from "./EmergencyContactForm";
import RegistrationMessage from "./RegistrationMessage";

import type {
  HouseholdFormData,
  GuardianFormData,
  PlayerFormData,
  EmergencyContact,
} from "./types";

function createId() {
  return `id-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}`;
}

function createGuardian(index: number): GuardianFormData {
  return {
    id: createId(),
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    relationship: index === 0 ? "父" : "母",
    phone: "",
    email: "",
  };
}

function createEmergencyContacts(): EmergencyContact[] {
  return [
    {
      id: createId(),
      name: "",
      relationship: "",
      phone: "",
    },
    {
      id: createId(),
      name: "",
      relationship: "",
      phone: "",
    },
  ];
}

function createPlayer(): PlayerFormData {
  return {
    id: createId(),
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    nickname: "",
    gradeId: "kids",

    birthday: "",
    school: "",

    postalCode: "",
    address: "",

    medicalNotes: "",
    memo: "",

    emergencyContacts: createEmergencyContacts(),

    active: true,
    retirementDate: "",
  };
}

export default function NewPlayerPage() {
  const [saved, setSaved] = useState(false);

  const [household, setHousehold] = useState<HouseholdFormData>({
    loginId: "FCC260001",
    password: "fcc2026",
  });

  const [guardians, setGuardians] = useState([createGuardian(0)]);
  const [players, setPlayers] = useState([createPlayer()]);

  const addGuardian = () => {
    setGuardians([...guardians, createGuardian(guardians.length)]);
  };

  const addPlayer = () => {
    setPlayers([...players, createPlayer()]);
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/players" />
      </section>

      <AppHeader
        title="新しい家庭を登録"
        subtitle="保護者・選手情報"
      />

      <section className="space-y-5 px-4 py-5">
        <HouseholdForm value={household} onChange={setHousehold} />

        {guardians.map((guardian, index) => (
          <GuardianForm
            key={guardian.id}
            index={index + 1}
            value={guardian}
            onChange={(value) => {
              const next = [...guardians];
              next[index] = value;
              setGuardians(next);
            }}
          />
        ))}

        <Button variant="secondary" fullWidth onClick={addGuardian}>
          ＋ 保護者を追加
        </Button>

        {players.map((player, index) => (
          <div key={player.id} className="space-y-4">
            <PlayerForm
              index={index + 1}
              value={player}
              onChange={(value) => {
                const next = [...players];
                next[index] = value;
                setPlayers(next);
              }}
            />

            <EmergencyContactForm
              contacts={player.emergencyContacts}
              onChange={(contacts) => {
                const next = [...players];
                next[index] = {
                  ...next[index],
                  emergencyContacts: contacts,
                };
                setPlayers(next);
              }}
            />
          </div>
        ))}

        <Button variant="secondary" fullWidth onClick={addPlayer}>
          ＋ 選手を追加
        </Button>

        <Button fullWidth onClick={() => setSaved(true)}>
          保存
        </Button>

        {saved && (
          <RegistrationMessage
            guardianName={`${guardians[0].lastName}${guardians[0].firstName}`}
            loginId={household.loginId}
            password={household.password}
          />
        )}
      </section>
    </PageContainer>
  );
}