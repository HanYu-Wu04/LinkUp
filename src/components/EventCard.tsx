import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { prettifyDate } from "@/utils/dates";
import { IEvent } from "@/database/eventSchema";
import MapDirections from "./MapDirections";
import Image from "next/image";

interface EventCardProps {
  event: IEvent;
  isRegistered?: boolean;
}

const getParticipantCount = (event: IEvent) => {
  return event.participants.length + event.startingParticipants;
};

const onRegisterClick = async (isRegistered: boolean, eventId: string) => {
  const body = { register: !isRegistered };

  const res = await fetch(`/api/events/register/${eventId}`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    console.error("Failed to register for event");
  }
  window.location.reload();
};

// Function to get a fallback image

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

// Validate image URL
const getValidImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return FALLBACK_IMAGE; // No image URL
  if (!imageUrl.toLowerCase().startsWith("http")) return FALLBACK_IMAGE; // Not an absolute URL
  if (imageUrl.toLowerCase().includes("random")) return FALLBACK_IMAGE; // Contains "random" (bad image)
  return imageUrl; // Valid image URL
};

export const EventCard = ({ event, isRegistered }: EventCardProps) => {
  if (!event) return null;

  const { name, date, imageUrl } = event;

  const validImageUrl = getValidImageUrl(imageUrl);

  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-40">
        <Image src={validImageUrl} alt={`${name} image`} layout="fill" objectFit="cover" priority />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{prettifyDate(date)}</span>
        </div>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <MapDirections lat={event.location.coordinates[0]} lng={event.location.coordinates[1]} />
          <span className="text-sm text-muted-foreground">
            Participants: {getParticipantCount(event)}/{event.capacity}
          </span>
        </div>
        <Button
          variant={isRegistered ? "secondary" : "default"}
          onClick={() => onRegisterClick(isRegistered, event._id)}
          className="button-hover w-full"
        >
          {isRegistered ? "Linked" : "Link Up"}
        </Button>
      </CardContent>
    </Card>
  );
};
