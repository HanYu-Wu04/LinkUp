import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  description: string;
  isRegistered?: boolean;
}

export const EventCard = ({ title, date, description, isRegistered }: EventCardProps) => {
  return (
    <Card className="glass-card overflow-hidden transition-all duration-300 hover:shadow-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>
        <Button variant={isRegistered ? "secondary" : "default"} className="button-hover w-full">
          {isRegistered ? "Registered" : "Register Now"}
        </Button>
      </CardContent>
    </Card>
  );
};
