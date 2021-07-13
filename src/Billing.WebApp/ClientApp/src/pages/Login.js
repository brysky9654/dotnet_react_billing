import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginForm from "../components/Auth/LoginForm";

const Login = () => {
  const auth = useSelector(state => state.entities.auth.token);

  return auth ? (
    <Redirect to="/" />
  ) : (
    <LoginForm />
  );
};

export default Login;