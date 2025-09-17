import { PROMPTS } from "@/app/lib/prompts";
import { GenerateChatRequest } from "@/app/lib/types";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userMessage, historyText, isStarting }: GenerateChatRequest =
      await request.json();
    let prompt: string = PROMPTS.INITIAL_MESSAGE;
    if (!isStarting) {
      const conversationHistory = historyText
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");
      prompt = PROMPTS.CONTINUE_MESSAGE(conversationHistory, userMessage);
    }
    const text = await streamText({
      model: google("gemini-2.5-flash-lite"),
      prompt,
    });
    return text.toTextStreamResponse();
  } catch (error) {
    return NextResponse.json(
      { error: "Error al generar la respuesta.", errorDetail: error },
      { status: 500 }
    );
  }
}
