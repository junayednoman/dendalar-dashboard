"use client";
import StatCard from "@/components/others/StatCard";
import { User } from "lucide-react";

const TopStats = ({
  data,
}: {
  data: {
    totalUserCount: number;
    individuals: number;
    businesses: number;
  };
}) => {
  return (
    <section>
      <div className="grid grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          icon={<User />}
          value={data.totalUserCount || 0}
        />
        <StatCard
          title="Total Coaches"
          icon={<User />}
          value={data.individuals || 0}
        />
        <StatCard
          title="Total Scouts"
          icon={<User />}
          value={data.businesses || 0}
        />
      </div>
    </section>
  );
};

export default TopStats;
