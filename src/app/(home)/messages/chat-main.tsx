"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import Image from "next/image";
import { mockConversations, mockMessages } from "./mock-data";
import { cn } from "@/lib/utils";
import { useEffect, useState, Dispatch, SetStateAction, MouseEvent } from "react";
import { socket } from "@/socket";
import { MessageInterface } from "./mock-data";
import { useSession } from "next-auth/react";

function handleSendMessage(
  e: MouseEvent<HTMLButtonElement>,
  message: string,
  userId: string,
  selectedId: string,
  senderName: string,
) {
  e.preventDefault();
  if (!message.trim() || !selectedId) return;

  const data: MessageInterface = {
    content: message,
    sender: userId,
    senderName: senderName,
    type: "text",
    timestamp: new Date().toISOString(),
  };
  console.log(data);

  // Emit message to the room
  socket.emit("message", { roomId: selectedId, data });

  // Save the message in the database
  fetch(`/api/messages/${selectedId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function handleReceiveMessage(setMessages: Dispatch<SetStateAction<MessageInterface[]>>, selectedId: string) {
  if (!selectedId) return;

  console.log("Joining room:", selectedId);
  socket.emit("joinRoom", selectedId);

  socket.on("message", (data: MessageInterface) => {
    console.log("Received message:", data);
    setMessages((messages) => [...messages, data]);
  });

  return () => {
    socket.off("message");
  };
}

export function ChatMain({ selectedId, className, eventName }: ChatMainProps) {
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const [message, setMessage] = useState("");
  const { data: sessionData, status } = useSession();
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [senderName, setSenderName] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (selectedId) {
      fetch(`/api/messages/${selectedId}`).then((resp) => {
        if (resp.ok) {
          resp.json().then((data: MessageInterface[]) => setMessages(data));
        }
      });

      // Set up room and listener for messages
      const cleanup = handleReceiveMessage(setMessages, selectedId);

      return cleanup; // Cleanup on component unmount or `selectedId` change
    }
  }, [selectedId]);

  useEffect(() => {
    if (status === "authenticated" && sessionData) {
      console.log(sessionData.firstName);
      setSenderName(sessionData.firstName);
      setUserId(sessionData.objectId);
    }
  }, [status, sessionData]);

  return (
    <div className={cn("flex flex-col w-full h-full", className)}>
      {selectedId ? (
        <>
          {/* Chat header */}
          <div className="border-b p-4">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>{eventName || "Chat"}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{eventName}</p>
                <p className="text-sm text-muted-foreground">{"Online"}</p>
              </div>
            </div>
          </div>

          {/* Message area */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === userId ? "items-end" : "items-start"}`}>
                  <p className="text-xs font-bold text-muted-foreground">{msg.senderName}</p>
                  <Card
                    className={`max-w-[70%] p-3 ${msg.sender === userId ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{msg.timestamp}</p>
                  </Card>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input field */}
          <div className="border-t p-4">
            <form className="flex items-center gap-2">
              <Input
                placeholder="Type a message..."
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                type="submit"
                onClick={(e) => {
                  handleSendMessage(e, message, userId || "", selectedId || "", senderName || "");
                  setMessage(""); // Clear input
                }}
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-muted-foreground">Select a conversation to start chatting</p>
        </div>
      )}
    </div>
  );
}
