"use client";

import { useState } from "react";

type Props = {
  onEnterRoom: (roomCode: string) => void;
};

export default function RoomSetup({ onEnterRoom }: Props) {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [roomCode, setRoomCode] = useState("");

  function handleEnterRoom() {
    const code =
      mode === "create"
        ? Math.random().toString(36).slice(2, 7).toUpperCase()
        : roomCode.trim().toUpperCase();

    if (!code) {
      alert("Please enter a room code.");
      return;
    }

    onEnterRoom(code);
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 text-white shadow-xl">
      <h1 className="text-3xl font-bold">Multiplayer Room</h1>

      <p className="mt-2 text-slate-400">
        Create a new room or join an existing room
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button
          onClick={() => setMode("create")}
          className={`rounded-lg px-4 py-3 font-semibold ${
            mode === "create"
              ? "bg-sky-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Create Room
        </button>

        <button
          onClick={() => setMode("join")}
          className={`rounded-lg px-4 py-3 font-semibold ${
            mode === "join"
              ? "bg-sky-600"
              : "bg-slate-800 hover:bg-slate-700"
          }`}
        >
          Join Room
        </button>
      </div>

      {mode === "join" && (
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Room Code
          </label>

          <input
            value={roomCode}
            onChange={(event) => setRoomCode(event.target.value)}
            placeholder="Example: A7B2C"
            maxLength={5}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 uppercase outline-none focus:border-sky-500"
          />
        </div>
      )}

      {mode === "create" && (
        <div className="mt-6 rounded-lg bg-slate-800 p-4 text-sm text-slate-300">
          A five-character room code will be created automatically.
      </div>
      )}

      <button
        onClick={handleEnterRoom}
        className="mt-6 w-full rounded-lg bg-emerald-600 px-4 py-3 font-bold transition hover:bg-emerald-500"
      >
        {mode === "create" ? "Create and Enter" : "Join Room"}
      </button>
    </div>
  );
}