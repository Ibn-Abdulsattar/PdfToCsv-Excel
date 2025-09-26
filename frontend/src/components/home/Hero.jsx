import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Add this
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  LinearProgress,
  IconButton,
  Avatar,
  Fade,
  Grow,
  Slide,
  useTheme,
  alpha,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  CloudUpload,
  GetApp,
  Payment,
  Check,
  Info,
  Description,
  TableChart,
  Close,
  Speed,
  Security,
  Star,
  CheckCircle,
  FilePresent,
  Transform,
  Download,
  Refresh,
} from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import axios from "axios";
import { useAuth } from "../AuthContext";

const API_BASE = "http://localhost:8080/api";

const Hero = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate(); // ✅ init navigate hook
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [paymentDialog, setPaymentDialog] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const { showAlert } = useAuth();

  // ✅ Fetch user status
  useEffect(() => {
    fetchUserStatus();
  }, []);

  const fetchUserStatus = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/user-status`, {
        withCredentials: true,
      });
      if (data.success); //setUserStatus(data.userStats)
    } catch (err) {
      console.error("Failed to fetch user status:", err);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setError(null);
    } else {
      setError("Please drop a valid PDF file");
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setError(null);
    } else {
      setError("Please select a valid PDF file");
      setFile(null);
    }
  };

  const handleConversion = async (format) => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("pdf", file);

    const endpoint =
      format === "csv" ? `${API_BASE}/pdf-to-csv` : `${API_BASE}/pdf-to-excel`;

    try {
      const { data } = await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data.success) {
        setError(data.error || "Conversion failed");
        return;
      }

      setConversionResult({
        filename: data.data.csvFileName || data.data.excelFileName,
        format: data.data.csvFileName ? "csv" : "excel",
        downloadUrl: data.data.downloadUrl,
      });

      setSuccess(`PDF successfully converted to ${format.toUpperCase()}!`);
      await fetchUserStatus();
    } catch (err) {
      if (err.response?.status === 402) {
        showAlert("error", "Your limit exceeds! Please upgrade your package to continue."); // ✅ Global Alert
        navigate("/pricing"); // direct bhej do
      } else {
        showAlert("error", "Conversion failed. Try again later."); // ✅ Global Alert
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessingPayment(true);
    try {
      const { data } = await axios.post(`${API_BASE}/mock-payment`, {
        confirm: true,
      });

      if (data.success) {
        setSuccess("Payment successful! You now have unlimited access!");
        setPaymentDialog(false);
        await fetchUserStatus();
      } else {
        setError("Payment failed. Please try again.");
      }
    } catch (err) {
      setError("Payment error. Please try again.", err.message);
    } finally {
      setProcessingPayment(false);
    }
  };

  const downloadFile = () => {
    if (!conversionResult?.downloadUrl) return;

    const downloadUrl = `http://localhost:8080${conversionResult.downloadUrl}`;
    window.open(downloadUrl, "_blank");
  };

  const resetForm = () => {
    setFile(null);
    setConversionResult(null);
    setError(null);
    setSuccess(null);
    const fileInput = document.getElementById("file-input");
    if (fileInput) fileInput.value = "";
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="xxl">
        {/* Hero Header */}
        <Fade in timeout={800}>
          <Box textAlign="center" mb={6}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 4,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              }}
            >
              <Transform sx={{ fontSize: 50 }} />
            </Avatar>

            <Typography
              variant={isMobile ? "h3" : "h2"}
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 900,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
                mb: 2,
              }}
            >
              PDF Converter Pro
            </Typography>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              color="text.secondary"
              sx={{
                mb: 4,
                maxWidth: 600,
                mx: "auto",
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Transform your PDF files into CSV or Excel formats with our
              AI-powered converter
            </Typography>

            <Divider
              sx={{
                width: 120,
                mx: "auto",
                borderBottomWidth: 4,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>

        {/* Main Conversion Panel */}
        <Fade in timeout={1200}>
          <Paper
            elevation={8}
            sx={{
              borderRadius: 5,
              overflow: "hidden",
              background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
          >
            {/* Header Bar */}
            <Box
              sx={{
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                p: 3,
                color: "white",
              }}
            >
              <Typography variant="h4" fontWeight={800} gutterBottom>
                Upload & Convert
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Drag and drop your PDF or click to browse
              </Typography>
            </Box>

            <Box sx={{ p: 4 }}>
              {/* File Upload Zone */}
              <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                sx={{
                  border: "3px dashed",
                  borderColor: dragOver
                    ? theme.palette.primary.main
                    : file
                    ? "success.main"
                    : alpha(theme.palette.primary.main, 0.3),
                  borderRadius: 4,
                  p: 6,
                  mb: 4,
                  textAlign: "center",
                  bgcolor: dragOver
                    ? alpha(theme.palette.primary.main, 0.05)
                    : file
                    ? alpha(theme.palette.success.main, 0.05)
                    : alpha(theme.palette.primary.main, 0.02),
                  transition: "all 0.3s ease",
                  position: "relative",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                }}
              >
                <input
                  id="file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    bgcolor: file
                      ? "success.main"
                      : alpha(theme.palette.primary.main, 0.1),
                    color: file ? "white" : "primary.main",
                  }}
                >
                  {file ? (
                    <CheckCircle sx={{ fontSize: 40 }} />
                  ) : (
                    <CloudUpload sx={{ fontSize: 40 }} />
                  )}
                </Avatar>

                <label htmlFor="file-input">
                  <Button
                    component="span"
                    variant={file ? "outlined" : "contained"}
                    size="large"
                    startIcon={<CloudUpload />}
                    sx={{
                      mb: 2,
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    {file ? "Change File" : "Choose PDF File"}
                  </Button>
                </label>

                {file && (
                  <Slide direction="up" in={!!file} mountOnEnter unmountOnExit>
                    <Box
                      sx={{
                        mt: 3,
                        p: 3,
                        bgcolor: alpha(theme.palette.success.main, 0.1),
                        borderRadius: 3,
                        border: `1px solid ${alpha(
                          theme.palette.success.main,
                          0.3
                        )}`,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 1,
                        }}
                      >
                        <FilePresent sx={{ color: "success.main" }} />
                        <Typography
                          variant="h6"
                          color="success.main"
                          fontWeight={600}
                        >
                          {file.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                      </Typography>
                    </Box>
                  </Slide>
                )}
              </Box>

              {/* Conversion Buttons */}
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<TableChart />}
                    onClick={() => handleConversion("csv")}
                    disabled={!file || loading}
                    sx={{
                      py: 2.5,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      boxShadow: `0 8px 25px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 35px ${alpha(
                          theme.palette.primary.main,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Convert to CSV"
                    )}
                  </Button>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<Description />}
                    onClick={() => handleConversion("excel")}
                    disabled={!file || loading}
                    sx={{
                      py: 2.5,
                      borderRadius: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                      boxShadow: `0 8px 25px ${alpha(
                        theme.palette.success.main,
                        0.3
                      )}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 35px ${alpha(
                          theme.palette.success.main,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Convert to Excel"
                    )}
                  </Button>
                </Grid>
              </Grid>

              {/* Progress Bar */}
              {loading && (
                <Fade in={loading}>
                  <Box sx={{ mb: 4 }}>
                    <Box
                      sx={{
                        p: 4,
                        bgcolor: alpha(theme.palette.primary.main, 0.05),
                        borderRadius: 3,
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                      }}
                    >
                      <Typography
                        variant="h6"
                        textAlign="center"
                        gutterBottom
                        color="primary.main"
                      >
                        Processing your PDF...
                      </Typography>
                      <LinearProgress
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          mb: 2,
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                          },
                        }}
                      />
                      <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                      >
                        This usually takes a few seconds
                      </Typography>
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Messages */}
              {error && (
                <Slide direction="up" in={!!error} mountOnEnter unmountOnExit>
                  <Alert
                    severity="error"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      "& .MuiAlert-message": { fontWeight: 500 },
                    }}
                    onClose={() => setError(null)}
                  >
                    {error}
                  </Alert>
                </Slide>
              )}

              {success && (
                <Slide direction="up" in={!!success} mountOnEnter unmountOnExit>
                  <Alert
                    severity="success"
                    sx={{
                      mb: 3,
                      borderRadius: 3,
                      "& .MuiAlert-message": { fontWeight: 500 },
                    }}
                    onClose={() => setSuccess(null)}
                  >
                    {success}
                  </Alert>
                </Slide>
              )}

              {/* Conversion Result */}
              {conversionResult && (
                <Grow in={!!conversionResult} timeout={800}>
                  <Card
                    variant="outlined"
                    sx={{
                      bgcolor: alpha(theme.palette.success.main, 0.05),
                      border: `2px solid ${alpha(
                        theme.palette.success.main,
                        0.3
                      )}`,
                      borderRadius: 4,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                        p: 2,
                        color: "white",
                      }}
                    >
                      <Typography variant="h6" fontWeight={700}>
                        🎉 Conversion Complete!
                      </Typography>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid size={{ xs: 12, sm: 8 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                              mb: 2,
                            }}
                          >
                            <Avatar
                              sx={{
                                bgcolor: alpha(theme.palette.success.main, 0.2),
                                color: "success.main",
                              }}
                            >
                              <CheckCircle />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" fontWeight={600}>
                                {conversionResult.filename}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Ready for download •{" "}
                                {conversionResult.format.toUpperCase()} format
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                          <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            size="large"
                            startIcon={<Download />}
                            onClick={downloadFile}
                            sx={{
                              borderRadius: 3,
                              py: 1.5,
                              fontWeight: 600,
                              boxShadow: `0 8px 25px ${alpha(
                                theme.palette.success.main,
                                0.3
                              )}`,
                              "&:hover": {
                                transform: "translateY(-2px)",
                                boxShadow: `0 12px 35px ${alpha(
                                  theme.palette.success.main,
                                  0.4
                                )}`,
                              },
                            }}
                          >
                            Download
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grow>
              )}

              {/* Reset Button */}
              {(file || conversionResult) && (
                <Fade in timeout={1000}>
                  <Box textAlign="center" mt={4}>
                    <Button
                      variant="outlined"
                      size="large"
                      startIcon={<Refresh />}
                      onClick={resetForm}
                      sx={{
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        fontWeight: 600,
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                        },
                      }}
                    >
                      Convert Another File
                    </Button>
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>
        </Fade>

        {/* Payment Dialog */}
        <Dialog
          open={paymentDialog}
          onClose={() => setPaymentDialog(false)}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            sx: {
              borderRadius: 4,
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              p: 3,
              position: "relative",
            }}
          >
            <IconButton
              onClick={() => setPaymentDialog(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "white",
              }}
            >
              <Close />
            </IconButton>
            <Typography variant="h4" fontWeight={800} gutterBottom>
              Upgrade to Pro
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Unlock unlimited conversions
            </Typography>
          </Box>

          <DialogContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <Typography
                variant="h2"
                color="primary.main"
                fontWeight={900}
                gutterBottom
              >
                $9.99
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                One-time payment • Lifetime access
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom textAlign="center" mb={3}>
              What's included:
            </Typography>

            <List sx={{ maxWidth: 400, mx: "auto" }}>
              {[
                "Unlimited PDF to CSV conversions",
                "Unlimited PDF to Excel conversions",
                "Priority processing speed",
                "Lifetime access with updates",
                "24/7 customer support",
              ].map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon>
                    <CheckCircle sx={{ color: "success.main" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={feature}
                    primaryTypographyProps={{
                      fontWeight: 500,
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </DialogContent>

          <DialogActions sx={{ p: 4, pt: 0 }}>
            <Button
              onClick={() => setPaymentDialog(false)}
              size="large"
              sx={{ borderRadius: 3, px: 3 }}
            >
              Maybe Later
            </Button>
            <Button
              variant="contained"
              onClick={handlePayment}
              disabled={processingPayment}
              size="large"
              startIcon={
                processingPayment ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  <Payment />
                )
              }
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 8px 25px ${alpha(
                  theme.palette.primary.main,
                  0.3
                )}`,
              }}
            >
              {processingPayment ? "Processing..." : "Upgrade Now"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Hero;
