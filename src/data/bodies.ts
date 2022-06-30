const bodies: Body[] = [
  {
    name: "Kerbol",
    color: "#FE9",
    radius: 261_600_000,
    atm: 0,
    soi: Number.MAX_SAFE_INTEGER,
    rotationPeriod: 432000,
    mass: 1.7565459e28,
    satellites: [
      {
        name: "Kerbin",
        color: "#3f6f28",
        radius: 600_000,
        atm: 70_000,
        soi: 84_159_286,
        rotationPeriod: 21_549.425,
        mass: 5.2915158e22,
        satellites: [
          {
            name: "Mun",
            color: "#7f7f7f",
            radius: 200_000,
            atm: 0,
            soi: 2_429_559.1,
            rotationPeriod: 138_984.38,
            mass: 9.7599066e20,
            satellites: [],
          },
          {
            name: "Minmus",
            color: "#99d9ea",
            radius: 60_000,
            atm: 0,
            soi: 2_247_428.4,
            rotationPeriod: 40_400.0,
            mass: 2.645758e19,
            satellites: [],
          },
        ],
      },
    ],
  },
];

export default bodies;

export type Body = {
  name: string;
  color: string;
  radius: number;
  atm: number;
  soi: number;
  rotationPeriod: number;
  mass: number;
  satellites: Body[];
};
