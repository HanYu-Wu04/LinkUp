import { use } from "react";

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
    <div className="min-h-screen bg-gray-50 p-4">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Recommended Friends</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-between rounded-lg border bg-white p-4 shadow-md"
          >
            <div className="mb-4 h-16 w-16 overflow-hidden rounded-full border border-gray-300">
              <img
                src={
                  user.profileImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s"
                }
                alt={user.firstName}
                className="h-full w-full object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{user.firstName}</h3>
            <p className="text-sm text-gray-500">Hobbies: {user.hobbies.join(", ")}</p>
            <button className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">+ Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}
