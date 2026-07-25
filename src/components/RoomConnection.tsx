"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

type Props = {
  roomCode: string;
  callsign: string;
};

export default function RoomConnection({
  roomCode,
  callsign,
}: Props) {
  const [connected, setConnected] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("connect", () => {
      setConnected(true);

      socket.emit("join-room", {
        roomCode,
        callsign,
      });
    });

    socket.on("user-joined", (user) => {
      setNotice(`${user.callsign} joined the room.`);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomCode, callsign]);

  return (
    <div className="mb-4 rounded-lg border border-slate-700 bg-slate-900 p-4 text-white">
      <div className="flex items-center gap-2">
        <span
          className={`h-3 w-3 rounded-full ${
            connected ? "bg-green-500" : "bg-red-500"
          }`}
        />

        <span>
          {connected
            ? `Connected to room ${roomCode}`
            : "Connecting to multiplayer server..."}
        </span>
      </div>

      {notice && (
        <p className="mt-2 text-sm text-sky-400">
          {notice}
        </p>
      )}
    </div>
  );
}