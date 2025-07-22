import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Rating,
  Select,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

const FormikForm = () => {
  const [visible, setVisible] = useState(false);

  const formData = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: null,
    gender: "",
    hobbies: [],
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    profilePic: "",
    termsAccepted: false,
    rating: 0,
    feedback: "",
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(/^(?=.*[A-Za-z])(?=.*\d).{6,}$/, "Min 6 characters with number"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^[0-9]{10}$/, "10-digit number only"),
    dob: Yup.date().nullable().required("DOB is required"),
    gender: Yup.string().required("Gender is required"),
    hobbies: Yup.array().min(1, "At least one hobby required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address: Yup.string().required("Address is required"),
    pincode: Yup.string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Must be 6 digits"),
    termsAccepted: Yup.boolean().oneOf([true], "Accept terms to proceed"),
    rating: Yup.number().min(1, "Give a rating").required("Rating required"),
    feedback: Yup.string().required("Feedback required"),
  });

  const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values) => {
      alert("Form submitted successfully!");
      console.log(values);
    },
  });

  const handleHobbyChange = (event) => {
    const { value, checked } = event.target;
    const updated = checked
      ? [...formik.values.hobbies, value]
      : formik.values.hobbies.filter((h) => h !== value);
    formik.setFieldValue("hobbies", updated);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          maxWidth: 900,
          mx: "auto",
          my: 4,
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "#fefefe",
        }}
      >
        <Typography variant="h5" gutterBottom textAlign="center">
          Registration Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* Name Fields */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                {...formik.getFieldProps("fullName")} //value,onChange,onBlur
                error={
                  formik.touched.fullName && Boolean(formik.errors.fullName)
                }
                helperText={formik.touched.fullName && formik.errors.fullName}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                {...formik.getFieldProps("username")}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type={visible ? "text" : "password"}
                name="password"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
            </Grid>

            {/* Confirm Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={visible ? "text" : "password"}
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                {...formik.getFieldProps("phone")}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>

            {/* DOB */}
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date of Birth"
                value={formik.values.dob}
                onChange={(val) => formik.setFieldValue("dob", val)}
                slotProps={{
                  textField: {
                    name: "dob",
                    error: formik.touched.dob && Boolean(formik.errors.dob),
                    helperText: formik.touched.dob && formik.errors.dob,
                    fullWidth: true,
                  },
                }}
              />
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <FormControl
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </RadioGroup>
                <FormHelperText>
                  {formik.touched.gender && formik.errors.gender}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Hobbies */}
            <Grid item xs={12}>
              <FormControl
                error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
              >
                <FormLabel>Hobbies</FormLabel>
                <Grid container>
                  {["Cricket", "Reading", "Coding"].map((hobby) => (
                    <FormControlLabel
                      key={hobby}
                      control={
                        <Checkbox
                          name="hobbies"
                          value={hobby}
                          checked={formik.values.hobbies.includes(hobby)}
                          onChange={handleHobbyChange}
                        />
                      }
                      label={hobby}
                    />
                  ))}
                </Grid>
                <FormHelperText>
                  {formik.touched.hobbies && formik.errors.hobbies}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* Country */}
            <Grid item xs={12} sm={4}>
              <FormControl
                fullWidth
                error={formik.touched.country && Boolean(formik.errors.country)}
              >
                <InputLabel>Country</InputLabel>
                <Select
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  {["India", "USA", "Canada"].map((country) => (
                    <MenuItem key={country} value={country}>
                      {country}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value="India">India</MenuItem>
                  <MenuItem value="USA">USA</MenuItem>
                  <MenuItem value="Canada">Canada</MenuItem> */}
                </Select>
                <FormHelperText>
                  {formik.touched.country && formik.errors.country}
                </FormHelperText>
              </FormControl>
            </Grid>

            {/* State */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="State"
                name="state"
                {...formik.getFieldProps("state")}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              />
            </Grid>

            {/* City */}
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="City"
                name="city"
                {...formik.getFieldProps("city")}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={2}
                {...formik.getFieldProps("address")}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
            </Grid>

            {/* Pincode */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Pincode"
                name="pincode"
                {...formik.getFieldProps("pincode")}
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                name="profilePic"
                onChange={(event) =>
                  formik.setFieldValue(
                    "profilePic",
                    event.currentTarget.files[0]
                  )
                }
              />
            </Grid>

            {/* Rating */}
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Rating</FormLabel>
                <Rating
                  name="rating"
                  value={formik.values.rating}
                  onChange={(event, newValue) =>
                    formik.setFieldValue("rating", newValue)
                  }
                />
                {formik.touched.rating && (
                  <FormHelperText error>{formik.errors.rating}</FormHelperText>
                )}
              </FormControl>
            </Grid>

            {/* Feedback */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Feedback"
                name="feedback"
                multiline
                rows={3}
                {...formik.getFieldProps("feedback")}
                error={
                  formik.touched.feedback && Boolean(formik.errors.feedback)
                }
                helperText={formik.touched.feedback && formik.errors.feedback}
              />
            </Grid>

            {/* Terms */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="termsAccepted"
                    checked={formik.values.termsAccepted}
                    onChange={formik.handleChange}
                  />
                }
                label="I accept the terms and conditions"
              />
              {formik.touched.termsAccepted && formik.errors.termsAccepted && (
                <Typography color="error">
                  {formik.errors.termsAccepted}
                </Typography>
              )}
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </LocalizationProvider>
  );
};

export default FormikForm;
