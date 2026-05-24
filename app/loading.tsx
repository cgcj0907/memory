import { AppShell } from "@/components/layout/app-shell";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <AppShell>
      <Card>
        <CardContent className="p-8">
          <div className="animate-pulse text-sm text-stone-400">正在翻开这本回忆册...</div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
