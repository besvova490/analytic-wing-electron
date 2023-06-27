import React from "react";

// components
import OverviewSimpleCard from "../../components/OverviewSimpleCard";

// containers
import YearChartBlock from "../../containers/YearChartBlock";
import WeeklyChartBlock from "../../containers/WeeklyChartBlock";
import GeoLocationChart from "../../containers/GeoLocationChart";

// assets
import "../../assets/styles/pages/home-page.scss";


function HomePage() {

  return (
    <div className="anwg-home-page">
      <div className="anwg-home-page__short-overview">
        <OverviewSimpleCard
          label="Views"
          value={ 1407 }
          percentage={ 12.4 }
        />
        <OverviewSimpleCard
          label="Clicks"
          value={ 1407 }
          percentage={ -12.4 }
        />
        <OverviewSimpleCard
          label="Desktop"
          value={ 1407 }
          percentage={ 12.4 }
        />
        <OverviewSimpleCard
          label="Mobile"
          value={ 1407 }
          percentage={ -12.4 }
        />
      </div>
      <div className="anwg-home-page__charts-grid">
        <YearChartBlock/>
        <WeeklyChartBlock/>
        <GeoLocationChart/>
      </div>
    </div>
  );
}

export default HomePage;
