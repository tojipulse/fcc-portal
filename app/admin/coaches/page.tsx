import Link from "next/link";

import AppHeader from "../../components/layout/AppHeader";
import PageContainer from "../../components/layout/PageContainer";
import Card from "../../components/ui/Card";
import PageBackButton from "../../../components/ui/PageBackButton";

const mainMenus = [
  {
    href: "/admin/coaches/list",
    icon: "📋",
    title: "コーチ一覧",
    description: "登録済みコーチの確認・編集",
  },
  {
    href: "/admin/coaches/new",
    icon: "👤",
    title: "コーチ登録・修正",
    description: "既存保護者から追加・新規コーチ登録",
  },
];

const futureMenus = [
  {
    icon: "🎓",
    title: "研修管理",
    description: "研修参加実績の管理",
  },
  {
    icon: "📜",
    title: "資格管理",
    description: "コーチ資格・審判資格の管理",
  },
  {
    icon: "💰",
    title: "経費管理",
    description: "年間経費・領収書管理",
  },
  {
    icon: "📊",
    title: "統計",
    description: "資格保有率・担当状況の確認",
  },
];

export default function CoachesPage() {
  return (
    <PageContainer>
      <section className="px-4 pt-4">
        <PageBackButton fallbackPath="/admin" />
      </section>

      <AppHeader title="コーチ管理" subtitle="コーチ関連機能" />

      <section className="space-y-5 px-4 py-5">
        <div className="space-y-4">
          {mainMenus.map((menu) => (
            <Link key={menu.href} href={menu.href}>
              <Card>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                      {menu.icon}
                    </div>

                    <div>
                      <div className="text-lg font-black text-slate-900">
                        {menu.title}
                      </div>

                      <div className="mt-1 text-sm font-bold text-slate-600">
                        {menu.description}
                      </div>
                    </div>
                  </div>

                  <div className="text-2xl font-black text-slate-400">
                    ＞
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <div className="pt-2">
          <div className="mb-3 text-sm font-black text-slate-500">
            今後追加予定
          </div>

          <div className="space-y-4">
            {futureMenus.map((menu) => (
              <Card key={menu.title}>
                <div className="flex items-center gap-4 opacity-60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl">
                    {menu.icon}
                  </div>

                  <div>
                    <div className="text-base font-black text-slate-800">
                      {menu.title}
                    </div>

                    <div className="mt-1 text-sm font-bold text-slate-500">
                      {menu.description}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageContainer>
  );
}