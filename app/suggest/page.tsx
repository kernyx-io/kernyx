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
        <h1 className="pageTitle">Thanks for the suggestion!</h1>
        <p className="pageSubtitle">
          I review every request for future game support.
        </p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700 }}>
      <h1 className="pageTitle">Suggest a Game</h1>
      <p className="pageSubtitle">Tell me what game you want added next.</p>

      <div style={{ display: "grid", gap: "1rem" }}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="fieldInput"
        />

        <input
          value={game}
          onChange={(e) => {
            setGame(e.target.value);
            setError("");
          }}
          placeholder="Game name *"
          className="fieldInput"
        />

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="What tools or guides would you want?"
          rows={5}
          className="fieldTextarea"
        />

        {error && <div className="errorText">{error}</div>}

        <button onClick={handleSubmit} disabled={sending} className="primaryButton">
          {sending ? "Sending..." : "Submit Suggestion →"}
        </button>
      </div>
    </div>
  );
}
