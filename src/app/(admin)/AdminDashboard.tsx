import { use } from "react";
import UserTable from "./UserTable";
import EventTable from "./EventTable";

const host_url: string = process.env.HOST_URL as string;

async function fetchUsers() {
  const res = await fetch(host_url + "/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

async function fetchEvents() {
  const res = await fetch(host_url + "/api/events", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export default function AdminDashboard() {
  const users = use(fetchUsers());
  const events = use(fetchEvents());

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Users</h2>
      <UserTable users={users} />
      <h2 className="mb-2 mt-8 text-xl font-semibold">Events</h2>
      <EventTable events={events} />
    </div>
  );
}
