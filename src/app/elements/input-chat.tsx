"use client";
import React, { useState } from "react";
import { useChat } from "../hooks/use-chat";
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";

const InputChat = ({
  sendMessage,
}: Readonly<{
  sendMessage: (message: string) => Promise<void>;
}>) => {
  const { isLoading } = useChat();
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = async (text: string) => {
    if (!text.trim()) return;
    setInputValue("");
    await sendMessage(text);
  };
  return (
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
  );
};

export default InputChat;
