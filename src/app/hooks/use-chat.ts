"use client";

import { useEffect } from "react";

import { useState } from "react";
import { Message } from "../lib/types";

export function useChat() {
  const [chat, setChat] = useState<Message[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (userMessage: string) => {
    setIsLoading(true);
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
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Error al generar la respuesta.");
        return;
      }
      const newMessage: Message = {
        id: crypto.randomUUID(),
        role: "freezer",
        content: data.res,
      };

      setChat((prevChat) =>
        prevChat ? [...prevChat, newMessage] : [newMessage]
      );
    } catch (error) {
      throw new Error("Error al enviar el mensaje.");
    } finally {
      setIsLoading(false);
    }
  };

  return { chat, isLoading, error, sendMessage, setChat };
}
