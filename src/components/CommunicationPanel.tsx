"use client";

import { useState } from "react";
import { phraseology } from "@/data/phraseology";

type Props = {
  callsign: string;
};

export default function CommunicationPanel({ callsign }: Props) {
  const [phraseId, setPhraseId] = useState("taxi");
  const [runway, setRunway] = useState("24R");
  const [taxiway, setTaxiway] = useState("Alpha");
  const [messages, setMessages] = useState<string[]>([]);

  const selectedPhrase =
    phraseology.find((item) => item.id === phraseId) ?? phraseology[0];

  const message = selectedPhrase.controllerTemplate
    .replace("{callsign}", callsign)
    .replace("{runway}", runway)
    .replace("{taxiway}", taxiway);

  function sendInstruction() {
    setMessages((previous) => [...previous, message]);
  }

  return (
    <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
      <h2 className="text-xl font-bold text-white">
        ATC Communication
      </h2>

      <label className="mt-5 block text-sm text-slate-300">
        Instruction
      </label>

      <select
        value={phraseId}
        onChange={(event) => setPhraseId(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-3 text-white"
      >
        {phraseology.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <label className="mt-5 block text-sm text-slate-300">
        Runway
      </label>

      <select
        value={runway}
        onChange={(event) => setRunway(event.target.value)}
        className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-3 text-white"
      >
        <option value="24R">24R</option>
        <option value="24L">24L</option>
        <option value="23">23</option>
        <option value="06L">06L</option>
        <option value="06R">06R</option>
        <option value="05">05</option>
      </select>

      {phraseId === "taxi" && (
        <>
          <label className="mt-5 block text-sm text-slate-300">
            Taxiway
          </label>

          <select
            value={taxiway}
            onChange={(event) => setTaxiway(event.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-3 text-white"
          >
            <option value="Alpha">Alpha</option>
            <option value="Bravo">Bravo</option>
            <option value="Charlie">Charlie</option>
            <option value="Delta">Delta</option>
          </select>
        </>
      )}

      <div className="mt-5 rounded-lg bg-slate-800 p-4">
        <p className="text-xs uppercase text-slate-400">
          Message Preview
        </p>

        <p className="mt-2 text-white">
          {message}
        </p>
      </div>

      <button
        onClick={sendInstruction}
        className="mt-4 w-full rounded-lg bg-sky-600 px-4 py-3 font-bold text-white transition hover:bg-sky-500"
      >
        Send Instruction
      </button>

      <div className="mt-5 rounded-lg border border-slate-700 bg-slate-950 p-4">
        <p className="text-xs uppercase text-slate-400">
          Communication Log
        </p>

        <div className="mt-3 space-y-3">
          {messages.length === 0 ? (
            <p className="text-sm text-slate-500">
              No messages sent.
            </p>
          ) : (
            messages.map((sentMessage, index) => (
              <div
                key={index}
                className="rounded-lg bg-slate-800 p-3 text-sm text-white"
              >
                <span className="font-bold text-sky-400">
                  ATC:
                </span>{" "}
                {sentMessage}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}