"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { resetToken } = useParams(); // dynamic token from URL
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // same regex as Register.jsx
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  const validateFields = () => {
    const newErrors = {};

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Must have 1 uppercase, 1 lowercase, 1 number, 1 special char, 8–20 chars";
    }

    if (!confirm.trim()) {
      newErrors.confirm = "Confirm password is required";
    } else if (confirm !== password) {
      newErrors.confirm = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const bootstrapInputStyle = (fieldName) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : (fieldName === "password" ? password : confirm)
          ? "green"
          : undefined,
      },
      "&:hover fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : (fieldName === "password" ? password : confirm)
          ? "green"
          : undefined,
      },
      "&.Mui-focused fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : (fieldName === "password" ? password : confirm)
          ? "green"
          : undefined,
      },
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateFields()) return;

    try {
      await axios.put(
        `http://localhost:8080/user/reset-password/${resetToken}`,
        { password }
      );

      setSuccess(true);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Try again."
      );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 600, textAlign: "center" }}
        >
          Reset Password
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 3, color: "text.secondary", textAlign: "center" }}
        >
          Please enter your new password below.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success ? (
          <Alert severity="success">
            Your password has been reset successfully. You can now log in.
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={!!errors.password}
              helperText={errors.password}
              sx={{ mb: 3, ...bootstrapInputStyle("password") }}
            />

            <TextField
              label="Confirm Password"
              variant="outlined"
              fullWidth
              required
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              error={!!errors.confirm}
              helperText={errors.confirm}
              sx={{ mb: 3, ...bootstrapInputStyle("confirm") }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                bgcolor: "primary.main",
                textTransform: "none",
                fontWeight: 600,
                ":hover": { bgcolor: "primary.dark" },
              }}
            >
              Reset Password
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
