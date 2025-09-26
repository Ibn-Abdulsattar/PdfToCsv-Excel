"use client";
import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="xxl"
      sx={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        bgcolor: "background.default",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "6rem", sm: "8rem" },
          color: "primary.main",
          mb: 2,
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 500, color: "text.primary" }}
      >
        Page Not Found
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, color: "text.secondary", maxWidth: "sm" }}
      >
        The page you’re looking for doesn’t exist or has been moved. Please
        check the URL or go back to the homepage.
      </Typography>

      <Box>
        <Button
          variant="contained"
          size="large"
          sx={{ mr: 2, textTransform: "none", fontWeight: 600 }}
          onClick={() => navigate("/")}
        >
          Go Home
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{ textTransform: "none", fontWeight: 600 }}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Box>
    </Container>
  );
}
