import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailsModal } from "./UserDetailsModal";
import { toast } from "sonner";

type UserCardProps = {
  user: {
    id: string;
    email: string;
    role: string;
    createdAt: string;
    profile?: {
      name?: string;
      image?: string;
    };
  };
};

export function UserCard({ user }: UserCardProps) {
  const handleChangeStatus = () => {
    toast.info("User status action is not connected yet.");
  };
  const displayName = user.profile?.name || "Unknown User";
  const imageSrc =
    user.profile?.image ||
    "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg";
  const roleLabel = user.role?.toLowerCase();
  const joinedAt = new Date(user.createdAt).toLocaleDateString();

  return (
    <div className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors">
      <Link href={`/dashboard/user-management/${user.id}`} className="flex gap-2">
        <Image
          src={imageSrc}
          alt={displayName}
          width={50}
          height={50}
          className="mr-3 rounded-full"
        />

        <div className="flex flex-col">
          {displayName}
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>

        <div>
          <Badge variant="default" className="bg-green-600/20 text-green-600">
            {roleLabel}
          </Badge>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <UserDetailsModal
          user={{
            name: displayName,
            role: user.role,
            avatar: imageSrc,
          }}
          bio={`Joined on ${joinedAt}. Email: ${user.email}`}
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
