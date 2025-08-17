import ClinicDashboard from "@/components/DashboardCom/ClinicDashboard";
import Protected from "@/ProtectedRoute/Protected";

const DashboardPage: React.FC = () => {
  return (
    <>
      <Protected>
        <ClinicDashboard />
      </Protected>
    </>
  );
};

export default DashboardPage;
