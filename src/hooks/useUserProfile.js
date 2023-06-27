import { useState, useEffect } from "react";

export default function useUserProfile() {
  const [isAuthenticated, setIsAuthorized] = useState(false);

  const handleStorageChange = (event) => {
    console.log("handleStorageChange");
    if (event.storageArea === localStorage) {
      if (localStorage.getItem("accessToken")) {
        setIsAuthorized(!!localStorage.getItem("accessToken"));
      }
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return { isAuthenticated };
}
