export type Orbit = {
  orbits: string;
  semiMajorAxis: number;
};

export type Body = {
  name: string;
  radius: number;
  mass: number;
  mu: number;
  soi: number;
  rotationPeriod: number;
  atm?: number;
  color: string;
  orbit?: Orbit;
};

export const bodies: Record<string, Body> = {
  Kerbol: {
    name: "Kerbol",
    radius: 261_600_000,
    mass: 1.7565459e28,
    mu: 1.1723328e18,
    soi: Number.MAX_SAFE_INTEGER,
    rotationPeriod: 432_000,
    color: "#FFFF00",
  },
  Kerbin: {
    name: "Kerbin",
    radius: 600_000,
    mass: 5.2915158e22,
    mu: 3.5316e12,
    soi: 84_159_286,
    rotationPeriod: 21_549.425,
    atm: 70_000,
    color: "#8ACAC2",
    orbit: {
      orbits: "Kerbol",
      semiMajorAxis: 13_599_840_256,
    },
  },
  Mun: {
    name: "Mun",
    radius: 200_000,
    mass: 9.7599066e20,
    mu: 6.5138398e10,
    soi: 2_429_559.1,
    rotationPeriod: 138_984.38,
    color: "#6B6A76",
    orbit: {
      orbits: "Kerbin",
      semiMajorAxis: 12_000_000,
    },
  },
  Minmus: {
    name: "Minmus",
    radius: 60_000,
    mass: 2.645758e19,
    mu: 1.7658e9,
    soi: 2_247_428.4,
    rotationPeriod: 40_400.0,
    color: "#5B4C68",
    orbit: {
      orbits: "Kerbin",
      semiMajorAxis: 47_000_000,
    },
  },
};

type System = {
  body: Body;
  satelites: System[];
};

function makeSystem(body: Body, allBodies: Body[]): System {
  return {
    body,
    satelites: allBodies
      .filter((b) => b.orbit?.orbits === body.name)
      .map((b) => makeSystem(b, allBodies)),
  };
}

export const kerbolSystem = makeSystem(bodies.Kerbol, Object.values(bodies));
