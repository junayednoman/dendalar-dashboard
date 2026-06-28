import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type EventCardProps = {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  detailsLabel?: string;
  href?: string;
  imageUrl?: string;
};

export function EventCard({
  title = "Vibe Skating Night, NYC",
  subtitle = "28 Oct, 2025",
  badgeText = "Offline",
  detailsLabel = "Details",
  href = "/dashboard/community/rj7348ff3u8ufd44545",
  imageUrl = "https://payload-marketing.moonpay.com/api/media/file/vibe.jpg",
}: EventCardProps) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-border p-4 transition-colors"
    >
      <div className="flex gap-2">
        <Image
          src={imageUrl}
          alt={title}
          width={50}
          height={50}
          className="mr-3 rounded-full"
        />

        <div className="flex flex-col">
          {title}
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <div>
          <Badge variant="default" className="bg-primary text-white">
            {badgeText}
          </Badge>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {detailsLabel ? (
          <p className="text-sm font-medium">{detailsLabel}</p>
        ) : null}
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </Link>
  );
}
