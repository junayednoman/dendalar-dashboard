import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import PageTitle from "@/components/others/PageTitle";
import QuestionsContainer from "./_components/QuestionsContainer";

export const metadata: Metadata = {
  title: "Questions",
};

const QuestionsPage = () => {
  return (
    <main>
      <AContainer>
        <PageTitle
          title="Questions Overview"
          subTitle="Create and manage questions for sentence and dialogue lessons."
        />
        <QuestionsContainer />
      </AContainer>
    </main>
  );
};

export default QuestionsPage;
