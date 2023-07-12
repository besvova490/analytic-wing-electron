import React from "react";
import { useParams } from "react-router-dom";
import { Empty, Skeleton } from "antd";
import get from "lodash/get";

// components
import OverviewSimpleCard from "../../components/OverviewSimpleCard";

// containers
import YearChartBlock from "../../containers/YearChartBlock";
import WeeklyChartBlock from "../../containers/WeeklyChartBlock";
import GeoLocationChart from "../../containers/GeoLocationChart";

// helpers
import { useGetWebAppEvents } from "../../swr/events";

// assets
import "../../assets/styles/pages/home-page.scss";


function HomePage() {
  const { id } = useParams();

  const { data, isLoading } = useGetWebAppEvents(id, { monthly: true }, { refreshInterval: (1000 * 60) });
  const {
    data: weeklyData,
    isLoading: isWeeklyLoading
  } = useGetWebAppEvents(id, { weekly: true }, { refreshInterval: (1000 * 60) });
  const {
    data: yearlyData,
    isLoading: isYearlyLoading
  } = useGetWebAppEvents(id, { yearly: true }, { refreshInterval: (1000 * 60) });

  const howLoading = isLoading || isWeeklyLoading || isYearlyLoading;

  const weeklyChartData = weeklyData?.reduce((prev, current) => {
    prev.labels.push(current.week);
    prev.data.push(current.count);

    return prev;
  }, { labels: [], data: [] }) || [];


  const yearlyChartData = yearlyData?.reduce((prev, current) => {
    prev.labels.push(current.month);
    prev.data.push(current.count);

    return prev;
  }, { labels: [], data: [] }) || [];


  if (!id) {
    return (
      <div className="anwg-home-page anwg-home-page_empty">
        <Empty description="Please select a web app from the dropdown above"/>
      </div>
    );
  }

  if (howLoading) {
    return (
      <div className="anwg-home-page anwg-home-page_loading">
        <Skeleton active/>
      </div>
    );
  }

  return (
    <div className="anwg-home-page">
      <div className="anwg-home-page__short-overview">
        <OverviewSimpleCard
          label="Views"
          value={get(data, "groupedByEvent.page_view")}
        />
        <OverviewSimpleCard
          label="Clicks"
          value={get(data, "groupedByEvent.click")}
        />
        <OverviewSimpleCard
          label="Desktop"
          value={get(data, "groupedByDevise.desktop")}
        />
        <OverviewSimpleCard
          label="Mobile"
          value={get(data, "groupedByDevise.mobile", "-")}
        />
      </div>
      <div className="anwg-home-page__charts-grid">
        <YearChartBlock
          labels={yearlyChartData.labels}
          data={yearlyChartData.data}
        />
        <WeeklyChartBlock
          labels={weeklyChartData.labels}
          data={weeklyChartData.data}
        />
        <GeoLocationChart data={data?.groupedByCountries || []}/>
      </div>
    </div>
  );
}

export default HomePage;
