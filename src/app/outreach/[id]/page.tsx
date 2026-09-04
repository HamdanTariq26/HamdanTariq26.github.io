import { notFound } from "next/navigation";
import { outreachActivities } from "@/data/profile";
import OutreachDetailView from "@/components/OutreachDetailView";

export function generateStaticParams() {
  return outreachActivities.map((item) => ({
    id: item.id,
  }));
}

export default async function OutreachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = outreachActivities.find((a) => a.id === id);

  if (!item) {
    notFound();
  }

  return <OutreachDetailView item={item} />;
}
