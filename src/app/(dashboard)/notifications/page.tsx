import type { Metadata } from "next";
import MainNotificationPage from "@/components/NotificationCom/MainNotificationPage";
import { metadataConfig } from "@/app/(public)/metadata-config";
import Protected from "@/ProtectedRoute/Protected";

export const metadata: Metadata = metadataConfig["/notifications"];

const NotificationPage: React.FC = () => {
  return (
    <>
      <Protected>
        <MainNotificationPage />
      </Protected>
    </>
  );
};

export default NotificationPage;
