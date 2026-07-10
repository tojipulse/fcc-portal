"use client";

import { useRouter } from "next/navigation";

type PageBackButtonProps = {
  fallbackPath?: string;
  label?: string;
};

export default function PageBackButton({
  fallbackPath = "/",
  label = "戻る",
}: PageBackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackPath);
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className="mb-3 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-black text-slate-700 shadow"
    >
      ← {label}
    </button>
  );
}