import { Input } from "@/components/ui/input";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { EventCard } from "./EventCard";

type PeopleTabContentProps = {
  roleLabel: "User" | "Coach";
};

const people = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
  {
    id: 5,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
  {
    id: 6,
    name: "Sarah Johnson",
    email: "johnsonsarah@gmail.com",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/023/402/465/non_2x/man-avatar-free-vector.jpg",
  },
];

const PeopleTabContent = ({ roleLabel }: PeopleTabContentProps) => {
  return (
    <div>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Type to search"
          className="h-10 rounded-xl border-border bg-background pl-10"
        />
      </div>

      <div className="space-y-3">
        {people.map((person) => (
          <EventCard
            key={person.id}
            title={person.name}
            subtitle={person.email}
            badgeText={roleLabel}
            detailsLabel=""
            imageUrl={person.avatar}
            href="/dashboard/user-management"
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-3 text-sm text-white">
        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
        <span>View details</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>
    </div>
  );
};

export default PeopleTabContent;