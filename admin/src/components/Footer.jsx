// src/components/Footer.jsx
import React from "react";
import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: "3rem",
        py: 2,
        textAlign: "center",
        borderTop: "1px solid",
        borderColor: "divider",
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Bank Statement Converter. All rights reserved. | Version 1.0.0
      </Typography>
    </Box>
  );
}
