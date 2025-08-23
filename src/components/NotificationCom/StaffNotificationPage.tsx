"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/hooks/LanguageContext";
import { useAuth } from "@/hooks/use-auth";

type Appointment = {
  _id: string;
  patientId: string;
  patientName: string;
  phone: string;
  age: string;
  gender: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  status: string;
  reportStatus: "pending" | "ready";
  payment: number;
  paymentStatus: "unpaid" | "paid";
  bookingCount?: number;
  doctorName?: string;
  lastDate?: string;
  reportUrl: string[];
  patientReport: {
    Scan?: string;
    ClinicalHistory?: string;
    Findings: string[];
    Impression: string[];
    ImageUrls: string[];
  };
  bookingTime?: string;
  createdAt: string;
  updatedAt: string;
};

type Notification = {
  _id: string;
  patientId: string;
  type: "appointment_confirmation" | "general";
  title: string;
  message: string;
  read: boolean;
  url?: string;
  createdAt: string;
  appointments: Appointment[];
};

const StaffNotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [collapsedPatients, setCollapsedPatients] = useState<
    Record<string, boolean>
  >({});

  const router = useRouter();

  // language:-
  const { language } = useLanguage();

  // auth:-
  const { role } = useAuth();

  // ? fetch notifications:-
  useEffect(() => {
    async function fetchNotifications() {
      try {
        const res = await fetch("/api/StaffNotification");
        const data = await res.json();
        if (data.success) {
          setNotifications(data.data);
        } else {
          console.error("Failed to fetch:", data.message);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  // ? handle delete targeted notifications:-
  const handleDeleteNotification = async (patientId: string) => {
    if (!patientId) return;

    try {
      setLoading(true);

      const res = await fetch("/api/StaffNotification", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId }),
      });

      const data = await res.json();

      if (data.success) {
        setNotifications((prev) =>
          prev.filter((n) => n.patientId !== patientId)
        ); // parent state से remove करने के लिए
      } else {
        console.error("Delete failed:", data.message);
      }
    } catch (error) {
      console.error("Error deleting:", error);
    } finally {
      setLoading(false);
    }
  };

  // ? handle delete all notifications:-
  const handleDeleteAllNotifications = async () => {
    setDeleteAllLoading(true);

    const toastId = toast.loading(
      language === "english"
        ? "Deleting all notifications..."
        : "सभी नोटिफिकेशन डिलीट हो रहे हैं...",
      {
        description:
          language === "english" ? "Please wait..." : "कृपया प्रतीक्षा करें...",
        style: {
          background: "#42998d",
          color: "#ffffff",
        },
      }
    );

    try {
      const res = await fetch("/api/delete-all-notification", {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setNotifications([]);
        toast.success(
          language === "english"
            ? "All notifications deleted successfully"
            : "सभी नोटिफिकेशन सफलतापूर्वक डिलीट हो गया",
          {
            id: toastId, // loading toast को replace करेगा
            description: language === "english" ? "Done" : "सफल",
            style: {
              background: "#42998d",
              color: "#ffffff",
            },
          }
        );
      } else {
        toast.error(
          language === "english"
            ? data.message || "Failed to delete notifications"
            : "नोटिफिकेशन डिलीट करने में विफल रहा",
          {
            id: toastId, // loading toast को replace करेगा
            description:
              language === "english"
                ? "Please try again"
                : "कृपया पुनः प्रयास करें",
            style: {
              background: "#ff4d4f",
              color: "#ffffff",
            },
          }
        );
      }
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error(
        language === "english"
          ? "Something went wrong while deleting notifications"
          : "नोटिफिकेशन डिलीट करते समय कुछ गड़बड़ हो गई",
        {
          id: toastId, // loading toast को replace करेगा
          description:
            language === "english"
              ? "Please try again"
              : "कृपया पुनः प्रयास करें",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        }
      );
    } finally {
      setDeleteAllLoading(false);
    }
  };

  // ? handle collapse patients:-
  const togglePatientAppointments = (patientId: string) => {
    setCollapsedPatients((prev) => ({
      ...prev,
      [patientId]: !(prev[patientId] ?? false),
    }));
  };

  // ? Full page loading screen:-
  if (loading)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-1000">
        <div className="flex flex-col justify-center items-center gap-4">
          <Loading />
        </div>
      </div>
    );

  // ? No notifications found screen:-
  if (notifications.length === 0)
    return (
      <div className="flex flex-col min-h-screen justify-center items-center gap-4">
        <NoDataFound />
        {role === "patient" && (
          <div className="text-center text-gray-500 tracking-wide text-sm font-semibold italic">
            <p>
              {language === "english"
                ? "No notifications found. Please visit your appointments page to make new notifications."
                : "अभी कोई नोटिफिकेशन नहीं है। नई नोटिफिकेशन पाने के लिए अपॉइंटमेंट पेज पर जाएं।"}
            </p>
            <Button
              onClick={() => router.push("/appointments")}
              title="Book Appointment"
              className="px-3 py-1 bg-[#0b968d] text-white rounded-sm hover:bg-[#097c74] transition font-semibold text-sm cursor-pointer mt-3">
              {language === "english"
                ? "Book Appointment"
                : "अपॉइंटमेंट बुक करें"}
            </Button>
          </div>
        )}
      </div>
    );

  return (
    <>
      <div className="border border-[#c4e3df] bg-none rounded-lg bg-white p-4">
        {/* Heading and Clear Button */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          {/* Heading */}
          <h2
            className="text-2xl font-bold text-[#1e4d4f] tracking-wide"
            title={language === "english" ? "Notifications" : "नोटिफिकेशन"}>
            <span className="border-b-2 border-[#18564e] inline-block pb-1">
              {language === "english" ? "Notifications" : "नोटिफिकेशन"}
            </span>
          </h2>
          {/* Clear Button */}
          <Button
            variant="outline"
            size="sm"
            title={
              language === "english"
                ? "Delete all notifications"
                : "सभी नोटिफिकेशन हटाएँ"
            }
            onClick={handleDeleteAllNotifications}
            disabled={deleteAllLoading}
            className="border-gray-300 text-gray-800 hover:border-[#509f94] cursor-pointer tracking-wide text-sm font-semibold">
            {deleteAllLoading
              ? language === "english"
                ? "Deleting..."
                : "हटाया जा रहा है..."
              : language === "english"
              ? "Clear All"
              : "सभी हटाएँ"}
          </Button>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const isCollapsed = collapsedPatients[notification.patientId];
            const latestAppointment = notification.appointments[0]; // सिर्फ latest
            const previousAppointments = notification.appointments.slice(1); // बाकी पुराने

            return (
              <Card
                key={notification.patientId}
                className="relative bg-[#e6f4f2] border border-[#c4e3df] group hover:shadow-md transition-shadow duration-200">
                {/* Delete icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification.patientId);
                  }}
                  className="absolute top-2 right-2 p-1 rounded-full 
                  bg-[#0b968d] text-white opacity-0 group-hover:opacity-100 transition duration-200 cursor-pointer"
                  title={language === "english" ? "Delete" : "हटाएँ"}>
                  <X size={16} />
                </button>

                <CardHeader className="space-y-2">
                  {/* Title with toggle */}
                  <CardTitle
                    onClick={() =>
                      togglePatientAppointments(notification.patientId)
                    }
                    className="flex items-center text-xs sm:text-sm font-semibold border border-[#c4e3df] rounded-md px-3 sm:px-4 py-1.5 bg-[#0b968d] text-white tracking-wide shadow-sm w-fit cursor-pointer select-none">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#e6f4f2] text-black aspect-square px-1.5 sm:px-2 text-[10px] sm:text-xs mr-2">
                      {notification.appointments.length}
                    </span>
                    {latestAppointment?.patientName &&
                      latestAppointment.patientName
                        .split(" ")[0]
                        .charAt(0)
                        .toUpperCase() +
                        latestAppointment.patientName
                          .split(" ")[0]
                          .slice(1)
                          .toLowerCase()}
                    {"'s "}
                    {language === "english"
                      ? "Appointment Notifications"
                      : "अपॉइंटमेंट नोटिफिकेशन"}
                    {previousAppointments.length > 0 && (
                      <span className="ml-2 text-[10px] sm:text-xs text-gray-200">
                        {isCollapsed
                          ? language === "english"
                            ? "(Hide Previous)"
                            : "(पिछला छुपाएँ)"
                          : language === "english"
                          ? "(Show Previous)"
                          : "(पिछला दिखाएँ)"}
                      </span>
                    )}
                  </CardTitle>

                  {/* Latest appointment (always visible) */}
                  {latestAppointment && (
                    <div className="space-y-1">
                      <CardDescription className="tracking-wide text-xs sm:text-sm font-medium">
                        {latestAppointment.patientName
                          .split(" ")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() +
                              word.slice(1).toLowerCase()
                          )
                          .join(" ")}{" "}
                        {language === "english"
                          ? "has booked an appointment for"
                          : "ने अपॉइंटमेंट बुक किया है"}{" "}
                        <b>{latestAppointment.service} </b>
                        {language === "hindi" && <span>के लिए</span>}.
                      </CardDescription>
                      <span className="text-xs text-[#2e6f6b] font-semibold tracking-wide">
                        {language === "english"
                          ? "Booking Date:"
                          : "बुकिंग की तारीख:"}{" "}
                        {latestAppointment.appointmentDate} |{" "}
                        {language === "english" ? "Time:" : "समय:"}{" "}
                        <span className="ml-1">
                          {latestAppointment.appointmentTime}
                        </span>
                      </span>
                    </div>
                  )}

                  {/* Previous appointments (only visible when expanded) */}
                  {isCollapsed === true &&
                    previousAppointments.map((appointment) => (
                      <div
                        key={appointment._id}
                        className="space-y-1 border-t border-[#c4e3df] pt-2">
                        <CardDescription className="tracking-wide text-xs sm:text-sm font-medium text-gray-500">
                          {appointment.patientName
                            .split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() +
                                word.slice(1).toLowerCase()
                            )
                            .join(" ")}{" "}
                          {language === "english"
                            ? "had booked an appointment for"
                            : "ने अपॉइंटमेंट बुक किया था"}{" "}
                          <b>{appointment.service}</b>{" "}
                          {language === "hindi" && <span>के लिए</span>}.
                        </CardDescription>
                        <span className="text-xs text-gray-500 tracking-wide">
                          {language === "english"
                            ? "Booking Date:"
                            : "बुकिंग की तारीख:"}{" "}
                          {appointment.appointmentDate} |{" "}
                          {language === "english" ? "Time:" : "समय:"}{" "}
                          <span className="ml-1">
                            {appointment.appointmentTime}
                          </span>
                        </span>
                      </div>
                    ))}
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default StaffNotificationList;
