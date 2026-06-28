"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import logoIcon from "@/assets/logo.svg";
import modalWeb from "@/assets/modal  web.svg";

type PasswordUpdatedSuccessModalProps = {
  open: boolean;
  onExploreDashboard: () => void;
};

const PasswordUpdatedSuccessModal = ({
  open,
  onExploreDashboard,
}: PasswordUpdatedSuccessModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/55 backdrop-blur-[3px] p-4 animate-in fade-in duration-75">
      <div className="relative w-full max-w-[600px] overflow-hidden rounded-3xl border border-primary/35 bg-primary px-6 py-19 text-center md:px-12 animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">
        <Image
          src={modalWeb}
          alt=""
          width={600}
          height={600}
          className="pointer-events-none absolute -right-1 -top-8 w-[51%] opacity-30"
          aria-hidden
        />
        <Image
          src={modalWeb}
          alt=""
          width={680}
          height={680}
          className="pointer-events-none absolute -bottom-21 -left-1 w-[48%] rotate-180 opacity-30"
          aria-hidden
        />

        <Image
          src={logoIcon}
          alt="Player Central"
          width={150}
          height={150}
          className="relative mx-auto mb-3"
        />

        <h3 className="relative mt-12 text-[40px] leading-tight font-bold text-white">
          Password Updated
        </h3>
        <p className="relative mx-auto mt-4 max-w-[520px] text-[20px] leading-[1.35] text-white">
          You can now use your new password to log in
          <br />
          to your account.
        </p>

        <Button
          type="button"
          onClick={onExploreDashboard}
          className="relative mt-10 h-12 w-full rounded-2xl border border-white/20 bg-white text-[20px] text-primary hover:bg-white/90"
        >
          Back to Login
        </Button>
      </div>
    </div>
  );
};

export default PasswordUpdatedSuccessModal;
