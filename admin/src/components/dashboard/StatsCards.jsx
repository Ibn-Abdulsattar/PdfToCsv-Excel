// src/pages/admin/Dashboard/StatsCards.jsx
import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { useState, useEffect } from "react";
import axios from "axios";

export default function StatsCards() {
  const [totalUser, setTotalUser] = useState(0);
  const [totalFile, setTotalFile] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  // const [admin, setAdmin] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/getUserStats", { withCredentials: true })
      .then((res) => {
        setTotalUser(res.data.totalUser);
      })
      .catch();

    axios
      .get("http://localhost:8080/api/totalFiles", { withCredentials: true })
      .then((res) => {
        setTotalFile(res.data.totalFiles);
      })
      .catch();

    axios
      .get("http://localhost:8080/support/totalTickets", {
        withCredentials: true,
      })
      .then((res) => {
        setTotalTicket(res.data.totalTickets);
      })
      .catch();
  }, []);

  const stats = [
    {
      label: "Users",
      value: totalUser,
      icon: <PeopleIcon fontSize="large" />,
      color: "#1976d2",
    },
    {
      label: "Files Converted",
      value: totalFile,
      icon: <InsertDriveFileIcon fontSize="large" />,
      color: "#2e7d32",
    },
    {
      label: "Support Tickets",
      value: totalTicket,
      icon: <SupportAgentIcon fontSize="large" />,
      color: "#d32f2f",
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, idx) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderLeft: `5px solid ${stat.color}`,
            }}
          >
            <Box sx={{ color: stat.color }}>{stat.icon}</Box>
            <Box>
              <Typography variant="h6">{stat.value}</Typography>
              <Typography color="text.secondary" variant="body2">
                {stat.label}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
