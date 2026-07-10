"use client";

import Link from "next/link";
import { useState } from "react";

import AppHeader from "../../../components/layout/AppHeader";
import PageContainer from "../../../components/layout/PageContainer";
import Card from "../../../components/ui/Card";
import PageBackButton from "../../../../components/ui/PageBackButton";

import { gradeFilters } from "../constants";

type Coach = {
  id: string;
  name: string;
  kana: string;
  isActive: boolean;
  grades: string[];
  licenses: string[];
  positions: string[];
  type: "保護者兼コーチ" | "コーチ";
};

const coaches: Coach[] = [
  {
    id: "coach-1",
    name: "山田 太郎",
    kana: "やまだ たろう",
    isActive: true,
    grades: ["1", "2"],
    licenses: ["JFA Dライセンス", "4級審判員"],
    positions: ["2年監督", "ヘッドコーチ"],
    type: "保護者兼コーチ",
  },
  {
    id: "coach-2",
    name: "佐藤 次郎",
    kana: "さとう じろう",
    isActive: true,
    grades: ["3"],
    licenses: ["4級審判員"],
    positions: ["審判委員会"],
    type: "コーチ",
  },
  {
    id: "coach-3",
    name: "鈴木 三郎",
    kana: "すずき さぶろう",
    isActive: true,
    grades: ["4", "5"],
    licenses: ["JFA Cライセンス", "3級審判員"],
    positions: ["4年監督"],
    type: "保護者兼コーチ",
  },
  {
    id: "coach-4",
    name: "高橋 四郎",
    kana: "たかはし しろう",
    isActive: false,
    grades: ["6"],
    licenses: ["JFA Dライセンス"],
    positions: ["会計"],
    type: "コーチ",
  },
];

function getGradeLabel(gradeId: string) {
  return gradeFilters.find((grade) => grade.id === gradeId)?.label ?? gradeId;
}

function getCoachGradesLabel(grades: string[]) {
  return grades.map(getGradeLabel).join("・");
}

export default function CoachListPage() {
  const [selectedGrade, setSelectedGrade] = useState("all");

  const filteredCoaches = coaches.filter((coach) => {
    if (selectedGrade === "all") return true;

    return coach.grades.includes(selectedGrade);
  });

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin/coaches" />
      </section>

      <AppHeader title="コーチ一覧" subtitle="登録済みコーチの確認" />

      <section className="space-y-5 px-4 py-5">
        <Card>
          <div className="text-sm font-black text-slate-700">
            担当学年で絞り込み
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {gradeFilters.map((grade) => (
              <button
                key={grade.id}
                type="button"
                onClick={() => setSelectedGrade(grade.id)}
                className={`rounded-full px-4 py-2 text-sm font-black ${
                  selectedGrade === grade.id
                    ? "bg-red-600 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {grade.label}
              </button>
            ))}
          </div>
        </Card>

        <div className="text-sm font-black text-slate-600">
          {filteredCoaches.length}名のコーチが該当しています
        </div>

        <div className="space-y-4">
          {filteredCoaches.map((coach) => (
            <Link key={coach.id} href={`/admin/coaches/${coach.id}`}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="text-2xl">🧑‍🏫</div>

                      <div>
                        <div className="text-lg font-black text-slate-900">
                          {coach.name}
                        </div>

                        <div className="text-xs font-bold text-slate-500">
                          {coach.kana}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          coach.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {coach.isActive ? "現役" : "退任"}
                      </span>

                      <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
                        {coach.type}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-sm font-bold text-slate-700">
                      <div>
                        <span className="text-slate-500">担当：</span>
                        {getCoachGradesLabel(coach.grades)}
                      </div>

                      <div>
                        <span className="text-slate-500">資格：</span>
                        {coach.licenses.slice(0, 2).join(" / ")}
                      </div>

                      <div>
                        <span className="text-slate-500">役職：</span>
                        {coach.positions.slice(0, 2).join(" / ")}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-2xl font-black text-slate-400">
                    ＞
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {filteredCoaches.length === 0 && (
            <Card>
              <div className="text-center text-sm font-black text-slate-600">
                条件に一致するコーチはいません
              </div>
            </Card>
          )}
        </div>
      </section>
    </PageContainer>
  );
}