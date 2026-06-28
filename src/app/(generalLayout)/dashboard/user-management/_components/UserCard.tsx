import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailsModal } from "./UserDetailsModal";

export function UserCard() {
  const handleChangeStatus = () => {};

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors">
      <Link href="/dashboard/user-management" className="flex gap-2">
        <Image
          src="https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg"
          alt="Sarah Johnson"
          width={50}
          height={50}
          className="mr-3 rounded-full"
        />

        <div className="flex flex-col">
          Junayed Noman
          <p className="text-sm text-muted-foreground">
            junayednoman@gmail.com
          </p>
        </div>

        <div>
          <Badge variant="default" className="bg-green-600/20 text-green-600">
            active
          </Badge>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <UserDetailsModal
          user={{
            name: "Michael Epkot",
            role: "Flutter Developer",
            avatar:
              "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?semt=ais_hybrid&w=740&q=80",
          }}
          bio="Everyone on this platform is so stupid, it's embarrassing. You all suck and are a bunch of losers."
        >
          <Button className="w-9">
            <Eye />
          </Button>
        </UserDetailsModal>

        <AAlertDialog onAction={handleChangeStatus}>
          <Button className="w-9 bg-destructive hover:bg-destructive">
            <Lock />
          </Button>
        </AAlertDialog>
      </div>
    </div>
  );
}
