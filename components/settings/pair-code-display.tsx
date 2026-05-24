"use client";

import { Copy } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

type PairCodeDisplayProps = {
  value: string;
};

export function PairCodeDisplay({ value }: PairCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <code className="select-all rounded-2xl bg-pink-50 px-4 py-2 text-sm font-semibold tracking-[0.2em] text-pink-600">
        {value}
      </code>
      <Button onClick={handleCopy} size="sm" type="button" variant="secondary">
        <Copy className="mr-2 size-4" />
        {copied ? "已复制" : "复制配对码"}
      </Button>
    </div>
  );
}
