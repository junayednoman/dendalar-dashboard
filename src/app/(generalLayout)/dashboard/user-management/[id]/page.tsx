import AContainer from "@/components/AContainer";
import { Metadata } from "next";
import { UserDetailsData } from "../_components/UserDetailsData";

export const metadata: Metadata = {
  title: "User details",
};

const UserDetailsPage = () => {
  return (
    <>
      <AContainer>
        <UserDetailsData />
      </AContainer>
    </>
  );
};

export default UserDetailsPage;
