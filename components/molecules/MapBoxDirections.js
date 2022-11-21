import Place from "@mui/icons-material/Place";
import { Paper, Typography } from "@mui/material";
import * as React from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import axios from "axios";
import { useSnackbar } from "notistack";

const MapBox = ({ start, end }) => {
  const [directions, setDirections] = React.useState();
  const { enqueueSnackbar } = useSnackbar();

  const getDirections = () => {
    const tripStart = `${start?.lng}, ${start?.lat}`;
    const tripEnd = `${end?.lng}, ${end?.lat}`;
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${tripStart};${tripEnd}?alternatives=false&geometries=geojson&language=en&overview=simplified&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_KEY}`
      )
      .then((res) => setDirections(res.data.routes[0]))
      .catch((err) =>
        enqueueSnackbar(`Map error: ${err}`, { variant: "error" })
      );
  };

  React.useEffect(() => {
    getDirections();
  }, []);
  const dir = directions?.geometry.coordinates;
  dir?.push([end?.lng, end?.lat]);
  dir?.unshift([start?.lng, start?.lat]);

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: dir,
        },
      },
    ],
  };

  const layerStyle = {
    id: "point",
    type: "line",
    paint: {
      "line-width": 5,
      "line-color": "#FCD332",
    },
  };
  const center = {
    latitude: (end?.lat + start?.lat) / 2,
    longitude: (start?.lng + end?.lng) / 2,
  };
  return (
    <Paper sx={{ width: "100%" }}>
      {directions && (
        <Map
          initialViewState={{
            bounds: [
              [start.lng, start.lat], // southwestern corner of the bounds
              [end.lng, end.lat], // northeastern corner of the bounds
            ],
            fitBoundsOptions: {
              padding: { left: 20, right: 20, top: 20, bottom: 20 },
              maxZoom: 6,
            },
          }}
          minZoom={12}
          maxZoom={16}
          style={{ width: "100%", height: 300 }}
          mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
          <Marker longitude={start?.lng} latitude={start?.lat} anchor="bottom">
            <Place fontSize="large" color="primary" />
          </Marker>
          <Marker longitude={end?.lng} latitude={end?.lat} anchor="bottom">
            <Place fontSize="large" color="success" />
          </Marker>
          <Marker {...center} anchor="bottom">
            <Paper
              sx={{
                padding: 2,
                margin: 1,
                backgroundColor: "primary.main",
                borderColor: "red",
                borderWidth: "20px",
              }}
              elevation={8}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Distance: {Math.round(directions?.distance / 1000)}km
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                Duration: {Math.round(directions?.duration / 60)} mins
              </Typography>
            </Paper>
          </Marker>
          <Source id="my-data" type="geojson" data={geojson}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      )}
    </Paper>
  );
};

export default MapBox;
