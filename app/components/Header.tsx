import Link from "next/link";

type HeaderProps = {
  title: string;
  subtitle: string;
};

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <section className="border-b px-5 py-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <div className="text-3xl font-black">FCC</div>
          <div className="text-lg font-bold">CHALLENGERS</div>
        </Link>

        <Link href="/" className="text-4xl">
          ☰
        </Link>
      </div>

      <div className="mt-4 border-t-4 border-red-600 pt-5 text-center">
        <h1 className="text-3xl font-black text-red-700">{title}</h1>
        <p className="font-bold text-red-700">{subtitle}</p>
      </div>
    </section>
  );
}