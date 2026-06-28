import {
  BookOpenText,
  NotebookPen,
  Bell,
  Layers3,
  Settings,
  UserRoundCog,
} from "lucide-react";

type TNavMain = {
  title: string;
  url: string;
  icon: React.ReactNode;
}[];

export const navItems: TNavMain = [
  {
    title: "User Management",
    url: "/dashboard/user-management",
    icon: <UserRoundCog />,
  },
  {
    title: "Levels",
    url: "/dashboard/levels",
    icon: <Layers3 />,
  },
  {
    title: "Chapters",
    url: "/dashboard/chapters",
    icon: <BookOpenText />,
  },
  {
    title: "Lessons",
    url: "/dashboard/lessons",
    icon: <NotebookPen />,
  },
  {
    title: "Notifications",
    url: "/dashboard/notifications",
    icon: <Bell />,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: <Settings />,
  },
];
