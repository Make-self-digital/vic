import PaymentPage from "@/components/PaymentComponents/PaymentPage";
import Protected from "@/ProtectedRoute/Protected";

const BillingPage: React.FC = () => {
  return (
    <>
      <Protected>
        <PaymentPage />
      </Protected>
    </>
  );
};

export default BillingPage;
