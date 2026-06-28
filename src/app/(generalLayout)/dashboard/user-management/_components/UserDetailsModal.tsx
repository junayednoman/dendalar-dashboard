"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";

type UserDetailsModalProps = {
  children: ReactNode;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
  bio: string;
};

export function UserDetailsModal({
  children,
  user,
  bio,
}: UserDetailsModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogOverlay className="fixed inset-0 bg-black/35 backdrop-blur-[1px]" />
      <DialogContent className="max-w-[560px] rounded-2xl border border-[#D5D5D5] bg-[#F3F3F3] p-7">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Image
              width={52}
              height={52}
              src={user.avatar}
              alt={`${user.name} avatar`}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <h3 className="text-3xl leading-8 font-semibold text-[#2C2C2C]">
                {user.name}
              </h3>
              <p className="mt-1 text-xl text-[#A0A0A0]">{user.role}</p>
            </div>
          </div>
          <DialogDescription asChild>
            <div className="mt-6">
              <p className="text-lg leading-relaxed text-[#949494]">{bio}</p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
