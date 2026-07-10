export default function MockSchedulePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-24">
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

      <section className="bg-white px-4 py-5">
        <div className="mb-4 flex items-center justify-between">
          <button className="text-3xl">‹</button>
          <h1 className="text-2xl font-black">2026年7月</h1>
          <button className="text-3xl">›</button>
        </div>

        <div className="grid grid-cols-7 text-center text-sm font-bold text-gray-700">
          {["日", "月", "火", "水", "木", "金", "土"].map((day) => (
            <div key={day} className={day === "日" ? "text-red-600" : ""}>
              {day}
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-7 gap-y-4 text-center text-xl">
          {[
            "", "", "", "1", "2", "3", "4",
            "5", "6", "7", "8", "9", "10", "11",
            "12", "13", "14", "15", "16", "17", "18",
            "19", "20", "21", "22", "23", "24", "25",
            "26", "27", "28", "29", "30", "31", "",
          ].map((day, index) => {
            const selected = day === "12";
            const hasEvent = ["10", "12", "15"].includes(day);

            return (
              <div key={index} className="relative flex justify-center">
                <div
                  className={
                    selected
                      ? "flex h-10 w-10 items-center justify-center rounded-full bg-red-600 font-bold text-white"
                      : "flex h-10 w-10 items-center justify-center"
                  }
                >
                  {day}
                </div>

                {hasEvent && (
                  <div className="absolute -bottom-2 text-xs">
                    {day === "12" ? "⚽🆚" : "⚽"}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-5">
        <h2 className="mb-3 text-lg font-black">7/12（土）の予定</h2>

        <div className="space-y-3">
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex justify-between">
              <div className="font-black">7/12（土）</div>
              <div className="text-gray-400">＞</div>
            </div>
            <div className="mt-2 text-lg font-black">⚽ 通常練習</div>
            <div className="mt-1 text-sm text-gray-700">🕘 09:00〜11:00</div>
            <div className="text-sm text-gray-700">📍 瑞光小学校</div>
          </div>

          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <div className="flex justify-between">
              <div className="font-black">7/12（土）</div>
              <div className="text-gray-400">＞</div>
            </div>
            <div className="mt-2 text-lg font-black">🆚 練習試合</div>
            <div className="mt-1 text-sm text-gray-700">🕘 13:00〜16:00</div>
            <div className="text-sm text-gray-700">📍 東尾久グランド</div>
          </div>
        </div>
      </section>

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