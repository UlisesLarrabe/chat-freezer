"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { useChat } from "./hooks/use-chat";
import { MessageSquare } from "lucide-react";
import { Response } from "@/components/ai-elements/response";
import InputChat from "./elements/input-chat";
import ChatHistory from "./elements/chat-history";

export default function Home() {
  const { chat, isLoading, sendMessage, isStreaming, streamingMessage } =
    useChat();

  return (
    <Conversation className="relative w-full min-h-screen max-w-xl mx-auto h-full">
      <ChatHistory
        chat={chat}
        isLoading={isLoading}
        isStreaming={isStreaming}
        streamingMessage={streamingMessage}
      />
      <InputChat sendMessage={sendMessage} />
    </Conversation>
  );
}
