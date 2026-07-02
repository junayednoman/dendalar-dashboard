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
    id: string;
    name: string;
    email: string;
    role: string;
    avatar: string;
    joinedAt: string;
  };
};

export function UserDetailsModal({ children, user }: UserDetailsModalProps) {
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
            <div className="mt-6 space-y-4">
              <div className="grid gap-3 rounded-2xl border border-[#DEDEDE] bg-white p-5 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#8D8D8D]">Full Name</p>
                  <p className="text-base font-semibold text-[#2C2C2C]">
                    {user.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#8D8D8D]">Role</p>
                  <p className="text-base font-semibold text-[#2C2C2C]">
                    {user.role}
                  </p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-sm font-medium text-[#8D8D8D]">
                    Email Address
                  </p>
                  <p className="break-all text-base font-semibold text-[#2C2C2C]">
                    {user.email}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#8D8D8D]">User ID</p>
                  <p className="break-all text-base font-semibold text-[#2C2C2C]">
                    {user.id}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#8D8D8D]">Joined On</p>
                  <p className="text-base font-semibold text-[#2C2C2C]">
                    {user.joinedAt}
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
