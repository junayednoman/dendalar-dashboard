import { AAlertDialog } from "@/components/modal/AAlertDialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Lock, LockOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UserDetailsModal } from "./UserDetailsModal";
import { useChangeAccountStatusMutation } from "@/redux/api/userApi";
import handleMutation from "@/utils/handleMutation";

type UserCardProps = {
  user: {
    id: string;
    email: string;
    role: string;
    status?: string;
    createdAt: string;
    profile?: {
      name?: string;
      image?: string;
    };
  };
};

export function UserCard({ user }: UserCardProps) {
  const [changeAccountStatus, { isLoading }] = useChangeAccountStatusMutation();
  const currentStatus =
    user.status?.toUpperCase() === "BLOCKED" ? "BLOCKED" : "ACTIVE";
  const nextStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
  const actionLabel = nextStatus === "ACTIVE" ? "Activate" : "Block";
  const isBlocked = currentStatus === "BLOCKED";

  const handleChangeStatus = () => {
    handleMutation(
      {
        userId: user.id,
        status: nextStatus,
      },
      changeAccountStatus,
      "Updating account status...",
    );
  };
  const displayName = user.profile?.name || "Unknown User";
  const imageSrc =
    user.profile?.image ||
    "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg";
  const roleLabel = user.role?.toLowerCase();
  const joinedAt = new Date(user.createdAt).toLocaleDateString();
  const statusClassName = isBlocked
    ? "bg-destructive/20 text-destructive"
    : "bg-green-600/20 text-green-600";

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
          <Badge variant="default" className={statusClassName}>
            {currentStatus.toLowerCase()}
          </Badge>
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
            id: user.id,
            name: displayName,
            email: user.email,
            role: user.role,
            avatar: imageSrc,
            joinedAt,
          }}
        >
          <Button className="w-9">
            <Eye />
          </Button>
        </UserDetailsModal>

        <AAlertDialog
          title={`${actionLabel} This Account?`}
          description={`This will set ${displayName}'s account status to ${nextStatus}.`}
          actionText={actionLabel}
          onAction={handleChangeStatus}
        >
          <Button
            className={`w-9 ${
              isBlocked
                ? "bg-primary hover:bg-primary"
                : "bg-destructive hover:bg-destructive"
            }`}
            disabled={isLoading}
            title={actionLabel}
          >
            {isBlocked ? <LockOpen /> : <Lock />}
          </Button>
        </AAlertDialog>
      </div>
    </div>
  );
}
