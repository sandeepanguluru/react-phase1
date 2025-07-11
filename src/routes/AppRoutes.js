import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../pages/todo/Todo";
import BaseForm from "../pages/forms/BaseForm";
import ComplexForm from "../pages/forms/ComplexForm";
import FormikForm from "../pages/forms/FormikForm";
import RegisterForm from "../pages/registerForm/registerForm";
import StudentDashboard from "../pages/dashboard/StudentDashboard";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/baseform" element={<BaseForm />} />
        <Route path="/complexform" element={<ComplexForm />} />
        <Route path="/formikForm" element={<FormikForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/edit" element={<RegisterForm />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
