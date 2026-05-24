import { BottomNav } from "@/components/layout/bottom-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#fff8fb_0%,#fffef6_100%)]">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-6 pb-24 md:px-8 md:pb-10">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
