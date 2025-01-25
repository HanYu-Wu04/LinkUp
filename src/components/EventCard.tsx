import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { prettifyDate } from "@/utils/dates";
import { IEvent } from "@/database/eventSchema";
import MapDirections from "./MapDirections";

interface EventCardProps {
  event: IEvent;
  isRegistered?: boolean;
}

const getParticipantCount = (event: IEvent) => {
  return event.participants.length + event.startingParticipants;
};
export const EventCard = ({ event, isRegistered }: EventCardProps) => {
  if (!event) return <></>;
  const { name, date, description } = event;
  return (
    <Card className="glass-card min-w-[500px] overflow-hidden transition-all duration-300 hover:shadow-xl">
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
        <Button variant={isRegistered ? "secondary" : "default"} className="button-hover w-full">
          {isRegistered ? "Linked" : "Link Up"}
        </Button>
      </CardContent>
    </Card>
  );
};
