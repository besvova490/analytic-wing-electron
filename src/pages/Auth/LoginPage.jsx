import React, { useEffect } from "react";

// assets
import LoginForm from "../../containers/Forms/LoginForm";


function LoginPage() {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return <LoginForm/>;
}

export default LoginPage;
