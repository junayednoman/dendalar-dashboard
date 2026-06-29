"use client";

import { useMemo, useState } from "react";
import AErrorMessage from "@/components/AErrorMessage";
import { AFilterSelect } from "@/components/form/AFilterSelect";
import ASpinner from "@/components/ui/ASpinner";
import { Input } from "@/components/ui/input";
import { APagination } from "@/components/ui/APagination";
import { UserCard } from "./UserCard";
import { useGetUsersQuery } from "@/redux/api/userApi";

const userRoleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const { data, isLoading, isError, error, refetch } = useGetUsersQuery({
    page: currentPage,
    limit,
  });
  const users = data?.data?.auths || [];
  const totalUsers = data?.data?.meta?.total || 0;
  const filteredUsers = useMemo(() => {
    return users.filter((user: any) => {
      const matchesRole = userRole === "all" || user.role === userRole;
      const matchesSearch =
        !searchTerm ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.profile?.name?.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesRole && matchesSearch;
    });
  }, [searchTerm, userRole, users]);

  return (
    <div>
      <div className="flex items-center justify-end gap-2">
        <Input
          name="search"
          placeholder="Search..."
          className="h-11 w-[250px]"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <AFilterSelect
          onChange={setUserRole}
          placeholder="user role"
          value={userRole}
          options={userRoleOptions}
          className="w-[140px]!"
        />
      </div>

      {isLoading ? (
        <ASpinner size={120} className="min-h-[320px]" />
      ) : isError ? (
        <AErrorMessage error={error} onRetry={refetch} className="min-h-[320px]" />
      ) : filteredUsers.length ? (
        <div className="mt-6 space-y-3">
          {filteredUsers.map((user: any) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex min-h-[320px] items-center justify-center rounded-[28px] border border-dashed border-border bg-card/40 text-center">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-white">No users found</h3>
            <p className="text-card-foreground">
              Try another search or page.
            </p>
          </div>
        </div>
      )}

      <APagination
        totalItems={totalUsers}
        itemsPerPage={limit}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Users;
