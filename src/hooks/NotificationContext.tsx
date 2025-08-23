"use client";

import { createContext, useContext, useState } from "react";

export type NotificationItem = {
  _id: string;
  patientId: string;
  type: "appointment_confirmation" | "general";
  title: string;
  message: string;
  read: boolean;
  url?: string;
  createdAt: string;
};

export type NotificationGroup = {
  _id: string;
  patientId: string;
  createdAt: string;
  notifications: NotificationItem[];
};

type NotificationContextType = {
  allNotifications: NotificationItem[];
  setNotifications: (notifications: NotificationGroup[]) => void;
  addNotification: (n: NotificationItem) => void;
  markAllRead: (patientId?: string) => Promise<void>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [allNotifications, setAllNotifications] = useState<NotificationItem[]>(
    []
  );

  const setNotifications = (notifications: NotificationGroup[]) => {
    // flatten notifications array
    const flat: NotificationItem[] = notifications.flatMap((group) =>
      group.notifications.map((n) => ({ ...n, patientId: group.patientId }))
    );
    setAllNotifications(flat);
  };

  const addNotification = (n: NotificationItem) => {
    setAllNotifications((prev) => {
      if (prev.some((notif) => notif._id === n._id)) return prev;
      return [n, ...prev];
    });
  };

  const markAllRead = async (patientId?: string) => {
    try {
      if (patientId) {
        await fetch("/api/Patient-wise-notification", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        });
      } else {
        await fetch("/api/StaffNotification", { method: "PUT" });
      }

      setAllNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark notifications as read", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        allNotifications,
        setNotifications,
        addNotification,
        markAllRead,
      }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotifications must be used inside NotificationProvider"
    );
  return ctx;
};
