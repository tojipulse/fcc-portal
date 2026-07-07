import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AttendancePage() {
  return (
    <main className="min-h-screen bg-white pb-24">
      <Header title="出欠" subtitle="ATTENDANCE" />

      <section className="px-5 py-6">
        <p className="text-gray-700">
          出欠機能はこれから作成します。
        </p>
      </section>

      <Footer current="attendance" />
    </main>
  );
}