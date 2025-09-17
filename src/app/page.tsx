"use client";

import { Conversation } from "@/components/ai-elements/conversation";
import { useChat } from "./hooks/use-chat";
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
