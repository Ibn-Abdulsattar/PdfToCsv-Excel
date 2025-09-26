import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  TableCell,
  TableBody,
  IconButton,
  Typography,
  Chip,
  Tooltip,
} from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import axios from "axios";

export default function UserTable({ fetchUserStats }) {
  const [users, setUsers] = useState([]);

  // 🔹 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/getAllUser", {
        withCredentials: true,
      });
      setUsers(res.data.allUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Toggle user status (approved ↔ pending)
  const handleToggleStatus = async (id) => {
    try {
      await axios.put(
        `http://localhost:8080/user/toggleBlockUser/${id}`,
        {},
        { withCredentials: true }
      );

      // Refresh both users & stats
      fetchUsers();
      if (fetchUserStats) {
        fetchUserStats();
      }
    } catch (err) {
      console.error("Error toggling user:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography
        variant="h6"
        sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
      >
        User Management
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "primary.main" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === "admin" ? "primary" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={
                        user.status === "approved"
                          ? "success"
                          : user.status === "pending"
                          ? "warning"
                          : "error"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    {user.status === "pending" && (
                      <Tooltip title="Approve User">
                        <IconButton
                          onClick={() => handleToggleStatus(user._id)}
                          color="success"
                        >
                          <CheckCircleIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {user.status === "approved" && (
                      <Tooltip title="Block User">
                        <IconButton
                          onClick={() => handleToggleStatus(user._id)}
                          color="error"
                        >
                          <BlockIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
