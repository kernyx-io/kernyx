"use client";

import { useState } from "react";

export default function SuggestPage() {
  const [name, setName] = useState("");
  const [game, setGame] = useState("");
  const [reason, setReason] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!game.trim()) {
      setError("Please enter a game name.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, game, reason }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Request failed");
      }

      setSent(true);
      setName("");
      setGame("");
      setReason("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div style={{ maxWidth: 700 }}>
        <h1 style={{ color: "#e8ecf2" }}>Thanks for the suggestion!</h1>
        <p style={{ color: "#8892a4" }}>
          I review every request for future game support.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 style={{ color: "#e8ecf2", marginBottom: "0.5rem" }}>Suggest a Game</h1>
      <p style={{ color: "#8892a4", marginBottom: "1.5rem" }}>
        Tell me what game you want added next.
      </p>

      <div style={{ display: "grid", gap: "1rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          style={{
            padding: "0.75rem",
            background: "#1a1e27",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "6px",
            color: "#e8ecf2",
          }}
        />

        <input
          value={game}
          onChange={(e) => {
            setGame(e.target.value);
            setError("");
          }}
          placeholder="Game name *"
          style={{
            padding: "0.75rem",
            background: "#1a1e27",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "6px",
            color: "#e8ecf2",
          }}
        />

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="What tools or guides would you want?"
          rows={5}
          style={{
            padding: "0.75rem",
            background: "#1a1e27",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "6px",
            color: "#e8ecf2",
            resize: "vertical",
          }}
        />

        {error && <div style={{ color: "#f87171" }}>{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={sending}
          style={{
            width: "fit-content",
            padding: "0.75rem 1.25rem",
            background: "#00c8e8",
            color: "#000",
            border: "none",
            borderRadius: "6px",
            fontWeight: 700,
            cursor: sending ? "not-allowed" : "pointer",
            opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? "Sending..." : "Submit Suggestion →"}
        </button>
      </div>
    </div>
  );
}
