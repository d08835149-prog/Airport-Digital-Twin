"use client";

import { useState } from "react";
import AirportMap from "@/components/AirportMap";
import { airports } from "@/data/airports";
import CommunicationPanel from "../components/CommunicationPanel";
import RoomSetup from "../components/RoomSetup";
import RoomConnection from "../components/RoomConnection";

type Role = "controller" | "pilot" | null;
type Step = "role" | "profile" | "room" | "simulation";

export default function Home() {
  const [step, setStep] = useState<Step>("role");
  const [role, setRole] = useState<Role>(null);
  const [callsign, setCallsign] = useState("");
  const [aircraft, setAircraft] = useState("A320");
  const [airportIcao, setAirportIcao] = useState("CYYZ");
  const [roomCode, setRoomCode] = useState("");

  function selectRole(selectedRole: Role) {
    setRole(selectedRole);
    setCallsign("");
    setStep("profile");
  }

  function enterSimulation() {
    if (!callsign.trim()) {
      alert("Please enter a callsign.");
      return;
    }
  

    setStep("room");
  }

  function enterRoom(code: string) {
  setRoomCode(code);
  setStep("simulation");
  }

  function resetRole() {
    setRole(null);
    setCallsign("");
    setStep("role");
  }

  if (step === "role") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl">
          <h1 className="text-4xl font-bold">Airport Multiplayer</h1>

          <p className="mt-3 text-slate-400">
            Choose your role to enter the simulation
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => selectRole("controller")}
              className="rounded-xl border border-sky-500 bg-sky-500/10 p-6 transition hover:bg-sky-500/20"
            >
              <div className="text-4xl">🗼</div>
              <div className="mt-3 text-xl font-bold">
                Air Traffic Controller
              </div>
              <div className="mt-2 text-sm text-slate-400">
                Monitor aircraft and issue instructions
              </div>
            </button>

            <button
              onClick={() => selectRole("pilot")}
              className="rounded-xl border border-emerald-500 bg-emerald-500/10 p-6 transition hover:bg-emerald-500/20"
            >
              <div className="text-4xl">✈️</div>
              <div className="mt-3 text-xl font-bold">Pilot</div>
              <div className="mt-2 text-sm text-slate-400">
                Control an aircraft and communicate with ATC
              </div>
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === "profile") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6 text-white">
        <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
          <button
            onClick={resetRole}
            className="mb-6 text-sm text-slate-400 hover:text-white"
          >
            ← Back
          </button>

          <h1 className="text-3xl font-bold">
            {role === "controller"
              ? "Controller Profile"
              : "Pilot Profile"}
          </h1>

          <p className="mt-2 text-slate-400">
            Enter your simulation information
          </p>

          <div className="mt-8">
            <label className="mb-2 block text-sm font-medium">
              Callsign
            </label>

            <input
              value={callsign}
              onChange={(event) => setCallsign(event.target.value)}
              placeholder={
                role === "controller"
                  ? "Toronto Tower"
                  : "ACA123"
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
            />
          </div>
          
          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
               Airport
             </label>

            <select
              value={airportIcao}
              onChange={(event) => setAirportIcao(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
  >
            {airports.map((airport) => (
      <       option key={airport.icao} value={airport.icao}>
                {airport.name} ({airport.icao})
            </option>
          ))}
          </select>
          </div>

          {role === "pilot" && (
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium">
                Aircraft
              </label>

              <select
                value={aircraft}
                onChange={(event) => setAircraft(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 outline-none focus:border-sky-500"
              >
                <option value="A320">Airbus A320</option>
                <option value="B737">Boeing 737</option>
                <option value="B787">Boeing 787</option>
                <option value="C172">Cessna 172</option>
              </select>
            </div>
          )}

          <button
            onClick={enterSimulation}
            className="mt-8 w-full rounded-lg bg-sky-600 px-4 py-3 font-bold transition hover:bg-sky-500"
          >
            Enter Simulation
          </button>
        </div>
      </main>
    );
  }

  if (step === "room") {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 p-6">
      <RoomSetup onEnterRoom={enterRoom} />
    </main>
  );
}


    return (
    <main className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {role === "controller"
                ? "Controller Station"
                : "Pilot Station"}
            </h1>

            <p className="mt-1 text-slate-400">
              Callsign: {callsign}
              {role === "pilot" && ` · Aircraft: ${aircraft}`}
              {` · Airport: ${airportIcao}`}
              {` · Room: ${roomCode}`}
            </p>
          </div>

          <button
            onClick={resetRole}
            className="rounded-lg bg-slate-800 px-4 py-2 hover:bg-slate-700"
          >
            Leave Simulation
          </button>
        </div>

        <RoomConnection
          roomCode={roomCode}
          callsign={callsign}
        />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <AirportMap />
          <CommunicationPanel callsign={callsign} />
        </div>
      </div>
    </main>
  );
}