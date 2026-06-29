"use client";
import AContainer from "@/components/AContainer";
import AErrorMessage from "@/components/AErrorMessage";
import PageTitle from "@/components/others/PageTitle";
import ASpinner from "@/components/ui/ASpinner";
import { useGetDashboardStatsQuery } from "@/redux/api/dashboardApi";
import { useState } from "react";
import TopStats from "./TopStats";
import DashboardTabs from "./tab/DashboardTabs";
import { UserOverview } from "./chart/UserOverview";
import NewUsers from "./newUsers/NewUsers";

const DashboardContainer = () => {
  const currentYear = new Date().getFullYear().toString();
  const [year, setYear] = useState(currentYear);
  const { data, isLoading, isError, error, refetch } =
    useGetDashboardStatsQuery(year);
  const stats = data?.data?.stats || data?.stats || {};
  const userOverview = data?.data?.userOverview || data?.userOverview || [];

  return (
    <AContainer>
      <PageTitle
        title="Dashboard"
        subTitle="Get a snapshot of your platform's performance. Track key metrics, user activity, and recent updates to stay informed"
      />
      <div className="flex gap-8 mt-8 h-fit">
        <div className="w-[62%]">
          {isLoading ? (
            <ASpinner size={120} className="min-h-[420px]" />
          ) : isError ? (
            <AErrorMessage error={error} onRetry={refetch} className="min-h-[420px]" />
          ) : (
            <>
              <TopStats
                data={{
                  totalUsers: stats.totalUsers || 0,
                  totalLevels: stats.totalLevels || 0,
                  totalLessons: stats.totalLessons || 0,
                }}
              />
              <UserOverview data={userOverview} year={year} onYearChange={setYear} />
            </>
          )}
          <NewUsers />
        </div>
        <div className="w-[38%] border-2 rounded-2xl p-4 py-6 h-fit">
          <DashboardTabs />
        </div>
      </div>
    </AContainer>
  );
};

export default DashboardContainer;
