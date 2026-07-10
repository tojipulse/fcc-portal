"use client";

import { useMemo, useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import PageBackButton from "../../../../components/ui/PageBackButton";

import { parseScheduleText } from "./utils/parseScheduleText";

const sampleText = `《7月予定表》
■7/4（土）
1年生　瑞光小中庭　8-10
2年生　瑞光小 8-10
3.4年　瑞光小10-12`;

export default function ScheduleImportPage() {
  const [text, setText] = useState(sampleText);
  const [message, setMessage] = useState("");

  const result = useMemo(() => parseScheduleText(text), [text]);
  const hasErrors = result.errors.length > 0;

  const handleImport = () => {
    if (hasErrors) {
      setMessage("読み込めない予定があります。確認してください。");
      return;
    }

    setMessage("一括登録しました。※現在は画面完成優先のためDB保存は未実装です。");

    console.log(result.successItems);
  };

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/schedules" />
      </section>

      <AppHeader title="予定一括登録" subtitle="月予定を貼り付けて取り込み" />

      <section className="space-y-5 px-4 py-5">
        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            予定表を貼り付け
          </div>

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setMessage("");
            }}
            className="min-h-[260px] w-full rounded-xl border border-slate-300 bg-white p-3 text-sm font-bold text-slate-900"
            placeholder="月予定をここに貼り付け"
          />

          <div className="mt-2 text-xs font-bold text-slate-500">
            {text.length}文字
          </div>
        </Card>

        <Card>
          <div className="text-base font-black text-slate-900">
            解析結果
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-blue-50 p-3">
              <div className="text-xl font-black text-blue-700">
                {result.items.length}
              </div>
              <div className="text-xs font-black text-blue-700">全件</div>
            </div>

            <div className="rounded-xl bg-green-50 p-3">
              <div className="text-xl font-black text-green-700">
                {result.successItems.length}
              </div>
              <div className="text-xs font-black text-green-700">成功</div>
            </div>

            <div className="rounded-xl bg-red-50 p-3">
              <div className="text-xl font-black text-red-700">
                {result.errors.length}
              </div>
              <div className="text-xs font-black text-red-700">エラー</div>
            </div>
          </div>
        </Card>

        {result.errors.length > 0 && (
          <Card>
            <div className="mb-3 text-base font-black text-red-700">
              読み込めない予定
            </div>

            <div className="space-y-3">
              {result.errors.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-red-50 p-3 text-sm font-bold text-red-800"
                >
                  <div>{item.dateLabel}</div>
                  <div className="mt-1">{item.rawText}</div>
                  <div className="mt-1 font-black">理由：{item.error}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        <Card>
          <div className="mb-3 text-base font-black text-slate-900">
            プレビュー
          </div>

          <div className="space-y-3">
            {result.successItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-3"
              >
                <div className="text-sm font-black text-slate-500">
                  {item.dateLabel}
                </div>

                <div className="mt-1 text-base font-black text-slate-900">
                  {item.gradeLabel}
                </div>

                <div className="mt-1 text-sm font-bold text-slate-700">
                  📍 {item.place}
                </div>

                <div className="mt-1 text-sm font-bold text-slate-700">
                  🕒 {item.timeText}
                </div>
              </div>
            ))}

            {result.successItems.length === 0 && (
              <div className="text-center text-sm font-bold text-slate-500">
                解析できた予定はありません
              </div>
            )}
          </div>
        </Card>

        {message && (
          <div
            className={`rounded-xl p-3 text-center text-sm font-black ${
              hasErrors
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <Button
          fullWidth
          onClick={handleImport}
          disabled={hasErrors || result.successItems.length === 0}
        >
          一括登録
        </Button>
      </section>
    </PageContainer>
  );
}