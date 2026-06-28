"use client";
import dynamic from "next/dynamic";

const NewPasswordForm = dynamic(() => import("./NewPasswordForm"), {
  ssr: false,
});

const VerifyOtpPassword = () => {
  return <NewPasswordForm />;
};

export default VerifyOtpPassword;
