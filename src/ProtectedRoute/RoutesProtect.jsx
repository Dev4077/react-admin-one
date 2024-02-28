import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';



export const NonAuthRoute = () => {
  const isLogged = localStorage.getItem("token");

  return (
    <>
      {!isLogged ? <Outlet /> : <Navigate to={"/"} />}
    </>
  );
};

export const AuthRoute = () => {
  const isLogged = localStorage.getItem("token");
  // const isLogged = true;
  return (
    <>
      {isLogged ? <Outlet /> : <Navigate to={"/login"} />}
    </>
  );
};
