/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState, useCallback } from "react";

import {
  Autocomplete,
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { bodies as rawBodies, Body as RawBody } from "../../data/bodies";
import { formatDistance, formatTime } from "../../utils/format";

type Body = RawBody & {
  parents?: string[];
};

const getParents = (
  body: RawBody,
  allBodies: Record<string, RawBody>
): string[] => {
  const parentName = body?.orbit?.orbits;
  if (!parentName) return [];
  const parent = allBodies[parentName];
  if (!parent) return [];
  return [...getParents(parent, allBodies), parentName];
};

const bodies = Object.values(rawBodies).map((body) => ({
  ...body,
  parents: getParents(body, rawBodies),
}));

function geosyncronus(body: Body, factor: number) {
  return Math.cbrt(
    (6.67384e-11 * body.mass * (body.rotationPeriod / factor) ** 2) /
      (4 * Math.PI ** 2)
  );
}

export default function GeosyncPage() {
  const [body, setBody] = useState(
    bodies.find((b) => b.name === "Kerbin") ?? null
  );
  const [factor, setFactor] = useState(1);
  const semiMajor = useMemo(
    () => (body ? geosyncronus(body, factor) : 0),
    [body, factor]
  );

  const error = useMemo(() => {
    if (!body) return null;
    if (semiMajor > body?.soi) return "Above body SOI";
    if (semiMajor < body.radius) return "Below body radius";
    if (body.atm && semiMajor < body.radius + body.atm)
      return "Below atmosphare hight";
    return null;
  }, [body, semiMajor]);

  const scale = useCallback(
    (value: number) => {
      const s = body ? Math.max(semiMajor, body.radius * 2) * 2 * 1.05 : 100;
      return (800 * value) / s;
    },
    [body, semiMajor]
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Autocomplete
              disablePortal
              value={body}
              options={Object.values(bodies)}
              onChange={(_, value) => setBody(value)}
              getOptionLabel={(option) => option.name}
              groupBy={(o) => o.parents.join(".")}
              isOptionEqualToValue={(a, b) => a.name === b.name}
              renderGroup={({ children }) => children}
              renderOption={(props, option) => (
                <Typography
                  {...props}
                  style={{ paddingLeft: 8 + 8 * (option.parents?.length ?? 0) }}
                >
                  {option.name}
                </Typography>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Celestial body" />
              )}
            />

            <TextField
              label="Factor"
              type="number"
              variant="standard"
              value={factor}
              onChange={(e) => setFactor(parseFloat(e.target.value))}
              InputLabelProps={{ shrink: true }}
            />

            <Box
              component="dl"
              gap={2}
              sx={{
                display: "grid",
                gridTemplateColumns: "max-content 1fr",
              }}
            >
              <Typography
                component="dt"
                variant="body1"
                fontWeight="bold"
                textAlign="right"
              >
                Siderial Orbit Period
              </Typography>
              <Typography component="dd" variant="body1">
                <Stack>
                  {body ? formatTime(body.rotationPeriod) : "N/A"}
                  <Typography variant="body2" color="gray">
                    {body ? body.rotationPeriod : "N/A"} s
                  </Typography>
                </Stack>
              </Typography>

              <Typography
                component="dt"
                variant="body1"
                fontWeight="bold"
                textAlign="right"
              >
                Semi-Major Axis
              </Typography>
              <Typography component="dd" variant="body1">
                {formatDistance(semiMajor)}
              </Typography>

              <Typography
                component="dt"
                variant="body1"
                fontWeight="bold"
                textAlign="right"
              >
                Altitude
              </Typography>
              <Typography component="dd" variant="body1">
                {formatDistance(semiMajor - (body?.radius ?? 0))}
              </Typography>

              <Typography
                component="dt"
                variant="body1"
                fontWeight="bold"
                textAlign="right"
              >
                Siderial Orbit Period
              </Typography>
              <Typography component="dd" variant="body1">
                <Stack>
                  {body
                    ? formatTime(
                        2 *
                          Math.PI *
                          Math.sqrt(semiMajor ** 3 / (6.67408e-11 * body.mass))
                      )
                    : "N/A"}
                  <Typography variant="body2" color="gray">
                    {body
                      ? `${Math.round(
                          2 *
                            Math.PI *
                            Math.sqrt(
                              semiMajor ** 3 / (6.67408e-11 * body.mass)
                            )
                        )} s`
                      : "N/A"}
                  </Typography>
                </Stack>
              </Typography>
            </Box>

            <Typography color="red">{error}</Typography>
          </Stack>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Card>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-400 -400 800 800"
            strokeWidth="1"
            textAnchor="middle"
            fontFamily="Arial"
            fontSize="14"
          >
            {body && (
              <>
                {/* SOI */}
                <circle
                  cx="0"
                  cy="0"
                  r={scale(body.soi)}
                  fill="yellow"
                  fillOpacity={0.02}
                  stroke="orange"
                />

                {/* Body */}
                <circle
                  cx="0"
                  cy="0"
                  r={scale(body.radius)}
                  fill={body.color}
                  stroke="none"
                />

                {body.atm && (
                  <circle
                    cx="0"
                    cy="0"
                    r={scale(body.radius + body.atm)}
                    fill={body.color}
                    fillOpacity={0.25}
                  />
                )}

                {/* Orbit */}
                <circle
                  cx="0"
                  cy="0"
                  r={scale(semiMajor)}
                  fill="none"
                  stroke="black"
                />

                {/* Body Name */}
                <text
                  x="0"
                  y={-(10 + scale(body.radius + (body.atm ?? 0)))}
                  dy="0.4em"
                  fill="black"
                  fontSize="18"
                  fontWeight="bold"
                >
                  {body.name}
                </text>
              </>
            )}
          </svg>
        </Card>
      </Grid>
    </Grid>
  );
}
