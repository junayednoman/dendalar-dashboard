import AContainer from "@/components/AContainer";
import PageTitle from "@/components/others/PageTitle";
import { Metadata } from "next";
import SettingsTabsEditor from "./_components/SettingsTabsEditor";

export const metadata: Metadata = {
  title: "Settings",
};

const SettingsPage = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Settings"
          subTitle="Manage the legal content shown across the platform."
        />
        <SettingsTabsEditor />
      </AContainer>
    </main>
  );
};

export default SettingsPage;
