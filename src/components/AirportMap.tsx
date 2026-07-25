"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("./LeafletMap"), {
  ssr: false,
});

export default function AirportMap() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
      <LeafletMap />
    </div>
  );
}