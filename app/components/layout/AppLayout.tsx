import FooterNavigation from "./FooterNavigation";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen pb-20">
      {children}
      <FooterNavigation />
    </div>
  );
}