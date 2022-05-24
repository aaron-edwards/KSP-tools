const bodies: Body[] = [
  {
    name: "Kerbin",
    color: "#3f6f28",
    radius: 600_000,
    soi: 84_159_286,
    satellites: [
      {
        name: "Mun",
        color: "#7f7f7f",
        radius: 200_000,
        soi: 2_429_559.1,
        satellites: [],
      },
      {
        name: "Minmus",
        color: "#99d9ea",
        radius: 60_000,
        soi: 2_247_428.4,
        satellites: [],
      },
    ],
  },
];

export default bodies;

export type Body = {
  name: string;
  color: string;
  radius: number;
  soi: number;
  satellites: Body[];
};
