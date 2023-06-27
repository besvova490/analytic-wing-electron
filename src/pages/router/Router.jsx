import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// layouts
import MainLayout from "../../layout/MainLayout";
import AuthLayout from "../../layout/AuthLayout";

// pages
const HomePage = React.lazy(() => import("../HomePage"));
const AnalyticsPage = React.lazy(() => import("../AnalyticsPage"));
const SettingsPage = React.lazy(() => import("../SettingsPage"));
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

  return (
    <React.Suspense fallback="...">
      <Routes>
        <Route element={<PrivateRoute/>}>
          <Route path="/" element={renderWithLayout(HomePage)}/>
          <Route path="/analytics" element={renderWithLayout(AnalyticsPage)}/>
          <Route path="/settings" element={renderWithLayout(SettingsPage)}/>
        </Route>
        <Route path="/sign-in" element={renderWithLayout(LoginPage, AuthLayout)}/>
        <Route path="/sign-up" element={renderWithLayout(SignUpPage, AuthLayout)}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </React.Suspense>
  );
}

export default Router;
