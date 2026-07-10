"use client";

import { useMemo, useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import PageBackButton from "../../../../components/ui/PageBackButton";

import { gradeFilters, schedules } from "./constants";
import {
  buildDateGroups,
  buildDateSelections,
  getGradeBadgeClassName,
} from "./utils";

export default function JointSchedulePage() {
  const [selectedGradeId, setSelectedGradeId] = useState("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState("");

  const filteredSchedules = useMemo(() => {
    if (selectedGradeId === "all") {
      return schedules;
    }

    return schedules.filter(
      (schedule) => schedule.gradeId === selectedGradeId
    );
  }, [selectedGradeId]);

  const dateGroups = useMemo(
    () => buildDateGroups(filteredSchedules),
    [filteredSchedules]
  );

  const dateSelections = useMemo(
    () => buildDateSelections(dateGroups, selectedIds),
    [dateGroups, selectedIds]
  );

  const activeDateSelections = useMemo(
    () =>
      dateSelections.filter(
        (selection) => selection.selectedIds.length > 0
      ),
    [dateSelections]
  );

  const hasSelection = activeDateSelections.length > 0;

  const hasValidationError = activeDateSelections.some(
    (selection) => !selection.validation.canCreate
  );

  const canCreateAll =
    hasSelection &&
    activeDateSelections.every(
      (selection) => selection.validation.canCreate
    );

  const toggleSchedule = (scheduleId: string) => {
    setShowConfirm(false);
    setMessage("");

    setSelectedIds((current) =>
      current.includes(scheduleId)
        ? current.filter((id) => id !== scheduleId)
        : [...current, scheduleId]
    );
  };

  const handleOpenConfirm = () => {
    if (!canCreateAll) {
      setMessage(
        "合同化できない予定があります。各日付のエラーを解消してください。"
      );
      return;
    }

    setShowConfirm(true);
    setMessage("");
  };

  const handleCreateJoint = () => {
    const jointRequests = activeDateSelections.map((selection) => ({
      date: selection.date,
      sourceScheduleIds: selection.selectedIds,
      gradeIds: selection.selectedSchedules.map(
        (schedule) => schedule.gradeId
      ),
      belongings: "",
      memo: "",
    }));

    console.log({
      jointRequests,
    });

    const createdLabels = activeDateSelections.map((selection) => {
      const dateLabel =
        selection.selectedSchedules[0]?.dateLabel ?? selection.date;

      const gradeLabels = selection.selectedSchedules
        .map((schedule) => schedule.gradeLabel)
        .join("・");

      return `${dateLabel}（${gradeLabels}）`;
    });

    setShowConfirm(false);
    setSelectedIds([]);
    setMessage(
      `${createdLabels.join(
        "、"
      )}の合同予定を作成しました。持ち物・備考を確認してください。`
    );
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/schedules" />
      </section>

      <AppHeader
        title="合同予定作成"
        subtitle="異なる学年の予定を日付ごとにまとめる"
      />

      <section className="space-y-6 px-4 py-5">
        <Card>
          <div className="text-base font-black text-slate-900">
            🤝 合同化する予定を選択
          </div>

          <div className="mt-2 text-sm font-bold leading-relaxed text-slate-600">
            同じ日付・予定種別・内容・場所・開始時間・終了時間・
            開催状態の、異なる学年の予定だけ合同化できます。
          </div>

          <div className="mt-3 rounded-xl bg-blue-50 p-3 text-sm font-bold text-blue-800">
            複数の日付を選択した場合も、最後のボタンからまとめて合同化できます。
          </div>
        </Card>

        <Card>
          <div className="mb-3 text-sm font-black text-slate-700">
            学年フィルター
          </div>

          <div className="flex flex-wrap gap-2">
            {gradeFilters.map((grade) => {
              const selected = selectedGradeId === grade.id;

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => {
                    setSelectedGradeId(grade.id);
                    setShowConfirm(false);
                    setMessage("");
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-black transition ${
                    selected
                      ? grade.selectedClassName
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {grade.label}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="space-y-6">
          {dateGroups.map((group) => {
            const dateSelection = dateSelections.find(
              (selection) => selection.date === group.date
            );

            const selectedCount =
              dateSelection?.selectedIds.length ?? 0;

            const validation = dateSelection?.validation;

            return (
              <section
                key={group.date}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
                  <div className="text-lg font-black text-slate-900">
                    📅 {group.dateLabel}
                  </div>

                  <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                    {selectedCount > 0
                      ? `${selectedCount}件選択`
                      : `${group.schedules.length}件`}
                  </div>
                </div>

                <div className="mt-4 space-y-4">
                  {group.schedules.map((schedule) => {
                    const checked = selectedIds.includes(schedule.id);

                    return (
                      <label
                        key={schedule.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition ${
                          checked
                            ? "border-slate-500 bg-slate-100"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            toggleSchedule(schedule.id)
                          }
                          className="mt-1 h-5 w-5 shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-black ${getGradeBadgeClassName(
                                schedule.gradeId
                              )}`}
                            >
                              {schedule.gradeLabel}
                            </span>

                            <span className="text-base font-black text-slate-900">
                              {schedule.typeLabel}
                              {schedule.subTypeLabel &&
                                `（${schedule.subTypeLabel}）`}
                            </span>
                          </div>

                          <div className="mt-3 text-sm font-bold text-slate-700">
                            📍 {schedule.placeLabel}
                          </div>

                          <div className="mt-1 text-sm font-bold text-slate-700">
                            🕘 {schedule.startTime}
                            {schedule.endTime
                              ? `〜${schedule.endTime}`
                              : ""}
                          </div>

                          {schedule.status === "canceled" && (
                            <div className="mt-3 inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-700">
                              ⛔ 中止
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>

                {selectedCount > 0 && validation && (
                  <div
                    className={`mt-4 rounded-xl p-3 text-sm font-bold ${
                      validation.canCreate
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    {validation.canCreate ? (
                      <div>
                        ✅ この日付の選択内容は合同化できます。
                      </div>
                    ) : (
                      <div>
                        <div className="font-black">
                          ❌ この日付の予定は合同化できません
                        </div>

                        <ul className="mt-2 list-disc space-y-1 pl-5">
                          {validation.messages.map(
                            (validationMessage) => (
                              <li key={validationMessage}>
                                {validationMessage}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </section>
            );
          })}

          {dateGroups.length === 0 && (
            <Card>
              <div className="py-5 text-center text-sm font-black text-slate-600">
                条件に一致する予定はありません
              </div>
            </Card>
          )}
        </div>

        {showConfirm && (
          <Card>
            <div className="text-base font-black text-slate-900">
              選択した予定を一括で合同化しますか？
            </div>

            <div className="mt-3 space-y-2">
              {activeDateSelections.map((selection) => {
                const firstSchedule =
                  selection.selectedSchedules[0];

                return (
                  <div
                    key={selection.date}
                    className="rounded-xl bg-slate-50 p-3 text-sm font-bold text-slate-700"
                  >
                    <div className="font-black text-slate-900">
                      {firstSchedule?.dateLabel}
                    </div>

                    <div className="mt-1">
                      対象学年：
                      {selection.selectedSchedules
                        .map((schedule) => schedule.gradeLabel)
                        .join("・")}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 rounded-xl bg-yellow-50 p-3 text-sm font-bold text-yellow-800">
              持ち物・備考は引き継がれず、合同予定では空欄になります。
              作成後に合同予定の編集画面で入力してください。
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={() => setShowConfirm(false)}
              >
                キャンセル
              </Button>

              <Button
                type="button"
                fullWidth
                onClick={handleCreateJoint}
              >
                一括合同化
              </Button>
            </div>
          </Card>
        )}

        {message && (
          <div
            className={`rounded-xl p-3 text-center text-sm font-black ${
              message.includes("できない") ||
              message.includes("解消")
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {!showConfirm && (
          <div>
            <Button
              fullWidth
              onClick={handleOpenConfirm}
              disabled={!canCreateAll}
            >
              選択した予定を一括合同化
            </Button>

            {!hasSelection && (
              <div className="mt-2 text-center text-sm font-bold text-slate-500">
                合同化する予定を選択してください。
              </div>
            )}

            {hasValidationError && (
              <div className="mt-2 rounded-xl bg-red-50 p-3 text-center text-sm font-black text-red-700">
                合同化できない予定があります。
                各日付のエラーを解消してから実行してください。
              </div>
            )}
          </div>
        )}
      </section>
    </PageContainer>
  );
}