"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Loading from "../Loading";
import NoDataFound from "../No-Records/NoRecordCom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLanguage } from "@/hooks/LanguageContext";

interface LoginPatientData {
  _id: string;
  patientName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

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

const PatientNotificationList = () => {
  const [loginPatient, setLoginPatient] = useState<LoginPatientData | null>(
    null
  );
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [collapsedPatients, setCollapsedPatients] = useState<
    Record<string, boolean>
  >({});

  const router = useRouter();

  // language:-
  const { language } = useLanguage();

  // ? get login patient:-
  useEffect(() => {
    const storedPatient = localStorage.getItem("login_patient");
    if (storedPatient) {
      const parsedPatient = JSON.parse(storedPatient);
      setLoginPatient(parsedPatient);
    }
  }, []);

  // ? get patient wise notifications:-
  useEffect(() => {
    if (!loginPatient?._id) return;

    const { _id: patientId } = loginPatient;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          `/api/patient-wise-notification?patientId=${patientId}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch");
        }

        if (data.success) {
          setNotifications(data.data || []);
        }
      } catch (err: any) {
        console.error(err.message || "Failed to getting your notifications");
        toast.error(err.message, {
          description: "Failed to fetch notifications",
          style: {
            background: "#ff4d4f",
            color: "#ffffff",
          },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [loginPatient?._id]);

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
      </div>
    );

  return (
    <>
      <div className="border border-[#c4e3df] rounded-lg bg-white p-4">
        {/* Heading */}
        <div className="mb-6">
          <h2
            className="text-2xl font-bold text-[#1e4d4f] tracking-wide"
            title={language === "english" ? "Notifications" : "नोटिफिकेशन"}>
            <span className="border-b-2 border-[#18564e] inline-block pb-1">
              {language === "english" ? "Notifications" : "नोटिफिकेशन"}
            </span>
          </h2>
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
                      <span className="ml-2 text-[10px] sm:text-xs text-gray-200 truncate">
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
                          ? "your appointment has booked for"
                          : "आपने अपॉइंटमेंट बुक किया है"}{" "}
                        <b>{latestAppointment.service}</b>{" "}
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
                            ? "your appointment had booked for"
                            : "आपने अपॉइंटमेंट बुक किया था"}{" "}
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

export default PatientNotificationList;
