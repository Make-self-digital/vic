"use client";

import {
  IndianRupee,
  Users,
  CalendarCheck,
  ClipboardCheck,
  FileClock,
} from "lucide-react";
import { useEffect, useState } from "react";

interface IAppointmentPatient {
  _id: string;
  patientId: string;
  patientName: string;
  phone: string;
  age: string;
  gender: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  notes: string;
  status: "Pending" | "Completed";
  reportStatus: string;
  payment: number;
  paymentStatus: "paid" | "unpaid";
  bookingCount: number;
  doctorName: string;
  reportUrl: string[];
  patientReport: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface AppointmentData {
  data: IAppointmentPatient[];
  paid: IAppointmentPatient[];
  unpaid: IAppointmentPatient[];
  completed: IAppointmentPatient[];
  pending: IAppointmentPatient[];
}

interface ICount {
  total: number;
  paid: number;
  unpaid: number;
  pending: number;
  completed: number;
}

const ClinicDashboard = () => {
  // Today Login Patients State:-
  const [patients, setPatients] = useState([]);
  const [loginLoading, setLoginLoading] = useState(true);

  // Today Appointment Patients State:-
  const [appointments, setAppointments] = useState<AppointmentData>({
    data: [],
    paid: [],
    unpaid: [],
    completed: [],
    pending: [],
  });
  const [appointmentLoading, setAppointmentLoading] = useState(true);

  // Selected data:-
  const [selectedTable, setSelectedTable] = useState<{
    title: string;
    data: any[];
  }>({
    title: "",
    data: [],
  });
  const [showTable, setShowTable] = useState(false);

  // Counts State:-
  const [counts, setCounts] = useState<ICount>({
    total: 0,
    paid: 0,
    unpaid: 0,
    pending: 0,
    completed: 0,
  });

  const columns = [
    { key: "patientName", label: "Name" },
    { key: "phone", label: "Phone" },
    { key: "service", label: "Service" },
    { key: "status", label: "Status" },
    { key: "paymentStatus", label: "Payment Status" },
  ];

  // ? Get Today Login Patients:-
  useEffect(() => {
    async function fetchLoginPatients() {
      try {
        const res = await fetch("/api/today-login-patient"); // <-- tumhara API route
        const data = await res.json();

        if (data.success) {
          setPatients(data.data);
        }
      } catch (error) {
        console.error("Error fetching today's patients:", error);
      } finally {
        setLoginLoading(false);
      }
    }

    fetchLoginPatients();
  }, []);

  // ? Get Today Appointment Patients:-
  useEffect(() => {
    async function fetchAppointmentPatients() {
      try {
        const res = await fetch("/api/today-appointment-patient"); // <-- tumhara API route
        const data = await res.json();

        if (data.success) {
          setAppointments({
            data: data.data.data,
            paid: data.data.paid,
            unpaid: data.data.unpaid,
            completed: data.data.completed,
            pending: data.data.pending,
          });
          setCounts(data?.counts);
        }
      } catch (error) {
        console.error("Error fetching today's appointment patients:", error);
      } finally {
        setAppointmentLoading(false);
      }
    }

    fetchAppointmentPatients();
  }, []);

  // ? Handle Card Click:
  const handleCardClick = (title: string, data: any[]) => {
    setSelectedTable({ title, data });
    setShowTable(true);
  };

  // ? Filter sirf wahi columns jisme at least ek row me value ho
  const visibleColumns = columns.filter((col) =>
    selectedTable.data.some(
      (item) => item[col.key] && item[col.key] !== "-" && item[col.key] !== null
    )
  );

  const toTitleCase = (str: string) => {
    if (!str) return "-";
    return str
      .toString()
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <>
      <div className="border border-[#c4e3df] bg-none rounded-lg bg-white p-4">
        {/* Heading */}
        <div className="mb-6">
          {/* Heading */}
          <h2
            className="text-2xl font-bold text-[#1e4d4f] tracking-wide"
            title="Notifications">
            <span className="border-b-2 border-[#18564e] inline-block pb-1">
              Dashboard
            </span>
          </h2>
        </div>

        {/* Top dashboard Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Total registered patients */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() =>
              handleCardClick("Today Registered Patients", patients)
            }>
            <Users className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Registered Patients
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {loginLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  patients.length
                )}
              </p>
            </div>
          </div>

          {/* Total Appointments */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() =>
              handleCardClick("Today Appointments", appointments.data)
            }>
            <CalendarCheck className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Appointments
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {appointmentLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  counts.total
                )}
              </p>
            </div>
          </div>

          {/* Total Completed Reports */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() =>
              handleCardClick("Today Completed Reports", appointments.completed)
            }>
            <ClipboardCheck className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Completed Reports
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {appointmentLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  counts.completed
                )}
              </p>
            </div>
          </div>

          {/* Total Pending Reports */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() =>
              handleCardClick("Today Pending Reports", appointments.pending)
            }>
            <FileClock className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Pending Reports
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {appointmentLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  counts.pending
                )}
              </p>
            </div>
          </div>

          {/* Total Paid */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() => handleCardClick("Paid Patient", appointments.paid)}>
            <IndianRupee className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Paid Patient
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {appointmentLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  counts.paid
                )}
              </p>
            </div>
          </div>

          {/* Total Unpaid */}
          <div
            className="bg-[#e6f4f2] rounded-xl p-4 flex items-center gap-4 cursor-pointer"
            onClick={() =>
              handleCardClick("Today Unpaid", appointments.unpaid)
            }>
            <IndianRupee className="w-6 h-6 text-[#18564e]" />
            <div>
              <p className="text-sm text-gray-600 tracking-wide">
                Today Unpaid Patient
              </p>
              <p className="text-lg font-semibold text-[#18564e] tracking-wide">
                {appointmentLoading ? (
                  <span className="text-xs tracking-wide">Loading...</span>
                ) : (
                  counts.unpaid
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Selected wise table data */}
        {showTable && (
          <div>
            {Array.isArray(selectedTable.data) &&
              selectedTable.data.length > 0 && (
                <div className="mt-10">
                  {/* Heading */}
                  <h2
                    className="text-xl mb-6 font-bold text-[#1e4d4f] tracking-wide"
                    title={selectedTable.title}>
                    <span className="border-b-2 border-[#18564e] inline-block pb-1">
                      {selectedTable.title}
                    </span>
                  </h2>

                  <div
                    className="w-full overflow-x-auto scrollbar-hide group relative border border-[#42998d] transition-colors duration-300"
                    onScroll={(e) => {
                      const shadow = document.getElementById("scroll-shadow");
                      if (!shadow) return;
                      shadow.style.opacity =
                        e.currentTarget.scrollLeft > 0 ? "1" : "0";
                    }}>
                    <table className="min-w-[700px] w-full table-fixed border-collapse">
                      <thead className="bg-[#0b968d] sticky top-0 z-10">
                        <tr>
                          <th className="w-12 px-4 py-3 text-sm font-semibold text-white tracking-wide text-left">
                            Sr.
                          </th>
                          {visibleColumns.map((col) => (
                            <th
                              key={col.key}
                              className="w-24 px-4 py-3 text-sm font-semibold text-white truncate tracking-wide text-center">
                              {col.label}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="bg-white divide-y divide-gray-100 text-sm">
                        {selectedTable.data.map((item, index) => (
                          <tr key={item._id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-left">{index + 1}</td>
                            {visibleColumns.map((col) => (
                              <td
                                key={col.key}
                                className="px-4 py-3 text-center text-gray-700 truncate tracking-wide">
                                {toTitleCase(item[col.key])}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
          </div>
        )}
      </div>
    </>
  );
};

export default ClinicDashboard;
