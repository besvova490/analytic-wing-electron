import React from "react";
import { notification } from "antd";
import { Link, useNavigate } from "react-router-dom";
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
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirmation: yup.string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
});

function SignUpForm() {
  const navigate = useNavigate();

  const { watch, setValue, handleSubmit, formState: { errors }, setError } = useForm({
    initialValues: { email: "", password: "", firstName: "", lastName: "", passwordConfirmation: "" },
    resolver: yupResolver(validationSchema),
  });

  const { email, password, firstName, lastName, passwordConfirmation } = watch();

  const onSubmit = (data) => {
    auth.register(data)
      .then(() => navigate("/sign-in"))
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
          placeholder="First Name"
          name="firstName"
          value={firstName}
          error={errors.firstName?.message}
          onChange={(e) => setValue("firstName", e.target.value)}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          value={lastName}
          error={errors.lastName?.message}
          onChange={(e) => setValue("lastName", e.target.value)}
        />
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
        <Input.Password
          placeholder="passwordConfirmation"
          name="passwordConfirmation"
          value={passwordConfirmation}
          error={errors.passwordConfirmation?.message}
          onChange={(e) => setValue("passwordConfirmation", e.target.value)}
        />
        <Button htmlType="submit">Sign Up</Button>
      </form>
      <div className="anwg-auth-form__footer">
        <span className="anwg-auth-form__footer-divider">Or sign up with</span>
        <Button type="default">Web App</Button>
      </div>
      <p className="anwg-auth-form__info">
        Already have an account? <Link to="/sign-in">Sign In</Link>
      </p>
    </div>
  );
}

SignUpForm.propTypes = {};

export default SignUpForm;
