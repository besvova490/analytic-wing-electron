import useSWR from "swr";

// helpers
import { events } from "../api/routes.constants";
import objectToQueryString from "../helpers/objectToQueryString";


export function useGetWebAppEvents(webAppId, params = {}, config = {}) {
  const query = objectToQueryString(params);

  const data = useSWR(webAppId ? `${events.base}/${webAppId}?${query}` : null, config);

  return data;
}
