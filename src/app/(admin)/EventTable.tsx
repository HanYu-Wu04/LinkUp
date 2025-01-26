"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  capacity: number;
}

interface EventTableProps {
  events: Event[];
}

export default function EventTable({ events }: EventTableProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  interface DeleteEventResponse {
    ok: boolean;
  }

  const handleDelete = async (id: string): Promise<void> => {
    if (confirm("Are you sure you want to delete this event?")) {
      const res: DeleteEventResponse = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      }).then((response) => response.json());

      if (res.ok) {
        // Refresh the page or update the state to remove the deleted event
        window.location.reload();
      }
    }
  };

  interface EditEventResponse {
    ok: boolean;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const res: EditEventResponse = await fetch("/api/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingEvent),
    }).then((response) => response.json());

    if (res.ok) {
      setEditingEvent(null);
      // Refresh the page or update the state
      window.location.reload();
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id}>
              <TableCell>{event.name}</TableCell>
              <TableCell>{event.description}</TableCell>
              <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
              <TableCell>{event.capacity}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(event)} className="mr-2">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(event._id)} variant="destructive">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          {editingEvent && (
            <form onSubmit={handleSubmit}>
              <Input
                value={editingEvent.name}
                onChange={(e) => setEditingEvent({ ...editingEvent, name: e.target.value })}
                placeholder="Name"
                className="mb-2"
              />
              <Input
                value={editingEvent.description}
                onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                placeholder="Description"
                className="mb-2"
              />
              <Input
                type="date"
                value={new Date(editingEvent.date).toISOString().split("T")[0]}
                onChange={(e) => setEditingEvent({ ...editingEvent, date: "2025-03-12T20:30:00.000Z" })}
                className="mb-2"
              />
              <Input
                type="number"
                value={editingEvent.capacity}
                onChange={(e) => setEditingEvent({ ...editingEvent, capacity: Number.parseInt(e.target.value) })}
                placeholder="Capacity"
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
