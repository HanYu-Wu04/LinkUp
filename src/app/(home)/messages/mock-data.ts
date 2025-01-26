export interface ConversationInterface {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  online: boolean;
}

export interface MessageInterface {
  id?: string;
  content: string;
  sender: string;
  senderName: string;
  timestamp: string;
  type: string;
}

export const mockConversations = [
  {
    id: "1",
    name: "Death Star 3.0",
    avatar: "/placeholder.svg?text=DS",
    lastMessage: "I'll trust you. For now.",
    timestamp: "7:15 PM",
    online: true,
  },
  {
    id: "2",
    name: "Eva Summer",
    avatar: "/placeholder.svg?text=ES",
    lastMessage: "Reminds me of a Chinese proverb...",
    timestamp: "11:28 PM",
    online: true,
  },
  {
    id: "3",
    name: "Lena Oxton",
    avatar: "/placeholder.svg?text=LO",
    lastMessage: "😊 Sticker",
    timestamp: "9:17 PM",
    online: false,
  },
  {
    id: "4",
    name: "Mom",
    avatar: "/placeholder.svg?text=M",
    lastMessage: "Don't forget your blaster and helmet",
    timestamp: "8:02 PM",
    online: true,
  },
];

export const mockMessages = {
  "1": [
    {
      id: "1",
      content: "I'll trust you. For now.",
      sender: "1",
      timestamp: "7:15 PM",
      type: "text",
    },
  ],
  "2": [
    {
      id: "1",
      content: "I finally visited Earth.. The nature here is fantastic!",
      sender: "2",
      timestamp: "11:23 PM",
      type: "text",
    },
    {
      id: "2",
      content:
        "https://images.unsplash.com/photo-1563302905-4830598613c0?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      sender: "2",
      timestamp: "11:23 PM",
      type: "image",
    },
    {
      id: "3",
      content:
        "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do, so throw off the bowlines, sail away from safe harbor, catch the trade winds in your sails.",
      sender: "me",
      timestamp: "11:28 PM",
      type: "text",
    },
  ],
};
