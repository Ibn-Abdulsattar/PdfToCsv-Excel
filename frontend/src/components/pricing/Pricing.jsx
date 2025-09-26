import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Paper,
  Divider,
  Fade,
  Grow,
  alpha,
} from "@mui/material";
import {
  CheckCircle,
  Star,
  Bolt,
  Security,
  Speed,
  TrendingUp,
  Verified,
  Diamond,
  Rocket,
  BusinessCenter,
} from "@mui/icons-material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

// ---- Pricing Card Component ----
function PricingCard({ title, price, pages, url, id }) {
  const navigate = useNavigate()

  const handleNavigate = ()=>{
  navigate(`/checkoutpayment/${id}`)
  }

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        borderRadius: 4,
        textAlign: "center",
        p: 3,
        transition: "all 0.3s ease",
        borderColor: "grey.300",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {title}
        </Typography>

        {/* Price */}
        <Typography
          variant="h4"
          color="primary"
          fontWeight={800}
          gutterBottom
          sx={{ letterSpacing: "-0.5px" }}
        >
          ${price}
        </Typography>

        {/* Pages info */}
        <Typography variant="body2" color="text.secondary" mb={3}>
          {pages} pages / {url === "yearly" ? "year" : "month"}
        </Typography>

        {/* Buy button */}
        <Button
          onClick={handleNavigate}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{
            borderRadius: 2,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            fontSize: "1rem",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            },
          }}
        >
          Buy Now
        </Button>
      </CardContent>
    </Card>
  );
}

// ---- Main Pricing Page ----
export default function Pricing() {
  const theme = useTheme();
  const [billing, setBilling] = useState("monthly");
  const [plans, setPlans] = useState({ monthly: [], yearly: [] });

  useEffect(() => {
    axios
      .get("http://localhost:8080/pricing/allpackages", {
        withCredentials: true,
      })
      .then((res) => {
        setPlans({
          monthly: res.data.monthlyPackages || [],
          yearly: res.data.yearlyPackages || [],
        });
      })
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const handleBillingChange = (event, newValue) => {
    if (newValue !== null) setBilling(newValue);
  };

  return (
    <Box
      sx={{
        py: 10,
        // background: `linear-gradient(135deg, ${alpha(
        //   theme.palette.primary.main,
        //   0.03
        // )} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="xxl">
        {/* Header */}
        <Fade in timeout={800}>
          <Box textAlign="center" mb={8}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 4,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                // boxShadow: `0 12px 40px ${alpha(
                //   theme.palette.primary.main,
                //   0.3
                // )}`,
              }}
            >
              <Speed sx={{ fontSize: 50 }} />
            </Avatar>

            <Typography
              variant="h1"
              fontWeight={900}
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.03em",
                mb: 3,
                fontSize: { xs: "2.5rem", md: "4rem" },
              }}
            >
              Choose Your Plan
            </Typography>

            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
                mb: 2,
              }}
            >
              Transform your PDFs into actionable data with our powerful
              conversion tools. Choose the plan that fits your needs perfectly.
            </Typography>

            <Divider
              sx={{
                my: 4,
                width: 150,
                mx: "auto",
                borderBottomWidth: 4,
                borderColor: theme.palette.primary.main,
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>

        {/* Billing Toggle */}
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={8}>
            <Paper
              elevation={4}
              sx={{
                display: "inline-block",
                p: 1,
                borderRadius: 5,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                border: `2px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                // boxShadow: `0 8px 30px ${alpha(
                //   theme.palette.primary.main,
                //   0.1
                // )}`,
              }}
            >
              <ToggleButtonGroup
                value={billing}
                exclusive
                onChange={handleBillingChange}
                sx={{
                  "& .MuiToggleButton-root": {
                    borderRadius: 4,
                    px: 5,
                    py: 2,
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    textTransform: "none",
                    border: "none",
                    color: "text.secondary",
                    transition: "all 0.3s ease",
                    "&.Mui-selected": {
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                      // boxShadow: `0 6px 25px ${alpha(
                      //   theme.palette.primary.main,
                      //   0.4
                      // )}`,
                      "&:hover": {
                        bgcolor: theme.palette.primary.main,
                      },
                    },
                  },
                }}
              >
                <ToggleButton value="monthly">Monthly Billing</ToggleButton>
                <ToggleButton value="yearly">
                  Annual Billing
                  <Chip
                    label="Save 50%"
                    size="small"
                    sx={{
                      ml: 2,
                      bgcolor: "#0674f9ff",
                      color: "#fff",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                    }}
                  />
                </ToggleButton>
              </ToggleButtonGroup>
            </Paper>

            {billing === "yearly" && (
              <Typography
                variant="h6"
                sx={{
                  mt: 3,
                  color: theme.palette.primary.main,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                <Bolt sx={{ fontSize: 24 }} />
                Save up to 50% with annual billing!
              </Typography>
            )}
          </Box>
        </Fade>

        {/* Pricing Grid */}
        <Grid container spacing={4} justifyContent="center">
          {plans[billing].map((plan) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
              <PricingCard
                title={plan.title}
                price={plan.price}
                pages={plan.pages}
                url={billing}
                id={plan._id}
              />
            </Grid>
          ))}
        </Grid>

        {/* Additional Info */}
        <Fade in timeout={2000}>
          <Paper
            elevation={8}
            sx={{
              mt: 10,
              p: 2,
              textAlign: "center",
              borderRadius: 5,
              background: `linear-gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: 300,
                height: 300,
                background: alpha("#ffffff", 0.05),
                borderRadius: "50%",
                transform: "translate(50%, -50%)",
              },
            }}
          >
            <Security sx={{ fontSize: 80, mb: 3, opacity: 0.9 }} />
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Enterprise Security & Support
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                maxWidth: 600,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              All plans include enterprise-grade security, 99.9% uptime SLA, and
              dedicated support.
            </Typography>
            <Button
              variant="outlined"
              href="/privacy"
              size="large"
              sx={{
                borderColor: "white",
                color: "white",
                borderWidth: 3,
                borderRadius: 4,
                px: 6,
                py: 2,
                fontSize: "1.1rem",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: alpha("#ffffff", 0.15),
                  transform: "translateY(-2px)",
                  // boxShadow: "0 8px 25px rgba(255,255,255,0.2)",
                },
              }}
            >
              Learn More About Security
            </Button>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}
