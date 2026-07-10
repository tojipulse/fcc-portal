export default function MockAdminEventCreatePage() {
  return (
    <main className="min-h-screen bg-gray-100 pb-32">
      <header className="border-b bg-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-black text-slate-900">FCC PORTAL</div>
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">管理者</div>
        </div>
        <div className="mt-2 text-sm font-bold text-slate-800">
          管理画面 / 予定作成・編集
        </div>
      </header>

      <section className="px-4 py-5">
        <h1 className="text-3xl font-black text-blue-700">予定作成</h1>

        <FormBlock title="予定種別" required>
          <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold">
            <option>⚽ 通常練習</option>
            <option>🆚 練習試合</option>
            <option>🏆 大会</option>
            <option>🎉 イベント</option>
          </select>
        </FormBlock>

        <FormBlock title="日付" required>
          <input className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold" value="2026/07/12（土）" readOnly />
        </FormBlock>

        <FormBlock title="時間" required>
          <div className="mt-3 grid grid-cols-1 gap-3">
            <div>
              <div className="text-sm font-black text-slate-700">開始時間</div>
              <input className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold" value="09:00" readOnly />
            </div>
            <div>
              <div className="text-sm font-black text-slate-700">終了時間</div>
              <input className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold" value="11:00" readOnly />
            </div>
          </div>
        </FormBlock>

        <FormBlock title="場所" required>
          <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold">
            <option>瑞光小学校</option>
            <option>東尾久グランド</option>
            <option>その他（自由入力）</option>
          </select>
        </FormBlock>

        <FormBlock title="対象学年" required>
          <div className="mt-3 flex flex-wrap gap-2">
            {["全学年", "キッズ", "1年", "2年", "3年", "4年", "5年", "6年"].map((grade) => (
              <button
                key={grade}
                className={`rounded-xl px-4 py-3 text-sm font-black ${
                  ["1年", "2年", "3年"].includes(grade)
                    ? "bg-blue-600 text-white"
                    : "border border-gray-300 bg-white text-slate-900"
                }`}
              >
                {grade}
              </button>
            ))}
          </div>
        </FormBlock>

        <FormBlock title="活動グループ設定">
          <div className="rounded-xl bg-blue-50 p-3 text-sm font-black text-blue-800">
            選択中：1年・2年・3年
          </div>

          <div className="mt-4 rounded-xl bg-white p-3 ring-1 ring-gray-200">
            <div className="text-sm font-black text-slate-900">グループ作成</div>
            <p className="mt-1 text-xs font-bold text-slate-500">
              同じ時間・場所でも、一緒に活動する学年だけをまとめます。
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-black text-slate-900">1年</button>
              <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white">2年</button>
              <button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white">3年</button>
            </div>

            <button className="mt-3 w-full rounded-xl bg-blue-600 py-3 font-black text-white">
              選択した学年でグループを追加
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <ActivityGroup
              title="グループ1"
              grades="1年"
              mode="単独で実施"
              selectedCount="6名"
              template="1年 試合組A"
              players={["1年A", "1年B", "1年C", "1年D", "1年E", "1年F"]}
            />

            <ActivityGroup
              title="グループ2"
              grades="2年・3年"
              mode="合同で実施"
              selectedCount="8名"
              template="2年・3年 合同試合組A"
              players={["維吹", "そうた", "はる", "りく", "3年A", "3年B", "3年C", "3年D"]}
            />
          </div>
        </FormBlock>

        <FormBlock title="公開設定">
          <label className="mt-3 flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-4 font-black">
            <input type="checkbox" />
            お知らせへ掲載する
          </label>

          <label className="mt-3 flex items-center gap-3 rounded-xl border border-gray-300 bg-white p-4 font-black">
            <input type="checkbox" />
            ピン留めする
          </label>

          <div className="mt-3">
            <div className="text-sm font-black text-slate-700">ピン留め期限</div>
            <input className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-4 font-bold" value="2026/08/31" readOnly />
          </div>
        </FormBlock>

        <FormBlock title="備考">
          <textarea className="mt-2 h-28 w-full rounded-xl border border-gray-300 p-4" placeholder="備考を入力してください" />
        </FormBlock>

        <div className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
          <div className="text-lg font-black">保護者画面プレビュー</div>

          <PreviewCard grades={["1年"]} />

          <PreviewCard grades={["2年", "3年"]} isJoint />
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 bg-white px-4 py-3 shadow-lg">
        <div className="grid grid-cols-2 gap-3">
          <button className="rounded-xl bg-blue-600 py-4 text-lg font-black text-white">保存</button>
          <button className="rounded-xl border border-blue-600 bg-white py-4 text-lg font-black text-blue-600">
            保存して続けて登録
          </button>
        </div>
      </div>
    </main>
  );
}

function ActivityGroup({
  title,
  grades,
  mode,
  selectedCount,
  template,
  players,
}: {
  title: string;
  grades: string;
  mode: string;
  selectedCount: string;
  template: string;
  players: string[];
}) {
  return (
    <div className="rounded-xl border border-blue-100 bg-white p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <div className="text-sm font-black text-slate-900">{title}</div>
          <div className="mt-1 text-sm font-bold text-blue-700">対象：{grades}</div>
        </div>
        <div className="rounded-full bg-blue-600 px-3 py-1 text-xs font-black text-white">
          {selectedCount}
        </div>
      </div>

      <div className="mt-3">
        <div className="rounded-xl bg-blue-50 p-3 text-sm font-black text-blue-800">
          {mode}
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-black text-slate-700">選手テンプレート</div>
        <select className="mt-2 w-full rounded-xl border border-gray-300 bg-white p-3 text-sm font-bold">
          <option>{template}</option>
          <option>選択しない（手動で選ぶ）</option>
        </select>
        <div className="mt-1 text-xs font-bold text-slate-500">
          グループの対象学年と完全一致するテンプレートのみ表示します。
        </div>
      </div>

      <div className="mt-3">
        <div className="text-xs font-black text-slate-700">対象選手</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {players.map((name, index) => (
            <button
              key={name}
              className={`rounded-full px-3 py-2 text-xs font-black ${
                index < 4
                  ? "bg-blue-600 text-white"
                  : "border border-gray-300 bg-white text-slate-900"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreviewCard({ grades, isJoint = false }: { grades: string[]; isJoint?: boolean }) {
  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <div className="text-2xl font-black">7/12（土）</div>
        {grades.map((grade) => (
          <div key={grade} className="rounded-md bg-blue-600 px-2 py-1 text-xs font-black text-white">
            {grade}
          </div>
        ))}
        {isJoint && (
          <div className="rounded-md bg-gray-200 px-2 py-1 text-xs font-black text-slate-900">
            合同
          </div>
        )}
      </div>
      <div className="mt-3 text-lg font-black text-green-700">⚽ 通常練習</div>
      <div className="mt-2 text-sm font-bold text-slate-700">🕘 09:00〜11:00</div>
      <div className="text-sm font-bold text-slate-700">📍 瑞光小学校</div>
    </div>
  );
}

function FormBlock({
  title,
  required = false,
  children,
}: {
  title: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2 text-base font-black">
        <span>{title}</span>
        {required && (
          <span className="rounded-md border border-red-300 px-2 py-0.5 text-xs font-black text-red-600">
            必須
          </span>
        )}
      </div>
      {children}
    </div>
  );
}