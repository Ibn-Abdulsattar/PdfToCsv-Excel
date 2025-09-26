import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Stack,
  Paper,
  Avatar,
  Divider,
  useTheme,
  alpha,
} from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarIcon from "@mui/icons-material/Star";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

// Enhanced Features Data
const features = [
  {
    icon: <SecurityIcon sx={{ fontSize: 48 }} />,
    title: "Trusted Security",
    description:
      "With years of financial expertise, we follow strict compliance standards while handling your data.",
    color: "success",
    gradient: "linear-gradient(135deg, #4caf50 0%, #8bc34a 100%)",
  },
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 48 }} />,
    title: "Enterprise Ready",
    description:
      "Our tools are used by leading accounting firms, law practices, and financial institutions globally.",
    color: "primary",
    gradient: "linear-gradient(135deg, #2196f3 0%, #21cbf3 100%)",
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: 48 }} />,
    title: "Always Improving",
    description:
      "We continuously refine our algorithms. If a file fails, just let us know — we'll make it right.",
    color: "secondary",
    gradient: "linear-gradient(135deg, #9c27b0 0%, #e91e63 100%)",
  },
];

// Enhanced Pricing Plans Data

export default function Services() {
  const theme = useTheme();

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xxl">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h3"
            fontWeight={800}
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              mb: 2,
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Discover powerful tools and features designed to streamline your
            document processing workflow
          </Typography>
        </Box>

        {/* Enhanced Features */}
        <Grid container spacing={4} mb={10}>
          {features.map((feature, idx) => (
            <Grid size={{ xs: 12, md: 4 }} key={idx}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: "100%",
                  textAlign: "center",
                  borderRadius: 4,
                  border: `1px solid ${alpha(theme.palette.grey[300], 0.5)}`,
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: theme.shadows[12],
                    borderColor: `${feature.color}.main`,
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    background: feature.gradient,
                    color: "white",
                  }}
                >
                  {feature.icon}
                </Avatar>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {feature.title}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  lineHeight={1.7}
                >
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Enhanced Call to Action */}
        <Paper
          elevation={4}
          sx={{
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            color: "white",
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "radial-gradient(circle at 30% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            },
          }}
        >
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <ContactSupportIcon sx={{ fontSize: 64, mb: 2, opacity: 0.9 }} />
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Need something extra?
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 4, opacity: 0.9, maxWidth: 600, mx: "auto" }}
            >
              We offer tailored solutions for businesses with unique document
              formats. Contact us to see how we can help.
            </Typography>
            <Button
              variant="contained"
              size="large"
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                "&:hover": {
                  bgcolor: alpha("#fff", 0.9),
                  transform: "translateY(-2px)",
                },
              }}
              href="/contact"
            >
              Contact Our Team
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
