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

  const res = await fetch(`/api/events/register/${eventId}`, { method: "POST", body: JSON.stringify(body) });
  // TODO: add toast
  if (!res.ok) {
    console.error("Failed to register for event");
  }
  window.location.reload();
};

const Images = [
  "https://images.unsplash.com/photo-1532635241-17e820acc59f?q=80&w=3036&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1520156557489-31c63271fcd4?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615680022648-2db11101c73a?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?q=80&w=3164&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1522729525412-d848b2319ded?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1520880867055-1e30d1cb001c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1613109040830-ffdd96756f5e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1617939532603-2905b4eeb788?q=80&w=2677&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1549911265-e9e6437ae7a9?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1525026198548-4baa812f1183?q=80&w=3134&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1532498551838-b7a1cfac622e?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
export const EventCard = ({ event, isRegistered }: EventCardProps) => {
  if (!event) return <></>;
  const { name, date, description, imageUrl } = event;
  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative h-40">
        <Image src={Images[Math.floor(Math.random() * Images.length)]} layout="fill" objectFit="cover" />
      </div>
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          {/* Get location: https://developers.google.com/maps/documentation/geocoding/requests-reverse-geocoding */}
          <span className="text-sm text-muted-foreground">{prettifyDate(date)}</span>
        </div>
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          <MapDirections lat={event.location.coordinates[0]} lng={event.location.coordinates[1]} />
          {/* Participants currently signed up */}
          <span className="text-sm text-muted-foreground">
            Participants: {getParticipantCount(event)}/{event.capacity}
          </span>
        </div>
        {/* <p className="mb-4 text-sm text-muted-foreground">{description}</p> */}
        <Button
          variant={isRegistered ? "secondary" : "default"}
          onClick={() => {
            onRegisterClick(isRegistered, event._id);
          }}
          className="button-hover w-full"
        >
          {isRegistered ? "Linked" : "Link Up"}
        </Button>
      </CardContent>
    </Card>
  );
};
