import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { mockConversations, mockMessages } from "./mock-data";
import { cn } from "@/lib/utils";

interface ChatMainProps {
  selectedId: string | null;
  className?: string;
}

export function ChatMain({ selectedId, className }: ChatMainProps) {
  const selectedChat = selectedId ? mockConversations.find((c) => c.id === selectedId) : null;
  const messages = selectedId ? mockMessages[selectedId] || [] : [];

  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      {selectedChat ? (
        <>
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={selectedChat.avatar} />
                <AvatarFallback>{selectedChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedChat.name}</p>
                <p className="text-sm text-muted-foreground">{selectedChat.online ? "Online" : "Offline"}</p>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                  <Card
                    className={`max-w-[70%] p-3 ${message.sender === "me" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    {message.type === "image" ? (
                      <div className="relative h-48 w-[520px]">
                        <Image
                          src={message.content || "/placeholder.svg"}
                          alt="Shared image"
                          fill
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <p className="text-sm">{message.content}</p>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">{message.timestamp}</p>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <form className="flex items-center gap-2">
              <Button type="button" size="icon" variant="ghost">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Input placeholder="Type a message..." className="flex-1" autoComplete="off" />
              <Button type="button" size="icon" variant="ghost">
                <Smile className="h-5 w-5" />
              </Button>
              <Button type="button" size="icon" variant="ghost">
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full flex-1 items-center justify-center bg-background">
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}
