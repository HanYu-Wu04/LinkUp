"use client";

import { useState } from "react";
import { ChatSidebar } from "./chat-sidebar";
import { ChatMain } from "./chat-main";
import { mockConversations } from "./mock-data";

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar conversations={mockConversations} selectedId={selectedChat} onSelectChat={setSelectedChat} />
      <ChatMain selectedId={selectedChat} />
    </div>
  );
}
