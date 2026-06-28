import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import ChaptersContainer from "./_components/ChaptersContainer";
import PageTitle from "@/components/others/PageTitle";

export const metadata: Metadata = {
  title: "Chapters",
};

const ChaptersPage = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Users Overview"
          subTitle="View and manage all user accounts, track active users, and approve or disapprove for a seamless platform experience."
        />
        <ChaptersContainer />
      </AContainer>
    </main>
  );
};

export default ChaptersPage;
