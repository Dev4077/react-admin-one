import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';



export const NonAuthRoute = () => {
  const isLogged = JSON.parse(localStorage.getItem("loggedIn"));

  return (
    <>
      {!isLogged ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
};

export const AuthRoute = () => {
  const isLogged = JSON.parse(localStorage.getItem("loggedIn"));
  return (
    <>
      {isLogged ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
};
