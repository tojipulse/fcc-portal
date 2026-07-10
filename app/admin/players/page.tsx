"use client";

import Link from "next/link";
import { useState } from "react";

import AppHeader from "../../components/layout/AppHeader";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import PageBackButton from "../../../components/ui/PageBackButton";

import { households } from "../../data/households";
import { guardians } from "../../data/guardians";
import { players } from "../../data/players";

import { getGradeName } from "../../repositories/playerRepository";

type FilterType =
  | "all"
  | "kids"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "recent-graduated"
  | "old-graduated";

const filters: { id: FilterType; label: string }[] = [
  { id: "all", label: "全員" },
  { id: "kids", label: "キッズ" },
  { id: "1", label: "1年" },
  { id: "2", label: "2年" },
  { id: "3", label: "3年" },
  { id: "4", label: "4年" },
  { id: "5", label: "5年" },
  { id: "6", label: "6年" },
  { id: "recent-graduated", label: "卒団（3年以内）" },
  { id: "old-graduated", label: "卒団（3年以上）" },
];

function getHouseholdGuardians(householdId: string) {
  return guardians
    .filter((guardian) => guardian.householdId === householdId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function getHouseholdPlayers(householdId: string) {
  return players
    .filter((player) => player.householdId === householdId)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

function getFamilyName(householdId: string) {
  const firstGuardian = getHouseholdGuardians(householdId)[0];

  if (!firstGuardian) return "家庭名未登録";

  return firstGuardian.name.split(/[ 　]/)[0] ?? firstGuardian.name;
}

function getGuardianDisplayName(householdId: string, guardianName: string) {
  const familyName = getFamilyName(householdId);

  return guardianName.replace(familyName, "").trim() || guardianName;
}

function isActiveHousehold(householdId: string) {
  return getHouseholdPlayers(householdId).some((player) => player.isActive);
}

function hasActiveGrade(householdId: string, gradeId: string) {
  return getHouseholdPlayers(householdId).some(
    (player) => player.isActive && player.gradeId === gradeId
  );
}

function getLatestRetirementDate(householdId: string) {
  const dates = getHouseholdPlayers(householdId)
    .filter((player) => !player.isActive)
    .map((player) => {
      if ("retirementDate" in player) {
        return String(player.retirementDate ?? "");
      }

      return player.leftAt ?? "";
    })
    .filter(Boolean)
    .sort()
    .reverse();

  return dates[0] ?? "";
}

function isRecentGraduatedHousehold(householdId: string) {
  if (isActiveHousehold(householdId)) return false;

  const latestDate = getLatestRetirementDate(householdId);
  if (!latestDate) return true;

  const retiredAt = new Date(`${latestDate}T00:00:00`);
  const today = new Date();

  const diffYears =
    today.getFullYear() -
    retiredAt.getFullYear() -
    (today.getMonth() < retiredAt.getMonth() ||
    (today.getMonth() === retiredAt.getMonth() &&
      today.getDate() < retiredAt.getDate())
      ? 1
      : 0);

  return diffYears <= 3;
}

function isOldGraduatedHousehold(householdId: string) {
  if (isActiveHousehold(householdId)) return false;

  return !isRecentGraduatedHousehold(householdId);
}

export default function PlayersPage() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("all");

  const filteredHouseholds = households.filter((household) => {
    if (selectedFilter === "all") {
      return isActiveHousehold(household.id);
    }

    if (selectedFilter === "recent-graduated") {
      return isRecentGraduatedHousehold(household.id);
    }

    if (selectedFilter === "old-graduated") {
      return isOldGraduatedHousehold(household.id);
    }

    return hasActiveGrade(household.id, selectedFilter);
  });

  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin" />
      </section>

      <AppHeader title="選手管理" subtitle="家庭一覧" />

      <section className="space-y-5 px-4 py-5">
        <Link href="/admin/players/new">
          <Button fullWidth>＋ 新しい家庭を登録</Button>
        </Link>

        <Card>
          <div className="text-sm font-black text-slate-700">
            フィルター
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSelectedFilter(filter.id)}
                className={`rounded-full px-4 py-2 text-sm font-black ${
                  selectedFilter === filter.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          {filteredHouseholds.map((household) => {
            const familyName = getFamilyName(household.id);
            const householdGuardians = getHouseholdGuardians(household.id);
            const householdPlayers = getHouseholdPlayers(household.id);
            const active = isActiveHousehold(household.id);

            return (
              <Card key={household.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="text-xl font-black text-slate-900">
                    {familyName}家
                  </div>

                  <div
                    className={`rounded-full px-3 py-1 text-xs font-black ${
                      active
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {active ? "在籍" : "卒団"}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-black text-slate-600">
                    👨‍👩‍👧 保護者
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {householdGuardians.map((guardian) => (
                      <span
                        key={guardian.id}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm font-black text-slate-800"
                      >
                        {getGuardianDisplayName(
                          household.id,
                          guardian.name
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-black text-slate-600">
                    ⚽ 選手
                  </div>

                  <div className="mt-2 space-y-2">
                    {householdPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="rounded-xl bg-blue-50 px-3 py-2 text-sm font-black text-blue-800"
                      >
                        {player.firstName}（{getGradeName(player.gradeId)}）
                        {!player.isActive && (
                          <span className="ml-2 text-slate-500">
                            退団
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Link href={`/admin/players/${household.id}`}>
                  <button
                    type="button"
                    className="mt-5 w-full rounded-xl bg-green-600 py-3 text-sm font-black text-white"
                  >
                    選手の追加・編集
                  </button>
                </Link>
              </Card>
            );
          })}

          {filteredHouseholds.length === 0 && (
            <Card>
              <div className="text-center text-sm font-black text-slate-600">
                条件に一致する家庭はありません
              </div>
            </Card>
          )}
        </div>
      </section>
    </PageContainer>
  );
}