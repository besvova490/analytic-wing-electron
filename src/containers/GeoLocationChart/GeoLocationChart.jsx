import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// components
import InfoCard from "../../components/InfoCard";


const GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function GeoLocationChart() {

  return (
    <InfoCard title="Users Locations">
      <ComposableMap projection="geoMercator">
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="#EAEAEC"
            />
          ))}
        </Geographies>
      </ComposableMap>
    </InfoCard>
  );
}

export default GeoLocationChart;
