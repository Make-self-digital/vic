import type { Metadata } from "next";
import MainNotificationPage from "@/components/NotificationCom/MainNotificationPage";
import { metadataConfig } from "@/app/(public)/metadata-config";

export const metadata: Metadata = metadataConfig["/notifications"];

const NotificationPage: React.FC = () => {
  return (
    <>
      <MainNotificationPage />
    </>
  );
};

export default NotificationPage;
