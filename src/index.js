import React from "react";
import ReactDOM from "react-dom/client";
import { SWRConfig } from "swr";

// components
import App from "./pages/App";

// helpers
import { swrFetcher } from "./api/axios";

// assets
import "./assets/styles/index.scss";


const SWR_CONFIG = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
  fetcher: swrFetcher
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <SWRConfig value={SWR_CONFIG}>
    <App />
  </SWRConfig>
);
