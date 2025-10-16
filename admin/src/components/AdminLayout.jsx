import React, { useState, useCallback, useMemo } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
  Fade,
  useScrollTrigger,
  Fab,
  Zoom,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

// Scroll to top component
function ScrollTop({ children }) {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      "#back-to-top-anchor"
    );
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 1000 }}
      >
        {children}
      </Box>
    </Zoom>
  );
}

export default function AdminLayout({
  children,
  maxWidth = false,
  disablePadding = false,
  showScrollTop = true,
  sidebarWidth = 280,
  contentBackground = "grey.50",
}) {
  const theme = useTheme();

  // Responsive breakpoints
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));

  // Drawer state with better state management
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(isTablet);

  // Memoized handlers to prevent unnecessary re-renders
  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const handleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);

  // Memoized styles for better performance
  const mainContentStyles = useMemo(
    () => ({
      flexGrow: 1,
      p: disablePadding ? 0 : 3,
      bgcolor: contentBackground,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(maxWidth && {
        maxWidth: typeof maxWidth === "string" ? maxWidth : "1200px",
        mx: "auto",
      }),
    }),
    [disablePadding, contentBackground, maxWidth, theme]
  );

  const containerStyles = useMemo(
    () => ({
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }),
    []
  );

  return (
    <Box sx={containerStyles}>
      <CssBaseline />

      {/* Back to top anchor */}
      <div id="back-to-top-anchor" />

      {/* Navbar with full width and proper positioning */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.appBar,
          width: "100%",
        }}
      >
        <Navbar
          onMenuClick={handleDrawerToggle}
          onSidebarCollapse={handleSidebarCollapse}
          isSidebarCollapsed={sidebarCollapsed}
          elevation={2}
        />
      </Box>

      {/* Main Content + Sidebar Container */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          position: "relative",
          marginTop: "64px", // Space for fixed navbar
        }}
      >
        {/* Sidebar with enhanced features */}
        <Sidebar
          mobileOpen={mobileOpen}
          onDrawerToggle={handleDrawerToggle}
          isMobile={isMobile}
          collapsed={sidebarCollapsed}
          onCollapse={handleSidebarCollapse}
          width={sidebarWidth}
        />

        {/* Main Content Area */}
        <Box component="main" sx={mainContentStyles}>
          {/* Spacer for fixed navbar - removed since we added marginTop */}

          {/* Content wrapper with fade transition */}
          <Fade in timeout={300}>
            <Box
              sx={{
                minHeight: "calc(100vh - 140px)", // Account for navbar and footer
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Main content */}
              <Box sx={{ flex: 1 }}>{children}</Box>

              {/* Footer */}
              <Footer />
            </Box>
          </Fade>
        </Box>
      </Box>

      {/* Scroll to top button */}
      {showScrollTop && (
        <ScrollTop>
          <Fab
            color="primary"
            size="small"
            aria-label="scroll back to top"
            sx={{
              backgroundColor: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      )}

      {/* Mobile overlay */}
      {isMobile && mobileOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: theme.zIndex.drawer - 1,
          }}
          onClick={handleDrawerToggle}
        />
      )}
    </Box>
  );
}
