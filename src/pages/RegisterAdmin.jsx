import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import './Register.css';
import { registerSchema } from "../Schema/AuthYup";
import axios from "axios";


const initialValues = {
  adminName: "",
  email: "",
  password: "",
  confirm_password: "",
  alertForEmail: "",
};


const Register = () => {
  const navigate = useNavigate();

  

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: registerSchema,
    onSubmit: async (values, { resetForm }) =>  {
      try {
        const response = await axios.post("http://localhost:3003/api/authRegistration", values);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
      }
      navigate("/login");
    },
      // let existingData = JSON.parse(localStorage.getItem("AdminData")) || [];

      // const emailExists = existingData.some(
      //   (user) => user.email === values.email
      // );
      // if (emailExists) {
      //   values.alertForEmail =
      //     "Email already exists. Please choose a different email.";
      //   return;
      // }
      // const Payload = {
      //   adminName: values.adminName,
      //   email: values.email,
      //   password: values.password,
      // };
      // console.log(existingData);
      // existingData.push(Payload);
      
      // localStorage.setItem("AdminData", JSON.stringify(existingData));
  
  });


  //
  return (
    <>
      <div className="RegCss">
        <div class="wrapper">
          <h2>Registration</h2>
          {values.alertForEmail && (
            <p className="alertForWrong">{values.alertForEmail}</p>
          )}

          <form action="#" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Enter your Name*"
                name="adminName"
                value={values.adminName}
                onChange={handleChange}
              />
            </div>
            {errors.adminName && touched.adminName ? (
              <p className="red">{errors.adminName}</p>
            ) : null}
            <div className="input-box">
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
                placeholder="Create password*"
                name="password"
                value={values.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && touched.password ? (
              <p className="red">{errors.password}</p>
            ) : null}
            <div className="input-box">
              <input
                type="password"
                placeholder="Confirm password*"
                name="confirm_password"
                value={values.confirm_password}
                onChange={handleChange}
              />
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <p className="red">{errors.confirm_password}</p>
            ) : null}
            <div className="input-box button">
              <input type="Submit"></input>
            </div>
            <div className="text">
              <h3>
                Already have an account? <a href="/login">Login now</a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
