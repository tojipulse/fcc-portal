export default function MockAdminMenuPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
            管理者
          </div>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-800">管理画面</div>
      </header>

      <section className="px-4 py-5">
        <h1 className="text-3xl font-black text-slate-900">管理メニュー</h1>

        <div className="mt-5 grid gap-3">
          <AdminMenuCard icon="📅" title="予定管理" body="予定の作成・編集・一括取込" />
          <AdminMenuCard icon="📢" title="お知らせ管理" body="お知らせ作成・ピン留め管理" />
          <AdminMenuCard icon="👦" title="選手管理" body="選手情報・学年更新・画像ID管理" />
          <AdminMenuCard icon="👨‍👩‍👧" title="家庭・ユーザー管理" body="ログインID・権限・紐付け管理" />
          <AdminMenuCard icon="🧩" title="テンプレート管理" body="選手テンプレート・活動グループ補助" />
          <AdminMenuCard icon="⚙️" title="マスター管理" body="予定種別・場所・学年など" />
        </div>
      </section>
    </main>
  );
}

function AdminMenuCard({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-lg font-black text-slate-900">{title}</div>
          <div className="mt-1 text-sm font-bold text-slate-600">{body}</div>
        </div>
        <div className="text-xl font-black text-slate-400">＞</div>
      </div>
    </div>
  );
}