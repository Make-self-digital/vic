"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Download,
  FileText,
  Users,
  Phone,
  BadgeInfo,
  CalendarClock,
  HeartPulse,
  FileSignature,
  Check,
} from "lucide-react";
import jsPDF from "jspdf";
import { toast } from "sonner";
import NoDataFound from "../No-Records/NoRecordCom";
import { useRouter } from "next/navigation";

interface ILoginPatient {
  _id: string;
  patientName: string;
  phone: string;
}

interface IPatientReport {
  _id: string;
  patientName: string;
  appointmentDate: string;
  paymentStatus: string;
  reportStatus: string;
  lastDate: string;
  service: string;
  status: string;
  reportUrl: string[];
}

type Status = "appointment" | "payment" | "report" | "";

export default function PatientReport() {
  const [loginPatient, setLoginPatient] = useState<ILoginPatient | null>(null);
  const [patientReport, setPatientReport] = useState<IPatientReport[]>([]);
  const [_, setReportLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isOpenReportId, setIsOpenReportId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const router = useRouter();

  // ? getting login patient data from localhost:-
  useEffect(() => {
    const data = localStorage.getItem("login_patient");
    if (!data) return;
    const StoredPatient = JSON.parse(data as string);
    if (StoredPatient) {
      setLoginPatient(StoredPatient);
    }
  }, []);

  // ? getting all reports and data of a patient:-
  useEffect(() => {
    const fetchPatient = async () => {
      if (!loginPatient) return;
      setReportLoading(true);

      const { _id: patientId, phone: phoneNumber } = loginPatient;

      try {
        const res = await fetch("/api/patient_complete_report", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ patientId, phoneNumber }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }

        setPatientReport(data.patient);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setReportLoading(false);
      }
    };

    fetchPatient();
  }, [loginPatient]);

  // ? handle download reports:-
  const handleDownload = async (url: string, service: string, name: string) => {
    const patient_Name = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const service_Name = service
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    try {
      setDownloading(true);
      const toastId = toast.loading("Downloading Report...", {
        description: "Please wait...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });

      const response = await fetch(url);
      const blob = await response.blob();
      const imgUrl = URL.createObjectURL(blob);

      const img = new Image();
      img.src = imgUrl;

      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;

        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "px",
          format: [imgWidth, imgHeight],
        });

        pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${patient_Name}-${service_Name}-Report.pdf`);

        URL.revokeObjectURL(imgUrl);
        setDownloading(false);
        toast.success("Report downloaded successfully!", {
          id: toastId,
          description: "Done ✔️",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        });
      };
    } catch (error) {
      console.error("Download failed:", error);
      setDownloading(false);
      toast.error(`Download failed :- ${error}`, {
        description: "Please try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    } finally {
      setDownloading(false);
    }
  };

  // ? handle format date:-
  function formatDate(date: string) {
    const [d, m, y] = date.split("-");
    return `${d} ${
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ][+m - 1]
    } ${y}`;
  }

  return (
    <>
      <main className="min-h-screen bg-gray-50">
        <div className="w-full space-y-6">
          {/* Patient Info */}
          <Card className="w-full rounded-md border border-gray-300 px-6 bg-white">
            {/* Heading */}
            <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
              <span className="border-b border-[#18564e] inline-block pb-1">
                Patient Info
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Patient Name */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-start gap-4">
                <Users className="w-6 h-6 text-[#18564e] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Patient Name</p>
                  <p className="text-base font-semibold text-[#18564e]">
                    {loginPatient?.patientName
                      ? loginPatient?.patientName
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")
                      : "No Data Found"}
                  </p>
                </div>
              </div>

              {/* Patient Phone */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#18564e] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-base font-semibold text-[#18564e]">
                    {`+91 ${
                      loginPatient?.phone
                        ? loginPatient?.phone
                        : "No Data Found"
                    }`}
                  </p>
                </div>
              </div>

              {/* Patient ID */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-start gap-4">
                <BadgeInfo className="w-6 h-6 text-[#18564e] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="text-base font-semibold text-[#18564e]">
                    {/* {dummyPatient.patientId} P-20250730001 */}
                    {`P-${
                      loginPatient?._id
                        ? loginPatient?._id.replace(/[a-z]/g, "")
                        : "No Data Found"
                    }`}
                  </p>
                </div>
              </div>

              {/* Last Visit */}
              {patientReport[patientReport.length - 1]?.lastDate && (
                <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-start gap-4">
                  <CalendarClock className="w-6 h-6 text-[#18564e] mt-1" />
                  <div>
                    <p className="text-sm text-gray-600">Last Visit</p>
                    <p className="text-base font-semibold text-[#18564e]">
                      {patientReport.length > 0
                        ? formatDate(
                            patientReport[patientReport.length - 1].lastDate
                          )
                        : "No Data Found"}
                    </p>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="bg-[#e6f4f2] rounded-xl p-4 flex items-start gap-4">
                <HeartPulse className="w-6 h-6 text-[#18564e] mt-1" />
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-base font-semibold text-green-600">
                    Active
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {patientReport.length === 0 ? (
            <div className="mt-10">
              <NoDataFound />
              <div className="text-center text-gray-500 tracking-wide text-sm font-semibold italic space-y-2 mt-2">
                <p>
                  Please visit your appointments page to access and download
                  your reports.
                </p>
                <button
                  onClick={() => router.push("/appointments")}
                  className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer">
                  Book Appointment
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Report Tracking Progress */}
              <Card className="w-full rounded-md border border-gray-300 px-6 py-6 bg-white">
                {/* Heading */}
                <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
                  <span className="border-b border-[#18564e] inline-block pb-1">
                    Track Your Report
                  </span>
                </h2>

                {/* Tracking Cards */}
                <div className="space-y-4">
                  {patientReport?.length > 0 &&
                    patientReport?.map((report, index) => {
                      // Dynamic currentStatus calculation
                      let currentStatus: Status = "";

                      if (report._id) {
                        currentStatus = "appointment";
                      }
                      if (report.paymentStatus === "paid") {
                        currentStatus = "payment";
                      }
                      if (report.reportStatus === "ready") {
                        currentStatus = "report";
                      }

                      const steps = [
                        { id: 1, label: "Appointment" },
                        { id: 2, label: "Payment" },
                        { id: 3, label: "Report" },
                      ];

                      const statusIndexMap = {
                        "": -1,
                        appointment: 0,
                        payment: 1,
                        report: 2,
                      };

                      const currentIndex = statusIndexMap[currentStatus];

                      return (
                        <div key={report._id} className="mb-10">
                          {/* Header */}
                          <div className="mb-4">
                            <div className="bg-[#e6f4f2] border border-[#c4e3df] rounded-md px-3 py-2 inline-block shadow-sm max-w-full sm:max-w-md">
                              <h2 className="text-[10px] sm:text-xs font-semibold text-[#0b968d] uppercase tracking-wide flex items-center flex-wrap">
                                <span className="inline-flex items-center justify-center rounded-full bg-[#0b968d] text-[#fff] aspect-square px-[6px] sm:px-2 text-[10px] sm:text-xs mr-2">
                                  {index + 1}
                                </span>
                                Tracking:{" "}
                                <span className="text-[#18564e] ml-1 break-words">
                                  {report.service}
                                </span>
                              </h2>
                            </div>
                          </div>

                          {/* Stepper */}
                          <div className="px-4 py-5 pt-6  bg-white rounded-xl border border-gray-200 shadow-sm">
                            <div className="relative">
                              {/* Base line */}
                              <div className="absolute top-[14px] left-0 right-0 h-0.5 bg-gray-300 z-0" />

                              {/* Active line */}
                              <div
                                className="absolute top-[14px] left-0 h-0.5 bg-[#0b968d] z-10 transition-all duration-500"
                                style={{
                                  width:
                                    currentIndex === 0
                                      ? "0px"
                                      : currentIndex === steps.length - 1
                                      ? "100%"
                                      : `${
                                          (currentIndex / (steps.length - 1)) *
                                          100
                                        }%`,
                                }}
                              />

                              {/* Step points */}
                              <div className="flex justify-between items-center relative z-20">
                                {steps.map((step, index) => {
                                  const isCompleted = index < currentIndex;
                                  const isCurrent = index === currentIndex;

                                  const circleClasses =
                                    isCompleted || isCurrent
                                      ? "bg-[#0b968d] text-white"
                                      : "bg-gray-300 text-transparent";

                                  const icon =
                                    isCompleted || isCurrent ? (
                                      <Check className="w-3 h-3" />
                                    ) : null;

                                  return (
                                    <div
                                      key={step.id}
                                      className="flex flex-col items-center flex-1">
                                      <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${circleClasses}`}>
                                        {icon}
                                      </div>
                                      <p className="mt-1 text-[11px] text-gray-600 font-medium text-center">
                                        {step.label}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Ready date of report */}
                            {report?.lastDate && (
                              <div className="mt-4 text-end">
                                <p className="text-[10px] sm:text-xs text-gray-600 mt-2">
                                  <span className="font-semibold text-[#0b968d]">
                                    Date:
                                  </span>{" "}
                                  {(report?.lastDate &&
                                    formatDate(report?.lastDate)) ||
                                    "-"}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </Card>

              {/* Report Section */}
              <Card className="w-full rounded-md border border-gray-300 bg-white mt-6">
                <CardContent className="px-6 space-y-5">
                  {/* Heading */}
                  <h2 className="text-2xl font-bold text-[#1e4d4f] tracking-wide">
                    <span className="border-b border-[#18564e] inline-block pb-1">
                      Patient Reports
                    </span>
                  </h2>

                  {/* Report Cards */}
                  <div className="space-y-4">
                    {patientReport.length > 0 &&
                      patientReport.map((report) => {
                        const isOpen = isOpenReportId === report._id;
                        const downloading = downloadingId === report._id;

                        return (
                          <div key={report._id}>
                            {/* Report Card */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-[#f8fdfa] border border-gray-200 rounded-xl p-4 hover:shadow-md transition">
                              <div className="flex items-start gap-3">
                                {/* Icon */}
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e6f4f2] text-[#0b968d]">
                                  <FileSignature className="w-6 h-6" />
                                </div>

                                {/* Report Info */}
                                <div className="space-y-1 text-sm text-gray-700">
                                  <p className="font-semibold text-base text-[#18564e]">
                                    {report.service || "No service found"}
                                  </p>
                                  {report.lastDate && (
                                    <p>
                                      Date:{" "}
                                      <span className="text-gray-600">
                                        {(report?.lastDate &&
                                          formatDate(report?.lastDate)) ||
                                          "No date found"}
                                      </span>
                                    </p>
                                  )}
                                  <p>
                                    Status:{" "}
                                    <span
                                      className={
                                        report.status === "Completed"
                                          ? "text-green-600 font-medium"
                                          : "text-yellow-600 font-medium"
                                      }>
                                      {report.status || "No status found"}
                                    </span>
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-3 mt-4 md:mt-0">
                                {report.status === "Completed" ? (
                                  <>
                                    {/* View Button */}
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      title="View Report"
                                      className="border-gray-300 text-[#18564e] hover:border-[#509f94] cursor-pointer tracking-wide"
                                      onClick={() =>
                                        setIsOpenReportId(
                                          isOpen ? null : report._id // toggle
                                        )
                                      }>
                                      <FileText className="w-4 h-4 mr-1" /> View
                                    </Button>

                                    {/* Download Button */}
                                    <Button
                                      size="sm"
                                      title="Download Report"
                                      className="bg-[#0b968d] hover:bg-[#097c74] text-white cursor-pointer tracking-wide"
                                      disabled={downloading}
                                      onClick={() => {
                                        setDownloadingId(report._id);
                                        handleDownload(
                                          report.reportUrl[0],
                                          report.service,
                                          report.patientName
                                        ).finally(() => setDownloadingId(null));
                                      }}>
                                      <Download className="w-4 h-4 mr-1" />
                                      {downloading
                                        ? "Downloading..."
                                        : "Download"}
                                    </Button>
                                  </>
                                ) : (
                                  <span className="text-sm text-gray-400 italic">
                                    Report not available
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Report Image */}
                            {isOpen && report.reportUrl.length > 0 && (
                              <div className="mt-4 flex justify-center">
                                <div className="w-full max-h-[80vh] overflow-auto mb-4">
                                  <img
                                    src={report.reportUrl[0]}
                                    alt="Report"
                                    className="w-full max-w-[900px] object-contain mx-auto rounded-md shadow-md"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

{
  /* <>
                  <NoDataFound />
                  <div className="text-center text-gray-500 tracking-wide text-sm font-semibold italic space-y-2">
                    <p>
                      Please visit your appointments page to access and download
                      your reports.
                    </p>
                    <button
                      onClick={() => router.push("/appointments")}
                      className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer">
                      Book Appointment
                    </button>
                  </div>
                </> */
}
