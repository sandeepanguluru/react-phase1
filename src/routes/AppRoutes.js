import React from "react";
import { Route, Routes } from "react-router-dom";
import Todo from "../pages/todo/Todo";
import BaseForm from "../pages/forms/BaseForm";
import ComplexForm from "../pages/forms/ComplexForm";
import FormikForm from "../pages/forms/FormikForm";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/baseform" element={<BaseForm/>}/>
        <Route path="/complexform" element={<ComplexForm/>}/>
        <Route path="/register" element={<FormikForm/>}/>
      </Routes>
    </>
  );
};

export default AppRoutes;
