import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import LessonsContainer from "./_components/LessonsContainer";
import PageTitle from "@/components/others/PageTitle";

export const metadata: Metadata = {
  title: "Lessons",
};

const LessonsPage = () => {
  return (
    <main>
      <AContainer>
         <PageTitle
          title="Users Overview"
          subTitle="View and manage all user accounts, track active users, and approve or disapprove for a seamless platform experience."
        />
        <LessonsContainer />
      </AContainer>
    </main>
  );
};

export default LessonsPage;
