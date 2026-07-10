type AppHeaderProps = {
  title: string;
  subtitle?: string;
  admin?: boolean;
};

export default function AppHeader({
  title,
  subtitle,
  admin = false,
}: AppHeaderProps) {
  return (
    <header className="border-b bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-black text-slate-900">
          FCC PORTAL
        </div>

        {admin && (
          <div className="rounded-lg bg-red-600 px-3 py-1 text-sm font-bold text-white">
            管理者
          </div>
        )}
      </div>

      <div className="mt-3">
        <h1 className="text-xl font-black text-slate-900">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-1 text-sm font-bold text-slate-500">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}