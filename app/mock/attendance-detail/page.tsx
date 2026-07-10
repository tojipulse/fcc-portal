export default function MockAttendanceDetailPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-32">
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
        <h1 className="text-3xl font-black">出欠入力</h1>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-2xl font-black">7/12（土）</div>
            <div className="rounded-md bg-blue-600 px-2 py-1 text-xs font-black text-white">
              2年
            </div>
          </div>

          <div className="mt-3 text-xl font-black text-green-700">
            ⚽ 通常練習
          </div>
          <div className="mt-2 text-sm font-bold text-slate-700">🕘 09:00〜11:00</div>
          <div className="text-sm font-bold text-slate-700">📍 瑞光小学校</div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-500">選手</div>
          <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 text-lg font-black">
            <option>維吹</option>
          </select>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-500">出欠</div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <button className="rounded-xl bg-green-600 py-4 text-xl font-black text-white">
              出席
            </button>
            <button className="rounded-xl border border-red-200 bg-white py-4 text-xl font-black text-red-500">
              欠席
            </button>
            <button className="rounded-xl border border-yellow-200 bg-white py-4 text-xl font-black text-yellow-700">
              未定
            </button>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-black text-slate-500">コメント</div>
          <textarea
            className="mt-2 h-28 w-full rounded-xl border border-gray-300 p-4 text-base"
            placeholder="例：少し遅れます"
          />
        </div>
      </section>

      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button className="w-full rounded-xl bg-red-600 py-4 text-lg font-black text-white">
          保存する
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