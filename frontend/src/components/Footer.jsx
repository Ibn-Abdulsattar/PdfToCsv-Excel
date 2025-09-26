import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

export default function Footer() {
  const links = [
    { label: "About", url: "/about" },
    { label: "Terms", url: "/terms" },
    { label: "Privacy", url: "/privacy" },
  ];

  return (
    <Box
      component="footer"
      sx={{
        borderTop: "1px solid #e0e0e0",
        py: 2,
        backgroundColor: "white",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Left Side */}
        <Typography variant="body2" color="text.secondary">
          Copyright © {new Date().getFullYear()} Bank Statement Converter Ltd.
        </Typography>

        {/* Right Side */}
        <Box>
          {links.map((item, idx) => (
            <React.Fragment key={item.label}>
              <Link
                href={item.url}
                color="primary"
                underline="hover"
                sx={{ mx: 0.5 }}
              >
                {item.label}
              </Link>
              {idx < links.length - 1 && (
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                >
                  |
                </Typography>
              )}
            </React.Fragment>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
