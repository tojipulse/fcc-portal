import Link from "next/link";

import AppHeader from "../../components/layout/AppHeader";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/ui/Card";
import PageBackButton from "../../../components/ui/PageBackButton";

const scheduleMenus = [
  {
    step: "STEP1",
    href: "/admin/schedules/import",
    icon: "📥",
    title: "予定一括登録",
    badge: "毎月必須",
    description: "月間予定表を貼り付けて、予定を一括登録します。",
  },
  {
    step: "STEP2",
    href: "/admin/schedules/edit",
    icon: "✏️",
    title: "予定個別修正",
    badge: "必要時",
    description: "登録済みの予定の場所・時間・持ち物などを修正します。",
  },
  {
    step: "STEP3",
    href: "/admin/schedules/edit",
    icon: "➕",
    title: "予定個別登録",
    badge: "必要時",
    description: "TRM・大会・イベントなど、新しい予定を1件ずつ登録します。",
  },
  {
    step: "STEP4",
    href: "/admin/schedules/joint",
    icon: "🤝",
    title: "合同予定作成",
    badge: "必要時",
    description:
      "同じ日時・場所で実施する異なる学年の予定を、1つの合同予定としてまとめます。",
  },
  {
    step: "STEP5",
    href: "/admin/schedules/list",
    icon: "📋",
    title: "予定一覧確認",
    badge: "確認・コピー",
    description:
      "登録済みの予定を一覧で確認します。テキスト形式でコピーして保護者連絡などに利用できます。",
  },
];

export default function AdminSchedulesPage() {
  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin" />
      </section>

      <AppHeader title="予定管理" subtitle="予定登録・確認・合同管理" />

      <section className="space-y-4 px-4 py-5">
        {scheduleMenus.map((menu) => (
          <Link key={`${menu.step}-${menu.title}`} href={menu.href}>
            <Card>
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {menu.icon}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-black text-slate-600">
                        {menu.step}
                      </span>

                      <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-black text-blue-700">
                        {menu.badge}
                      </span>
                    </div>

                    <div className="mt-2 text-lg font-black text-slate-900">
                      {menu.title}
                    </div>

                    <div className="mt-1 text-sm font-bold leading-relaxed text-slate-600">
                      {menu.description}
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
      </section>
    </PageContainer>
  );
}