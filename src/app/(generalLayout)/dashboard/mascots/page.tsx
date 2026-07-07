import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import PageTitle from "@/components/others/PageTitle";
import MascotsContainer from "./_components/MascotsContainer";

export const metadata: Metadata = {
  title: "Mascots",
};

const MascotsPage = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Mascots Overview"
          subTitle="Manage all mascot images used across the app experience, from onboarding screens to lessons and profile flows."
        />
        <MascotsContainer />
      </AContainer>
    </main>
  );
};

export default MascotsPage;
