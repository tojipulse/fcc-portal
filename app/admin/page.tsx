import Link from "next/link";

import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";

const menus = [
  {
    title: "予定管理",
    description: "予定の登録・編集・削除",
    href: "/admin/schedules",
    icon: "📅",
  },
  {
    title: "選手管理",
    description: "家庭・保護者・選手を管理",
    href: "/admin/players",
    icon: "👨‍👩‍👧‍👦",
  },
  {
    title: "コーチ管理",
    description: "コーチの登録・編集",
    href: "/admin/coaches",
    icon: "🧑‍🏫",
  },
  {
    title: "ビブス管理",
    description: "学年別ビブス番号",
    href: "/admin/bibs",
    icon: "🦺",
  },
  {
    title: "ユニフォーム管理",
    description: "背番号管理",
    href: "/admin/uniforms",
    icon: "👕",
  },
  {
    title: "学年繰上げ",
    description: "年度更新",
    href: "/admin/school-year",
    icon: "🎓",
  },
];

export default function AdminPage() {
  return (
    <PageContainer>
      <AppHeader title="管理者メニュー" subtitle="FCC PORTAL 管理画面" />

      <section className="space-y-3 px-4 py-5">
        {menus.map((menu) => (
          <Link key={menu.href} href={menu.href}>
            <Card>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{menu.icon}</div>

                  <div>
                    <div className="text-lg font-black text-slate-900">
                      {menu.title}
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-600">
                      {menu.description}
                    </div>
                  </div>
                </div>

                <div className="text-2xl font-black text-slate-400">＞</div>
              </div>
            </Card>
          </Link>
        ))}
      </section>
    </PageContainer>
  );
}