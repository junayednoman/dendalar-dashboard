"use client";
import StatCard from "@/components/others/StatCard";
import { Layers3, NotebookPen, User } from "lucide-react";

const TopStats = ({
  data,
}: {
  data: {
    totalUsers: number;
    totalLevels: number;
    totalLessons: number;
  };
}) => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          icon={<User />}
          value={data.totalUsers || 0}
        />
        <StatCard
          title="Total Levels"
          icon={<Layers3 />}
          value={data.totalLevels || 0}
        />
        <StatCard
          title="Total Lessons"
          icon={<NotebookPen />}
          value={data.totalLessons || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;
