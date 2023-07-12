import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// layouts
import MainLayout from "../../layout/MainLayout";
import AuthLayout from "../../layout/AuthLayout";

// pages
const HomePage = React.lazy(() => import("../HomePage"));
const FeedbackPage = React.lazy(() => import("../FeedbackPage"));
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
          <Route path="/overview/:id?" element={renderWithLayout(HomePage)}/>
          <Route path="/feedback/:id?" element={renderWithLayout(FeedbackPage)}/>
          <Route path="/settings" element={renderWithLayout(SettingsPage)}/>
        </Route>
        <Route path="/sign-in" element={renderWithLayout(LoginPage, AuthLayout)}/>
        <Route path="/sign-up" element={renderWithLayout(SignUpPage, AuthLayout)}/>
        <Route path="*" element={<Navigate to="/overview"/>}/>
      </Routes>
    </React.Suspense>
  );
}

export default Router;
