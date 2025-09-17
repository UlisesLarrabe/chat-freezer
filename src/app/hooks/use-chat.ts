"use client";

import { useState } from "react";
import { Message } from "../lib/types";

export function useChat() {
  const [chat, setChat] = useState<Message[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamingMessage, setStreamingMessage] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
    setStreamingMessage("");
    setError(null);
    setChat((prevChat) => [
      ...(prevChat || []),
      { id: crypto.randomUUID(), role: "user", content: userMessage },
    ]);
    try {
      const isStarting = chat === null;
      const historyText = chat ? [...chat] : [];
      const response = await fetch("/api/generate-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
          historyText,
          isStarting,
        }),
      });
      if (!response.ok) {
        setError("Error al generar la respuesta.");
        return;
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulatedText = "";
      if (reader) {
        setIsLoading(false);
        setIsStreaming(true);
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          accumulatedText += chunk;
          setStreamingMessage(accumulatedText);
        }
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "freezer",
          content: accumulatedText,
        };
        setChat((prevChat) =>
          prevChat ? [...prevChat, assistantMessage] : [assistantMessage]
        );
      }
    } catch (error) {
      throw new Error("Error al enviar el mensaje.", { cause: error });
    } finally {
      setIsStreaming(false);
      setIsLoading(false);
    }
  };

  return {
    chat,
    isLoading,
    error,
    sendMessage,
    setChat,
    isStreaming,
    streamingMessage,
  };
}
