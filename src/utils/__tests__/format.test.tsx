import { formatDistance, formatTime } from "../format";

describe("format", () => {
  describe("time", () => {
    it.each`
      label  | seconds
      ${"s"} | ${1}
      ${"m"} | ${60}
      ${"h"} | ${60 * 60}
      ${"d"} | ${6 * 60 * 60}
    `("should format 1 $label ($seconds seconds)", ({ label, seconds }) => {
      expect(formatTime(seconds)).toEqual(`1${label}`);
    });

    it("should format multiple time parts", () => {
      expect(formatTime(3600 + 3)).toEqual("1h 3s");
    });

    it("should round seconds to 1 decimal place", () => {
      expect(formatTime(3.14)).toEqual("3.1s");
    });
  });

  describe("distance", () => {
    it("should format meters for values < 1000", () => {
      expect(formatDistance(999.45)).toEqual("999 m");
    });
    it("should format km for values > 1000", () => {
      expect(formatDistance(12_345.6)).toEqual("12.346 km");
    });
  });
});
