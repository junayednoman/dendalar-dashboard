"use client";
import Image from "next/image";
import avatarImg from "@/assets/avatar.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/api/profileApi";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { useLogoutMutation } from "@/redux/api/authApi";
import { logOut } from "@/redux/slice/authSlice";
import handleMutation from "@/utils/handleMutation";

const ProfileDropdown = () => {
  const { data } = useGetProfileQuery("");
  const profile = data?.data;

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const onSuccess = () => {
    dispatch(logOut());
    router.push(`/auth/login?redirect=${pathname}`);
  };

  const handleLogout = async () => {
    await handleMutation({}, logout, "Logging out...", onSuccess);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="">
          <Image
            src={profile?.photoUrl || avatarImg}
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card text-primary-foreground">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col px-2 gap-3 py-2">
          <Link className="hover:text-foreground" href={"/dashboard/profile"}>
            Profile
          </Link>
          <Link
            className="hover:text-foreground"
            href={"/dashboard/notifications"}
          >
            Notifications
          </Link>
          <Link className="hover:text-foreground" href={"/dashboard/settings"}>
            Settings
          </Link>{" "}
        </div>
        <DropdownMenuSeparator />
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive cursor-pointer p-[6px] px-3"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
