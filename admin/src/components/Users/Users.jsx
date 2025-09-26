// src/pages/admin/Users/Users.jsx
import React from "react";
import { Box, Typography } from "@mui/material";
import UserStats from "./UserStats";
import SignupControl from "./SignupControl";
import UserTable from "./UserTable";

export default function Users() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Users Management
      </Typography>

      {/* Stats Section */}
      <UserStats />
    </Box>
  );
}
