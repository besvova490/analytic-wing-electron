import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// layouts
import MainLayout from "../../layout/MainLayout";
import AuthLayout from "../../layout/AuthLayout";

// pages
// import HomePage from "../HomePage";
// import FeedbackPage from "../FeedbackPage";
// import SettingsPage from "../SettingsPage";
// import ExtensionPage from "../ExtensionPage";
// import LoginPage from "../Auth/LoginPage";
// import SignUpPage from "../Auth/SignUpPage";
const HomePage = React.lazy(() => import("../HomePage"));
const FeedbackPage = React.lazy(() => import("../FeedbackPage"));
const SettingsPage = React.lazy(() => import("../SettingsPage"));
const ExtensionPage = React.lazy(() => import("../ExtensionPage"));
const LoginPage = React.lazy(() => import("../Auth/LoginPage"));
const SignUpPage = React.lazy(() => import("../Auth/SignUpPage"));

// routes
import PrivateRoute from "./components/PrivateRoute";


const renderWithLayout = (Component, Layout = MainLayout) => (
  <Layout>
    <Component/>
  </Layout>
);

function Router() {
  const navigate = useNavigate();

  useEffect(() => {
    window.electronAPI.navigateTo((_, payload) => navigate(payload));
  }, []);

  return (
    <React.Suspense fallback="...">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/overview/:id?" element={renderWithLayout(HomePage)}/>
          <Route path="/feedback/:id?" element={renderWithLayout(FeedbackPage)}/>
          <Route path="/settings" element={renderWithLayout(SettingsPage)}/>
          <Route path="/extension" element={renderWithLayout(ExtensionPage)}/>
        </Route>
        <Route path="/sign-in" element={renderWithLayout(LoginPage, AuthLayout)}/>
        <Route path="/sign-up" element={renderWithLayout(SignUpPage, AuthLayout)}/>
        <Route path="*" element={<Navigate to="/overview"/>}/>
      </Routes>
    </React.Suspense>
  );
}

export default Router;
