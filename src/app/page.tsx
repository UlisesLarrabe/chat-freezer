"use client";

import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { useState } from "react";
import { useChat } from "./hooks/use-chat";
import { MessageSquare } from "lucide-react";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Response } from "@/components/ai-elements/response";

export default function Home() {
  const { chat, isLoading, sendMessage, isStreaming, streamingMessage } =
    useChat();
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;
    setInputValue("");
    await sendMessage(text);
  };
  return (
    <Conversation className="relative w-full min-h-screen max-w-xl mx-auto h-full">
      <ConversationContent>
        {!chat ? (
          <ConversationEmptyState
            icon={<MessageSquare className="size-12" />}
            title="No messages yet"
            description="Start a conversation to see messages here"
          />
        ) : (
          chat?.map((message) => (
            <Message
              from={message.role == "freezer" ? "assistant" : "user"}
              key={message.id}
            >
              <MessageContent>{message.content}</MessageContent>
            </Message>
          ))
        )}
        {isStreaming && (
          <Message from="assistant">
            <MessageContent>
              <Response>{streamingMessage}</Response>
            </MessageContent>
          </Message>
        )}
        {isLoading && !isStreaming && (
          <Message from="assistant">
            <MessageContent>Freezer está escribiendo...</MessageContent>
          </Message>
        )}
      </ConversationContent>
      <ConversationScrollButton />
      <div className="p-2 bottom-0 sticky w-full">
        <PromptInput
          onSubmit={() => handleSubmit(inputValue)}
          className="mt-4 flex justify-between items-center "
        >
          <PromptInputTextarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <PromptInputSubmit disabled={isLoading} status={"ready"} />
        </PromptInput>
      </div>
    </Conversation>
  );
}
