import Image from "next/image";
import logo from "@/assets/logo.svg";
import icon from "@/assets/icon.png";
import Link from "next/link";
import { SidebarHeader, useSidebar } from "../ui/sidebar";

const SidebarTop = () => {
  const { state } = useSidebar();
  return (
    <SidebarHeader>
      {state === "expanded" ? (
        <Link
          href={"/dashboard"}
          className="flex items-center justify-between gap-6 mt-2 pl-1"
        >
          <Image src={logo} alt="logo" width={150} height={150} />
        </Link>
      ) : (
        state === "collapsed" && (
          <Link
            href={"/dashboard"}
            className="flex items-center justify-between gap-6 mt-2"
          >
            <Image src={icon} alt="logo" width={30} height={30} />
          </Link>
        )
      )}
    </SidebarHeader>
  );
};

export default SidebarTop;
