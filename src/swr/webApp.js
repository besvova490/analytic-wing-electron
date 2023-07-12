import useSWR from "swr";
import useSWRMutation from "swr/mutation";

// helpers
import axios from "../api/axios";
import { webApp } from "../api/routes.constants";


export function useGetWebApps() {
  const data = useSWR(webApp.base);

  return data;
}

export function useGetSingleWebApp(id) {
  const data = useSWR(id ? `${webApp.base}/${id}` : null);

  return data;
}

export function useGetShortWebApps() {
  const data = useSWR(webApp.shortWebApp);

  return data;
}

export function usePostWebApp() {
  const data = useSWRMutation(webApp.base, async (url, { arg }) => {
    const resp = await axios({ url, method: "POST", data: arg });

    return resp;
  });

  return data;
}

export function useDeleteWebApp() {
  const data = useSWRMutation(webApp.base, async (url, { arg }) => {
    const resp = await axios({ url: `${url}/${arg}`, method: "DELETE" });

    return resp;
  });

  return data;
}
