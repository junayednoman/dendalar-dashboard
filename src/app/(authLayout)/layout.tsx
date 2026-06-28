"use client";
import Image from "next/image";
import authImg from "@/assets/auth.svg";
import logo from "@/assets/logo.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="mx-auto flex flex-col items-center justify-center">
      <div className="h-screen grid grid-cols-2 w-full ">
        <div className="px-20 flex flex-col justify-center">
          <Image
            className="mx-auto"
            src={logo}
            width={170}
            height={170}
            alt="auth"
          />
          <Image
            className="mx-auto mb-14 mt-20"
            src={authImg}
            width={270}
            height={270}
            alt="auth"
          />
          <div className="text-center">
            <p className="mx-40 text-white mt-2">Welcome to</p>
            <h3 className="text-white text-[56px] font-bold my-1">Dendalar</h3>
            <p className="text-secondary-foreground mx-40 mt-2">
              Master the Chechen language through culture, history, and daily
              conversation
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center">{children}</div>
      </div>
      <div></div>
    </main>
  );
};

export default AuthLayout;
