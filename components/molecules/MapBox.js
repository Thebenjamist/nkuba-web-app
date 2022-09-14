import { Place } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import * as React from "react";
import Map, { LngLatBounds, Marker } from "react-map-gl";
import Pin from "../atoms/Pin";

const MapBox = ({ lat, lng, setCoords }) => {
  const [pin, setPin] = React.useState();
  const [mapCenter, setMapCenter] = React.useState();

  const handlePinDrag = (e) => {
    setPin({ longitude: e.lngLat.lng, latitude: e.lngLat.lat });
  };

  const handleCenterChange = (e) => {
    setMapCenter({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
    });
    setCoords({ lng: e.lngLat.lng, lat: e.lngLat.lat });
  };

  const handleMapClick = (e) => {
    handleCenterChange(e);
    handlePinDrag(e);
  };

  React.useEffect(() => {
    if (lat && lng) {
      handlePinDrag({ lngLat: { lat, lng } });
      handleCenterChange({ lngLat: { lat, lng } });
    }
  }, [lat, lng]);
  return (
    <Paper sx={{ width: "100%" }}>
      {pin && (
        <Map
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 12,
          }}
          {...mapCenter}
          minZoom={12}
          maxZoom={16}
          onDrag={() => setMapCenter()}
          onClick={handleMapClick}
          style={{ width: "100%", height: 400 }}
          mapStyle={process.env.NEXT_PUBLIC_MAPBOX_STYLE}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_KEY}
        >
          <Marker
            {...pin}
            draggable={true}
            anchor="bottom"
            onDrag={handlePinDrag}
            onDragEnd={handleCenterChange}
          >
            <Place fontSize="large" color="primary" />
          </Marker>
        </Map>
      )}
    </Paper>
  );
};

export default MapBox;
