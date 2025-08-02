import React, { useEffect, useState } from "react";

const useFormStorage = () => {
  const STORAGE_KEY = "students";

  const [students, setStudents] = useState([]);
  // Load students from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);
  // Sync to localStorage when students state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  }, [students]);
  //add student
  const addStudent = () => {
    setStudents((prev) => [...prev, students]);
  };
  // Update existing student
  const updateStudent = (id) => {
    setStudents((prev) => prev.map((stu) => (stu.id === id ? id : stu)));
  };
  // Delete student by ID
  const deleteStudent = (id) => {
    setStudents(students.filter((i) => i !== id));
  };
  return students, addStudent, updateStudent, deleteStudent;
};

export default useFormStorage;
