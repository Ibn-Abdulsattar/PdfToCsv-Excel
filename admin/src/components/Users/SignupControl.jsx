// src/pages/admin/Users/SignupControl.jsx
import React, { useState } from "react";
import { Paper, Switch, Typography, Box } from "@mui/material";

export default function SignupControl() {
  const [signupEnabled, setSignupEnabled] = useState(true);

  const handleToggle = () => {
    setSignupEnabled(!signupEnabled);
    // TODO: API call to backend
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">User Registration Control</Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography color={signupEnabled ? "success.main" : "error.main"}>
            {signupEnabled ? "Enabled" : "Disabled"}
          </Typography>
          <Switch checked={signupEnabled} onChange={handleToggle} />
        </Box>
      </Box>
    </Paper>
  );
}
