import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description?: string;
  backHref?: string;
};

export function PageHeader({ title, description, backHref }: PageHeaderProps) {
  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        {backHref ? (
          <Link
            aria-label="返回"
            className="mt-1 rounded-full bg-white/80 p-2 text-pink-500 shadow-[0_10px_24px_rgba(255,214,231,0.2)]"
            href={backHref}
          >
            <ChevronLeft className="size-4" />
          </Link>
        ) : null}
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-stone-700">{title}</h1>
          {description ? <p className="text-sm leading-6 text-stone-500">{description}</p> : null}
        </div>
      </div>
    </header>
  );
}
