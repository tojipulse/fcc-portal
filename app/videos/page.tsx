import AppHeader from "../components/layout/AppHeader";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/ui/Card";
import GradeBadge from "../components/schedule/GradeBadge";

export default function VideosPage() {
  return (
    <PageContainer>
      <AppHeader title="動画一覧" subtitle="チーム動画・学年別動画" />

      <section className="space-y-3 px-4 py-5">
        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              2026/7/8
            </span>
            <GradeBadge label="2年" variant="grade" />
          </div>

          <div className="mt-3 text-lg font-black text-slate-900">
            7月練習試合ハイライト
          </div>

          <div className="mt-2 text-sm font-bold leading-6 text-slate-700">
            2年生の練習試合動画です。
          </div>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-black text-white"
          >
            動画を見る
          </a>
        </Card>

        <Card>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              2026/7/1
            </span>
            <GradeBadge label="全学年" variant="all" />
          </div>

          <div className="mt-3 text-lg font-black text-slate-900">
            夏休みイベント告知動画
          </div>

          <div className="mt-2 text-sm font-bold leading-6 text-slate-700">
            夏休みイベントの案内動画です。
          </div>

          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl bg-green-600 px-4 py-3 text-center text-sm font-black text-white"
          >
            動画を見る
          </a>
        </Card>
      </section>
    </PageContainer>
  );
}