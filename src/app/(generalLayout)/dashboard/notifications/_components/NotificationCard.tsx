import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function NotificationCard() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border  transition-colors">
      <div className="flex gap-2">
        {/* Profile Image */}
        <Image
          src={"https://payload-marketing.moonpay.com/api/media/file/vibe.jpg"}
          alt={"Sarah Johnson"}
          width={50}
          height={50}
          className="rounded-full mr-3 h-[50px] w-[50px]"
        />

        <div className="flex flex-col">
          User Activity
          <p className="text-sm">
            Your post was reported. Please review and take necessary actions.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Oct 12, 2025</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button className="w-9">
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
