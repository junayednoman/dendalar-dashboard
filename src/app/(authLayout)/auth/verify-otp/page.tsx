"use client";
import dynamic from "next/dynamic";

const OtpVerificationForm = dynamic(() => import("./OtpVerificationForm"), {
  ssr: false,
});

const VerifyOtpPassword = () => {
  return <OtpVerificationForm />;
};

export default VerifyOtpPassword;
