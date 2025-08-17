import ReportViewer from "@/components/ReportCom/ReportViewer";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { metadataConfig } from "@/app/(public)/metadata-config";
import Protected from "@/ProtectedRoute/Protected";

export const metadata: Metadata = metadataConfig["/reports"];

interface ReportPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
  const { slug } = await params;

  const decodedSlug = decodeURIComponent(slug);
  const name = decodedSlug.split("-report")[0];

  // ? Optionally fetch report by name from DB here if needed

  if (!name) return notFound();

  return (
    <div className="min-h-screen">
      <Protected>
        <ReportViewer />
      </Protected>
    </div>
  );
}
