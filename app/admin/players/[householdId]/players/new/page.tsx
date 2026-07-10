"use client";

import { useState } from "react";

import AppHeader from "../../../../../components/layout/AppHeader";
import PageContainer from "../../../../../components/layout/PageContainer";
import Card from "../../../../../components/ui/Card";
import Button from "../../../../../components/ui/Button";
import PageBackButton from "../../../../../../components/ui/PageBackButton";

import PlayerForm from "../../../new/PlayerForm";
import EmergencyContactForm from "../../../new/EmergencyContactForm";

import type {
  PlayerFormData,
  EmergencyContact,
} from "../../../new/types";

type PlayerNewPageProps = {
  params: {
    householdId: string;
  };
};

function createId() {
  return `id-${Date.now()}-${Math.random()
    .toString(36)
    .substring(2, 10)}`;
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

export default function PlayerNewPage({ params }: PlayerNewPageProps) {
  const { householdId } = params;

  const [player, setPlayer] = useState<PlayerFormData>(
    createPlayer()
  );

  const [saved, setSaved] = useState(false);

  const save = () => {
    setSaved(true);

    console.log({
      householdId,
      player,
    });
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton
          fallbackPath={`/admin/players/${householdId}`}
        />
      </section>

      <AppHeader
        title="選手を追加"
        subtitle="兄弟・追加選手登録"
      />

      <section className="space-y-5 px-4 py-5">
        {saved && (
          <Card>
            <div className="text-center text-sm font-black text-green-700">
              保存しました
            </div>
          </Card>
        )}

        <PlayerForm
          index={1}
          value={player}
          onChange={setPlayer}
        />

        <EmergencyContactForm
          contacts={player.emergencyContacts}
          onChange={(contacts) => {
            setPlayer({
              ...player,
              emergencyContacts: contacts,
            });
          }}
        />

        <Button fullWidth onClick={save}>
          保存
        </Button>
      </section>
    </PageContainer>
  );
}