"use client";

import { useRef, useEffect, useState, DragEvent } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2, Save, ImagePlus } from "lucide-react";
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
    Scan: string;
    ClinicalHistory: string;
    Findings: string[];
    Impression: string[];
    ImageUrls: string[];
  };
}

export default function ReportViewer() {
  const [qrValue, setQrValue] = useState<string | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [phone, setPhone] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState<string>("");
  const [scan, setScan] = useState<string>("");
  const [history, setHistory] = useState<string>("");

  // ? findings
  const [findings, setFindings] = useState<string[]>([]);
  const [newFinding, setNewFinding] = useState("");
  const [editingFindingIndex, setEditingFindingIndex] = useState<number | null>(
    null
  );
  const [editFindingValue, setEditFindingValue] = useState("");

  // ? impressions
  const [impressions, setImpressions] = useState<string[]>([]);
  const [newImpression, setNewImpression] = useState("");
  const [editingImpressionIndex, setEditingImpressionIndex] = useState<
    number | null
  >(null);
  const [editImpressionValue, setEditImpressionValue] = useState("");

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
      setScan(patient.patientReport.Scan || "");
      setHistory(patient.patientReport.ClinicalHistory || "");
      setFindings(patient.patientReport.Findings || []);
      setImpressions(patient.patientReport.Impression || []);
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

  // ? handle add finding:
  const addFinding = () => {
    if (newFinding.trim()) {
      setFindings([...findings, newFinding]);
      setNewFinding("");
    }
  };

  // ? handle delete finding:
  const deleteFinding = (index: number) => {
    setFindings(findings.filter((_, i) => i !== index));
  };

  // ? handle edit finding:
  const startFindingEdit = (index: number, value: string) => {
    setEditingFindingIndex(index);
    setEditFindingValue(value);
  };

  // ? handle save finding:
  const saveFindingEdit = (index: number) => {
    const updated = [...findings];
    updated[index] = editFindingValue;
    setFindings(updated);
    setEditingFindingIndex(null);
    setEditFindingValue("");
  };

  // ? handle add impression:
  const addImpression = () => {
    if (newImpression.trim()) {
      setImpressions([...impressions, newImpression]);
      setNewImpression("");
    }
  };

  // ? handle delete impression:
  const deleteImpression = (index: number) => {
    setImpressions(impressions.filter((_, i) => i !== index));
  };

  // ? handle edit impression:
  const startImpressionEdit = (index: number, value: string) => {
    setEditingImpressionIndex(index);
    setEditImpressionValue(value);
  };

  // ? handle save impression:
  const saveImpressionEdit = (index: number) => {
    const updated = [...impressions];
    updated[index] = editImpressionValue;
    setImpressions(updated);
    setEditingImpressionIndex(null);
    setEditImpressionValue("");
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
          description: "Done ✔️",
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
          scan,
          history,
          findings,
          impressions,
          images,
          currentDate,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update report");

      toast.success("Report saved successfully!", {
        id: toastId,
        description: "Done ✔️",
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

  return (
    <>
      {/* OPEN & CLOSE EDITABLE REPORT BUTTON */}
      <div className="w-full flex justify-end items-center max-w-3xl mx-auto rounded-md">
        <Button
          variant="outline"
          onClick={() => setShowEditableReport(!showEditableReport)}
          className={`cursor-pointer text-[#42998d] hover:text-white hover:bg-[#42998d] transition duration-300 ease-in-out ${
            showEditableReport ? "mb-4" : "mb-0"
          }`}>
          {showEditableReport
            ? "Close Editable Report"
            : "Open Editable Report"}
        </Button>
      </div>

      {/* EDITABLE REPORT & REPORT VIEWER */}
      <div className="w-full flex flex-col justify-between items-center">
        {/* EDITABLE CONTENT FOR THE REPORT */}
        {showEditableReport && (
          <div className="w-full max-w-[765px] p-4 space-y-4 border border-[#42998d] rounded-md">
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

            {/* SCAN & CLINICAL HISTORY */}
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              {/* SCAN */}
              <div>
                <label
                  htmlFor="scan"
                  className="text-sm font-semibold mb-1 block">
                  Scan:
                </label>
                <Input
                  type="text"
                  name="scan"
                  id="scan"
                  value={scan}
                  onChange={(e) => setScan(e.target.value)}
                  placeholder="Enter scan"
                  autoComplete="off"
                  className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                />
              </div>

              {/* CLINICAL HISTORY */}
              <div>
                <label
                  htmlFor="history"
                  className="text-sm font-semibold mb-1 block">
                  Clinical History:
                </label>
                <Input
                  type="text"
                  name="history"
                  id="history"
                  value={history}
                  onChange={(e) => setHistory(e.target.value)}
                  placeholder="Enter clinical history"
                  autoComplete="off"
                  className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                />
              </div>
            </div>

            {/* FINDINGS */}
            <div>
              <label htmlFor="findings" className="text-sm font-semibold block">
                Findings:
              </label>
              <div className="space-y-2 mt-2">
                {findings.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between gap-2 w-full">
                    {editingFindingIndex === index ? (
                      <Input
                        type="text"
                        id="Edit Findings"
                        name="Edit Findings"
                        value={editFindingValue}
                        onChange={(e) => setEditFindingValue(e.target.value)}
                        placeholder="Edit finding"
                        autoComplete="off"
                        className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                      />
                    ) : (
                      <p className="text-sm flex-1">- {item}</p>
                    )}

                    {/* Icons container, visible on hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editingFindingIndex === index ? (
                        <Save
                          className="text-[#295c57] cursor-pointer w-4 h-4"
                          onClick={() => saveFindingEdit(index)}
                        />
                      ) : (
                        <Pencil
                          className="text-[#295c57] cursor-pointer w-4 h-4"
                          onClick={() => startFindingEdit(index, item)}
                        />
                      )}
                      <Trash2
                        className="text-[#295c57] cursor-pointer w-4 h-4"
                        onClick={() => deleteFinding(index)}
                      />
                    </div>
                  </div>
                ))}

                {/* Add New Finding */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    id="findings"
                    name="findings"
                    value={newFinding}
                    onChange={(e) => setNewFinding(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addFinding();
                      }
                    }}
                    placeholder="Add finding"
                    className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFinding}
                    className="text-[#42998d] hover:text-white hover:bg-[#42998d] rounded-md cursor-pointer transition duration-300 ease-in-out">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* IMPRESSION */}
            <div>
              <label
                htmlFor="impression"
                className="text-sm font-semibold block">
                Impression:
              </label>
              <div className="space-y-2 mt-2">
                {impressions.map((item, index) => (
                  <div
                    key={index}
                    className="group flex items-center justify-between gap-2 w-full">
                    {editingImpressionIndex === index ? (
                      <Input
                        type="text"
                        id="Edit Impression"
                        name="Edit Impression"
                        value={editImpressionValue}
                        onChange={(e) => setEditImpressionValue(e.target.value)}
                        placeholder="Edit impression"
                        className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                        autoComplete="off"
                      />
                    ) : (
                      <p className="text-sm flex-1">- {item}</p>
                    )}

                    {/* Icons container, visible on hover */}
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      {editingImpressionIndex === index ? (
                        <Save
                          className="text-[#295c57] cursor-pointer w-4 h-4"
                          onClick={() => saveImpressionEdit(index)}
                        />
                      ) : (
                        <Pencil
                          className="text-[#295c57] cursor-pointer w-4 h-4"
                          onClick={() => startImpressionEdit(index, item)}
                        />
                      )}
                      <Trash2
                        className="text-[#295c57] cursor-pointer w-4 h-4"
                        onClick={() => deleteImpression(index)}
                      />
                    </div>
                  </div>
                ))}

                {/* Add New Impression */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    id="impression"
                    name="impression"
                    value={newImpression}
                    onChange={(e) => setNewImpression(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addImpression();
                      }
                    }}
                    placeholder="Add impression"
                    className="border rounded-md focus:ring-[#42998d] focus:outline-none transition-all duration-150 border-[#42998d] outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 text-sm"
                    autoComplete="off"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addImpression}
                    className="text-[#42998d] hover:text-white hover:bg-[#42998d] rounded-md cursor-pointer">
                    Add
                  </Button>
                </div>
              </div>
            </div>

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
          </div>
        )}

        {/* PRINTABLE REPORT */}
        <div className="p-4 w-full max-w-[800px]">
          <div
            className="print:bg-white bg-muted"
            ref={printRef}
            id="printable-report">
            <Card className="relative border border-[#42998d] rounded-md p-0 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 print:opacity-15 opacity-15">
                <Image
                  src="/logo-2.png"
                  alt="VIC LOGO"
                  width={400}
                  height={400}
                  priority
                  className="w-auto h-auto object-contain"
                />
              </div>
              <CardContent className="p-4 space-y-4 text-sm print:text-xs">
                <div className="border-b border-b-[#42998d] pb-4 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold uppercase tracking-[0.04rem]">
                      Vaishnavi <span>Imaging Center</span>
                    </h2>
                    <p className="text-muted-foreground">
                      Tiwari Mohalla, Daudnagar, Bihar
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Dr. Abhay (MBBS, DMRD) | Reg. No: 12345678910
                    </p>
                  </div>
                  {/* QR CODE */}

                  <QRCodeSVG
                    key={qrValue}
                    value={qrValue || "https://vaishnaviimagingcenter.com/"}
                    size={70}
                    level="H"
                  />
                </div>

                {/* PATIENT DETAILS */}
                <div className="grid grid-cols-2 gap-4 border-b border-b-[#42998d] pb-4">
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
                      <span className="font-semibold">Age:</span> {patient?.age}{" "}
                      | {patient?.gender}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>
                      <span className="font-semibold">Date:</span> {currentDate}
                    </p>
                    <p>
                      <span className="font-semibold">Ref. by:</span>{" "}
                      {patient?.doctorName}
                    </p>
                  </div>
                </div>

                {/* SCAN & HISTORY */}
                <div className="space-y-1">
                  <p>
                    <span className="font-semibold">Scan:</span> {scan}
                  </p>
                  <p>
                    <span className="font-semibold">Clinical History:</span>{" "}
                    {history}
                  </p>
                </div>

                {/* FINDINGS */}
                <div>
                  <h3 className="font-semibold mt-4 mb-2">Findings:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {findings.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* IMPRESSIONS */}
                <div>
                  <h3 className="font-semibold mt-4 mb-2">Impression:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {impressions.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

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
                <div className="text-right mt-6">
                  <p className="font-medium">
                    🖊️ Reported by: {patient?.doctorName}
                  </p>
                  <p className="text-muted-foreground">Date: {currentDate}</p>
                </div>

                {/* WARNING MESSAGE */}
                <div className="mt-6 border-t pt-4 text-center text-xs text-red-600 font-medium">
                  🚫 Sex determination is a punishable offence under the law
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* PRINT BUTTON */}
      <div className="flex justify-center ">
        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition text-sm cursor-pointer">
          Print List
        </button>
      </div>
    </>
  );
}
