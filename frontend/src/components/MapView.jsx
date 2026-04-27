import React, { useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN";

const MapView = ({ risk }) => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/dark-v10",
      center: [77.1025, 28.7041],
      zoom: 10,
    });

    if (risk === "HIGH") {
      new mapboxgl.Marker({ color: "red" })
        .setLngLat([77.1025, 28.7041])
        .addTo(map);
    }

    return () => map.remove();
  }, [risk]);

  return <div id="map" style={{ height: "400px" }} />;
};

export default MapView;