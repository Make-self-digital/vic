"use client";

import PatientNotificationList from "@/components/NotificationCom/patientNotificationPage";
import StaffNotificationList from "@/components/NotificationCom/StaffNotificationPage";
import { useAuth } from "@/hooks/use-auth";

const MainNotificationPage: React.FC = () => {
  const { role } = useAuth();
  return (
    <>
      {role === "patient" && <PatientNotificationList />}
      {(role === "staff" || role === "admin") && <StaffNotificationList />}
    </>
  );
};

export default MainNotificationPage;
