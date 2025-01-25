"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface UserTableProps {
  users: User[];
}

export default function UserTable({ users }: UserTableProps) {
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  interface DeleteResponse {
    ok: boolean;
  }

  const handleDelete = async (id: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res: DeleteResponse = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }).then((response) => response.json());
      if (res.ok) {
        // Refresh the page or update the state to remove the deleted user
        window.location.reload();
      }
    }
  };

  interface EditResponse {
    ok: boolean;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res: EditResponse = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingUser),
    }).then((response) => response.json());
    if (res.ok) {
      setEditingUser(null);
      // Refresh the page or update the state
      window.location.reload();
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(user)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(user._id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <form onSubmit={handleSubmit}>
              <Input
                value={editingUser.firstName}
                onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                placeholder="First Name"
                className="mb-2"
              />
              <Input
                value={editingUser.lastName}
                onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                placeholder="Last Name"
                className="mb-2"
              />
              <Input
                value={editingUser.phoneNumber}
                onChange={(e) => setEditingUser({ ...editingUser, phoneNumber: e.target.value })}
                placeholder="Phone Number"
                className="mb-2"
              />
              <Button type="submit">Save Changes</Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
