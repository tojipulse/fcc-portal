export default function MockAdminImportPage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-32">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
            管理者
          </div>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-800">
          管理画面 / CSV一括インポート
        </div>
      </header>

      <section className="px-4 py-5">
        <h1 className="text-3xl font-black text-blue-700">CSV一括インポート</h1>
        <p className="mt-1 text-sm font-bold text-slate-600">
          予定をまとめて取り込みます。登録前に必ずプレビューで確認します。
        </p>

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">1. CSVファイル選択</div>

          <div className="mt-3 rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-6 text-center">
            <div className="text-4xl">📥</div>
            <div className="mt-2 text-base font-black text-blue-700">
              CSVファイルを選択
            </div>
            <div className="mt-1 text-xs font-bold text-slate-600">
              .csv形式のみ対応
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-gray-50 p-3 text-xs font-bold text-slate-600">
            例：日付、開始時間、終了時間、予定種別、場所、対象学年、備考
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">2. 取込プレビュー</div>
          <p className="mt-1 text-xs font-bold text-slate-500">
            登録前に内容を確認します。エラーがある行は登録できません。
          </p>

          <div className="mt-4 space-y-3">
            <ImportPreviewCard
              status="ok"
              date="7/12（土）"
              title="通常練習"
              grades="2年・3年"
              time="09:00〜11:00"
              place="瑞光小学校"
            />

            <ImportPreviewCard
              status="ok"
              date="7/13（日）"
              title="練習試合"
              grades="2年"
              time="13:00〜16:00"
              place="東尾久グランド"
            />

            <ImportPreviewCard
              status="error"
              date="7/15（火）"
              title="通常練習"
              grades="4年"
              time="17:00〜"
              place="瑞光小学校"
              error="終了時間が未入力です"
            />
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">3. 取込結果</div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <ResultBox label="正常" value="2件" color="text-green-600" />
            <ResultBox label="エラー" value="1件" color="text-red-600" />
            <ResultBox label="合計" value="3件" color="text-slate-900" />
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <button className="w-full rounded-xl bg-blue-600 py-4 text-lg font-black text-white">
          正常な予定だけ登録する
        </button>
      </div>
    </main>
  );
}

function ImportPreviewCard({
  status,
  date,
  title,
  grades,
  time,
  place,
  error,
}: {
  status: "ok" | "error";
  date: string;
  title: string;
  grades: string;
  time: string;
  place: string;
  error?: string;
}) {
  const isError = status === "error";

  return (
    <div
      className={`rounded-2xl p-4 shadow-sm ${
        isError ? "border-2 border-red-200 bg-red-50" : "bg-white ring-1 ring-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-xl font-black">{date}</div>
            <div className="rounded-md bg-blue-600 px-2 py-1 text-xs font-black text-white">
              {grades}
            </div>
            <div
              className={`rounded-full px-2 py-1 text-xs font-black ${
                isError ? "bg-red-600 text-white" : "bg-green-600 text-white"
              }`}
            >
              {isError ? "エラー" : "OK"}
            </div>
          </div>

          <div className="mt-2 text-lg font-black text-slate-900">⚽ {title}</div>
          <div className="mt-1 text-sm font-bold text-slate-700">🕘 {time}</div>
          <div className="text-sm font-bold text-slate-700">📍 {place}</div>

          {error && (
            <div className="mt-3 rounded-xl bg-white p-3 text-sm font-black text-red-600">
              ⚠️ {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResultBox({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-gray-50 p-3">
      <div className={`text-xl font-black ${color}`}>{value}</div>
      <div className="mt-1 text-xs font-bold text-slate-500">{label}</div>
    </div>
  );
}