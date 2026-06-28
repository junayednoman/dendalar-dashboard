import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import LevelsContainer from "./_components/LevelsContainer";
import PageTitle from "@/components/others/PageTitle";

export const metadata: Metadata = {
  title: "Levels",
};

const LevelsPage = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Users Overview"
          subTitle="View and manage all user accounts, track active users, and approve or disapprove for a seamless platform experience."
        />
        <LevelsContainer />
      </AContainer>
    </main>
  );
};

export default LevelsPage;
