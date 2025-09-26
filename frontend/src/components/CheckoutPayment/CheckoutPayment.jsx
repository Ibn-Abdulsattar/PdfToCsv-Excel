import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  InputAdornment,
  Alert,
  Step,
  Stepper,
  StepLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  LinearProgress,
  Fade,
  Slide,
} from "@mui/material";
import {
  CreditCard,
  AccountBalanceWallet,
  Security,
  CheckCircle,
  GetApp,
  Lock,
  Verified,
  Payment,
  Receipt,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#115293",
      light: "#42a5f5",
    },
    secondary: {
      main: "#dc004e",
    },
    success: {
      main: "#2e7d32",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: 600,
          padding: "12px 24px",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
          },
        },
      },
    },
  },
});

const CheckoutPayment = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [isProcessing, setIsProcessing] = useState(false);
  const [pkg, setPkg] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const steps = ["Payment Details", "Confirmation"];

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      handleNext();
    }, 3000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : v;
  };

  const handleCardNumberChange = (event) => {
    const formatted = formatCardNumber(event.target.value);
    setFormData({ ...formData, cardNumber: formatted });
  };

  const fetchPackage = () => {
    axios
      .get(`http://localhost:8080/pricing/indivpackage/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setPkg(res.data.indivPackage);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) fetchPackage();
  }, [id]);

  if (!pkg) {
    return (
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
        >
          <Typography variant="h6" color="text.secondary">
            Loading package details...
          </Typography>
        </Box>
      </ThemeProvider>
    );
  }

  const handleSubmit = (e) => {
    axios
      .put("http://localhost:8080/api/upgrade", {
        pageLimit: pkg.pages,
        plan: pkg.category,
      }, {withCredentials: true})
      .then(() => {
        e.preventDefault()
        handlePayment();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", py: 4 }}>
        <Container maxWidth="xxl">
          {/* Header */}
          <Box textAlign="center" mb={4}>
            <Fade in timeout={1000}>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: "bold",
                  color: "primary.main",
                  mb: 1,
                  textShadow: "0 2px 4px rgba(252, 249, 249, 0.3)",
                }}
              >
                Complete your purchase securely
              </Typography>
            </Fade>
          </Box>

          {/* Progress Stepper */}
          <Slide direction="up" in timeout={800}>
            <Paper sx={{ p: 3, mb: 4 }}>
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel
                      StepIconProps={{
                        sx: {
                          "&.Mui-active": { color: "primary.main" },
                          "&.Mui-completed": { color: "success.main" },
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              {isProcessing && (
                <Box mt={2}>
                  <LinearProgress color="primary" />
                  <Typography
                    variant="body2"
                    textAlign="center"
                    mt={1}
                    color="primary.main"
                  >
                    Processing your payment securely...
                  </Typography>
                </Box>
              )}
            </Paper>
          </Slide>

          <Grid container spacing={4}>
            {/* Main Content */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Slide direction="up" in timeout={1000}>
                <Paper sx={{ p: 4 }}>
                  {activeStep === 0 && (
                    <Box>
                      <Typography
                        variant="h5"
                        gutterBottom
                        sx={{ color: "primary.main", fontWeight: 600 }}
                      >
                        Payment Details
                      </Typography>
                      <Typography variant="body1" color="text.secondary" mb={4}>
                        Enter your payment information to complete the purchase
                      </Typography>

                      {/* Contact Information */}
                      <Box mb={4}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: "text.primary", fontWeight: 600 }}
                        >
                          Contact Information
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid size={{ xs: 12 }}>
                            <TextField
                              fullWidth
                              label="Email Address"
                              type="email"
                              value={formData.email}
                              onChange={handleInputChange("email")}
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              fullWidth
                              label="First Name"
                              value={formData.firstName}
                              onChange={handleInputChange("firstName")}
                              required
                            />
                          </Grid>
                          <Grid size={{ xs: 6 }}>
                            <TextField
                              fullWidth
                              label="Last Name"
                              value={formData.lastName}
                              onChange={handleInputChange("lastName")}
                              required
                            />
                          </Grid>
                        </Grid>
                      </Box>

                      {/* Payment Method */}
                      <Box mb={4}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{ color: "text.primary", fontWeight: 600 }}
                        >
                          Payment Method
                        </Typography>
                        <FormControl component="fieldset" fullWidth>
                          <RadioGroup
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                          >
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 3,
                                mb: 2,
                                border: paymentMethod === "stripe" ? 2 : 1,
                                borderColor:
                                  paymentMethod === "stripe"
                                    ? "primary.main"
                                    : "divider",
                                cursor: "pointer",
                              }}
                            >
                              <FormControlLabel
                                value="stripe"
                                control={<Radio />}
                                label={
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                  >
                                    <CreditCard color="primary" />
                                    <Box>
                                      <Typography
                                        variant="body1"
                                        fontWeight="600"
                                      >
                                        Stripe
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Credit/Debit Card, Apple Pay, Google Pay
                                      </Typography>
                                    </Box>
                                  </Box>
                                }
                                sx={{ width: "100%" }}
                              />
                            </Paper>
                            <Paper
                              variant="outlined"
                              sx={{
                                p: 3,
                                border: paymentMethod === "paypal" ? 2 : 1,
                                borderColor:
                                  paymentMethod === "paypal"
                                    ? "primary.main"
                                    : "divider",
                                cursor: "pointer",
                              }}
                            >
                              <FormControlLabel
                                value="paypal"
                                control={<Radio />}
                                label={
                                  <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                  >
                                    <AccountBalanceWallet color="primary" />
                                    <Box>
                                      <Typography
                                        variant="body1"
                                        fontWeight="600"
                                      >
                                        PayPal
                                      </Typography>
                                      <Typography
                                        variant="body2"
                                        color="text.secondary"
                                      >
                                        Pay with your PayPal account
                                      </Typography>
                                    </Box>
                                  </Box>
                                }
                                sx={{ width: "100%" }}
                              />
                            </Paper>
                          </RadioGroup>
                        </FormControl>
                      </Box>

                      <Box component="form" >
                        {/* Card Details */}
                        {paymentMethod === "stripe" && (
                          <Box mb={4}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ color: "text.primary", fontWeight: 600 }}
                            >
                              Card Details
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12 }}>
                                <TextField
                                  fullWidth
                                  label="Card Number"
                                  placeholder="1234 5678 9012 3456"
                                  value={formData.cardNumber}
                                  onChange={handleCardNumberChange}
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <CreditCard color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  inputProps={{ maxLength: 19 }}
                                  required
                                />
                              </Grid>
                              <Grid size={{ xs: 6 }}>
                                <TextField
                                  fullWidth
                                  label="MM/YY"
                                  placeholder="12/25"
                                  value={formData.expiryDate}
                                  onChange={handleInputChange("expiryDate")}
                                  inputProps={{ maxLength: 5 }}
                                  required
                                />
                              </Grid>
                              <Grid size={{ xs: 6 }}>
                                <TextField
                                  fullWidth
                                  label="CVV"
                                  placeholder="123"
                                  value={formData.cvv}
                                  onChange={handleInputChange("cvv")}
                                  InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Security color="primary" />
                                      </InputAdornment>
                                    ),
                                  }}
                                  inputProps={{ maxLength: 4 }}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {/* Billing Address */}
                        {paymentMethod === "stripe" && (
                          <Box mb={4}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              sx={{ color: "text.primary", fontWeight: 600 }}
                            >
                              Billing Address
                            </Typography>
                            <Grid container spacing={2}>
                              <Grid size={{ xs: 12 }}>
                                <TextField
                                  fullWidth
                                  label="Address"
                                  placeholder="123 Main Street"
                                  value={formData.billingAddress}
                                  onChange={handleInputChange("billingAddress")}
                                  required
                                />
                              </Grid>
                              <Grid size={{ xs: 6 }}>
                                <TextField
                                  fullWidth
                                  label="City"
                                  value={formData.city}
                                  onChange={handleInputChange("city")}
                                  required
                                />
                              </Grid>
                              <Grid size={{ xs: 6 }}>
                                <TextField
                                  fullWidth
                                  label="Postal Code"
                                  value={formData.postalCode}
                                  onChange={handleInputChange("postalCode")}
                                  required
                                />
                              </Grid>
                              <Grid size={{ xs: 12 }}>
                                <TextField
                                  fullWidth
                                  label="Country"
                                  value={formData.country}
                                  onChange={handleInputChange("country")}
                                  required
                                />
                              </Grid>
                            </Grid>
                          </Box>
                        )}

                        {/* Security Notice */}
                        <Alert
                          icon={<Lock />}
                          severity="info"
                          sx={{ mb: 3, borderRadius: 3 }}
                        >
                          <Typography variant="body2">
                            Your payment information is secured with 256-bit SSL
                            encryption and PCI DSS compliance
                          </Typography>
                        </Alert>

                        <Box display="flex" justifyContent="flex-end">
                          <Button
                          onClick={handleSubmit}
                            variant="contained"
                            size="large"
                            disabled={isProcessing}
                            sx={{ px: 6, py: 1.5, fontSize: "1.1rem" }}
                          >
                            {isProcessing
                              ? "Processing..."
                              : `Pay $${pkg.price}`}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  )}

                  {activeStep === 1 && (
                    <Fade in timeout={1000}>
                      <Box textAlign="center">
                        <Avatar
                          sx={{
                            width: 100,
                            height: 100,
                            bgcolor: "success.main",
                            margin: "0 auto 20px",
                            boxShadow: "0 8px 32px rgba(46, 125, 50, 0.3)",
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 50 }} />
                        </Avatar>
                        <Typography
                          variant="h3"
                          gutterBottom
                          color="success.main"
                          fontWeight="700"
                        >
                          Payment Successful!
                        </Typography>
                        <Typography variant="h6" color="text.secondary" mb={4}>
                          Thank you for your purchase. Your account has been
                          upgraded to {pkg.name}.
                        </Typography>

                        <Card
                          sx={{
                            maxWidth: 450,
                            margin: "0 auto",
                            mb: 4,
                            background:
                              "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                          }}
                        >
                          <CardContent sx={{ p: 3 }}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              mb={2}
                            >
                              <Receipt color="primary" sx={{ mr: 1 }} />
                              <Typography variant="h6" fontWeight="600">
                                Payment Receipt
                              </Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              mb={1}
                            >
                              <Typography variant="body1">Plan:</Typography>
                              <Typography variant="body1" fontWeight="600">
                                {pkg.name}
                              </Typography>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              mb={1}
                            >
                              <Typography variant="body1">Amount:</Typography>
                              <Typography
                                variant="body1"
                                fontWeight="600"
                                color="primary.main"
                              >
                                ${pkg.price}
                              </Typography>
                            </Box>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              mb={1}
                            >
                              <Typography variant="body1">
                                Payment Method:
                              </Typography>
                              <Typography variant="body1" fontWeight="600">
                                {paymentMethod === "stripe"
                                  ? "Stripe (Credit Card)"
                                  : "PayPal"}
                              </Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                              <Typography variant="body1">
                                Transaction ID:
                              </Typography>
                              <Typography variant="body1" fontWeight="600">
                                TXN-{Date.now().toString().slice(-8)}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>

                        <Box display="flex" gap={2} justifyContent="center">
                          <Button
                          href='/'
                            variant="contained"
                            size="large"
                            startIcon={<GetApp />}
                            sx={{ px: 4, py: 1.5, fontSize: "1.1rem" }}
                          >
                            Start Converting Now
                          </Button>
                        </Box>
                      </Box>
                    </Fade>
                  )}
                </Paper>
              </Slide>
            </Grid>

            {/* Order Summary Sidebar */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Slide direction="left" in timeout={1200}>
                <Paper sx={{ p: 3, position: "sticky", top: 20 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Order Summary
                  </Typography>

                  <Box mb={3}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      mb={1}
                    >
                      <Typography variant="body1" fontWeight="600">
                        {pkg.title}
                      </Typography>
                      {pkg.recommended && (
                        <Chip
                          label="Recommended"
                          color="primary"
                          size="small"
                        />
                      )}
                    </Box>
                    <Typography
                      variant="h4"
                      color="primary.main"
                      fontWeight="700"
                      mb={1}
                    >
                      ${pkg.price}
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                      >
                        /{pkg.category}
                      </Typography>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Billed {pkg.category}, cancel anytime
                    </Typography>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography>Subtotal:</Typography>
                      <Typography fontWeight="600">${pkg.price}</Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      {/* <Typography>Discount:</Typography>
                      <Typography fontWeight="600" color="success.main">
                        -$0.00
                      </Typography> */}
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="h6">Total:</Typography>
                      <Typography
                        variant="h6"
                        fontWeight="700"
                        color="primary.main"
                      >
                        ${pkg.price}
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Box>
                    <Typography
                      variant="subtitle1"
                      fontWeight="600"
                      gutterBottom
                    >
                      What&apos;s included
                    </Typography>

                    <List dense>
                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Verified color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={`${pkg.pages} pages / ${pkg.category}`}
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Verified color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Unlimited file uploads"
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Verified color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Secure 256-bit SSL encryption"
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                      </ListItem>

                      <ListItem sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Verified color="success" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary="Priority customer support"
                          primaryTypographyProps={{
                            variant: "body2",
                            color: "text.primary",
                          }}
                        />
                      </ListItem>
                    </List>
                  </Box>
                </Paper>
              </Slide>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default CheckoutPayment;
