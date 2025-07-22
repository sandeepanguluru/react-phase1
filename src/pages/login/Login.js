import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // ✅ context login function
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Email is required")
        .matches(emailRegex, "Invalid email format"),
      password: Yup.string()
        .required("Password is required")
        .matches(passwordRegex, "Password must be at least 6 characters with letters and numbers"),
    }),
    onSubmit: (values) => {
      const storedUsers = JSON.parse(localStorage.getItem("studentData")) || [];
      const matchedUser = storedUsers.find(
        (user) => user.email === values.email && user.password === values.password
      );

      if (matchedUser) {
        login(); // ✅ update auth state
        localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
        alert("✅ Login successful");
        navigate("/studentdashboard");
      } else {
        alert("❌ Invalid email or password");
      }
    },
  });

  return (
    <Grid container justifyContent="center" sx={{ mt: 5 }}>
      <form onSubmit={formik.handleSubmit} style={{ width: "300px" }}>
        <Typography variant="h5" align="center" gutterBottom>
          Login
        </Typography>

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          size="small"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type={visible ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisible(!visible)}>
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </form>
    </Grid>
  );
};

export default Login;
