import { createContext, useContext } from "react";

// helpers
import useUser from "../swr/useUser";

export const CurrencyContext = createContext({
  user: null,
  isAuthorized: !!localStorage.getItem("accessToken"),
  mutate: () => null,
});

export const useUserContext = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw Error("useUser should be used within a CurrencyContext");
  }

  return context;
};


export function withUserContext(Component) {
  return function WrapperComponent(props) {
    const { data, isLoading, mutate } = useUser(!!localStorage.getItem("accessToken"));

    return (
      <CurrencyContext.Provider
        value={{
          user: data,
          isAuthenticated: localStorage.getItem("accessToken") || (!isLoading && !!data),
          mutate,
        }}
      >
        <Component {...props} />
      </CurrencyContext.Provider>
    );
  };
}
