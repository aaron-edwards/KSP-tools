export const toTimeParts = (seconds: number) => {
  const { result, time } = [
    { label: "d", factor: 1 },
    { label: "h", factor: 6 },
    { label: "m", factor: 60 },
    { label: "s", factor: 60 },
  ].reduce(
    (acc, { label, factor }) => {
      const value = Math.floor(acc.time * factor);
      return {
        result: [...acc.result, { label, value }],
        time: acc.time * factor - value,
      };
    },
    {
      result: [] as { value: number; label: string }[],
      time: seconds / (60 * 60 * 6),
    }
  );

  return result.map((r) => {
    if (r.label === "s") {
      return { ...r, value: Math.floor((r.value + time) * 10) / 10 };
    }
    return r;
  });
};

export const formatTime = (seconds: number) =>
  toTimeParts(seconds)
    .filter((r) => r.value > 0)
    .map((r) => `${r.value}${r.label}`)
    .join(" ");

export const formatDistance = (meters: number) =>
  meters > 1000 ? `${Math.round(meters) / 1000} km` : `${Math.round(meters)} m`;
