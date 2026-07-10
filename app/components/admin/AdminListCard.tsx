import Link from "next/link";
import { ReactNode } from "react";

type AdminListCardProps = {
  href: string;
  title: string;
  children?: ReactNode;
  footer?: ReactNode;
};

export default function AdminListCard({
  href,
  title,
  children,
  footer,
}: AdminListCardProps) {
  return (
    <Link href={href} className="block">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 transition-colors hover:border-green-400">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-lg font-black text-slate-900">
              {title}
            </div>

            {children && (
              <div className="mt-3 space-y-2">
                {children}
              </div>
            )}

            {footer && (
              <div className="mt-3">
                {footer}
              </div>
            )}
          </div>

          <div className="pt-2 text-2xl font-black text-slate-400">
            ＞
          </div>
        </div>
      </div>
    </Link>
  );
}