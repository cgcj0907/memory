"use client";

type TagInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

export function TagInput({ value, onChange }: TagInputProps) {
  return (
    <div className="flex flex-col gap-3">
      <input
        className="flex h-11 w-full rounded-[22px] border border-pink-100 bg-white/90 px-4 py-3 text-sm text-stone-700 outline-none"
        onChange={(event) => {
          const next = event.target.value
            .split("，")
            .join(",")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
          onChange(next);
        }}
        placeholder="用逗号分隔标签，比如：春天,散步,收藏"
        value={value.join(", ")}
      />
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span key={tag} className="rounded-full bg-pink-100 px-3 py-1 text-xs font-medium text-pink-600">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
