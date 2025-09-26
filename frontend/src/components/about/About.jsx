import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Avatar,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Grow,
  useTheme,
  alpha,
  Link,
} from "@mui/material";
import {
  PictureAsPdf,
  TableChart,
  Speed,
  Security,
  CloudUpload,
  Download,
  CheckCircle,
  Star,
  Group,
  TrendingUp,
  Shield,
  AutoFixHigh,
} from "@mui/icons-material";

export default function About() {
  const theme = useTheme();

  const features = [
    {
      icon: <PictureAsPdf />,
      title: "PDF Processing",
      description:
        "Advanced PDF parsing technology that accurately extracts tabular data from complex documents.",
      color: theme.palette.error.main,
    },
    {
      icon: <TableChart />,
      title: "Multiple Formats",
      description:
        "Convert to CSV, Excel (XLSX), and other popular spreadsheet formats with perfect formatting.",
      color: theme.palette.success.main,
    },
    {
      icon: <Speed />,
      title: "Lightning Fast",
      description:
        "Process large PDF files in seconds with our optimized conversion algorithms.",
      color: theme.palette.warning.main,
    },
    {
      icon: <Security />,
      title: "Secure & Private",
      description:
        "Your files are processed securely and deleted immediately after conversion.",
      color: theme.palette.info.main,
    },
  ];

  const steps = [
    {
      icon: <CloudUpload />,
      title: "Upload PDF",
      description: "Simply drag and drop your PDF file or click to browse",
    },
    {
      icon: <AutoFixHigh />,
      title: "AI Processing",
      description: "Our AI analyzes and extracts table data with precision",
    },
    {
      icon: <Download />,
      title: "Download Result",
      description: "Get your converted CSV/Excel file instantly",
    },
  ];

  const stats = [
    { number: "1M+", label: "Files Converted", icon: <PictureAsPdf /> },
    { number: "50K+", label: "Happy Users", icon: <Group /> },
    { number: "99.9%", label: "Accuracy Rate", icon: <Star /> },
    { number: "24/7", label: "Availability", icon: <Shield /> },
  ];

  const benefits = [
    "No software installation required",
    "Works with any PDF containing tables",
    "Preserves data formatting and structure",
    "Batch processing for multiple files",
    "Free tier with premium options",
    "API access for developers",
  ];

  return (
    <Box
      sx={{
        // background: `linear-gradient(135deg, ${alpha(
        //   theme.palette.primary.main,
        //   0.03
        // )} 0%, ${alpha(theme.palette.primary.main, 0.08)} 100%)`,
        minHeight: "100vh",
        py: 6,
      }}
    >
      <Container maxWidth="xxl">
        {/* Hero Section */}
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
              <PictureAsPdf sx={{ fontSize: 50 }} />
            </Avatar>
            <Typography
              variant="h2"
              fontWeight={800}
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
                mb: 3,
              }}
            >
              About
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{
                maxWidth: 800,
                mx: "auto",
                lineHeight: 1.6,
                fontWeight: 400,
              }}
            >
              The most advanced PDF to spreadsheet converter, powered by AI
              technology to deliver accurate and reliable data extraction.
            </Typography>
            <Divider
              sx={{
                my: 4,
                width: 120,
                mx: "auto",
                borderBottomWidth: 4,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>

        {/* Stats Section */}
        <Grow in timeout={1000}>
          <Grid container spacing={4} mb={8}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    borderRadius: 4,
                    background:
                      "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                    border: `2px solid ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )}`,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: `0 20px 60px ${alpha(
                        theme.palette.primary.main,
                        0.15
                      )}`,
                      borderColor: alpha(theme.palette.primary.main, 0.3),
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 64,
                      height: 64,
                      mx: "auto",
                      mb: 2,
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: "primary.main",
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography
                    variant="h3"
                    fontWeight={800}
                    color="primary.main"
                    gutterBottom
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    fontWeight={500}
                  >
                    {stat.label}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grow>

        {/* Mission Section */}
        <Fade in timeout={1200}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              mb: 8,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
              color: "white",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                width: 200,
                height: 200,
                background: alpha("#ffffff", 0.1),
                borderRadius: "50%",
                transform: "translate(50%, -50%)",
              },
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  Our Mission
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ lineHeight: 1.7, opacity: 0.95 }}
                >
                  We believe that data should be accessible and actionable. Our
                  mission is to break down the barriers between PDF documents
                  and spreadsheet analysis, empowering businesses and
                  individuals to make data-driven decisions faster and more
                  efficiently.
                </Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
                <TrendingUp sx={{ fontSize: 120, opacity: 0.3 }} />
              </Grid>
            </Grid>
          </Paper>
        </Fade>

        {/* Features Section */}
        <Grow in timeout={1400}>
          <Box mb={8}>
            <Typography
              variant="h3"
              fontWeight={700}
              textAlign="center"
              color="primary.main"
              gutterBottom
              sx={{ mb: 6 }}
            >
              Why Choose Us?
            </Typography>
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid size={{ xs: 12, md: 6 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      height: "100%",
                      borderRadius: 4,
                      border: `1px solid ${alpha(feature.color, 0.2)}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 40px ${alpha(feature.color, 0.15)}`,
                      },
                    }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                          mr: 3,
                          width: 64,
                          height: 64,
                        }}
                      >
                        {feature.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{ lineHeight: 1.7 }}
                        >
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grow>

        {/* How It Works */}
        <Fade in timeout={1600}>
          <Box mb={8}>
            <Typography
              variant="h3"
              fontWeight={700}
              textAlign="center"
              color="primary.main"
              gutterBottom
              sx={{ mb: 6 }}
            >
              How It Works
            </Typography>
            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: "center",
                      borderRadius: 4,
                      background:
                        index === 1
                          ? `linear-gradient(145deg, ${alpha(
                              theme.palette.primary.main,
                              0.05
                            )}, ${alpha(theme.palette.primary.main, 0.1)})`
                          : "white",
                      border: `2px solid ${
                        index === 1
                          ? theme.palette.primary.main
                          : alpha(theme.palette.primary.main, 0.1)
                      }`,
                      position: "relative",
                      "&::before":
                        index < 2
                          ? {
                              content: '""',
                              position: "absolute",
                              top: "50%",
                              right: -20,
                              width: 40,
                              height: 2,
                              bgcolor: "primary.main",
                              display: { xs: "none", md: "block" },
                            }
                          : {},
                    }}
                  >
                    <Chip
                      label={index + 1}
                      sx={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        bgcolor: "primary.main",
                        color: "white",
                        fontWeight: "bold",
                        width: 32,
                        height: 32,
                      }}
                    />
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: "auto",
                        mb: 3,
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: "primary.main",
                        mt: 2,
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Typography variant="h5" fontWeight={600} gutterBottom>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Benefits Section */}
        <Grow in timeout={1800}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h3"
                fontWeight={700}
                color="primary.main"
                gutterBottom
                sx={{ mb: 4 }}
              >
                Key Benefits
              </Typography>
              <List sx={{ p: 0 }}>
                {benefits.map((benefit, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon>
                      <CheckCircle sx={{ color: "success.main" }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={benefit}
                      primaryTypographyProps={{
                        variant: "body1",
                        fontWeight: 500,
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${alpha(
                    theme.palette.primary.main,
                    0.05
                  )} 0%, ${alpha(theme.palette.primary.main, 0.1)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  fontWeight={700}
                  color="primary.main"
                  gutterBottom
                >
                  Ready to Convert?
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Join thousands of users who trust our platform for their PDF
                  conversion needs.
                </Typography>
                <Link sx={{ textDecoration: "none" }} href="/">
                  <Box
                    component="button"
                    sx={{
                      px: 4,
                      py: 2,
                      borderRadius: 3,
                      border: "none",
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: `0 8px 30px ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 12px 40px ${alpha(
                          theme.palette.primary.main,
                          0.4
                        )}`,
                      },
                    }}
                  >
                    Start Converting Now
                  </Box>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </Box>
  );
}
