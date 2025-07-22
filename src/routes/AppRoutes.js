import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Todo from "../pages/todo/Todo";
import BaseForm from "../pages/forms/BaseForm";
import ComplexForm from "../pages/forms/ComplexForm";
import FormikForm from "../pages/forms/FormikForm";
import RegisterForm from "../pages/registerForm/registerForm";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
import ProtecetedRoute from "./ProtecetedRoute";
import Login from "../pages/login/Login";
import { useAuth } from "../context/AuthContext";
const AppRoutes = () => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/baseform" element={<BaseForm />} />
        <Route path="/complexform" element={<ComplexForm />} />
        <Route path="/formikForm" element={<FormikForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/edit" element={<RegisterForm />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/studentdashboard"
          element={
            isLoggedIn ? <StudentDashboard /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </>
  );
};

export default AppRoutes;
