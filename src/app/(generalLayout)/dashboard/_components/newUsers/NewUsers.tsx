import { UserCard } from "../../user-management/_components/UserCard";

const NewUsers = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-2xl">New Users</h3>
      <div className="space-y-3 mt-4">
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </div>
  );
};

export default NewUsers;
