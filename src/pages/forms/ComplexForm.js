import React, { useState } from "react";

const ComplexForm = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    cnfPassword: "",
    gender: "",
    hobbies: [],
  });

  const [error, setError] = useState({});

  const { username, email, password, cnfPassword, gender, hobbies } = data;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    // e.target is the input that was changed.
    // name comes from the input’s name attribute (username, email, or password).
    // You use setData() to update only one field of the object.
    setData({ ...data, [name]: value });
    // Spreads the existing state (...data)
    // Replaces or updates the field matching name with the new value
    setError((prev) => ({ ...prev, [name]: "" }));
    // Clear individual error as user types
  };

  const handleRadioChange = (e) => {
    setData({ ...data, gender: e.target.value });
    setError((prev) => ({ ...prev, gender: "" }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    // value: the hobby name selected (e.g., "Cricket", "Reading")
    // checked: true if checkbox is checked, false if unchecked
    let updatedHobbies = [...hobbies];
    // Create a copy of the existing hobbies array so you don't directly mutate state.
    if (checked) {
      updatedHobbies.push(value); // Add to hobbies array
    } else {
      updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value); // Remove from array
    }
    // If user checked the box, we add that value to the hobbies array.
    // If user unchecked the box, we remove it from the hobbies array.
    setData({ ...data, hobbies: updatedHobbies });
    // Spread the old data object and update only the hobbies field.
    setError((prev) => ({ ...prev, hobbies: "" }));
    // Clears the error for hobbies once user interacts with the checkbox again.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 6 characters and include a number";
    }

    if (!cnfPassword.trim()) {
      errors.cnfPassword = "Confirm Password is required";
    } else if (password !== cnfPassword) {
      errors.cnfPassword = "Passwords do not match";
    }

    if (!gender) {
      errors.gender = "Gender is required";
    }

    if (hobbies.length === 0) {
      errors.hobbies = "Select at least one hobby";
    }

    setError(errors);

    if (Object.keys(errors).length === 0) {
      alert("Form submitted successfully!");
      setData({
        username: "",
        email: "",
        password: "",
        cnfPassword: "",
        gender: "",
        hobbies: [],
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {/* Username */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={handleChange}
          style={styles.input}
        />
        {error.username && <p style={styles.error}>{error.username}</p>}
      </div>

      {/* Email */}
      <div style={styles.inputGroup}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleChange}
          style={styles.input}
        />
        {error.email && <p style={styles.error}>{error.email}</p>}
      </div>

      {/* Password */}
      <div style={styles.inputGroup}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handleChange}
          style={styles.input}
        />
        {error.password && <p style={styles.error}>{error.password}</p>}
      </div>

      {/* Confirm Password */}
      <div style={styles.inputGroup}>
        <input
          type="password"
          name="cnfPassword"
          placeholder="Confirm Password"
          value={cnfPassword}
          onChange={handleChange}
          style={styles.input}
        />
        {error.cnfPassword && <p style={styles.error}>{error.cnfPassword}</p>}
      </div>

      {/* Gender */}
      <div style={styles.inputGroup}>
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          checked={gender === "male"}
          onChange={handleRadioChange}
        />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          checked={gender === "female"}
          onChange={handleRadioChange}
        />
        {error.gender && <p style={styles.error}>{error.gender}</p>}
      </div>

      {/* Hobbies */}
      <div style={styles.inputGroup}>
        {["cricket", "golf", "kabbadi"].map((hobby) => (
          <label key={hobby} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              name="hobbies"
              value={hobby}
              checked={hobbies.includes(hobby)}
              onChange={handleCheckboxChange}
            />
            {hobby.toUpperCase()}
          </label>
        ))}
        {error.hobbies && <p style={styles.error}>{error.hobbies}</p>}
      </div>

      <button type="submit" style={styles.button}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: 500,
    margin: "50px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  error: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    width: "100%",
    padding: 10,
    fontSize: 16,
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    cursor: "pointer",
  },
};

export default ComplexForm;
