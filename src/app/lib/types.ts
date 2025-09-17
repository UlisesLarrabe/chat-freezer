export interface Message {
  id: string;
  role: "user" | "freezer";
  content: string;
}

export interface GenerateChatRequest {
  userMessage: string;
  historyText: Message[];
  isStarting: boolean;
}
