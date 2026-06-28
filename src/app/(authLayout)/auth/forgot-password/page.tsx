"use client";
import dynamic from "next/dynamic";

const ForgetPasswordForm = dynamic(() => import("./ForgetPasswordForm"), {
  ssr: false,
});

const ForgotPassword = () => {
  return <ForgetPasswordForm />;
};

export default ForgotPassword;
