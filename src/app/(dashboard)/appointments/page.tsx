import { metadataConfig } from "@/app/(public)/metadata-config";
import AddAppointmentForm from "@/components/AppointmentComponents/AddAppointmentForm";
import Protected from "@/ProtectedRoute/Protected";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/appointments"];

const Appointments: React.FC = () => {
  return (
    <>
      <Protected>
        <AddAppointmentForm />
      </Protected>
    </>
  );
};

export default Appointments;
