import Image from "next/image";

import { EMPTY_STATE_ILLUSTRATION } from "@/lib/constants/app";

import { Card, CardContent, CardDescription, CardTitle } from "./card";

type EmptyStateProps = {
  title: string;
  description: string;
};

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <Image alt={title} className="rounded-[24px]" height={220} src={EMPTY_STATE_ILLUSTRATION} width={320} />
        <div className="flex flex-col gap-2">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}
