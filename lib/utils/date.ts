import { format } from "date-fns";
import { zhCN } from "date-fns/locale";

export function formatDisplayDate(value?: string | Date | null, pattern = "yyyy.MM.dd") {
  if (!value) return "还没有记录时间";

  return format(new Date(value), pattern, { locale: zhCN });
}
