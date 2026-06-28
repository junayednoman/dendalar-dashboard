"use client";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";
import { Bell } from "lucide-react";
import ProfileDropdown from "@/app/(generalLayout)/sections/dashboard/ProfileDropdown";
import { useGetAllNotificationsQuery } from "@/redux/api/notificationApi";
import { useEffect } from "react";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { selectUser } from "@/redux/slice/authSlice";
import { baseApi } from "@/redux/api/baseApi";

const Header = () => {
  const { data } = useGetAllNotificationsQuery("");
  const tokenUser = useAppSelector(selectUser) as any;
  const dispatch = useAppDispatch();

  const unreadNotifications = data?.data?.unreadNotification;
  const socket = useSocket();
  useEffect(() => {
    if (socket) {
      if (!socket.connected) {
        socket.connect();
      }

      // Listen for real-time notification event
      socket.on(`notification::${tokenUser?._id}`, (newNotification: any) => {
        toast.info(newNotification.message, {
          duration: 4000,
        });
        dispatch(baseApi.util.invalidateTags(["notification"]));
      });

      socket.on("connect", () => {
        console.log("Socket connected");
      });
      socket.on("disconnect", () => {
        console.log("Socket disconnected");
      });

      return () => {
        socket.off(`notification::${tokenUser?._id}`);
        socket.off("connect");
        socket.off("disconnect");
        // Do not disconnect socket here to maintain connection across components
      };
    }
  }, [socket]);
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 right-0 z-50 bg-sidebar">
      <div className="flex items-center justify-between gap-2 px-4 w-full">
        <SidebarTrigger className="-ml-1 !text-foreground hover:!text-sidebar" />
        <div className="flex items-center gap-3">
          <Link
            href={"/dashboard/notifications"}
            className="bg-secondary p-2 py-[6px] rounded-full flex items-center gap-2"
          >
            <Bell size={28} className="ml-1 text-primary" />
            <p className="bg-primary/10 flex items-center justify-center text-primary rounded-full w-[33px] h-[33px]">
              {unreadNotifications || 0}
            </p>
          </Link>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Header;
