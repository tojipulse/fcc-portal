import Link from "next/link";

type FooterProps = {
  current?: "schedule" | "attendance" | "news" | "menu";
};

export default function Footer({ current = "schedule" }: FooterProps) {
  const navItems = [
    {
      key: "schedule",
      label: "スケジュール",
      icon: "📅",
      href: "/schedule",
    },
    {
      key: "attendance",
      label: "出欠",
      icon: "🙋",
      href: "/attendance",
    },
    {
      key: "news",
      label: "お知らせ",
      icon: "📢",
      href: "/news",
    },
    {
      key: "menu",
      label: "メニュー",
      icon: "☰",
      href: "/",
    },
  ];

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t bg-white shadow-md">
      <nav className="flex justify-around py-3">
        {navItems.map((item) => {
          const isActive = current === item.key;

          return (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center ${
                isActive ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}