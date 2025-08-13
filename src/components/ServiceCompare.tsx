"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServiceComparison {
  feature: string;
  [key: string]: string;
}

const data: ServiceComparison[] = [
  {
    feature: "Duration",
    "Whole Abdomen Scan": "15–20 mins",
    "Pregnancy Ultrasound": "15–30 mins",
    "Color Doppler Studies": "20 mins",
    "Musculoskeletal Scan": "20–30 mins",
    "USG-Guided Procedures": "30–45 mins",
    "Diagnostic Ultrasound": "15–25 mins",
  },
  {
    feature: "Purpose",
    "Whole Abdomen Scan": "Abdominal organs",
    "Pregnancy Ultrasound": "Fetal monitoring",
    "Color Doppler Studies": "Blood flow",
    "Musculoskeletal Scan": "Muscles & joints",
    "USG-Guided Procedures": "FNAC/Biopsies",
    "Diagnostic Ultrasound": "General diagnostics",
  },
  {
    feature: "Preparation",
    "Whole Abdomen Scan": "Fasting",
    "Pregnancy Ultrasound": "Full bladder (early)",
    "Color Doppler Studies": "No preparation",
    "Musculoskeletal Scan": "Loose clothing",
    "USG-Guided Procedures": "Consent required",
    "Diagnostic Ultrasound": "Depends on organ",
  },
  {
    feature: "Safety",
    "Whole Abdomen Scan": "✅ Safe",
    "Pregnancy Ultrasound": "✅ Safe",
    "Color Doppler Studies": "✅ Safe",
    "Musculoskeletal Scan": "✅ Safe",
    "USG-Guided Procedures": "✅ Safe",
    "Diagnostic Ultrasound": "✅ Safe",
  },
  {
    feature: "Scan Type",
    "Whole Abdomen Scan": "2D",
    "Pregnancy Ultrasound": "2D / 3D / 4D",
    "Color Doppler Studies": "Color Doppler",
    "Musculoskeletal Scan": "2D High-Res",
    "USG-Guided Procedures": "Guided 2D",
    "Diagnostic Ultrasound": "2D",
  },
  {
    feature: "Real-time Report",
    "Whole Abdomen Scan": "Yes",
    "Pregnancy Ultrasound": "Yes",
    "Color Doppler Studies": "No",
    "Musculoskeletal Scan": "Yes",
    "USG-Guided Procedures": "No",
    "Diagnostic Ultrasound": "Yes",
  },
  {
    feature: "Report Delivery Time",
    "Whole Abdomen Scan": "15 mins",
    "Pregnancy Ultrasound": "Same day",
    "Color Doppler Studies": "Next day",
    "Musculoskeletal Scan": "Within 1 hour",
    "USG-Guided Procedures": "Depends on test",
    "Diagnostic Ultrasound": "Within 30 mins",
  },
  {
    feature: "Availability",
    "Whole Abdomen Scan": "Daily",
    "Pregnancy Ultrasound": "Daily",
    "Color Doppler Studies": "Appointment",
    "Musculoskeletal Scan": "Daily",
    "USG-Guided Procedures": "Appointment",
    "Diagnostic Ultrasound": "Daily",
  },
];

const ServiceComparisonTable: React.FC = () => {
  return (
    <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
        Ultrasound Service Comparison
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
          <Table className="w-full text-base border-collapse">
            <TableHeader>
              <TableRow className="bg-[#42998d] text-white">
                <TableHead className="px-6 py-4 text-lg font-semibold text-white whitespace-nowrap border border-gray-300">
                  Feature
                </TableHead>
                {Object.keys(data[0])
                  .filter((key) => key !== "feature")
                  .map((key) => (
                    <TableHead
                      key={key}
                      className="px-6 py-4 text-base font-medium text-white whitespace-nowrap border border-gray-300">
                      {key}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <TableCell className="px-6 py-4 font-semibold text-gray-800 whitespace-nowrap border border-gray-300">
                    {row.feature}
                  </TableCell>
                  {Object.keys(row)
                    .filter((key) => key !== "feature")
                    .map((key) => (
                      <TableCell
                        key={key}
                        className="px-6 py-4 text-gray-700 whitespace-nowrap border border-gray-300">
                        {row[key]}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparisonTable;
