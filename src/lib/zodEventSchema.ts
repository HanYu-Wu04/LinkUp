import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters long"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  experienceLevel: z.enum(["Beginner", "Intermediate", "Advanced"]),
  maxParticipants: z.number().min(1, "At least one participant is required"),
  currentParticipants: z.number().min(0),
});

export type EventType = z.infer<typeof eventSchema>;
