"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

type NavigationItem = {
  label: string;
  href?: string;
  icon: string;
  type: "link" | "menu";
};

const navigationItems: NavigationItem[] = [
  { label: "スケジュール", href: "/", icon: "📅", type: "link" },
  { label: "一括出欠", href: "/attendance", icon: "✅", type: "link" },
  { label: "お知らせ", href: "/news", icon: "📢", type: "link" },
  { label: "メニュー", icon: "☰", type: "menu" },
];

export default function FooterNavigation() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

          <div className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-md rounded-2xl bg-white p-4 shadow-2xl">
            <div className="text-lg font-black text-slate-900">メニュー</div>

            <div className="mt-4 space-y-2">
              <Link
                href="/account"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-900"
              >
                👨‍👩‍👧 対象選手・アカウント
              </Link>

              <a
                href="https://fc-challengers.amebaownd.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-900"
              >
                🌐 公式ホームページ
              </a>

              <a
                href="https://www.instagram.com/fc.challengers/"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-900"
              >
                📷 Instagram
              </a>

              <Link
                href="/videos"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-slate-100 px-4 py-3 text-sm font-black text-slate-900"
              >
                🎥 動画一覧
              </Link>

              <Link
                href="/admin"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl bg-green-50 px-4 py-3 text-sm font-black text-green-700"
              >
                🛠 管理画面
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-black text-slate-800"
              >
                閉じる
              </button>
            </div>
          </div>
        </>
      )}

      <footer className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white">
        <nav className="mx-auto flex h-16 max-w-md">
          {navigationItems.map((item) => {
            const active =
              item.type === "link" && item.href
                ? item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href)
                : false;

            if (item.type === "menu") {
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMenuOpen(true)}
                  className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500"
                >
                  <div className="text-xl">{item.icon}</div>
                  <div className="text-[11px] font-black">{item.label}</div>
                </button>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className={`flex flex-1 flex-col items-center justify-center gap-1 transition-colors ${
                  active
                    ? "text-green-600"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <div className="text-xl">{item.icon}</div>
                <div className="text-[11px] font-black">{item.label}</div>
              </Link>
            );
          })}
        </nav>
      </footer>
    </>
  );
}