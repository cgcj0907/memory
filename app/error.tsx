"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <AppShell>
      <Card>
        <CardContent className="flex flex-col gap-4 p-8">
          <CardTitle>这一页不小心卡住了</CardTitle>
          <CardDescription>{error.message || "稍等一下，再试一次就好。"}</CardDescription>
          <div>
            <Button onClick={reset}>重新打开</Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  );
}
