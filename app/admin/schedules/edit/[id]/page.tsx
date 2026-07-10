"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import AppHeader from "../../../../components/layout/AppHeader";
import PageContainer from "../../../../components/layout/PageContainer";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import FormLabel from "../../../../components/ui/form/FormLabel";
import FormSelect from "../../../../components/ui/form/FormSelect";
import FormTextarea from "../../../../components/ui/form/FormTextarea";
import PageBackButton from "../../../../../components/ui/PageBackButton";
import { schedules } from "../../../../data/schedules";

const grades = [
  {
    id: "kids",
    label: "キッズ",
    selectedClassName: "bg-pink-500 text-white",
  },
  {
    id: "1",
    label: "1年",
    selectedClassName: "bg-red-500 text-white",
  },
  {
    id: "2",
    label: "2年",
    selectedClassName: "bg-orange-500 text-white",
  },
  {
    id: "3",
    label: "3年",
    selectedClassName: "bg-yellow-400 text-slate-900",
  },
  {
    id: "4",
    label: "4年",
    selectedClassName: "bg-green-500 text-white",
  },
  {
    id: "5",
    label: "5年",
    selectedClassName: "bg-blue-500 text-white",
  },
  {
    id: "6",
    label: "6年",
    selectedClassName: "bg-purple-500 text-white",
  },
];

const scheduleTypes = [
  {
    id: "practice",
    label: "通常練習",
  },
  {
    id: "practice_match",
    label: "TRM",
  },
  {
    id: "tournament",
    label: "大会",
  },
  {
    id: "league",
    label: "リーグ戦",
  },
  {
    id: "event",
    label: "イベント",
  },
  {
    id: "other",
    label: "その他",
  },
];

const placeOptions = [
  "瑞光小学校",
  "瑞光小学校 中庭",
  "瑞光小中庭",
  "生涯学習センター",
  "東尾久グランド",
  "東尾久グラウンド",
  "少年運動場サッカー場",
  "少年運動場多目的広場",
  "南千住広場",
  "8丁目公園",
  "地区会館",
  "あらスポ",
];

type ScheduleStatus =
  | "scheduled"
  | "canceled"
  | "time_changed"
  | "place_changed";

function RequiredMark() {
  return <span className="ml-1 text-red-500">※</span>;
}

function buildTimeOptions() {
  const options: string[] = [];

  for (let hour = 6; hour <= 22; hour += 1) {
    for (let minute = 0; minute < 60; minute += 5) {
      options.push(
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}`
      );
    }
  }

  return options;
}

function splitScheduleTime(time: string) {
  const [startTime = "", endTime = ""] = time
    .replaceAll(" ", "")
    .split(/[〜～~-]/);

  return {
    startTime,
    endTime,
  };
}

function normalizeDate(date: string) {
  return date.replaceAll("-", "/");
}

function getExistingPlaceValue(place: string) {
  if (placeOptions.includes(place)) {
    return place;
  }

  return "custom";
}

const timeOptions = buildTimeOptions();

export default function ScheduleEditDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const scheduleId = Array.isArray(params.id) ? params.id[0] : params.id;

  const selectedSchedule = useMemo(
    () => schedules.find((schedule) => schedule.id === scheduleId),
    [scheduleId]
  );

  const initialTime = useMemo(
    () =>
      selectedSchedule
        ? splitScheduleTime(selectedSchedule.time)
        : {
            startTime: "",
            endTime: "",
          },
    [selectedSchedule]
  );

  const [date, setDate] = useState(
    selectedSchedule ? normalizeDate(selectedSchedule.eventDate) : ""
  );

  const [scheduleTypeId, setScheduleTypeId] = useState(
    selectedSchedule?.scheduleTypeId ?? "practice"
  );

  const [title, setTitle] = useState(selectedSchedule?.title ?? "");

  const [place, setPlace] = useState(
    selectedSchedule ? getExistingPlaceValue(selectedSchedule.place) : ""
  );

  const [customPlace, setCustomPlace] = useState(
    selectedSchedule &&
      !placeOptions.includes(selectedSchedule.place)
      ? selectedSchedule.place
      : ""
  );

  const [startTime, setStartTime] = useState(initialTime.startTime);
  const [endTime, setEndTime] = useState(initialTime.endTime);

  const [targetGradeIds, setTargetGradeIds] = useState<string[]>(
    selectedSchedule?.targetGradeIds ?? []
  );

  const [playerScope, setPlayerScope] = useState<"all" | "selected">(
    selectedSchedule &&
      selectedSchedule.targetPlayerIds.length > 0
      ? "selected"
      : "all"
  );

  const [belongings, setBelongings] = useState(
    selectedSchedule?.belongings ?? ""
  );

  const [memo, setMemo] = useState(selectedSchedule?.note ?? "");

  const [status, setStatus] = useState<ScheduleStatus>("scheduled");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const actualPlace = place === "custom" ? customPlace.trim() : place;

  const canSave =
    date.trim() !== "" &&
    startTime !== "" &&
    scheduleTypeId !== "" &&
    targetGradeIds.length > 0;

  const markChanged = () => {
    setSaved(false);
  };

  const toggleGrade = (gradeId: string) => {
    markChanged();

    setTargetGradeIds((current) =>
      current.includes(gradeId)
        ? current.filter((id) => id !== gradeId)
        : [...current, gradeId]
    );
  };

  const handleSave = () => {
    if (!selectedSchedule || !canSave) {
      return;
    }

    setSaving(true);
    setSaved(false);

    window.setTimeout(() => {
      console.log({
        id: selectedSchedule.id,
        date,
        scheduleTypeId,
        title,
        place: actualPlace,
        startTime,
        endTime,
        targetGradeIds,
        playerScope,
        targetPlayerIds: selectedSchedule.targetPlayerIds,
        belongings,
        memo,
        status,
        isJoint: Boolean(selectedSchedule.joint),
      });

      setSaving(false);
      setSaved(true);
    }, 500);
  };

  const handleReturnToList = () => {
    router.push("/admin/schedules/edit");
  };

  const renderTimeSelect = (
    value: string,
    onChange: (value: string) => void,
    placeholder: string
  ) => (
    <select
      value={value}
      onChange={(event) => {
        onChange(event.target.value);
        markChanged();
      }}
      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-bold text-slate-900"
    >
      <option value="">{placeholder}</option>

      {timeOptions.map((time) => (
        <option key={time} value={time}>
          {time}
        </option>
      ))}
    </select>
  );

  if (!selectedSchedule) {
    return (
      <PageContainer>
        <section className="px-4 pt-4">
          <PageBackButton fallbackPath="/admin/schedules/edit" />
        </section>

        <AppHeader
          title="予定個別修正"
          subtitle="予定が見つかりません"
        />

        <section className="px-4 py-5">
          <Card>
            <div className="py-8 text-center">
              <div className="text-4xl">📅</div>

              <div className="mt-4 text-lg font-black text-slate-900">
                指定された予定が見つかりません
              </div>

              <div className="mt-2 text-sm font-bold text-slate-500">
                予定一覧に戻り、修正する予定を選び直してください。
              </div>

              <div className="mt-6">
                <Button
                  type="button"
                  fullWidth
                  onClick={handleReturnToList}
                >
                  予定修正一覧へ戻る
                </Button>
              </div>
            </div>
          </Card>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/schedules/edit" />
      </section>

      <AppHeader
        title="予定個別修正"
        subtitle="選択した予定の内容を修正"
      />

      <section className="space-y-5 px-4 py-5">
        <Card>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-black text-slate-500">
                修正対象
              </div>

              <div className="mt-1 text-lg font-black text-slate-900">
                {selectedSchedule.dateLabel} {selectedSchedule.title}
              </div>

              <div className="mt-1 text-sm font-bold text-slate-600">
                {selectedSchedule.time} ／ {selectedSchedule.place}
              </div>
            </div>

            {selectedSchedule.joint && (
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
                合同予定
              </span>
            )}
          </div>
        </Card>

        <Card>
          <div className="mb-4 text-base font-black text-slate-900">
            予定基本情報
          </div>

          <div className="grid gap-4">
            <label>
              <FormLabel>
                日付
                <RequiredMark />
              </FormLabel>

              <input
                type="text"
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  markChanged();
                }}
                placeholder="yyyy/MM/dd"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-bold text-slate-900 placeholder:text-slate-300"
              />
            </label>

            <label>
              <FormLabel>
                予定種別
                <RequiredMark />
              </FormLabel>

              <FormSelect
                value={scheduleTypeId}
                onChange={(value) => {
                  setScheduleTypeId(value);
                  markChanged();
                }}
              >
                {scheduleTypes.map((scheduleType) => (
                  <option
                    key={scheduleType.id}
                    value={scheduleType.id}
                  >
                    {scheduleType.label}
                  </option>
                ))}
              </FormSelect>
            </label>

            <label>
              <FormLabel>予定名</FormLabel>

              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  markChanged();
                }}
                placeholder="例：通常練習、トーマス、親子サッカー"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-bold text-slate-900 placeholder:text-slate-300"
              />
            </label>

            <label>
              <FormLabel>場所</FormLabel>

              <FormSelect
                value={place}
                onChange={(value) => {
                  setPlace(value);
                  markChanged();
                }}
              >
                <option value="">選択してください</option>

                {placeOptions.map((placeName) => (
                  <option key={placeName} value={placeName}>
                    {placeName}
                  </option>
                ))}

                <option value="custom">その他の場所</option>
              </FormSelect>
            </label>

            {place === "custom" && (
              <label>
                <FormLabel>場所を入力</FormLabel>

                <input
                  type="text"
                  value={customPlace}
                  onChange={(event) => {
                    setCustomPlace(event.target.value);
                    markChanged();
                  }}
                  placeholder="場所を入力してください"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-base font-bold text-slate-900 placeholder:text-slate-300"
                />
              </label>
            )}

            <div className="grid gap-4 md:grid-cols-2">
              <label>
                <FormLabel>
                  開始時間
                  <RequiredMark />
                </FormLabel>

                {renderTimeSelect(
                  startTime,
                  setStartTime,
                  "開始時間を選択"
                )}
              </label>

              <label>
                <FormLabel>終了時間</FormLabel>

                {renderTimeSelect(
                  endTime,
                  setEndTime,
                  "終了時間を選択"
                )}
              </label>
            </div>
          </div>
        </Card>

        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            対象学年
            <RequiredMark />
          </div>

          <div className="flex flex-wrap gap-2">
            {grades.map((grade) => {
              const selected = targetGradeIds.includes(grade.id);

              return (
                <button
                  key={grade.id}
                  type="button"
                  onClick={() => toggleGrade(grade.id)}
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

          {selectedSchedule.joint && (
            <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-bold leading-relaxed text-blue-800">
              この予定は合同予定です。修正画面では単独予定への変更はできません。
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            対象選手
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant={
                playerScope === "all" ? "primary" : "secondary"
              }
              fullWidth
              onClick={() => {
                setPlayerScope("all");
                markChanged();
              }}
            >
              学年全員
            </Button>

            <Button
              type="button"
              variant={
                playerScope === "selected"
                  ? "primary"
                  : "secondary"
              }
              fullWidth
              onClick={() => {
                setPlayerScope("selected");
                markChanged();
              }}
            >
              一部選手
            </Button>
          </div>

          {playerScope === "selected" && (
            <div className="mt-3 rounded-xl bg-slate-100 p-3 text-sm font-bold text-slate-600">
              現在選択されている対象選手は保持されます。選手選択機能は
              PlayerSelector実装時に接続します。
            </div>
          )}
        </Card>

        <Card>
          <label>
            <FormLabel>持ち物</FormLabel>

            <FormTextarea
              value={belongings}
              onChange={(value) => {
                setBelongings(value);
                markChanged();
              }}
              placeholder="例：水筒、ボール、すねあて"
            />
          </label>
        </Card>

        <Card>
          <label>
            <FormLabel>備考</FormLabel>

            <FormTextarea
              value={memo}
              onChange={(value) => {
                setMemo(value);
                markChanged();
              }}
              placeholder="保護者向けの補足事項"
            />
          </label>
        </Card>

        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            変更ステータス
          </div>

          <FormSelect
            value={status}
            onChange={(value) => {
              setStatus(value as ScheduleStatus);
              markChanged();
            }}
          >
            <option value="scheduled">変更なし</option>
            <option value="canceled">中止</option>
            <option value="time_changed">時間変更</option>
            <option value="place_changed">場所変更</option>
          </FormSelect>

          {status === "canceled" && (
            <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm font-black text-red-700">
              この予定は保護者画面で「中止」と表示されます。
            </div>
          )}
        </Card>

        {!canSave && (
          <div className="rounded-xl bg-yellow-50 p-3 text-center text-sm font-black text-yellow-700">
            日付・開始時間・予定種別・対象学年は必須です
          </div>
        )}

        {saved && (
          <div className="rounded-xl bg-green-50 p-3 text-center text-sm font-black text-green-700">
            予定を保存しました
          </div>
        )}

        <Button
          type="button"
          fullWidth
          onClick={handleSave}
          disabled={!canSave || saving}
        >
          {saving ? "保存中..." : "変更内容を保存"}
        </Button>

        <button
          type="button"
          onClick={handleReturnToList}
          className="w-full rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-700 transition active:bg-slate-200"
        >
          予定修正一覧へ戻る
        </button>
      </section>
    </PageContainer>
  );
}