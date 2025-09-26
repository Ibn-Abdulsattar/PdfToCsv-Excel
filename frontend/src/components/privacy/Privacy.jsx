import React from "react";
import { Box, Container, Typography, Divider, Paper } from "@mui/material";

// 🔹 Privacy Policy Data (Modular Content)
const privacyData = [
  {
    title: "1. Introduction",
    content: [
      "At Bank Statement Converter, your privacy is one of our top priorities. This Privacy Policy explains what information we collect, how we use it, and the steps we take to protect it.",
      "This policy applies only to data collected through our website and online services. It does not cover offline data collection or information gathered through other channels.",
    ],
  },
  {
    title: "2. Consent",
    content: [
      "By using our website, you consent to this Privacy Policy and agree to its terms and conditions.",
    ],
  },
  {
    title: "3. Information We Collect",
    content: [
      "When you interact with our services, you may be asked to provide personal details such as your name, email address, phone number, or company information. The reason for collecting this information will always be made clear at the point of request.",
      "If you contact us directly, we may also receive additional details such as the content of your message, attachments, and other information you choose to provide.",
      "Uploaded documents remain on our servers for 24 hours and are automatically deleted afterward. We never share uploaded files with third parties.",
    ],
  },
  {
    title: "4. How We Use Your Information",
    content: [
      "We use the collected information to provide and maintain our services, improve user experience, and ensure security.",
      "Your data helps us personalize features, analyze site usage, and develop new tools and functionalities.",
      "We may also use your information to send updates, respond to inquiries, and prevent fraudulent activity.",
    ],
  },
  {
    title: "5. Log Data",
    content: [
      "Like most websites, we use log files to track visitor activity. These logs may include IP addresses, browser type, Internet Service Provider, timestamps, and referring pages.",
      "This information is not linked to personally identifiable details. It is used solely for analyzing trends, improving site performance, and gathering demographic insights.",
    ],
  },
  {
    title: "6. Third-Party Services",
    content: [
      "Our website may display ads or include links managed by third-party ad networks. These third parties may use cookies, JavaScript, or similar technologies to deliver personalized content and measure campaign effectiveness.",
      "Please note that Bank Statement Converter has no control over these cookies. We recommend reviewing the privacy policies of any third-party services you engage with.",
    ],
  },
  {
    title: "7. Your Privacy Choices",
    content: [
      "You may adjust your browser settings to disable cookies or control how they are used. Each browser provides specific instructions for cookie management.",
      "For California residents, under the CCPA you may request to know what personal data has been collected, ask for its deletion, or opt-out of its sale.",
    ],
  },
];

export default function Privacy() {
  return (
    <Container maxWidth="xxl" sx={{ py: 6 }}>
      {/* Header */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ color: "primary.main", letterSpacing: "0.5px" }}
        >
          Privacy Policy
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontStyle: "italic" }}
        >
          Last updated: April 6, 2025
        </Typography>

        <Divider
          sx={{
            my: 3,
            width: "80px",
            mx: "auto",
            borderBottomWidth: 2,
            borderColor: "primary.main",
          }}
        />
      </Box>

      {/* Sections */}
      {privacyData.map((section, idx) => (
        <Box
          key={idx}
          mb={5}
          p={3}
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 1,
            border: "1px solid",
            borderColor: "grey.200",
            "&:hover": { boxShadow: 3, borderColor: "primary.light" },
          }}
        >
          {/* Section Title */}
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "primary.main",
              borderLeft: "4px solid",
              borderColor: "primary.main",
              pl: 1.5,
              mb: 2,
            }}
          >
            {section.title}
          </Typography>

          {/* Section Content */}
          {section.content.map((para, i) => (
            <Typography
              key={i}
              variant="body1"
              paragraph
              sx={{ color: "text.secondary", lineHeight: 1.7 }}
            >
              {para}
            </Typography>
          ))}
        </Box>
      ))}
    </Container>
  );
}
