import {
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { Response } from "@/components/ai-elements/response";
import { MessageSquare } from "lucide-react";
import React from "react";
import { Message as MessageType } from "../lib/types";

const ChatHistory = ({
  chat,
  isLoading,
  isStreaming,
  streamingMessage,
}: {
  chat: MessageType[] | null;
  isLoading: boolean;
  isStreaming: boolean;
  streamingMessage: string;
}) => {
  return (
    <>
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
    </>
  );
};

export default ChatHistory;
