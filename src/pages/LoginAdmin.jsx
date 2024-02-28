import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { loginSchema } from "../Schema/AuthYup";
import { Box, useTheme,Typography } from "@mui/material";
import { tokens } from "../theme";
import axios from "axios";


const initialValues = {
  email: "",
  password: "",
  alertForWrong: "",
  rememberMe: false,
};

const Login = () => {
  const navigate = useNavigate();

  // if (user) {
  //   const logedUserData = loggedUser.find((x) => x.email === values.email);
  //   const loggedIn = {
  //     isLoggedIn: true,
  //     adminName: logedUserData.adminName,
  //     email: logedUserData.email,
  //   };

  // localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
  //          navigate("/");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) =>  {
      try {
        
        const response = await axios.post("http://localhost:3003/api/authlogin", values);
        resetForm();
        localStorage.setItem("token", JSON.stringify(response.data.token));
        navigate('/')
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      
    },
  });

  return (
    <>
      <div className="loginCss">
        <div class="wrapper">
          <h2>Login</h2>
          {values.alertForWrong && (
            <p className="red">{values.alertForWrong}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div class="input-box">
              <input
                type="text"
                placeholder="Enter your email*"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && touched.email ? <p className="red">{errors.email}</p> : null}
            <div class="input-box">
              <input
                type="password"
                placeholder="password*"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password ? (
              <p className="red">{errors.password}</p>
            ) : null}
            <div class="input-box button">
              <input type="Submit"></input>
            </div>
            <div class="text">
              <h3>
                Don't have an account? <a href="/register">Register Now</a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
