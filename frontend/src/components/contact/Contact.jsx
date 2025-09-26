import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Divider,
  Grid,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  Avatar,
  Fade,
  Grow,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Email,
  Phone,
  LocationOn,
  Send,
  ContactSupport,
} from "@mui/icons-material";
import axios from "axios";

export default function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Validation (based on mongoose schema)
  const validate = () => {
    let newErrors = {};

    if (!formData.name) {
      newErrors.name = "Username is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Username must be at least 3 characters";
    } else if (formData.name.length > 20) {
      newErrors.name = "Username cannot exceed 20 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    } else if (formData.subject.length > 30) {
      newErrors.subject = "Subject cannot exceed 30 characters";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/support/newticket",
        formData,
        { withCredentials: true }
      );
      alert("Your Ticket is submitted");
      console.log("Server Response:", res.data);

      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Error submitting ticket:", err.message);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Email />,
      title: "Email Support",
      content: "support@company.com",
      subtitle: "We reply within 24 hours",
      color: theme.palette.primary.main,
    },
    {
      icon: <Phone />,
      title: "Phone Support",
      content: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST",
      color: theme.palette.success.main,
    },
    {
      icon: <LocationOn />,
      title: "Office Location",
      content: "123 Business St, Suite 100",
      subtitle: "New York, NY 10001",
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box sx={{ minHeight: "100vh", py: 6 }}>
      <Container maxWidth="xxl">
        {/* Hero Section */}
        <Fade in timeout={800}>
          <Box textAlign="center" mb={6}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: "auto",
                mb: 3,
                bgcolor: "primary.main",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
              }}
            >
              <ContactSupport sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.5px",
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: "auto", lineHeight: 1.6 }}
            >
              We'd love to hear from you. Send us a message and we'll respond as
              soon as possible.
            </Typography>
            <Divider
              sx={{
                my: 4,
                width: 100,
                mx: "auto",
                borderBottomWidth: 3,
                borderColor: "primary.main",
                borderRadius: 2,
              }}
            />
          </Box>
        </Fade>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grow in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  position: "relative",
                  overflow: "hidden",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                  },
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={700}
                  gutterBottom
                  sx={{ color: "text.primary", mb: 3 }}
                >
                  Send us a Message
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Name */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                        error={!!errors.name}
                        helperText={
                          errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )
                        }
                      />
                    </Grid>

                    {/* Email */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        required
                        variant="outlined"
                        error={!!errors.email}
                        helperText={
                          errors.email && (
                            <span className="text-danger">{errors.email}</span>
                          )
                        }
                      />
                    </Grid>

                    {/* Subject */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        error={!!errors.subject}
                        helperText={
                          errors.subject && (
                            <span className="text-danger">
                              {errors.subject}
                            </span>
                          )
                        }
                      />
                    </Grid>

                    {/* Message */}
                    <Grid size={{ xs: 12 }}>
                      <TextField
                        label="Message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        fullWidth
                        required
                        multiline
                        rows={5}
                        variant="outlined"
                        error={!!errors.message}
                        helperText={
                          errors.message && (
                            <span className="text-danger">
                              {errors.message}
                            </span>
                          )
                        }
                      />
                    </Grid>

                    {/* Button */}
                    <Grid size={{ xs: 12 }}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        endIcon={<Send />}
                        sx={{
                          py: 1.5,
                          px: 4,
                          borderRadius: 3,
                          fontSize: "1.1rem",
                          fontWeight: 600,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: `0 12px 40px ${alpha(
                              theme.palette.primary.main,
                              0.4
                            )}`,
                          },
                          "&:disabled": {
                            background: theme.palette.grey[300],
                          },
                        }}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grow>
          </Grid>

          {/* Contact Information Sidebar */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box sx={{ position: "sticky", top: 24 }}>
              <Box sx={{ mb: 3 }}>
                {contactInfo.map((info, index) => (
                  <Grow in timeout={1200 + index * 200} key={index}>
                    <Card
                      sx={{
                        mb: 2,
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        border: `1px solid ${alpha(info.color, 0.1)}`,
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 12px 40px ${alpha(info.color, 0.15)}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                          <Avatar
                            sx={{
                              bgcolor: alpha(info.color, 0.1),
                              color: info.color,
                              mr: 2,
                              width: 56,
                              height: 56,
                            }}
                          >
                            {info.icon}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant="h6"
                              fontWeight={600}
                              gutterBottom
                            >
                              {info.title}
                            </Typography>
                            <Typography
                              variant="body1"
                              fontWeight={500}
                              sx={{ color: info.color, mb: 0.5 }}
                            >
                              {info.content}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {info.subtitle}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grow>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
