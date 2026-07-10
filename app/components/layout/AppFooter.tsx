"use client";

import Link from "next/link";
import { useState } from "react";

export default function AppFooter() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-md grid-cols-4">
          <Link href="/" className="py-3 text-center text-xs font-black text-slate-700">
            <div className="text-xl">📅</div>
            スケジュール
          </Link>

          <Link href="/attendance" className="py-3 text-center text-xs font-black text-slate-700">
            <div className="text-xl">📝</div>
            一括出欠
          </Link>

          <Link href="/news" className="py-3 text-center text-xs font-black text-slate-700">
            <div className="text-xl">📢</div>
            お知らせ
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="py-3 text-center text-xs font-black text-slate-700"
          >
            <div className="text-xl">☰</div>
            メニュー
          </button>
        </div>
      </footer>

      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mx-auto mb-5 h-1.5 w-12 rounded-full bg-slate-300" />

            <div className="text-xl font-black text-slate-900">メニュー</div>

            <div className="mt-4 space-y-2">
              <Link href="/account" className="block rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-800">
                👨‍👩‍👧 対象選手・アカウント
              </Link>

              <a href="https://fc-challengers.amebaownd.com/" target="_blank" className="block rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-800">
                🌐 公式ホームページ
              </a>

              <a href="https://www.instagram.com/" target="_blank" className="block rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-800">
                📷 Instagram
              </a>

              <Link href="/admin" className="block rounded-2xl bg-green-50 p-4 text-sm font-black text-green-700">
                🛠 管理画面
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}