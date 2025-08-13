import ReportViewer from "@/components/ReportCom/ReportViewer";
import { notFound } from "next/navigation";

interface ReportPageProps {
  params: {
    slug: string;
  };
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.split("-report")[0];

  // ? Optionally fetch report by name from DB here if needed

  if (!name) return notFound();

  return (
    <div className="min-h-screen">
      <ReportViewer />
    </div>
  );
}
