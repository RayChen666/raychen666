"use client";

// src/components/blog/BlogSearch.tsx

import { useState, useRef, useCallback } from "react";
import { ShineBorder } from "@/components/ShineBorder";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function renderMarkdown(text: string) {
  const parts: React.ReactNode[] = [];
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={match.index}
        href={match[2]}
        style={{
          color: "var(--brand-strong)",
          textDecoration: "underline",
          textUnderlineOffset: "3px",
        }}
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("blog-search-history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAskHovered, setIsAskHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show shine when hovered (closed) OR panel is open (including while loading)
  const showShine = isHovered || isOpen;

  const updateMessages = (updater: (prev: Message[]) => Message[]) => {
    setMessages((prev) => {
      const next = updater(prev);
      localStorage.setItem("blog-search-history", JSON.stringify(next));
      return next;
    });
  };

  const handleSearch = useCallback(async () => {
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    updateMessages((prev) => [
      ...prev,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ]);
    setQuery("");
    setLoading(true);

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        updateMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      updateMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }, [query, loading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setQuery("");
    localStorage.removeItem("blog-search-history");
  };

  return (
    <>
      {/* Trigger button (closed state) */}
      {!isOpen && (
        <div
          style={{ position: "relative", 
          width: "100%", 
          marginBottom: "8px",
          borderRadius: "var(--radius-l)",
       }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {showShine && (
            <ShineBorder
              //shineColor={["#5ba3c9", "#ffffff", "#5ba3c9"]}
              shineColor={["#ff0000", "#ff7700", "#ffff00", "#00ff00", "#0000ff", "#8b00ff"]}
              duration={6}
              borderWidth={0.6}
            />
          )}
          <button
            onClick={handleOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              width: "100%",
              padding: "12px 20px",
              background: isHovered ? "var(--neutral-alpha-weak)" : "var(--brand-alpha-weak)",
              border: "1px solid var(--neutral-alpha-weak)",
              borderRadius: "var(--radius-l)",
              cursor: "pointer",
              color: "var(--neutral-weak)",
              fontFamily: "inherit",
              fontSize: "var(--font-size-body-default-s)",
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, opacity: 0.6 }}
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span style={{ opacity: 0.6 }}>Ask anything about my posts...</span>
            
          </button>
        </div>
      )}

      {/* Expanded search panel */}
      {isOpen && (
        <div
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "8px",
            borderRadius: "var(--radius-l)",
          }}
        >
          {/* ShineBorder always visible while panel is open */}
          <ShineBorder
            shineColor={["#5ba3c9", "#ffffff", "#5ba3c9"]}
            //shineColor={["#ff0000", "#ff7700", "#ffff00", "#00ff00", "#0000ff", "#8b00ff"]}
            duration={6}
            borderWidth={0.6}
          />

          <div
            style={{
              width: "100%",
              background: "var(--brand-alpha-weak)",
              border: "1px solid var(--neutral-alpha-medium)",
              borderRadius: "var(--radius-l)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 16px",
                borderBottom: "1px solid var(--neutral-alpha-weak)",
              }}
            >
              <span
                style={{
                  fontSize: "var(--font-size-label-default-s)",
                  color: "var(--neutral-weak)",
                  opacity: 0.7,
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(135deg, red 0%, orange 40%, yellow 55%, green 65%, blue 85%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    padding: "3px",
                    fontSize: "24px",
                    position: "relative",
                    top: "0px",
                  }}
                >
                  ✦
                </span>
                {" "}
                <span 
                  style={{ position: "relative", 
                  bottom: "3.3px",
                }}
                >
                  Ask AI{" "}
                </span>
                <span 
                  style={{ 
                    position: "relative", 
                    bottom: "3.3px",
                    fontSize: "12px",
                    color: "#5ba3c9"
                   }}
                >
                   powered by gemini-2.5-flash
                </span>
              </span>
              <button
                onClick={handleClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--neutral-weak)",
                  opacity: 0.5,
                  padding: "5px",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  top: "1px",
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            {messages.length > 0 && (
              <div
                style={{
                  maxHeight: "280px",
                  overflowY: "auto",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "10px 14px",
                        borderRadius:
                          msg.role === "user"
                            ? "var(--radius-m) var(--radius-m) 4px var(--radius-m)"
                            : "var(--radius-m) var(--radius-m) var(--radius-m) 4px",
                        background:
                          msg.role === "user"
                            ? "var(--brand-alpha-medium)"
                            : "var(--neutral-alpha-weak)",
                        border: "1px solid var(--neutral-alpha-weak)",
                        fontSize: "var(--font-size-body-default-s)",
                        color: "var(--neutral-strong)",
                        lineHeight: "1.6",
                      }}
                    >
                      {msg.role === "assistant" ? (
                        msg.content ? (
                          renderMarkdown(msg.content)
                        ) : (
                          <span style={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            {[0, 1, 2].map((j) => (
                              <span
                                key={j}
                                style={{
                                  width: "5px",
                                  height: "5px",
                                  borderRadius: "50%",
                                  background: "var(--neutral-weak)",
                                  animation: "pulse 1.2s ease-in-out infinite",
                                  animationDelay: `${j * 0.2}s`,
                                }}
                              />
                            ))}
                          </span>
                        )
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Input row */}
            <div
              style={{
                display: "flex",
                gap: "8px",
                padding: "12px 13px 12px 20px",
                borderTop: messages.length > 0 ? "1px solid var(--neutral-alpha-weak)" : "none",
              }}
            >
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="e.g. multi-agent VR, WebXR drone..."
                disabled={loading}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--neutral-strong)",
                  fontFamily: "inherit",
                  fontSize: "var(--font-size-body-default-s)",
                  padding: "4px 0",
                }}
              />
              <button
                onClick={handleSearch}
                disabled={loading || !query.trim()}
                onMouseEnter={() => setIsAskHovered(true)}
                onMouseLeave={() => setIsAskHovered(false)}
                style={{
                  background: isAskHovered ? "var(--brand-alpha-medium)" : "var(--brand-alpha-weak)",
                  border:  isAskHovered ? "1px solid var(--brand-neutral-strong)" : "1px solid var(--brand-alpha-medium)",
                  padding: "0",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "var(--radius-full)",
                  cursor: loading || !query.trim() ? "not-allowed" : "pointer",
                  color: isAskHovered ? "var(--brand-strong)" : "var(--brand-alpha-strong)",
                  fontSize: "var(--font-size-label-default-s)",
                  fontFamily: "inherit",
                  opacity: loading || !query.trim() ? 0.4 : 1,
                  transition: "opacity 0.2s, background 0.15s",
                  marginRight: "0px",
                }}
              >
                
                {loading ? (
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "currentColor", opacity: 0.6 }} />
                ) : (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="19" x2="12" y2="5" />
                    <polyline points="5 12 12 5 19 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
