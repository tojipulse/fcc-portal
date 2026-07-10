export default function MockAdminSchedulePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
            管理者
          </div>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-800">
          管理画面 / 予定管理
        </div>
      </header>

      <section className="px-4 py-5">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-black text-slate-900">予定一覧</h1>
          <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white">
            ＋ 新規
          </button>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-900">フィルター</div>

          <input
            className="mt-3 w-full rounded-xl border border-gray-300 bg-white p-4 text-sm font-bold"
            placeholder="予定名・場所で検索"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {["全部", "キッズ", "1年", "2年", "3年", "4年", "5年", "6年"].map((grade) => (
              <button
                key={grade}
                className={`rounded-full px-4 py-2 text-sm font-black ${
                  grade === "2年"
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-white text-slate-900"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div className="text-lg font-black text-slate-900">2026年7月</div>

          <AdminScheduleCard
            status="通常"
            date="7/12（土）"
            grades={["2年", "3年"]}
            joint
            icon="⚽"
            title="通常練習"
            time="09:00〜11:00"
            place="瑞光小学校"
            players="対象 8名"
          />

          <AdminScheduleCard
            status="中止"
            date="7/13（日）"
            grades={["2年"]}
            icon="🆚"
            title="練習試合"
            time="13:00〜16:00"
            place="東尾久グランド"
            players="対象 12名"
          />

          <AdminScheduleCard
            status="時間変更"
            date="7/15（火）"
            grades={["4年"]}
            icon="⚽"
            title="通常練習"
            time="17:30〜19:00"
            place="瑞光小学校"
            players="全選手"
          />

          <AdminScheduleCard
            status="通常"
            date="7/21（月祝）"
            grades={["全学年"]}
            icon="🎉"
            title="夏休みイベント"
            time="10:00〜14:00"
            place="地区会館"
            players="全選手"
            pinned
          />
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button className="w-full rounded-xl bg-blue-600 py-4 text-lg font-black text-white">
          一括インポート
        </button>
      </div>
    </main>
  );
}

function AdminScheduleCard({
  status,
  date,
  grades,
  joint = false,
  icon,
  title,
  time,
  place,
  players,
  pinned = false,
}: {
  status: "通常" | "中止" | "時間変更";
  date: string;
  grades: string[];
  joint?: boolean;
  icon: string;
  title: string;
  time: string;
  place: string;
  players: string;
  pinned?: boolean;
}) {
  const statusClass =
    status === "中止"
      ? "bg-red-100 text-red-700"
      : status === "時間変更"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-gray-100 text-slate-700";

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-2xl font-black">{date}</div>
            {grades.map((grade) => (
              <span
                key={grade}
                className="rounded-md bg-blue-600 px-2 py-1 text-xs font-black text-white"
              >
                {grade}
              </span>
            ))}
            {joint && (
              <span className="rounded-md bg-gray-200 px-2 py-1 text-xs font-black text-slate-900">
                合同
              </span>
            )}
            {pinned && (
              <span className="rounded-md bg-purple-100 px-2 py-1 text-xs font-black text-purple-700">
                📌
              </span>
            )}
          </div>

          <div className="mt-3 text-lg font-black text-slate-900">
            {icon} {title}
          </div>
          <div className="mt-2 text-sm font-bold text-slate-700">🕘 {time}</div>
          <div className="text-sm font-bold text-slate-700">📍 {place}</div>
          <div className="mt-2 text-xs font-black text-slate-500">{players}</div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClass}`}>
            {status}
          </span>
          <button className="rounded-xl border border-blue-600 bg-white px-3 py-2 text-sm font-black text-blue-600">
            編集
          </button>
          <button className="rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm font-black text-slate-700">
            複製
          </button>
        </div>
      </div>
    </div>
  );
}