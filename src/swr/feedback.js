import useSWR from "swr";

// helpers
import pathToUrl from "./pathToUrl";
import { webApp } from "../api/routes.constants";
import objectToQueryString from "../helpers/objectToQueryString";


export function useFeedbacks(webAppId, params = {}, config = {}) {
  const query = objectToQueryString(params);

  const fetchKey = webAppId ? [pathToUrl(webApp.webAppFeedbacks, { id: webAppId }), query].join("?") : null;

  const data = useSWR(fetchKey, config);

  return data;
}
