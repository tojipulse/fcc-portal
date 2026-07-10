"use client";

import { useState } from "react";
import Button from "../ui/Button";
import SelectableButton from "../ui/SelectableButton";

type AttendanceStatus = "attend" | "absent" | "pending" | "";

type PlayerOption = {
  id: string;
  label: string;
};

type AttendanceFormProps = {
  players: PlayerOption[];
};

export default function AttendanceForm({ players }: AttendanceFormProps) {
  const [selectedPlayerId, setSelectedPlayerId] = useState(
    players[0]?.id ?? ""
  );

  const [status, setStatus] = useState<AttendanceStatus>("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const canSave = selectedPlayerId !== "" && status !== "";
  const showStatusError = submitted && status === "";

  const handleSave = () => {
    setSubmitted(true);

    if (!canSave) {
      return;
    }

    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      setSaved(true);

      console.log({
        playerId: selectedPlayerId,
        status,
        comment,
      });
    }, 500);
  };

  const handleChangeStatus = (nextStatus: AttendanceStatus) => {
    setStatus(nextStatus);
    setSaved(false);
  };

  const handleChangeComment = (nextComment: string) => {
    setComment(nextComment);
    setSaved(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="mb-2 text-sm font-black text-slate-800">選手</div>

        <select
          value={selectedPlayerId}
          onChange={(event) => {
            setSelectedPlayerId(event.target.value);
            setSaved(false);
          }}
          className="h-12 w-full rounded-xl border border-slate-300 bg-white px-3 text-base font-black text-slate-900"
        >
          {players.map((player) => (
            <option key={player.id} value={player.id}>
              {player.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div className="text-sm font-black text-slate-800">出欠</div>

          {showStatusError && (
            <div className="text-sm font-black text-red-600">
              必須入力です
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <SelectableButton
            label="出"
            variant="green"
            selected={status === "attend"}
            onClick={() => handleChangeStatus("attend")}
          />

          <SelectableButton
            label="欠"
            variant="red"
            selected={status === "absent"}
            onClick={() => handleChangeStatus("absent")}
          />

          <SelectableButton
            label="未"
            variant="yellow"
            selected={status === "pending"}
            onClick={() => handleChangeStatus("pending")}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 text-sm font-black text-slate-800">コメント</div>

        <textarea
          value={comment}
          onChange={(event) => handleChangeComment(event.target.value)}
          className="min-h-28 w-full rounded-xl border border-slate-300 p-3 text-base font-bold text-slate-800 outline-none"
          placeholder="例：少し遅れます"
        />
      </div>

      {saved && (
        <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
          保存しました
        </div>
      )}

      <Button fullWidth onClick={handleSave} disabled={saving || saved}>
        {saving ? "保存中..." : saved ? "保存済み" : "保存する"}
      </Button>
    </div>
  );
}