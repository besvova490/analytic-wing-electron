import { createContext, useContext, useState, useEffect } from "react";

// helpers
import useUser from "../swr/useUser";
import initSocketIo from "../helpers/initSocketIo";

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
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      const data = initSocketIo();
      setSocket(data);

      data.on("NEW_EXTENSION_VERSION", () => {
        const notification = new Notification("Analytic Wing", { body: "New version of extension is available" });
        notification.onclick = () => {
          window.location.href = "/extension";
          window.electronAPI.focusMainWindow();
        };
      });

      return () => {
        data.close();
      };
    }, []);

    const { data, isLoading, mutate } = useUser(!!localStorage.getItem("accessToken"));

    return (
      <CurrencyContext.Provider
        value={{
          user: data,
          isAuthenticated: localStorage.getItem("accessToken") || (!isLoading && !!data),
          mutate,
          socket,
        }}
      >
        <Component {...props} />
      </CurrencyContext.Provider>
    );
  };
}
