"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import MonthSwitcher from "../components/common/MonthSwitcher";
import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import SelectableButton from "../components/ui/SelectableButton";

import { scheduleTypes } from "../data/scheduleTypes";

import {
  formatDeadline,
  isAttendanceTarget,
  isGradeFilterVisibleSchedule,
  isPastLimitDate,
} from "../utils/schedule";

import { getLoginPlayers } from "../repositories/householdRepository";
import { getGradeName, getPlayer } from "../repositories/playerRepository";
import { getSchedulesByMonth } from "../repositories/scheduleRepository";

type AttendanceStatus = "attend" | "absent" | "pending" | "";

type AttendanceInput = {
  scheduleId: string;
  status: AttendanceStatus;
  comment: string;
};

function getScheduleType(scheduleTypeId: string) {
  return scheduleTypes.find((item) => item.id === scheduleTypeId);
}

function getPlayerName(playerId: string) {
  const player = getPlayer(playerId);
  return player?.firstName ?? playerId;
}

function getUniqueGradeIds() {
  return [
    ...new Set(
      getLoginPlayers()
        .map((player) => player.gradeId)
        .filter((gradeId) => gradeId !== "")
    ),
  ];
}

function getPlayersByLoginGrade(gradeId: string) {
  return getLoginPlayers().filter((player) => player.gradeId === gradeId);
}

export default function AttendanceListPage() {
  const loginPlayers = getLoginPlayers();
  const loginPlayerIds = loginPlayers.map((player) => player.id);
  const loginGradeIds = getUniqueGradeIds();

  const [selectedGradeId, setSelectedGradeId] = useState(
    loginGradeIds[0] ?? ""
  );

  const playersInSelectedGrade = useMemo(
    () => getPlayersByLoginGrade(selectedGradeId),
    [selectedGradeId]
  );

  const [selectedPlayerId, setSelectedPlayerId] = useState(
    playersInSelectedGrade[0]?.id ?? ""
  );

  const currentSelectedPlayerId =
    playersInSelectedGrade.find((player) => player.id === selectedPlayerId)
      ?.id ??
    playersInSelectedGrade[0]?.id ??
    "";

  const [displayMonth, setDisplayMonth] = useState(new Date(2026, 6, 1));

  const monthSchedules = getSchedulesByMonth(displayMonth);

  const initialInputs = monthSchedules.map((schedule) => ({
    scheduleId: schedule.id,
    status: "" as AttendanceStatus,
    comment: "",
  }));

  const [inputs, setInputs] = useState<AttendanceInput[]>(initialInputs);
  const [savedInputs, setSavedInputs] =
    useState<AttendanceInput[]>(initialInputs);

  const [commentScheduleId, setCommentScheduleId] = useState<string | null>(
    null
  );

  const [saving, setSaving] = useState(false);
  const [savedMessageVisible, setSavedMessageVisible] = useState(false);

  const monthLabel = `${displayMonth.getFullYear()}年${
    displayMonth.getMonth() + 1
  }月`;

  const filteredSchedules = monthSchedules.filter((schedule) =>
    isGradeFilterVisibleSchedule(schedule, loginPlayerIds, [selectedGradeId])
  );

  const hasEditableSchedules = filteredSchedules.some((schedule) => {
    const editable =
      !!currentSelectedPlayerId &&
      isAttendanceTarget(schedule, currentSelectedPlayerId, selectedGradeId);

    return editable && !isPastLimitDate(schedule);
  });

  const unansweredCount = filteredSchedules.filter((schedule) => {
    if (isPastLimitDate(schedule)) return false;

    if (
      !currentSelectedPlayerId ||
      !isAttendanceTarget(schedule, currentSelectedPlayerId, selectedGradeId)
    ) {
      return false;
    }

    const input = savedInputs.find((item) => item.scheduleId === schedule.id);

    return !input || input.status === "";
  }).length;

  const hasUnsavedChanges =
    JSON.stringify(inputs) !== JSON.stringify(savedInputs);

  const activeComment = inputs.find(
    (input) => input.scheduleId === commentScheduleId
  );

  const updateStatus = (scheduleId: string, status: AttendanceStatus) => {
    setSavedMessageVisible(false);

    setInputs((prev) =>
      prev.map((input) =>
        input.scheduleId === scheduleId ? { ...input, status } : input
      )
    );
  };

  const updateComment = (scheduleId: string, comment: string) => {
    setSavedMessageVisible(false);

    setInputs((prev) =>
      prev.map((input) =>
        input.scheduleId === scheduleId ? { ...input, comment } : input
      )
    );
  };

  const changeGrade = (gradeId: string) => {
    const nextPlayers = getPlayersByLoginGrade(gradeId);

    setSavedMessageVisible(false);
    setSelectedGradeId(gradeId);
    setSelectedPlayerId(nextPlayers[0]?.id ?? "");
  };

  const changeMonth = (nextMonth: Date) => {
    setSavedMessageVisible(false);
    setDisplayMonth(nextMonth);
  };

  const handleSave = () => {
    setSaving(true);

    setTimeout(() => {
      setSavedInputs(inputs);
      setSaving(false);
      setSavedMessageVisible(true);

      console.log({
        gradeId: selectedGradeId,
        playerId: currentSelectedPlayerId,
        month: monthLabel,
        inputs,
      });
    }, 500);
  };

  return (
    <PageContainer>
      <AppHeader
        title="一括出欠"
        subtitle="学年と選手を選んで、予定ごとに出欠をまとめて入力します。"
      />

      <section className="space-y-4 px-4 py-5">
        <MonthSwitcher
          label={monthLabel}
          onPrevious={() =>
            changeMonth(
              new Date(
                displayMonth.getFullYear(),
                displayMonth.getMonth() - 1,
                1
              )
            )
          }
          onNext={() =>
            changeMonth(
              new Date(
                displayMonth.getFullYear(),
                displayMonth.getMonth() + 1,
                1
              )
            )
          }
        />

        <Card>
          <div className="mb-3 text-xs font-bold text-slate-600">
            学年を選択してください
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {loginGradeIds.map((gradeId) => (
              <button
                key={gradeId}
                type="button"
                onClick={() => changeGrade(gradeId)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-black ${
                  selectedGradeId === gradeId
                    ? "bg-slate-900 text-white"
                    : "border border-slate-300 bg-white text-slate-800"
                }`}
              >
                {getGradeName(gradeId)}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-3 text-xs font-bold text-slate-600">
            選手を選択してください
          </div>

          <select
            value={currentSelectedPlayerId}
            onChange={(event) => {
              setSavedMessageVisible(false);
              setSelectedPlayerId(event.target.value);
            }}
            className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base font-black text-slate-900"
          >
            {playersInSelectedGrade.map((player) => (
              <option key={player.id} value={player.id}>
                {player.firstName}
              </option>
            ))}
          </select>
        </Card>

        {filteredSchedules.length > 0 && (
          <Card>
            {unansweredCount > 0 ? (
              <div className="rounded-xl bg-orange-50 p-3 text-center text-sm font-black text-orange-600">
                未回答の予定が {unansweredCount} 件あります
              </div>
            ) : (
              <div className="rounded-xl bg-blue-50 p-3 text-center text-sm font-black text-blue-700">
                未回答の予定はありません
              </div>
            )}
          </Card>
        )}

        <div className="space-y-3">
          {filteredSchedules.length === 0 ? (
            <Card>
              <div className="text-center text-sm font-bold text-slate-600">
                この月の対象予定はありません。
              </div>
            </Card>
          ) : (
            filteredSchedules.map((schedule) => {
              const scheduleType = getScheduleType(schedule.scheduleTypeId);
              const input = inputs.find(
                (item) => item.scheduleId === schedule.id
              );

              const locked = isPastLimitDate(schedule);
              const deadlineLabel = formatDeadline(schedule.answerDeadline);

              const canEdit =
                !!currentSelectedPlayerId &&
                isAttendanceTarget(
                  schedule,
                  currentSelectedPlayerId,
                  selectedGradeId
                ) &&
                !locked;

              return (
                <Card key={schedule.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-xl font-black text-slate-900">
                          {schedule.dateLabel}
                        </div>

                        {locked && (
                          <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-black text-slate-600">
                            受付終了
                          </span>
                        )}

                        {!canEdit && !locked && (
                          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-black text-slate-500">
                            表示のみ
                          </span>
                        )}
                      </div>

                      <div className="mt-2 flex flex-wrap gap-1">
                        {schedule.targetGradeIds.map((gradeId) => (
                          <span
                            key={gradeId}
                            className="rounded bg-blue-600 px-2 py-0.5 text-xs font-black text-white"
                          >
                            {getGradeName(gradeId)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      className={`grid grid-cols-3 gap-1 ${
                        !canEdit ? "opacity-35" : ""
                      }`}
                    >
                      <SelectableButton
                        label="出"
                        variant="green"
                        selected={input?.status === "attend"}
                        onClick={() => {
                          if (canEdit) updateStatus(schedule.id, "attend");
                        }}
                      />

                      <SelectableButton
                        label="欠"
                        variant="red"
                        selected={input?.status === "absent"}
                        onClick={() => {
                          if (canEdit) updateStatus(schedule.id, "absent");
                        }}
                      />

                      <SelectableButton
                        label="未"
                        variant="yellow"
                        selected={input?.status === "pending"}
                        onClick={() => {
                          if (canEdit) updateStatus(schedule.id, "pending");
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-3 text-base font-black text-slate-900">
                    {scheduleType?.icon ?? "⚽"} {schedule.title}
                  </div>

                  <div className="mt-2 space-y-1 text-sm font-bold text-slate-700">
                    <div>🧒 対象：{getPlayerName(currentSelectedPlayerId)}</div>
                    <div>🕘 {schedule.time}</div>
                    <div>📍 {schedule.place}</div>
                    {deadlineLabel && schedule.takesAttendance && (
                      <div className="text-red-600">
                        回答期限：{deadlineLabel}
                      </div>
                    )}
                  </div>

                  {locked && (
                    <div className="mt-3 rounded-xl bg-slate-100 p-3 text-sm font-bold text-slate-600">
                      予定日を過ぎているため、出欠は変更できません。
                    </div>
                  )}

                  {!canEdit && !locked && (
                    <div className="mt-3 rounded-xl bg-slate-100 p-3 text-sm font-bold text-slate-600">
                      選択中の選手は、この予定の出欠対象ではありません。
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <Link
                      href={`/schedule/${schedule.id}`}
                      className="text-sm font-black text-blue-600"
                    >
                      詳細を見る
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (canEdit) setCommentScheduleId(schedule.id);
                      }}
                      className={`text-sm font-black ${
                        !canEdit
                          ? "text-slate-400"
                          : input?.comment
                            ? "text-green-600"
                            : "text-slate-500"
                      }`}
                    >
                      💬 {input?.comment ? "コメントあり" : "コメント"}
                    </button>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {hasEditableSchedules && (
          <Card>
            {savedMessageVisible && !hasUnsavedChanges && (
              <div className="mb-3 rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
                保存しました
              </div>
            )}

            <Button
              fullWidth
              onClick={handleSave}
              disabled={saving || (!hasUnsavedChanges && savedMessageVisible)}
            >
              {saving
                ? "保存中..."
                : !hasUnsavedChanges && savedMessageVisible
                  ? "保存済み"
                  : "保存する"}
            </Button>

            <div className="mt-2 text-center text-xs font-bold text-slate-600">
              変更内容をまとめて保存します
            </div>
          </Card>
        )}
      </section>

      {commentScheduleId && activeComment && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setCommentScheduleId(null)}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-300" />

            <div className="text-lg font-black text-slate-900">コメント</div>

            <textarea
              value={activeComment.comment}
              onChange={(event) =>
                updateComment(commentScheduleId, event.target.value)
              }
              className="mt-4 min-h-32 w-full rounded-xl border border-slate-300 p-3 text-base font-bold text-slate-800 outline-none"
              placeholder="連絡事項があれば入力してください"
            />

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setCommentScheduleId(null)}
              >
                キャンセル
              </Button>

              <Button fullWidth onClick={() => setCommentScheduleId(null)}>
                保存する
              </Button>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
}