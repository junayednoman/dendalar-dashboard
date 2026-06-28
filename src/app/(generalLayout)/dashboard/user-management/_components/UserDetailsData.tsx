import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar, Mail } from "lucide-react";

export function UserDetailsData() {
  return (
    <Card className="w-full max-w-md border-gray-700">
      <CardContent className="p-6 px-8">
        <div className="flex items-center gap-12">
          {/* Avatar */}
          <div className="text-center flex items-center gap-4 flex-col">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="bg-gray-700 text-white font-semibold text-lg">
                JD
              </AvatarFallback>
            </Avatar>
            {/* Name and title */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-1">
                Sarah Johnson
              </h2>
              <p className="text-gray-400 text-sm">Flutter App Developer</p>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-4">
            {/* Header with badge */}
            <div className="flex">
              <Badge className="bg-primary text-white text-sm p-1 px-2">
                Personal
              </Badge>
            </div>

            {/* Info items */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Abuja, Nigeria</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="h-4 w-4" />
                <span>Joined August 2025</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Mail className="h-4 w-4" />
                <span>johnsonsarah@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
