import React from "react";
import { useEffect } from "react";

interface notificationOverlayProps {
  closeFx: () => void;
  notificationText: string;
  notificationState: boolean;
}

const NotificationOverlay: React.FC<notificationOverlayProps> = ({
  closeFx,
  notificationText,
  notificationState,
}) => {
  useEffect(() => {
    setTimeout(() => {
      closeFx();
    }, 8000);
  }, [closeFx]);

  return (
    <div
      className={`fixed top-0 -right-0 bg-transparent max-w-md w-full transition-opacity font-poppins rounded-xl px-6 py-4 ${
        notificationState
          ? "notification-active opacity-100"
          : "notification opacity-0"
      }`}
    >
      <div
        onClick={closeFx}
        className="w-full bg-darkBlue flex flex-col rounded-xl shadow-xl p-4 cursor-pointer"
      >
        <h1 className="text-2xl font-semibold text-white">Notificacion</h1>
        <p className="text-xl font-normal text-white">{notificationText}</p>
        <p className="text-xs pt-2 text-white opacity-80 text-right w-full">
          Haz clic para descartar
        </p>
      </div>
    </div>
  );
};

export default NotificationOverlay;
