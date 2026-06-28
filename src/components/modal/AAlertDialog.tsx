import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import warningIcon from "@/assets/Frame.svg";

interface AlertDialogCustomProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  cancelText?: string;
  actionText?: string;
  onAction: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AAlertDialog({
  children,
  title = "Are you sure?",
  description = "Are you sure you want to continue?",
  cancelText = "Cancel",
  actionText = "Confirm",
  onAction,
  open,
  onOpenChange,
}: AlertDialogCustomProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogOverlay className="fixed inset-0 bg-black/30 backdrop-blur-[.8px]" />
      <AlertDialogContent className="w-[430px] text-center bg-white rounded-lg! py-8 px-10!">
        <AlertDialogHeader>
          <Image
            alt="warning"
            src={warningIcon}
            width={90}
            height={90}
            className="mx-auto mb-2"
          />
          <AlertDialogTitle className="text-center text-2xl text-background">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-accent-foreground">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="justify-center! gap-3 mt-4">
          <AlertDialogCancel className="text-card bg-card/20 rounded-md w-1/2 h-11 hover:bg-card/30 shadow-none border-0">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            className="text-destructive bg-destructive/20 rounded-md w-1/2 h-11 hover:bg-destructive/30 shadow-none"
            onClick={onAction}
          >
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
