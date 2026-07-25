export type PhraseologyItem = {
  id: string;
  name: string;
  controllerTemplate: string;
  pilotReadbackTemplate: string;
};

export const phraseology: PhraseologyItem[] = [
  {
    id: "taxi",
    name: "Taxi Instruction",
    controllerTemplate:
      "{callsign}, taxi to Runway {runway} via {taxiway}.",
    pilotReadbackTemplate:
      "Taxi to Runway {runway} via {taxiway}, {callsign}.",
  },
  {
    id: "hold-short",
    name: "Hold Short",
    controllerTemplate:
      "{callsign}, hold short of Runway {runway}.",
    pilotReadbackTemplate:
      "Hold short of Runway {runway}, {callsign}.",
  },
  {
    id: "line-up-wait",
    name: "Line Up and Wait",
    controllerTemplate:
      "{callsign}, Runway {runway}, line up and wait.",
    pilotReadbackTemplate:
      "Runway {runway}, line up and wait, {callsign}.",
  },
  {
    id: "takeoff",
    name: "Takeoff Clearance",
    controllerTemplate:
      "{callsign}, Runway {runway}, cleared for takeoff.",
    pilotReadbackTemplate:
      "Cleared for takeoff, Runway {runway}, {callsign}.",
  },
  {
    id: "landing",
    name: "Landing Clearance",
    controllerTemplate:
      "{callsign}, Runway {runway}, cleared to land.",
    pilotReadbackTemplate:
      "Cleared to land, Runway {runway}, {callsign}.",
  },
];