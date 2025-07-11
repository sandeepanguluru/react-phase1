import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editData = location.state; // This comes from navigate('/edit', { state: data })
  const isEdit = Boolean(editData); // true if editing
  const [visible, setVisible] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  const BtechSemesters = [
    "1Sem",
    "2Sem",
    "3Sem",
    "4Sem",
    "5Sem",
    "6Sem",
    "7Sem",
    "8Sem",
  ];
  const Country = ["India", "USA", "Canada", "Germany", "Chaina"];

  const handleCheckBox = (e) => {
    const { value, checked } = e.target;
    const updated = checked
      ? [...formik.values.semester, value]
      : formik.values.semester.filter((val) => val !== value);
    formik.setFieldValue("semester", updated);
  };
  useEffect(() => {
    if (location.state) {
      formik.setValues(location.state); // Set existing data into form   when you click edit, the form will automatically fill the data.
    }
  }, [location.state]);
  const formik = useFormik({
    initialValues: {
      regNo: "",
      userName: "",
      fatherName: "",
      email: "",
      password: "",
      gender: "",
      dateOfBirth: null,
      branch: "",
      semester: [],
      termsAccepted: false,
      country: "",
      id: "", // include `id` for editing logic
    },
    validationSchema: Yup.object().shape({
      regNo: Yup.string().trim().required("Register Number is required"),
      userName: Yup.string().trim().required("UserName Number is required"),
      fatherName: Yup.string().trim().required("FatherName Number is required"),
      email: Yup.string()
        .trim()
        .required("Email Number is required")
        .matches(emailRegex, "Email invaild"),
      password: Yup.string()
        .trim()
        .required("Password  is required")
        .matches(passwordRegex, "Min 6 characters with number"),
      gender: Yup.string().required("Gender is required"),
      branch: Yup.string().required("Branch  is required"),
      semester: Yup.array().min(1, "At least one semester must be selected"),
      termsAccepted: Yup.boolean()
        .oneOf([true], "You must accept the terms")
        .required("You must accept the terms"),

      dateOfBirth: Yup.date().required("Date of Birth is required"),
      country: Yup.string().required("Country is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values), // ✅ send all form values
          }
        );

        const data = await response.json();
        console.log("✅ Registered Successfully:", data);
        // alert("User registered! Mock ID: " + data.id);

        // Store locally
        const formWithId = values.id ? values : { ...values, id: uuidv4() };
        const existingUsers =
          JSON.parse(localStorage.getItem("studentData")) || [];
        const updatedUsers = values.id
          ? existingUsers.map((user) =>
              user.id === values.id ? formWithId : user
            )
          : Array.isArray(existingUsers)
          ? [...existingUsers, formWithId]
          : [values]; // handle first-time registration

        localStorage.setItem("studentData", JSON.stringify(updatedUsers));

        alert(isEdit ? "User updated!" : "User registered!");
        resetForm(); // ✅ clear form
        navigate("/studentdashboard"); // ✅ redirect
      } catch (error) {
        console.error("❌ Registration failed:", error);
        alert("Error: Registration failed");
      }
    },
  });
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          sx={{
            maxWidth: "700px",
            margin: "auto",
            border: "1px solid",
            padding: "20px",
          }}
        >
          <Grid size={{ xs: 12 }}>
            <Typography
              sx={{ textAlign: "center", padding: "20px" }}
              variant="h5"
            >
              User Form
            </Typography>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <TextField
              type="text"
              label="Register No."
              name="regNo"
              value={formik.values.regNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.regNo && Boolean(formik.errors.regNo)}
              helperText={formik.touched.regNo && formik.errors.regNo}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <TextField
              type="text"
              label="User Name"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <TextField
              type="text"
              label="Father Name"
              name="fatherName"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.fatherName && Boolean(formik.errors.fatherName)
              }
              helperText={formik.touched.fatherName && formik.errors.fatherName}
              size="small"
              fullWidth
            />
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <TextField
              type="text"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size="small"
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <TextField
              type={visible ? "text" : "password"}
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              size="small"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={(e) => {
                        setVisible(!visible);
                      }}
                    >
                      {visible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <DatePicker
              label="Date of Birth"
              name="dateOfBirth"
              disableFuture
              value={formik.values.dateOfBirth}
              onChange={(val) => formik.setFieldValue("dateOfBirth", val)}
              slotProps={{
                textField: {
                  name: "dateOfBirth",
                  error:
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth),
                  helperText:
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth,
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <FormControl
              error={formik.touched.gender && Boolean(formik.errors.gender)}
            >
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                ></FormControlLabel>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                ></FormControlLabel>
              </RadioGroup>
              <FormHelperText>
                {formik.touched.gender && formik.errors.gender}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <FormControl
              error={formik.touched.branch && Boolean(formik.errors.branch)}
            >
              <FormLabel>Branch</FormLabel>
              <RadioGroup
                row
                name="branch"
                value={formik.values.branch}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <FormControlLabel value="cse" control={<Radio />} label="CSE" />
                <FormControlLabel value="ese" control={<Radio />} label="ESE" />
                <FormControlLabel
                  value="mech"
                  control={<Radio />}
                  label="MECH"
                />
                <FormControlLabel
                  value="civil"
                  control={<Radio />}
                  label="CIVIL"
                />
              </RadioGroup>
              <FormHelperText>
                {formik.touched.branch && formik.errors.branch}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <FormControl
              error={formik.touched.semester && Boolean(formik.errors.semester)}
            >
              <FormLabel>Semester</FormLabel>

              <Grid container spacing={1}>
                {BtechSemesters.map((sem) => (
                  <Grid item xs={6} sm={3} key={sem}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="semester"
                          value={sem}
                          checked={formik.values.semester.includes(sem)}
                          onChange={handleCheckBox}
                        />
                      }
                      label={sem.toUpperCase()}
                    />
                  </Grid>
                ))}
              </Grid>

              <FormHelperText>
                {formik.touched.semester && formik.errors.semester}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <FormControl
              fullWidth
              error={formik.touched.country && Boolean(formik.errors.country)}
            >
              <InputLabel>Select Country</InputLabel>
              <Select
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {Country.map((country) => (
                  <MenuItem value={country}>{country.toUpperCase()}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {formik.touched.country && formik.errors.country}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ margin: "8px 0px" }}>
            <FormControl
              error={
                formik.touched.termsAccepted &&
                Boolean(formik.errors.termsAccepted)
              }
            >
              <FormControlLabel
                label="I accept the terms and conditions"
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={formik.values.termsAccepted}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                }
              />
              {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                <FormHelperText>{formik.errors.termsAccepted}</FormHelperText>
              )}
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12 }} sx={{ margin: "8px 0px" }}>
            <Button fullWidth variant="contained" type="submit">
              {isEdit ? "Update" : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default RegisterForm;
