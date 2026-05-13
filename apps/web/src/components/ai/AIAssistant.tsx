"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  "What are the five pillars of Islam?",
  "What is the significance of Surah Al-Fatiha?",
  "Explain the concept of Tawakkul",
  "What does Islam say about patience (Sabr)?",
  "How should I perform Wudu?",
];

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "As-salamu alaykum wa rahmatullahi wa barakatuh! 🌙\n\nI'm your Islamic knowledge assistant. I can help you understand the Quran, Hadith, Islamic jurisprudence, history, and daily practice.\n\nWhat would you like to learn today?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage]
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error ?? "Failed to get response");

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.message?.content ?? "I apologize, I couldn't process that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content: `I encountered an error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0",
                message.role === "user"
                  ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                  : "bg-[var(--elevated)] text-[var(--text)]"
              )}
            >
              {message.role === "user" ? "👤" : "🕌"}
            </div>

            {/* Content */}
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap",
                message.role === "user"
                  ? "bg-[var(--primary)] text-white rounded-tr-sm"
                  : "card rounded-tl-sm"
              )}
            >
              {message.content}
              <p
                className={cn(
                  "text-xs mt-1.5",
                  message.role === "user" ? "text-white/60" : "text-[var(--text-subtle)]"
                )}
              >
                {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-[var(--elevated)] flex items-center justify-center text-sm">
              🕌
            </div>
            <div className="card rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[var(--primary)] animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="mb-4">
          <p className="text-xs text-[var(--text-muted)] mb-2">Suggested questions:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-1.5 rounded-full bg-[var(--elevated)] text-[var(--text-muted)] hover:bg-[var(--primary)]/10 hover:text-[var(--primary)] transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="card p-2 flex gap-2 items-end">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Islam, Quran, Hadith…"
          rows={1}
          className="flex-1 bg-transparent text-[var(--text)] placeholder:text-[var(--text-subtle)] resize-none focus:outline-none text-sm px-3 py-2 max-h-32"
          style={{ minHeight: "40px" }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
          }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-lg transition-all flex-shrink-0",
            input.trim() && !isLoading
              ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] active:scale-95"
              : "bg-[var(--elevated)] text-[var(--text-subtle)] cursor-not-allowed"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 2 11 13M22 2 15 22l-4-9-9-4 20-7z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <p className="text-xs text-[var(--text-subtle)] text-center mt-2">
        AI-powered Islamic knowledge assistant · Always verify with qualified scholars
      </p>
    </div>
  );
}
