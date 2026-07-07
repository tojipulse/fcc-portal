import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white pb-24">
      <Header title="メニュー" subtitle="MENU" />

      <section className="px-5 py-6">
        <div className="space-y-4">
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            スケジュール
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            出欠
          </div>
          <div className="rounded-xl border bg-white p-4 shadow-sm">
            お知らせ
          </div>
        </div>
      </section>

      <Footer current="menu" />
    </main>
  );
}