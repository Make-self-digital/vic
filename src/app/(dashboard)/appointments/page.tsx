import { metadataConfig } from "@/app/(public)/metadata-config";
import AddAppointmentForm from "@/components/AppointmentComponents/AddAppointmentForm";
import type { Metadata } from "next";

export const metadata: Metadata = metadataConfig["/appointments"];

const Appointments: React.FC = () => {
  return (
    <>
      <AddAppointmentForm />
    </>
  );
};

export default Appointments;
