import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  conversations: any[];
  selectedId: string | null;
  onSelectChat: (id: string) => void;
}

export function ChatSidebar({ conversations, selectedId, onSelectChat }: ChatSidebarProps) {
  return (
    <div className="flex w-80 flex-col border-r">
      <div className="border-b p-4">
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-accent">
            <Menu className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-9" />
          </div>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {conversations.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className={cn(
                "flex items-center gap-4 p-3 rounded-lg w-full text-left",
                "hover:bg-accent transition-colors",
                selectedId === chat.id && "bg-accent",
              )}
            >
              <Avatar className="relative">
                <AvatarImage src={chat.avatar} />
                <AvatarFallback>{chat.name[0]}</AvatarFallback>
                {chat.online && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background bg-green-500" />
                )}
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{chat.name}</p>
                  <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
                </div>
                <p className="truncate text-sm text-muted-foreground">{chat.lastMessage}</p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
