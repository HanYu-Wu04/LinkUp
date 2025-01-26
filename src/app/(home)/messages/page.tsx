"use client";

import { useEffect, useState } from "react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { mockConversations as mockConv, ConversationInterface } from "./mock-data";
import { IEvent } from "@/database/eventSchema";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [mockConversations, setMockConversations] = useState<ConversationInterface[]>(mockConv);
  useEffect(() => {
    fetch("/api/events/registered").then((resp) => {
      if (resp.ok) {
        resp.json().then((data: IEvent[]) => {
          const lastIdx = mockConv.length;
          const conversations: ConversationInterface[] = data.map((val, idx) => {
            return {
              id: val._id,
              name: val.name,
              avatar: "/placeholder.svg?text=DS",
              lastMessage: "HI!!! Happy to have you here.",
              online: true,
              timestamp: "Sunday",
            };
          });
          setMockConversations([...mockConversations, ...conversations]);
        });
      }
    });
  }, []);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar conversations={mockConversations} selectedId={selectedChat} onSelectChat={setSelectedChat} />
      <ChatMain selectedId={selectedChat} />
    </div>
  );
}
