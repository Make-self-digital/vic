import AttendancePage from "@/components/Attendance";
import Protected from "@/ProtectedRoute/Protected";

const StaffPage: React.FC = () => {
  return (
    <>
      <Protected>
        <AttendancePage />
      </Protected>
    </>
  );
};

export default StaffPage;
