import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAuth } from "../../context/AuthContext";

const StudentDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleMenuOpen = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };
  const handleEdit = () => {
    const data = userData.find((user) => user.id === selectedId);
    if (data?.dateOfBirth) {
      data.dateOfBirth = new Date(data.dateOfBirth); // ✅ convert to Date
    }
    navigate("/edit", { state: data }); // ➡️ Send data to form ,
    // { state: data } → this is React Router’s way of passing data from one component to another without using Redux or Context.
  };
  const handleDelete = () => {
    const updatedData = userData.filter((user) => user.id !== selectedId);
    setUserData(updatedData);
    localStorage.setItem("studentData", JSON.stringify(updatedData));
    handleMenuClose();
  };
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("studentData") || "[]");
    setUserData(Array.isArray(stored) ? stored : [stored]);
  }, []);

  const clearData = () => {
    localStorage.removeItem("studentData");
    setUserData([]);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h5" textAlign="center" gutterBottom>
        📋 Registered Students
      </Typography>

      {userData.length === 0 ? (
        <Typography textAlign="center" color="text.secondary" sx={{ py: 4 }}>
          No student data found.
        </Typography>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow>
                {[
                  "Reg No",
                  "User Name",
                  "Father Name",
                  "Email",
                  "Password",
                  "Gender",
                  "DOB",
                  "Branch",
                  "Semester",
                  "Country",
                  "Terms Accepted",
                  "Actions",
                ].map((header) => (
                  <TableCell key={header}>
                    <b>{header}</b>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.map((u, i) => (
                <TableRow key={i}>
                  <TableCell>{u.regNo || "-"}</TableCell>
                  <TableCell>{u.userName || "-"}</TableCell>
                  <TableCell>{u.fatherName || "-"}</TableCell>
                  <TableCell>{u.email || "-"}</TableCell>
                  <TableCell>{u.password || "-"}</TableCell>
                  <TableCell>{u.gender || "-"}</TableCell>
                  <TableCell>
                    {u.dateOfBirth
                      ? new Date(u.dateOfBirth).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>{u.branch || "-"}</TableCell>
                  <TableCell>
                    {Array.isArray(u.semester) ? u.semester.join(", ") : "-"}
                  </TableCell>
                  <TableCell>{u.country || "-"}</TableCell>
                  <TableCell>{u.termsAccepted ? "✅ Yes" : "❌ No"}</TableCell>
                  <TableCell>
                    <Tooltip title="Actions" placement="right">
                      <IconButton onClick={(e) => handleMenuOpen(e, u.id)}>
                        <MoreVertIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem key="Edit" onClick={handleEdit}>
                Edit
              </MenuItem>
              <MenuItem key="Delete" onClick={handleDelete}>
                Delete
              </MenuItem>
            </Menu>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="error"
          fullWidth
          onClick={clearData}
          disabled={userData.length === 0}
        >
          Clear All Data
        </Button>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button variant="contained" fullWidth onClick={() => logout()}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default StudentDashboard;
