import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { loginSchema } from "../Schema/AuthYup";



const initialValues = {
  email: "",
  password: "",
  alertForWrong: "",
  rememberMe: false,
};



const Login = () => {
  const navigate = useNavigate();

  

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const loggedUser = JSON.parse(localStorage.getItem("AdminData"));
      // console.log(loggedUser);

      // check email and password for login
      const user = loggedUser.find(
        (user) =>
          user.email === values.email && user.password === values.password
      );
      //user.

      if (user) {
        const logedUserData = loggedUser.find((x) => x.email === values.email);
        const loggedIn = {
          isLoggedIn: true,
          adminName: logedUserData.adminName,
          email: logedUserData.email,
        };
        // console.log(loggedIn);
            if((values.email).endsWith("@superadmin.com"))
          {
            localStorage.setItem("loggedIn", JSON.stringify(loggedIn));
           navigate("/");}
           else{
            alert("Not an admin")
           }
      } else {
        // alert('Wrong Email or Password !')
        values.alertForWrong = "Wrong Email or Password!";
      }

    },
  });

  return (
    <>
      <div className="loginCss">
        <div class="wrapper">
          <h2>Login</h2>
          {values.alertForWrong && (
            <p className="alertForWrong">{values.alertForWrong}</p>
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
            {errors.email && touched.email ? <p>{errors.email}</p> : null}
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
              <p>{errors.password}</p>
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
