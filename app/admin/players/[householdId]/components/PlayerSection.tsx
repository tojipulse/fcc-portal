"use client";

import { useState } from "react";

import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import FormInput from "../../../../components/ui/form/FormInput";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";
import FormTextarea from "../../../../components/ui/form/FormTextarea";

import type { PlayerEditFormData } from "../types";

type PlayerSectionProps = {
  open: boolean;
  players: PlayerEditFormData[];
  onToggle: () => void;
  onChange: (players: PlayerEditFormData[]) => void;
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

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function createPlayer(): PlayerEditFormData {
  return {
    id: `player-${Date.now()}-${Math.random()}`,
    lastName: "",
    firstName: "",
    lastNameKana: "",
    firstNameKana: "",
    nickname: "",
    gradeId: "kids",
    birthday: "",
    school: "",
    medicalNotes: "",
    memo: "",
    status: "active",
    retirementDate: "",
  };
}

function getGradeName(gradeId: string) {
  return grades.find((grade) => grade.id === gradeId)?.name ?? "未設定";
}

function getPlayerName(player: PlayerEditFormData) {
  const name = `${player.lastName} ${player.firstName}`.trim();

  return name || player.nickname || "未入力の選手";
}

export default function PlayerSection({
  open,
  players,
  onToggle,
  onChange,
}: PlayerSectionProps) {
  const [openPlayerIds, setOpenPlayerIds] = useState<string[]>([]);

  const togglePlayer = (id: string) => {
    setOpenPlayerIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id]
    );
  };

  const updatePlayer = (
    index: number,
    key: keyof PlayerEditFormData,
    value: string
  ) => {
    const next = [...players];

    const player = {
      ...next[index],
      [key]: value,
    } as PlayerEditFormData;

    if (key === "status") {
      player.retirementDate = value === "retired" ? player.retirementDate || getToday() : "";
    }

    next[index] = player;

    onChange(next);
  };

  const addPlayer = () => {
    const player = createPlayer();

    onChange([...players, player]);
    setOpenPlayerIds((current) => [...current, player.id]);
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
            ⚽ 選手
          </div>

          <div className="mt-1 text-sm font-bold text-slate-600">
            登録済み：{players.length}名
          </div>
        </div>

        <div className="text-2xl font-black text-slate-400">
          {open ? "⌃" : "＞"}
        </div>
      </button>

      {open && (
        <div className="mt-5 space-y-4">
          {players.map((player, index) => {
            const isOpen = openPlayerIds.includes(player.id);

            return (
              <div
                key={player.id}
                className="rounded-xl border border-slate-200 bg-slate-50"
              >
                <button
                  type="button"
                  onClick={() => togglePlayer(player.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div>
                    <div className="font-black text-slate-900">
                      {getPlayerName(player)}
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-600">
                      {getGradeName(player.gradeId)} /{" "}
                      {player.status === "active" ? "在籍" : "退団"}
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
                          value={player.lastName}
                          onChange={(v) =>
                            updatePlayer(index, "lastName", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>名</FormLabel>
                        <FormInput
                          value={player.firstName}
                          onChange={(v) =>
                            updatePlayer(index, "firstName", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>せい</FormLabel>
                        <FormInput
                          value={player.lastNameKana}
                          onChange={(v) =>
                            updatePlayer(index, "lastNameKana", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>めい</FormLabel>
                        <FormInput
                          value={player.firstNameKana}
                          onChange={(v) =>
                            updatePlayer(index, "firstNameKana", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>学年</FormLabel>
                        <FormSelect
                          value={player.gradeId}
                          onChange={(v) =>
                            updatePlayer(index, "gradeId", v)
                          }
                        >
                          {grades.map((grade) => (
                            <option key={grade.id} value={grade.id}>
                              {grade.name}
                            </option>
                          ))}
                        </FormSelect>
                      </label>

                      <label>
                        <FormLabel>ニックネーム</FormLabel>
                        <FormInput
                          value={player.nickname}
                          onChange={(v) =>
                            updatePlayer(index, "nickname", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>生年月日</FormLabel>
                        <FormInput
                          type="date"
                          value={player.birthday}
                          onChange={(v) =>
                            updatePlayer(index, "birthday", v)
                          }
                        />
                      </label>

                      <label>
                        <FormLabel>小学校</FormLabel>
                        <FormInput
                          value={player.school}
                          onChange={(v) => updatePlayer(index, "school", v)}
                        />
                      </label>

                      <label className="md:col-span-2">
                        <FormLabel>既往症・アレルギー</FormLabel>
                        <FormTextarea
                          value={player.medicalNotes}
                          onChange={(v) =>
                            updatePlayer(index, "medicalNotes", v)
                          }
                        />
                      </label>

                      <label className="md:col-span-2">
                        <FormLabel>備考</FormLabel>
                        <FormTextarea
                          value={player.memo}
                          onChange={(v) => updatePlayer(index, "memo", v)}
                        />
                      </label>
                    </div>

                    <div className="mt-5 rounded-lg bg-white p-4">
                      <div className="mb-3 font-black">在籍状況</div>

                      <label className="mr-6">
                        <input
                          type="radio"
                          checked={player.status === "active"}
                          onChange={() =>
                            updatePlayer(index, "status", "active")
                          }
                        />
                        <span className="ml-2">在籍</span>
                      </label>

                      <label>
                        <input
                          type="radio"
                          checked={player.status === "retired"}
                          onChange={() =>
                            updatePlayer(index, "status", "retired")
                          }
                        />
                        <span className="ml-2">退団</span>
                      </label>

                      {player.status === "retired" && (
                        <div className="mt-4">
                          <FormLabel>退団日</FormLabel>
                          <FormInput
                            type="date"
                            value={player.retirementDate}
                            onChange={(v) =>
                              updatePlayer(index, "retirementDate", v)
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          <Button
            type="button"
            variant="secondary"
            onClick={addPlayer}
            fullWidth
          >
            ＋ 選手を追加
          </Button>
        </div>
      )}
    </Card>
  );
}