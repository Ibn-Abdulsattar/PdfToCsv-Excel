// src/pages/admin/Dashboard/RecentConversions.jsx
import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RecentConversions() {
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/allconversion", { withCredentials: true })
      .then((res) => {
        const all = res.data.conversions || [];
        // Sirf latest 5 records (naye se purane tak)
        setRecent(all.slice(0, 5));
      })
      .catch((err) => {
        console.error("Error fetching recent conversions:", err);
      });
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "success";
      case "pending":
        return "warning";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Recent Conversions
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>File</TableCell>
            <TableCell>User</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Used Under</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recent.map((file) => (
            <TableRow key={file._id}>
              <TableCell>{file.fileName}</TableCell>
              <TableCell>{file.user?.username || "Unknown User"}</TableCell>
              <TableCell>
                <Chip
                  label={file.status}
                  color={getStatusColor(file.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                <Chip
                  label={file.usedUnder}
                  color={file.usedUnder === "free_trial" ? "info" : "primary"}
                  size="small"
                />
              </TableCell>
              <TableCell>{new Date(file.createdAt).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* View All Button */}
      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => navigate("/files")}
      >
        View All
      </Button>
    </Paper>
  );
}
