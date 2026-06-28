"use client";
import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import TopStats from "./TopStats";
import DashboardTabs from "./tab/DashboardTabs";
import { UserOverview } from "./chart/UserOverview";
import NewUsers from "./newUsers/NewUsers";
const DashboardContainer = () => {
  // const currentYear = new Date().getFullYear();
  // const [year, setYear] = useState<string>(currentYear.toString());
  const data = {
    totalUserCount: 2340,
    individuals: 124,
    businesses: 510,
  };

  return (
    <AContainer>
      <PageTitle
        title="Dashboard"
        subTitle="Get a snapshot of your platform's performance. Track key metrics, user activity, and recent updates to stay informed"
      />
      <div className="flex gap-8 mt-8 h-fit">
        <div className="w-[62%]">
          <TopStats data={data} />
          <UserOverview />
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
