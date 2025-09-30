import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Avatar,
  Link,
  Alert,
  FormControl,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  IconButton,
  TextField,
  CircularProgress,
  Modal,
  Grid,
  FormHelperText,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { keyframes } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import axios from "axios";

function Register({ open, onClose, onLoginSuccess }) {
  const [mode, setMode] = useState("signin"); // signin | signup | forgot
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({}); // field-specific errors

  const navigate = useNavigate();

  // Regex rules same as schema
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  // 🔄 toggle modes
  const switchMode = (newMode) => {
    setMode(newMode);
    setFormData({ username: "", email: "", password: "" });
    setError(null);
    setErrors({});
  };

  // 🔎 field validation
  const validateField = (name, value) => {
    let msg = "";
    if (name === "username") {
      if (!value.trim()) msg = "Username is required";
      else if (value.length < 3) msg = "Must be at least 3 characters";
      else if (value.length > 20) msg = "Cannot exceed 20 characters";
    }
    if (name === "email") {
      if (!value.trim()) msg = "Email is required";
      else if (!emailRegex.test(value)) msg = "Enter a valid email";
    }
    if (name === "password" && mode !== "forgot") {
      if (!value.trim()) msg = "Password is required";
      else if (!passwordRegex.test(value))
        msg =
          "Password must contain 1 uppercase, 1 lowercase, 1 number, 1 special char, and be 8–20 chars";
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // validate on change
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (e) => e.preventDefault();

  // 🚀 form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields =
      mode === "signup"
        ? ["username", "email", "password"]
        : mode === "signin"
        ? ["email", "password"]
        : ["email"]; // forgot

    const newErrors = {};
    requiredFields.forEach((field) => {
      newErrors[field] = validateField(field, formData[field]);
    });

    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) {
      return; // stop submit if validation fails
    }

    setLoading(true);
    axios
      .post(`http://localhost:8080/user/admin/${mode}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        if (onLoginSuccess) onLoginSuccess(res.data.user);
        onClose();

        // 🔹 role-based redirect
        if (res.data.user.role === "admin") {
          window.location.href = "http://localhost:5174";
        } else {
          navigate("/");
        }

        alert("Your request is submitted successfully!");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // common style (Bootstrap-like)
  const bootstrapInputStyle = (fieldName) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : formData[fieldName]
          ? "green"
          : undefined,
      },
      "&:hover fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : formData[fieldName]
          ? "green"
          : undefined,
      },
      "&.Mui-focused fieldset": {
        borderColor: errors[fieldName]
          ? "red"
          : formData[fieldName]
          ? "green"
          : undefined,
      },
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: 3,
    p: 4,
  };

  const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

  // 🎨 Styled Avatar
  const StyledAvatar = styled(Avatar)(({ theme }) => ({
    background: `linear-gradient(-45deg,
    ${theme.palette.primary.main},
    ${theme.palette.secondary.main},
    ${theme.palette.primary.dark},
    ${theme.palette.secondary.dark})`,
    backgroundSize: "400% 400%",
    animation: `${gradientAnimation} 15s ease infinite`,
    backdropFilter: "blur(20px)",
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(-45deg,
    ${theme.palette.primary.main},
    ${theme.palette.secondary.main},
    ${theme.palette.primary.dark},
    ${theme.palette.secondary.dark})`,
    backgroundSize: "400% 400%",
    animation: `${gradientAnimation} 8s ease infinite`,
    color: theme.palette.common.white,
    fontWeight: 600,
    borderRadius: 12,
    height: 44,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: `0 8px 24px ${alpha(theme.palette.secondary.main, 0.6)}`,
      transform: "translateY(-2px)",
    },
    "&:disabled": {
      background: theme.palette.grey[400],
      boxShadow: "none",
    },
  }));

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ width: { xs: "85%", sm: "40%" } }} style={style}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#f9fafb",
            borderRadius: 2,
            p: 3,
          }}
        >
          <StyledAvatar sx={{ m: 1, width: 56, height: 56 }}>
            <LockOutlinedIcon />
          </StyledAvatar>

          <Typography component="h1" variant="h5" fontWeight={600}>
            {mode === "signup"
              ? "Sign Up"
              : mode === "signin"
              ? "Sign In"
              : "Forgot Password"}
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ mt: 3, width: "100%" }}
          >
            <Grid container spacing={2}>
              {mode === "signup" && (
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    error={!!errors.username}
                    helperText={errors.username}
                    sx={bootstrapInputStyle("username")}
                  />
                </Grid>
              )}

              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={bootstrapInputStyle("email")}
                />
              </Grid>

              {mode !== "forgot" && (
                <Grid size={{ xs: 12 }}>
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!errors.password}
                    sx={bootstrapInputStyle("password")}
                  >
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errors.password && (
                      <FormHelperText>{errors.password}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              )}
            </Grid>

            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}

            <StyledButton
              sx={{ mt: 2 }}
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : mode === "signup" ? (
                "Sign Up"
              ) : mode === "signin" ? (
                "Sign In"
              ) : (
                "Send Reset Link"
              )}
            </StyledButton>

            {/* Switch Links */}
            <Grid container justifyContent="center">
              {mode === "signin" && (
                <>
                  <Grid size={{ xs: 12 }} textAlign="center">
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => switchMode("forgot")}
                    >
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid size={{ xs: 12 }} textAlign="center">
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => switchMode("signup")}
                    >
                      Don't have an account? Sign up
                    </Link>
                  </Grid>
                </>
              )}

              {mode === "signup" && (
                <Grid size={{ xs: 12 }} textAlign="center">
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => switchMode("signin")}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              )}

              {mode === "forgot" && (
                <Grid size={{ xs: 12 }} textAlign="center">
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => switchMode("signin")}
                  >
                    Back to Sign In
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default Register;
