import { use } from "react";
import UserTable from "./UserTable";

const host_url: string = process.env.HOST_URL as string;

const myHobbies = ["Coding", "Sports", "Fitness"]; // Replace this with your actual hobbies.

async function fetchUsers() {
  const res = await fetch(host_url + "/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

function filterUsersWithSimilarHobbies(users: any[], myHobbies: string[]) {
  return users.filter((user) => {
    const commonHobbies = user.hobbies.filter((hobby: string) => myHobbies.includes(hobby));
    return commonHobbies.length >= 1; // At least 1 similar hobby
  });
}

export default function FriendDashboard() {
  const users = use(fetchUsers());
  const filteredUsers = filterUsersWithSimilarHobbies(users, myHobbies);

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Recommended Friends</h2>
      <UserTable users={filteredUsers} />
    </div>
  );
}
