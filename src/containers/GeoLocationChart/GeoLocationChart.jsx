import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";
import PropTypes from "prop-types";
import get from "lodash/get";
import lookup from "country-code-lookup";

// components
import InfoCard from "../../components/InfoCard";


const GEO_URL = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const getFillColor = (value) => {
  switch (true) {
    case value > 10:
      return "#e6f4ff";
    case value > 50:
      return "#91caff";
    case value > 100:
      return "#69b1ff";
    case value > 250:
      return "#1677ff";
    case value > 500:
      return "#003eb3";
    case value > 750:
      return "#002c8c";
    case value > 1000:
      return "#001a66";
    default:
      return "#EAEAEC";
  }
};

function GeoLocationChart({ data }) {

  return (
    <InfoCard title="Users Locations">
      <ComposableMap projection="geoMercator">
        <Geographies geography={GEO_URL}>
          {({ geographies }) => geographies.map((geo) => {
            const countryCode = lookup.byCountry(geo.properties.name)?.internet;
            const visitsPreCountry = get(data, countryCode, 0);

            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getFillColor(visitsPreCountry)}
              />
            );
          })}
        </Geographies>
      </ComposableMap>
    </InfoCard>
  );
}

GeoLocationChart.propTypes = { data: PropTypes.array };

export default GeoLocationChart;
