import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-white pb-24">
      <Header title="お知らせ" subtitle="NEWS" />

      <section className="px-5 py-6">
        <p className="text-gray-700">
          お知らせ機能はこれから作成します。
        </p>
      </section>

      <Footer current="news" />
    </main>
  );
}