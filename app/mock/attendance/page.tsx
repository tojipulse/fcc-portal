export default function MockAttendancePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-32">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
              管理者
            </div>
            <div className="text-3xl">☰</div>
          </div>
        </div>

        <div className="mt-2 truncate text-sm font-bold text-slate-800">
          キッズ（年長）：絃獅 ｜ 2年：維吹 ｜ 4年：凰歌
        </div>
      </header>

      <section className="px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="text-3xl text-red-600">☑</div>
          <h1 className="text-3xl font-black text-slate-900">出欠入力</h1>
        </div>

        <p className="mt-2 text-sm font-bold text-slate-700">
          予定ごとに出欠を選択して、最後にまとめて保存します。
        </p>

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-900">対象選手</div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            <button className="rounded-full bg-red-600 py-3 text-sm font-black text-white">維吹</button>
            <button className="rounded-full border border-gray-300 bg-white py-3 text-sm font-black text-slate-900">凰歌</button>
            <button className="rounded-full border border-gray-300 bg-white py-3 text-sm font-black text-slate-900">絃獅</button>
            <button className="rounded-full border border-gray-300 bg-white py-3 text-sm font-black text-slate-900">👥 全員</button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <AttendanceCard date="7/12（土）" grades={[{ label: "2年", color: "bg-blue-600" }]} icon="⚽" title="通常練習" titleColor="text-green-700" time="09:00〜11:00" place="瑞光小学校" selected="present" />
          <AttendanceCard date="7/13（日）" grades={[{ label: "4年", color: "bg-purple-600" }, { label: "5年", color: "bg-indigo-600" }]} isJoint icon="🆚" title="練習試合" titleColor="text-blue-700" time="13:00〜16:00" place="東尾久グランド" selected="absent" />
          <AttendanceCard date="7/15（火）" grades={[{ label: "2年", color: "bg-blue-600" }]} icon="⚽" title="通常練習" titleColor="text-green-700" time="17:00〜19:00" place="瑞光小学校" selected="undecided" />
          <AttendanceCard date="7/19（土）" grades={[{ label: "キッズ", color: "bg-green-600" }]} icon="🎪" title="イベント（親子サッカー）" titleColor="text-orange-600" time="09:30〜11:30" place="瑞光小学校" selected={null} />
          <AttendanceCard date="7/21（月祝）" grades={[{ label: "5年", color: "bg-cyan-600" }, { label: "6年", color: "bg-blue-600" }]} isJoint icon="🏆" title="大会（交流戦）" titleColor="text-orange-600" time="08:30〜15:00" place="あらかわ総合スポーツセンター" selected={null} />
        </div>
      </section>

      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button className="w-full rounded-xl bg-red-600 py-4 text-lg font-black text-white">
          💾 保存する
          <div className="text-xs font-bold">変更内容をまとめて保存します</div>
        </button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <nav className="grid grid-cols-4 py-2 text-center text-xs font-bold">
          <div className="text-gray-500"><div className="text-xl">📅</div><div>スケジュール</div></div>
          <div className="text-red-600"><div className="text-xl">✅</div><div>出欠</div></div>
          <div className="text-gray-500"><div className="text-xl">📢</div><div>お知らせ</div></div>
          <div className="text-gray-500"><div className="text-xl">☰</div><div>メニュー</div></div>
        </nav>
      </footer>
    </main>
  );
}

type Status = "present" | "absent" | "undecided" | null;

type GradeBadge = {
  label: string;
  color: string;
};

type AttendanceCardProps = {
  date: string;
  grades: GradeBadge[];
  isJoint?: boolean;
  icon: string;
  title: string;
  titleColor: string;
  time: string;
  place: string;
  selected: Status;
};

function AttendanceCard({
  date,
  grades,
  isJoint = false,
  icon,
  title,
  titleColor,
  time,
  place,
  selected,
}: AttendanceCardProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-2xl font-black text-slate-900">{date}</div>

          {grades.map((grade) => (
            <div key={grade.label} className={`rounded-md px-2 py-1 text-xs font-black text-white ${grade.color}`}>
              {grade.label}
            </div>
          ))}

          {isJoint && (
            <div className="rounded-md bg-gray-200 px-2 py-1 text-xs font-black text-slate-900">
              合同
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <StatusButton label="出" active={selected === "present"} color="green" />
          <StatusButton label="欠" active={selected === "absent"} color="red" />
          <StatusButton label="未" active={selected === "undecided"} color="yellow" />
          <button className="h-11 w-11 rounded-xl border border-blue-200 bg-blue-50/30 text-xl text-blue-500">
            💬
          </button>
        </div>
      </div>

      <div className={`mt-3 text-lg font-black ${titleColor}`}>
        {icon} {title}
      </div>

      <div className="mt-2 space-y-1 text-sm font-bold text-slate-700">
        <div>🕘 {time}</div>
        <div>📍 {place}</div>
      </div>
    </div>
  );
}

function StatusButton({
  label,
  active,
  color,
}: {
  label: string;
  active: boolean;
  color: "green" | "red" | "yellow";
}) {
  const activeClass =
    color === "green"
      ? "bg-green-600 text-white border-green-600"
      : color === "red"
        ? "bg-red-600 text-white border-red-600"
        : "bg-yellow-400 text-slate-900 border-yellow-400";

  const inactiveClass =
    color === "green"
      ? "bg-white text-green-600 border-green-200"
      : color === "red"
        ? "bg-white text-red-500 border-red-200"
        : "bg-white text-yellow-700 border-yellow-200";

  return (
    <button className={`h-11 w-11 rounded-xl border text-lg font-black transition ${active ? activeClass : inactiveClass}`}>
      {label}
    </button>
  );
}