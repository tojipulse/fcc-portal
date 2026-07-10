export default function MockNoticePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-20">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
            管理者
          </div>
        </div>
        <div className="mt-2 truncate text-sm font-bold text-slate-800">
          キッズ（年長）：絃獅 ｜ 2年：維吹 ｜ 4年：凰歌
        </div>
      </header>

      <section className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="text-3xl text-red-600">📢</div>
          <h1 className="text-3xl font-black text-slate-900">お知らせ</h1>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-900">フィルター</div>
          <div className="mt-3 flex flex-wrap gap-2">
            <FilterButton label="全部" active={false} />
            <FilterButton label="キッズ" active />
            <FilterButton label="1年" active={false} />
            <FilterButton label="2年" active />
            <FilterButton label="3年" active={false} />
            <FilterButton label="4年" active />
            <FilterButton label="5年" active={false} />
            <FilterButton label="6年" active={false} />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <NoticeCard
            unread
            category="重要"
            icon="🚨"
            color="bg-red-600"
            title="7/12 通常練習は中止です"
            target="2年"
            time="2時間前"
            body="雨天のため、本日の通常練習は中止します。"
          />

          <NoticeCard
            category="練習"
            icon="⚽"
            color="bg-green-600"
            title="7/15 通常練習の持ち物"
            target="2年"
            time="昨日"
            body="暑さ対策のため、水筒を多めに持参してください。"
          />

          <NoticeCard
            category="大会"
            icon="🏆"
            color="bg-orange-500"
            title="U9交流戦の案内を掲載しました"
            target="2年"
            time="7/5"
            body="集合時間、会場案内、駐車場情報を確認してください。"
          />

          <NoticeCard
            category="イベント"
            icon="🎉"
            color="bg-purple-600"
            title="キッズ親子サッカーのお知らせ"
            target="キッズ"
            time="7/3"
            body="親子で参加できるイベントを開催します。"
          />

          <NoticeCard
            category="全体"
            icon="📄"
            color="bg-slate-600"
            title="夏休みイベントのお知らせ"
            target="全部"
            time="7/1"
            body="地区会館で夏休みイベントを開催します。"
          />
        </div>
      </section>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <nav className="grid grid-cols-4 py-2 text-center text-xs font-bold">
          <div className="text-gray-500">
            <div className="text-xl">📅</div>
            <div>スケジュール</div>
          </div>
          <div className="text-gray-500">
            <div className="text-xl">✅</div>
            <div>出欠</div>
          </div>
          <div className="text-red-600">
            <div className="text-xl">📢</div>
            <div>お知らせ</div>
          </div>
          <div className="text-gray-500">
            <div className="text-xl">☰</div>
            <div>メニュー</div>
          </div>
        </nav>
      </footer>
    </main>
  );
}

function FilterButton({ label, active }: { label: string; active: boolean }) {
  return (
    <button
      className={`rounded-full px-4 py-2 text-sm font-black ${
        active
          ? "bg-red-600 text-white"
          : "border border-gray-300 bg-white text-slate-900"
      }`}
    >
      {label}
    </button>
  );
}

function NoticeCard({
  unread = false,
  category,
  icon,
  color,
  title,
  target,
  time,
  body,
}: {
  unread?: boolean;
  category: string;
  icon: string;
  color: string;
  title: string;
  target: string;
  time: string;
  body: string;
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-sm ${
        unread ? "border-2 border-red-200" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`rounded-xl px-3 py-2 text-white ${color}`}>
          <div className="text-xl">{icon}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2 py-1 text-xs font-black text-white ${color}`}>
              {category}
            </span>
            <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-black text-slate-700">
              {target}
            </span>
            {unread && (
              <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-black text-white">
                未読
              </span>
            )}
          </div>

          <div className="mt-2 text-lg font-black text-slate-900">{title}</div>
          <div className="mt-1 text-sm font-bold text-slate-600">{body}</div>

          <div className="mt-2 flex justify-between text-xs font-bold text-slate-500">
            <span>{time}</span>
            <span>＞</span>
          </div>
        </div>
      </div>
    </div>
  );
}