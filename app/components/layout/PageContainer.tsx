import { ReactNode } from "react";
import AppLayout from "./AppLayout";

type PageContainerProps = {
  children: ReactNode;
};

export default function PageContainer({
  children,
}: PageContainerProps) {
  return (
    <AppLayout>
      <main className="mx-auto min-h-screen w-full max-w-md bg-slate-100">
        {children}
      </main>
    </AppLayout>
  );
}