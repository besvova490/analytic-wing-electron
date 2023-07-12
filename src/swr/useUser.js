import useSWR from "swr";

// helpers
import { auth } from "../api/routes.constants";


export default function useUser(enabled = true) {
  const data = useSWR(enabled ? auth.profile : null, { shouldRetryOnError: false });

  return data;
}
