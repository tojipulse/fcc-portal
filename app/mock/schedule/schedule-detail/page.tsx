export default function MockScheduleDetailPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-28">
      <header className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-black">FCC PORTAL</div>
          <div className="rounded-full bg-red-600 px-3 py-1 text-xs font-bold text-white">
            管理者
          </div>
        </div>

        <div className="mt-2 text-sm font-bold text-gray-700">
          キッズ（年長）：絃獅 ｜ 2年：維吹 ｜ 4年：凰歌
        </div>
      </header>

      <section className="px-4 py-5">
        <div className="rounded-2xl bg-red-50 p-4 shadow-sm border border-red-200">
          <div className="text-lg font-black text-red-700">🔴 中止</div>
          <p className="mt-2 text-sm font-bold text-red-700">
            本日の練習は雨天のため中止です。
          </p>

          <div className="mt-4 rounded-xl bg-white p-3">
            <div className="flex justify-between">
              <div className="font-black">7/12（土）</div>
              <div className="text-gray-400">＞</div>
            </div>
            <div className="mt-2 text-lg font-black">⚽ 通常練習</div>
            <div className="mt-1 text-sm text-gray-700">🕘 09:00〜11:00</div>
            <div className="text-sm text-gray-700">📍 瑞光小学校</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-sm font-bold text-gray-500">予定詳細</div>

          <h1 className="mt-2 text-2xl font-black">⚽ 通常練習</h1>

          <div className="mt-4 space-y-3 text-sm">
            <div>📅 7/12（土）</div>
            <div>🕘 09:00〜11:00</div>
            <div>📍 瑞光小学校</div>
            <div>👦 対象：2年</div>
            <div>🤝 合同：なし</div>
            <div>👨‍🏫 参加予定コーチ：戸島、大谷</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">📝 備考</div>
          <p className="mt-2 text-sm text-gray-700">
            水筒を必ず持参してください。暑い場合は休憩を多めに取ります。
          </p>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">📎 添付ファイル</div>
          <div className="mt-3 space-y-2 text-sm font-bold text-blue-600">
            <div>📄 会場案内.pdf</div>
            <div>🖼️ 駐車場案内.jpg</div>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">変更履歴</div>

          <div className="mt-3 border-t pt-3 text-sm">
            <div className="font-bold text-yellow-700">🟡 時間変更</div>
            <div className="mt-1 text-gray-600">2026/07/07 18:30</div>
            <div className="mt-1 text-gray-700">17:00〜19:00 → 09:00〜11:00</div>
          </div>

          <div className="mt-3 border-t pt-3 text-sm">
            <div className="font-bold text-gray-700">新規作成</div>
            <div className="mt-1 text-gray-600">2026/07/01 20:00</div>
          </div>
        </div>
      </section>

      <div className="fixed bottom-16 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button className="w-full rounded-xl bg-red-600 py-4 text-lg font-black text-white">
          出欠を入力する
        </button>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 border-t bg-white">
        <nav className="grid grid-cols-4 py-2 text-center text-xs font-bold">
          <div className="text-red-600">
            <div className="text-xl">📅</div>
            <div>スケジュール</div>
          </div>
          <div className="text-gray-500">
            <div className="text-xl">✅</div>
            <div>出欠</div>
          </div>
          <div className="text-gray-500">
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