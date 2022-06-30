/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo, useState } from "react";

import {
  Autocomplete,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import rawBodies, { Body as RawBody } from "../../data/bodies";
import { formatDistance, formatTime } from "../../utils/format";

type Body = Omit<RawBody, "satellites"> & { parents: string[] };

function flattenBodies(
  { satellites, ...body }: RawBody,
  parents: string[]
): Body[] {
  return [
    { ...body, parents },
    ...satellites.flatMap((b) => flattenBodies(b, [...parents, body.name])),
  ];
}

function geosyncronus(body: Body, factor: number) {
  return Math.cbrt(
    (6.67384e-11 * body.mass * (body.rotationPeriod / factor) ** 2) /
      (4 * Math.PI ** 2)
  );
}

export default function GeosyncPage() {
  const bodies = useMemo(
    () => rawBodies.flatMap((b) => flattenBodies(b, [])),
    []
  );

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

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2 }}>
          <Stack spacing={2}>
            <Autocomplete
              disablePortal
              value={body}
              options={bodies}
              onChange={(_, value) => setBody(value)}
              getOptionLabel={(option) => option.name}
              groupBy={(o) => o.parents.join(".")}
              isOptionEqualToValue={(a, b) => a.name === b.name}
              renderGroup={({ children }) => children}
              renderOption={(props, option) => (
                <Typography
                  {...props}
                  style={{ paddingLeft: 8 + 8 * option.parents.length }}
                >
                  {option.name}
                </Typography>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Celestial body" />
              )}
            />
            <TextField
              label="Rotation Period"
              variant="standard"
              fullWidth
              value={body ? formatTime(body.rotationPeriod) : "N/A"}
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Factor"
              type="number"
              variant="standard"
              value={factor}
              onChange={(e) => setFactor(parseInt(e.target.value, 10))}
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Semi-Major Axis"
              variant="standard"
              fullWidth
              value={formatDistance(semiMajor)}
              InputProps={{ readOnly: true }}
            />

            <TextField
              label="Altitude"
              variant="standard"
              fullWidth
              value={formatDistance(semiMajor - (body?.radius ?? 0))}
              InputProps={{ readOnly: true }}
              error={!!error}
              helperText={error}
            />
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
}
