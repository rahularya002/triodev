import type { Conversation, ChatMessage } from "../types"

export const conversations: Conversation[] = [
  {
    id: "conv1",
    name: "Triodev Team",
    lastMessage: "The authentication flow is ready for review.",
    lastMessageAt: "10:30 AM",
    unread: 2,
    online: true,
    pinned: true,
  },
  {
    id: "conv2",
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?u=1",
    lastMessage: "I'll have the API docs updated by EOD.",
    lastMessageAt: "Yesterday",
    unread: 0,
    online: true,
  },
  {
    id: "conv3",
    name: "Alice Smith",
    avatar: "https://i.pravatar.cc/150?u=2",
    lastMessage: "Here are the updated wireframes.",
    lastMessageAt: "Yesterday",
    unread: 1,
    online: false,
  },
  {
    id: "conv4",
    name: "Project Updates",
    lastMessage: "Sprint 4 progress: 68% complete",
    lastMessageAt: "2 days ago",
    unread: 0,
    pinned: true,
  },
  {
    id: "conv5",
    name: "Mike Kumar",
    avatar: "https://i.pravatar.cc/150?u=3",
    lastMessage: "Database migration completed successfully.",
    lastMessageAt: "3 days ago",
    unread: 0,
    online: false,
  },
]

export const chatMessages: ChatMessage[] = [
  {
    id: "msg1",
    conversationId: "conv1",
    senderId: "1",
    senderName: "John Doe",
    content: "Hi team! The authentication module is complete and ready for review.",
    type: "text",
    createdAt: "10:00 AM",
    pinned: true,
  },
  {
    id: "msg2",
    conversationId: "conv1",
    senderId: "client",
    senderName: "Rahul Client",
    content: "Great work! I'll review it this afternoon.",
    type: "text",
    createdAt: "10:15 AM",
  },
  {
    id: "msg3",
    conversationId: "conv1",
    senderId: "2",
    senderName: "Alice Smith",
    content: "I've attached the updated design specs for the dashboard.",
    type: "file",
    createdAt: "10:20 AM",
  },
  {
    id: "msg4",
    conversationId: "conv1",
    senderId: "1",
    senderName: "John Doe",
    content: "```typescript\nconst auth = await authenticate({\n  provider: 'google',\n  scopes: ['email', 'profile']\n});\n```",
    type: "code",
    createdAt: "10:25 AM",
  },
  {
    id: "msg5",
    conversationId: "conv1",
    senderId: "1",
    senderName: "John Doe",
    content: "The authentication flow is ready for review.",
    type: "text",
    createdAt: "10:30 AM",
  },
  {
    id: "msg6",
    conversationId: "conv2",
    senderId: "1",
    senderName: "John Doe",
    content: "Hey Rahul, I'll have the API docs updated by EOD.",
    type: "text",
    createdAt: "Yesterday",
  },
]

export function getMessagesByConversation(conversationId: string): ChatMessage[] {
  return chatMessages.filter((m) => m.conversationId === conversationId)
}
