// src/pages/admin/Dashboard/Dashboard.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import StatsCards from "./StatsCards";
import ConversionsChart from "./ConversionsChart";
import RecentConversions from "./RecentConversions";

export default function Dashboard() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Stats Section */}
      <StatsCards />

      {/* Chart */}
      <ConversionsChart />

      {/* Recent Conversions */}
      <RecentConversions />
    </Box>
  );
}
