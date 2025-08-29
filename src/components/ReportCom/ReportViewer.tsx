"use client";

import { useRef, useEffect, useState, DragEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Trash2, ImagePlus, Printer, CalendarIcon } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";
import { toPng } from "html-to-image";

interface Patient {
  patientName: string;
  age: string;
  gender: string;
  service: string;
  phone: string;
  status: "Pending" | "Completed";
  reportStatus: "pending" | "ready";
  payment: number;
  paymentStatus: "paid" | "unpaid";
  doctorName: string;
  reportUrl: string[];
  patientReport: {
    MakingDate: string;
    Sections: { heading: string; description: string }[];
    ImageUrls: string[];
  };
}

export default function ReportViewer() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");

  // New State
  const [sections, setSections] = useState<
    { heading: string; description: string }[]
  >([]);
  const [newHeading, setNewHeading] = useState("");

  // Report Making date:-
  const [reportMakingDate, setReportMakingDate] = useState<Date | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ? Image upload
  const [images, setImages] = useState<string[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [showEditableReport, setShowEditableReport] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentDate(format(new Date(), "dd-MM-yyyy"));
  }, []);

  // ? fetch patient:-
  useEffect(() => {
    const storedPhone = sessionStorage.getItem("patient-phone");
    const storedId = sessionStorage.getItem("patient-id");
    if (!storedPhone || !storedId) return;
    if (storedPhone && storedId) {
      setPhone(storedPhone);
      setPatientId(storedId);
      // You can even fetch patient data using storedPhone
    }
  }, []);

  useEffect(() => {
    if (!phone || !patientId) return;
    const fetchPatient = async () => {
      try {
        const res = await fetch(
          `/api/make_patient_report?phone=${phone}&patientId=${patientId}`
        );
        const data = await res.json();
        if (res.ok) {
          setPatient(data.patient);
        } else {
          console.error("Patient not found:", data.error);
        }
      } catch (err) {
        console.error("Error fetching patient:", err);
      }
    };
    fetchPatient();
  }, [phone]);

  useEffect(() => {
    if (patient?.patientReport) {
      setSections(patient.patientReport.Sections || []);
      setImages(patient.patientReport.ImageUrls || []);
    }
  }, [patient]);

  // ? update report in db:-
  useEffect(() => {
    const fetchReport = async () => {
      if (!patientId) return;

      const res = await fetch(`/api/get_report?patientId=${patientId}`);
      const data = await res.json();

      if (res.ok && data.report) {
        const savedQr = data.report.reportUrl?.[0]; // ✅ Use DB value
        if (savedQr) {
          setQrValue(savedQr);
        }
      }
    };

    fetchReport();
  }, [patientId]);

  // ? handle print:
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // ? handle image upload:
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);

    // Show loading toast
    const toastId = toast.loading("Report is uploading...", {
      description: "Please wait...",
      style: {
        background: "#42998d",
        color: "#ffffff",
      },
    });

    try {
      for (const file of selectedFiles) {
        const url = await uploadToCloudinary(file);
        if (url) {
          setImages((prev) => [...prev, url]);
        }
      }

      toast.success("Report uploaded successfully!", {
        id: toastId,
        description: "Done",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
    } catch (error) {
      toast.error("Failed to upload report.", {
        id: toastId,
        description: "Please try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    }
  };

  // ? handle delete image:
  const handleDeleteImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ? handle drag over:
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  // ? handle drag leave:
  const handleDragLeave = () => {
    setDragActive(false);
  };

  // ? handle drop:
  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      // Show toast while uploading
      const toastId = toast.loading("Report is uploading...", {
        description: "Please wait...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });

      try {
        for (const file of droppedFiles) {
          const url = await uploadToCloudinary(file);
          if (url) {
            setImages((prev) => [...prev, url]);
          }
        }

        toast.success("Report uploaded successfully!", {
          id: toastId,
          description: "Done ✔️",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        });
      } catch (error) {
        toast.error("Failed to upload report.", {
          id: toastId,
          description: "Please try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      }
    }
  };

  // ? handle upload report to qr:-
  const handleUploadReportToQr = async () => {
    if (!patientId || !phone || !printRef.current) return;

    setUploadLoading(true);
    const toastId = toast.loading("Uploading report...", {
      description: "Please wait...",
      style: {
        background: "#42998d",
        color: "#ffffff",
      },
    });

    // Step 1: Upload blank image to Cloudinary first (QR ke liye)
    const tempImage = await toPng(printRef.current, { cacheBust: true });
    const response = await fetch(tempImage);
    const blob = await response.blob();
    const file = new File([blob], "report-temp.png", { type: "image/png" });

    const uploadedUrl = await uploadToCloudinary(file);
    if (!uploadedUrl) throw new Error("QR Upload failed");

    // Step 2: Set QR value with the image URL
    setQrValue(uploadedUrl);

    // Step 3: Wait for QR to render in DOM
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reportImages = [uploadedUrl];

    try {
      const res = await fetch("/api/set_reportWithQr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          patientId,
          reportImages,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Report URL uploaded successfully", {
          id: toastId,
          description: "Done",
          style: {
            background: "#42998d",
            color: "#ffffff",
          },
        });
        // optionally refetch patient data or update local state
      } else {
        console.error("Failed to upload report:", data.message);
        toast.error(`${data.message}`, {
          id: toastId,
          description: "Please try again.",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      }
    } catch (error) {
      console.error("Error during uploading report:", error);
      toast.error(`${error}`, {
        id: toastId,
        description: "Please try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    } finally {
      setUploadLoading(false);
    }
  };

  // ? handle save report:
  const handleSaveReport = async () => {
    if (!phone || !patientId) return;

    setLoading(true);
    const toastId = toast.loading("Saving report...", {
      description: "Please wait...",
      style: {
        background: "#42998d",
        color: "#ffffff",
      },
    });

    try {
      // Step 5: Save in DB:-
      const res = await fetch("/api/save_report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          phone,
          reportMakingDate: reportMakingDate
            ? format(reportMakingDate, "dd-MM-yyyy")
            : null,
          sections,
          images,
          currentDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update report");

      toast.success("Report saved successfully!", {
        id: toastId,
        description: "Done",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, {
        id: toastId,
        description: "Please try again.",
        style: {
          background: "#ff4d4f",
          color: "#ffffff",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // ? Add Section
  const addSection = () => {
    if (!newHeading.trim()) return;
    setSections([...sections, { heading: newHeading, description: "" }]);
    setNewHeading("");
  };

  // ? Update description
  const updateDescription = (index: number, value: string) => {
    const updated = [...sections];
    updated[index].description = value;
    setSections(updated);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setReportMakingDate(selectedDate || null);
    setIsOpen(false);
  };

  return (
    <>
      {/* OPEN & CLOSE EDITABLE REPORT BUTTON */}
      <div className="w-full flex justify-end items-center max-w-7xl mx-auto rounded-md">
        <Button
          variant="outline"
          onClick={() => setShowEditableReport(!showEditableReport)}
          className={`cursor-pointer bg-white text-[#42998d] hover:text-white hover:bg-[#42998d] transition duration-300 ease-in-out ${
            showEditableReport ? "mb-4" : "mb-0"
          }`}>
          {showEditableReport
            ? "Close Editable Report"
            : "Open Editable Report"}
        </Button>
      </div>

      {/* EDITABLE REPORT & REPORT VIEWER */}
      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between items-center rounded-md">
        {/* EDITABLE CONTENT FOR THE REPORT */}
        {showEditableReport && (
          <Card className="w-full bg-white p-4 space-y-4 border border-[#42998d] rounded-md">
            <div>
              {/* REPORT TO IMAGE CONVERTER AND SAVE IN QR BUTTON */}
              {/* SAVE REPORT */}
              <div className="w-full flex justify-between items-center">
                {/* Genrate QR image */}
                <Button
                  variant="outline"
                  type="submit"
                  disabled={uploadLoading}
                  onClick={handleUploadReportToQr}
                  className={`text-[#42998d] hover:text-white hover:bg-[#42998d] transition duration-300 ease-in-out ${
                    uploadLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}>
                  {uploadLoading ? "Uploading..." : "Upload Report"}
                </Button>

                {/* Save report */}
                <Button
                  variant="outline"
                  type="submit"
                  disabled={loading}
                  onClick={handleSaveReport}
                  className={`text-[#42998d] hover:text-white hover:bg-[#42998d] transition duration-300 ease-in-out ${
                    loading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}>
                  {loading ? "Saving..." : "Save Report"}
                </Button>
              </div>
            </div>

            {/* Report Date Input */}
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-sm font-semibold text-gray-700">
                Date
              </label>
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(!isOpen)}
                    className={cn(
                      "w-full justify-start text-left font-normal p-3 pl-3 border-gray-300 cursor-pointer",
                      !reportMakingDate && "text-muted-foreground"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#42998d]" />
                    {reportMakingDate
                      ? format(reportMakingDate, "dd-MM-yyyy")
                      : currentDate}
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="z-[100] w-auto p-0 mt-2 bg-[#fff] border border-[#42998d] rounded-md shadow-lg">
                  <Calendar
                    mode="single"
                    selected={reportMakingDate || undefined}
                    onSelect={handleDateSelect}
                    className={cn(
                      // Selected date style
                      "[&_.rdp-day_selected]:bg-[#18564e]",
                      "[&_.rdp-day_selected]:text-white",

                      // Hover style
                      "[&_.rdp-day:hover]:bg-[#cceee8]",
                      "[&_.rdp-day:hover]:cursor-pointer",

                      // Transition and rounding
                      "[&_.rdp-day]:transition-all",
                      "[&_.rdp-day]:rounded-md",

                      // Full focus/active/visible reset (👇 ye most important hain)
                      "[&_.rdp-day]:outline-none",
                      "[&_.rdp-day]:ring-0",
                      "[&_.rdp-day]:border-none",
                      "[&_.rdp-day]:shadow-none",
                      "[&_.rdp-day]:focus:outline-none",
                      "[&_.rdp-day]:focus:ring-0",
                      "[&_.rdp-day]:focus:border-none",
                      "[&_.rdp-day]:focus:shadow-none",
                      "[&_.rdp-day]:focus-visible:outline-none",
                      "[&_.rdp-day]:focus-visible:ring-0",
                      "[&_.rdp-day]:focus-visible:border-none",
                      "[&_.rdp-day]:focus-visible:shadow-none",
                      "[&_.rdp-day]:active:outline-none",
                      "[&_.rdp-day]:active:ring-0",
                      "[&_.rdp-day]:active:border-none",
                      "[&_.rdp-day]:active:shadow-none"
                    )}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Add Heading Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
              <Input
                type="text"
                value={newHeading}
                onChange={(e) => setNewHeading(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // form submit ya reload hone se bachaega
                    addSection();
                  }
                }}
                placeholder="Enter Heading"
                className="text-sm mt-1 pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 tracking-wide leading-relaxed"
              />
              <Button
                type="button"
                onClick={addSection}
                className="bg-[#42998d] hover:bg-[#357c72] text-white rounded-md px-4 py-1 cursor-pointer font-semibold text-sm transition-colors duration-200">
                Add
              </Button>
            </div>

            {/* Render Sections */}
            {sections.map((section, index) => (
              <div
                key={index}
                className="mb-4 border border-gray-300 p-3 rounded-md">
                <h3 className="font-semibold text-sm">{section.heading}</h3>
                <textarea
                  value={section.description}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  placeholder="Enter description..."
                  className="w-full rounded-md p-2 mt-2 text-sm pl-3 border border-gray-300 focus:border-[#42998d] focus:ring-[#42998d] focus:outline-none transition duration-150 outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0"
                  rows={3}
                />
              </div>
            ))}

            {/* IMAGE */}
            <div className="w-full max-w-sm">
              <label
                htmlFor="images"
                className="text-sm font-semibold block mb-2">
                Upload Images:
              </label>

              {/* Dropzone & Select Button */}
              <div
                onClick={() => fileRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-md transition h-36 flex items-center justify-center text-gray-500 mb-4 cursor-pointer ${
                  dragActive
                    ? "border-[#42998d] bg-[#ecf8f7]"
                    : "border-gray-400 hover:border-[#42998d] hover:text-[#42998d]"
                }`}>
                <div className="flex items-center">
                  <ImagePlus className="w-6 h-6 mr-2" />
                  <span className="font-medium text-sm">
                    {dragActive
                      ? "Drop here to upload"
                      : "Click or Drag & Drop Images"}
                  </span>
                </div>
              </div>

              <input
                type="file"
                id="images"
                ref={fileRef}
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />

              {/* Image Preview Grid */}
              <div className="flex flex-wrap gap-3">
                {images.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="relative group w-[110px] h-[110px] border border-[#42998d] rounded overflow-hidden">
                      <Image
                        src={`${img}?f_auto&q_auto&dpr_auto`}
                        alt={`Report-${index}`}
                        width={110}
                        height={110}
                        className="object-cover w-full h-full"
                      />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
                        <Trash2 className="w-4 h-4 text-[#42998d]" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        )}

        {/* PRINTABLE REPORT */}
        <div
          className="print:bg-white bg-white mt-4 mb-4"
          ref={printRef}
          id="printable-report">
          <Card className="relative border border-[#42998d] rounded-md p-0 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 print:opacity-15 opacity-15">
              <Image
                src="/logo-3.png"
                alt="VIC LOGO"
                width={400}
                height={400}
                priority
                className="w-auto h-auto object-contain"
              />
            </div>
            <CardContent className="p-4 space-y-4 text-sm print:text-xs">
              <div className="border-b border-b-[#42998d] pb-4 flex justify-between items-center tracking-wide">
                <div>
                  <h2 className="text-xl font-bold uppercase tracking-[0.04rem]">
                    Vaishnavi <span>Imaging Center</span>
                  </h2>
                  <p className="text-muted-foreground max-w-sm break-words">
                    Aurangabad Road, In front of Dr. Mrs. Ranju, Tiwari Mohalla,
                    Bhakharua Daudnagar, Aurangabad, Bihar
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Dr. Chandan Bharti (MBBS, DMRD) | Reg. No:
                    0605202209B9166E3B
                  </p>
                </div>
                {/* QR CODE */}

                <QRCodeSVG
                  key={qrValue}
                  value={qrValue || "https://vaishnaviimagingcenter.com/"}
                  size={85}
                  level="H"
                />
              </div>

              {/* PATIENT DETAILS */}
              <div className="grid grid-cols-2 gap-4 border-b border-b-[#42998d] pb-4 tracking-wide leading-relaxed">
                <div>
                  <p>
                    <span className="font-semibold">Patient:</span>{" "}
                    {patient?.patientName
                      ?.split(" ")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {patient?.age} |{" "}
                    {patient?.gender}
                  </p>
                </div>
                <div className="text-right">
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {patient?.patientReport.MakingDate
                      ? patient?.patientReport.MakingDate
                      : format(reportMakingDate || new Date(), "dd-MM-yyyy")}
                  </p>
                  <p>
                    <span className="font-semibold">Ref. by:</span>{" "}
                    {patient?.doctorName}
                  </p>
                </div>
              </div>

              {/* Scan Name */}
              <div className="text-center">
                <h4 className="font-semibold text-base leading-relaxed tracking-wide">
                  {patient?.service}
                </h4>
              </div>

              {sections.length > 0 && (
                <div>
                  <div className="space-y-3">
                    {sections.map((sec, index) => (
                      <div key={index}>
                        <h4 className="font-semibold leading-relaxed tracking-wide">
                          {sec.heading}
                        </h4>
                        <p className="text-sm leading-relaxed tracking-wide">
                          {sec.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* IMAGE PREVIEW */}
              <div className="flex flex-wrap justify-center gap-4">
                {images.map((img, index) => {
                  return (
                    <div
                      key={index}
                      className="relative group w-[150px] h-[150px] border border-[#42998d] rounded overflow-hidden">
                      <Image
                        src={`${img}?f_auto&q_auto&dpr_auto`}
                        alt={`Report-${index}`}
                        width={150}
                        height={150}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  );
                })}
              </div>

              {/* REPORTED BY & DATE */}
              <div className="text-right mt-6 tracking-wide leading-relaxed">
                <p className="font-medium">
                  🖊️ Reported by: {patient?.doctorName}
                </p>
                <p className="text-muted-foreground">
                  Date:{" "}
                  {patient?.patientReport.MakingDate
                    ? patient?.patientReport.MakingDate
                    : format(reportMakingDate || new Date(), "dd-MM-yyyy")}
                </p>
              </div>

              {/* WARNING MESSAGE */}
              <div className="mt-6 border-t pt-4 text-center text-xs text-red-600 font-medium tracking-wide leading-relaxed">
                🚫 Sex determination is a punishable offence under the law
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PRINT BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#0b968d] text-white rounded-md hover:bg-[#097c74] transition-colors duration-200 font-medium tracking-wide text-sm shadow-sm cursor-pointer">
          <Printer className="h-4 w-4" />
          Print Report
        </button>
      </div>
    </>
  );
}
