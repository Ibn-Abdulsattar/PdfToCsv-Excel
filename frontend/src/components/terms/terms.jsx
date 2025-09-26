import React from "react";
import { Box, Container, Typography, Divider } from "@mui/material";
import { termsData } from "./termsData";

export default function Terms() {
  return (
    <Box sx={{ py: 6, bgcolor: "grey.50" }}>
      <Container maxWidth="xxl">
        {/* Header */}
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              color: "primary.main",
              letterSpacing: "0.5px",
            }}
          >
            Terms & Conditions
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

        {/* Render Sections Dynamically */}
        {termsData.map((section, idx) => (
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
    </Box>
  );
}
