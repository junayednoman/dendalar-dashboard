import { Metadata } from "next";
import DashboardContainer from "./_components/DashboardContainer";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Home() {
  return (
    <main>
      <DashboardContainer />
    </main>
  );
}
