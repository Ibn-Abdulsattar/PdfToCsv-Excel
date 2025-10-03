import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Divider,
  Fade,
  Chip,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Save,
  ArrowBack,
  CheckCircle,
} from "@mui/icons-material";
import { useAuth } from "../AuthContext";
import axios from "axios";

export default function SettingsPage() {
  const { user, setUser } = useAuth(); // ✅ get from context
  const [formData, setFormData] = useState({
    currentName: user?.username,
    newName: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // helper function for password validation
  const validatePasswordRules = (password) => {
    return {
      length: password.length >= 8 && password.length <= 20,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[@$!%*?&]/.test(password),
    };
  };

  const rules = validatePasswordRules(formData.newPassword);

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [alerts, setAlerts] = useState({
    name: null,
    password: null,
  });

  const [loading, setLoading] = useState({
    name: false,
    password: false,
  });

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (field.includes("Name")) {
      setAlerts((prev) => ({ ...prev, name: null }));
    } else {
      setAlerts((prev) => ({ ...prev, password: null }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleNameUpdate = async () => {
    if (!formData.newName.trim()) {
      setAlerts((prev) => ({
        ...prev,
        name: { type: "error", message: "Please enter a name" },
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, name: true }));

    try {
      const res = await axios.put(
        "http://localhost:8080/user/updatename",
        { newName: formData.newName },
        { withCredentials: true }
      );

      setFormData((prev) => ({
        ...prev,
        currentName: res.data.user.username,
        newName: "",
      }));

      setUser(res.data.user); // context me bhi update kar do

      setAlerts((prev) => ({
        ...prev,
        name: { type: "success", message: res.data.message },
      }));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update name";
      setAlerts((prev) => ({
        ...prev,
        name: { type: "error", message: msg },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, name: false }));
    }
  };

  const handlePasswordUpdate = async () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setAlerts((prev) => ({
        ...prev,
        password: { type: "error", message: "Please fill in all fields" },
      }));
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setAlerts((prev) => ({
        ...prev,
        password: {
          type: "error",
          message: "New password and confirm password do not match",
        },
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, password: true }));

    try {
      const res = await axios.put(
        "http://localhost:8080/user/updatepassword",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setAlerts((prev) => ({
        ...prev,
        password: { type: "success", message: res.data.message },
      }));
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to update password";
      setAlerts((prev) => ({
        ...prev,
        password: { type: "error", message: msg },
      }));
    } finally {
      setLoading((prev) => ({ ...prev, password: false }));
    }
  };

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography>Loading Setting...</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="xxl">
        <Fade in timeout={600}>
          <Box>
            {/* Header */}
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h3"
                  component="h1"
                  fontWeight="700"
                  sx={{ color: "primary.main", mb: 0.5 }}
                >
                  Settings
                </Typography>
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                  Manage your account preferences
                </Typography>
              </Box>
            </Box>

            <Grid container spacing={3}>
              {/* Name Update Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: "100%",
                    background: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        "linear-gradient(90deg, primary.main, primary.light)",
                      bgcolor: "primary.main",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <Person sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ color: "primary.main" }}
                      >
                        Change Name
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update your display name
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <Box sx={{ mb: 3 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight="600"
                      textTransform="uppercase"
                      sx={{ mb: 1, display: "block" }}
                    >
                      Current Name
                    </Typography>
                    <Box
                      sx={{
                        p: 2,
                        bgcolor: "primary.main",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        boxShadow: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ color: "white", fontWeight: 500 }}
                      >
                        {formData.currentName}
                      </Typography>
                      <CheckCircle sx={{ color: "white", opacity: 0.8 }} />
                    </Box>
                  </Box>

                  <TextField
                    fullWidth
                    label="New Name"
                    value={formData.newName}
                    onChange={handleInputChange("newName")}
                    sx={{ mb: 2 }}
                    variant="outlined"
                    InputProps={{
                      sx: { borderRadius: 2 },
                    }}
                  />

                  {alerts.name && (
                    <Fade in>
                      <Alert
                        severity={alerts.name.type}
                        sx={{ mb: 2, borderRadius: 2 }}
                        onClose={() =>
                          setAlerts((prev) => ({ ...prev, name: null }))
                        }
                      >
                        {alerts.name.message}
                      </Alert>
                    </Fade>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNameUpdate}
                    disabled={loading.name || !formData.newName.trim()}
                    startIcon={<Save />}
                    sx={{
                      width: "100%",
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      bgcolor: "primary.main",
                      boxShadow: 3,
                      "&:hover": {
                        bgcolor: "primary.dark",
                        boxShadow: 6,
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    {loading.name ? "Updating..." : "Update Name"}
                  </Button>
                </Paper>
              </Grid>

              {/* Password Update Section */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={8}
                  sx={{
                    p: 4,
                    borderRadius: 3,
                    height: "100%",
                    background: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background:
                        "linear-gradient(90deg, primary.main, primary.light)",
                      bgcolor: "primary.main",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 2,
                      }}
                    >
                      <Lock sx={{ color: "white", fontSize: 28 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="h5"
                        fontWeight="600"
                        sx={{ color: "primary.main" }}
                      >
                        Change Password
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Update your security credentials
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 3 }} />

                  <TextField
                    fullWidth
                    type={showPasswords.current ? "text" : "password"}
                    label="Current Password"
                    value={formData.currentPassword}
                    onChange={handleInputChange("currentPassword")}
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: { borderRadius: 2 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility("current")}
                            edge="end"
                            sx={{ color: "primary.main" }}
                          >
                            {showPasswords.current ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <TextField
                    fullWidth
                    type={showPasswords.new ? "text" : "password"}
                    label="New Password"
                    value={formData.newPassword}
                    onChange={handleInputChange("newPassword")}
                    sx={{ mb: 1 }}
                    InputProps={{
                      sx: { borderRadius: 2 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility("new")}
                            edge="end"
                            sx={{ color: "primary.main" }}
                          >
                            {showPasswords.new ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* ✅ Live validation checklist */}
                  {formData.newPassword && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}
                      >
                        Password must include:
                      </Typography>
                      <ul
                        style={{
                          margin: 0,
                          paddingLeft: "20px",
                          fontSize: "0.9rem",
                        }}
                      >
                        <li style={{ color: rules.length ? "green" : "red" }}>
                          8–20 characters
                        </li>
                        <li
                          style={{ color: rules.uppercase ? "green" : "red" }}
                        >
                          At least 1 uppercase letter
                        </li>
                        <li
                          style={{ color: rules.lowercase ? "green" : "red" }}
                        >
                          At least 1 lowercase letter
                        </li>
                        <li style={{ color: rules.number ? "green" : "red" }}>
                          At least 1 number
                        </li>
                        <li style={{ color: rules.special ? "green" : "red" }}>
                          At least 1 special character (@$!%*?&)
                        </li>
                      </ul>
                    </Box>
                  )}

                  <TextField
                    fullWidth
                    type={showPasswords.confirm ? "text" : "password"}
                    label="Confirm New Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange("confirmPassword")}
                    sx={{ mb: 2 }}
                    InputProps={{
                      sx: { borderRadius: 2 },
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => togglePasswordVisibility("confirm")}
                            edge="end"
                            sx={{ color: "primary.main" }}
                          >
                            {showPasswords.confirm ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {formData.newPassword && (
                    <Chip
                      label={`Password strength: ${
                        formData.newPassword.length >= 8 ? "Strong" : "Weak"
                      }`}
                      size="small"
                      sx={{
                        mb: 2,
                        bgcolor:
                          formData.newPassword.length >= 8
                            ? "success.light"
                            : "warning.light",
                        color:
                          formData.newPassword.length >= 8
                            ? "success.dark"
                            : "warning.dark",
                        fontWeight: 600,
                      }}
                    />
                  )}

                  {alerts.password && (
                    <Fade in>
                      <Alert
                        severity={alerts.password.type}
                        sx={{ mb: 2, borderRadius: 2 }}
                        onClose={() =>
                          setAlerts((prev) => ({ ...prev, password: null }))
                        }
                      >
                        {alerts.password.message}
                      </Alert>
                    </Fade>
                  )}

                  <Button
                    variant="contained"
                    onClick={handlePasswordUpdate}
                    disabled={
                      loading.password ||
                      !formData.currentPassword ||
                      !formData.newPassword ||
                      !formData.confirmPassword
                    }
                    startIcon={<Save />}
                    sx={{
                      width: "100%",
                      py: 1.5,
                      borderRadius: 2,
                      fontSize: "1rem",
                      fontWeight: 600,
                      textTransform: "none",
                      bgcolor: "primary.main",
                      boxShadow: 3,
                      "&:hover": {
                        bgcolor: "primary.dark",
                        boxShadow: 6,
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.2s",
                    }}
                  >
                    {loading.password ? "Updating..." : "Update Password"}
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}
