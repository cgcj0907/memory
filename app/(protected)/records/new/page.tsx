import { PageHeader } from "@/components/layout/page-header";
import { RecordForm } from "@/components/records/record-form";
import { Card, CardContent } from "@/components/ui/card";

export default function NewRecordPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader backHref="/" description="把这次一起走过的小片段贴进回忆册里。" title="新增记录" />
      <Card>
        <CardContent className="p-6">
          <RecordForm />
        </CardContent>
      </Card>
    </div>
  );
}
