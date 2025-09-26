// src/pages/admin/Users/UserStats.jsx
import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "./UserTable";

export default function UserStats() {
  const [totalUser, setTotalUser] = useState(0);
  const [activeUser, setActiveUser] = useState(0);
  const [pendingUser, setPendingUser] = useState(0);
  // const [admin, setAdmin] = useState(0);

  const fetchUserStats = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/getUserStats", {
        withCredentials: true,
      });

      setTotalUser(res.data.totalUser);
      setActiveUser(res.data.activeUser);
      setPendingUser(res.data.blockUser);
      // setAdmin(res.data.totalAdmin);
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  useEffect(() => {
    fetchUserStats();
  }, []);

  const stats = [
    // { label: "Total Admin", value: admin, color: "warning.main" },
    { label: "Total Users", value: totalUser, color: "primary.main" },
    { label: "Active Users", value: activeUser, color: "success.main" },
    { label: "Pending Users", value: pendingUser, color: "error.main" },
  ];
  return (
    <>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map((stat, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={idx}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                bgcolor: stat.color,
                color: "white",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {stat.value}
              </Typography>
              <Typography variant="subtitle1">{stat.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <UserTable fetchUserStats={fetchUserStats} />
    </>
  );
}
