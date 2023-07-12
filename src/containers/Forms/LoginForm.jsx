import React from "react";
import { notification } from "antd";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// elements
import Input from "../../elements/Input";
import Button from "../../elements/Button";

// helpers
import auth from "../../api/auth";

// assets
import "../../assets/styles/containers/auth-form.scss";


const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

function LoginForm() {
  const { watch, setValue, setError, handleSubmit, formState: { errors } } = useForm({
    initialValues: { email: "", password: "" },
    resolver: yupResolver(validationSchema),
  });

  const { email, password } = watch();

  const onSubmit = (data) => {
    auth.login(data)
      .then(() => window.location.href = "/")
      .catch(e => {
        if (e.data.details) {
          notification.error({
            message: "Error",
            description: e.data.details,
            placement: "bottomLeft",
          });
        } else if (e.data.password) {
          setError("password", { type: "custom", message: e.data.password });
        }
      });
  };

  return (
    <div className="anwg-auth-form">
      <h1 className="anwg-auth-form__title">
        Sign In to your Account
      </h1>
      <form className="anwg-auth-form__form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="email"
          name="email"
          value={email}
          error={errors.email?.message}
          onChange={(e) => setValue("email", e.target.value)}
        />
        <Input.Password
          placeholder="password"
          name="password"
          value={password}
          error={errors.password?.message}
          onChange={(e) => setValue("password", e.target.value)}
        />
        <Button htmlType="submit">Sign In</Button>
      </form>
      <div className="anwg-auth-form__footer">
        <span className="anwg-auth-form__footer-divider">Or sign in with</span>
        <Button type="default">Web App</Button>
      </div>
      <p className="anwg-auth-form__info">
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );
}

LoginForm.propTypes = {};

export default LoginForm;
