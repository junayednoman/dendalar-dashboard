"use client";

import { useState } from "react";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import { Input } from "@/components/ui/input";
import { APagination } from "@/components/ui/APagination";
import { UserCard } from "./UserCard";

const userRoleOptions = [
  { label: "Player", value: "player" },
  { label: "Coach", value: "coach" },
  { label: "Parent", value: "parent" },
];

const Users = () => {
  const [userRole, setUserRole] = useState<string>("player");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <Input
          name="search"
          placeholder="Search..."
          className="h-11 w-[250px]"
        />

        <AFilterSelect
          onChange={setUserRole}
          placeholder="user role"
          value={userRole}
          options={userRoleOptions}
          className="w-[140px]!"
        />
      </div>

      <div className="mt-6 space-y-3">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>

      <APagination
        totalItems={100}
        itemsPerPage={limit}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Users;
