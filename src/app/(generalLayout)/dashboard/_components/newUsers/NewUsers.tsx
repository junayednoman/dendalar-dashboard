import { UserCard } from "../../user-management/_components/UserCard";

const newUsers = [
  {
    id: "new-user-1",
    email: "fortest@mockmail.xyz",
    role: "USER",
    createdAt: new Date().toISOString(),
    profile: { name: "For Test", image: "" },
  },
  {
    id: "new-user-2",
    email: "iamsohan11@gmail.com",
    role: "USER",
    createdAt: new Date().toISOString(),
    profile: { name: "Mr. Sohan", image: "" },
  },
  {
    id: "new-user-3",
    email: "sabbirahmedsohan.bd@gmail.com",
    role: "USER",
    createdAt: new Date().toISOString(),
    profile: { name: "John Doe", image: "" },
  },
  {
    id: "new-user-4",
    email: "junayednoman05@gmail.com",
    role: "USER",
    createdAt: new Date().toISOString(),
    profile: { name: "Noman", image: "" },
  },
];

const NewUsers = () => {
  return (
    <div className="mt-6">
      <h3 className="font-bold text-2xl">New Users</h3>
      <div className="space-y-3 mt-4">
        {newUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default NewUsers;
