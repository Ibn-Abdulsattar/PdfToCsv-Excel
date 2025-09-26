import React from "react";
import {
  Drawer,
  Box,
  Typography,
  List,
  Toolbar,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Chip,
  useTheme,
  alpha,
  Link,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// ---- Icons ----
import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PaymentIcon from "@mui/icons-material/Payment";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const drawerWidth = 280;

// ---- Sidebar Config (Pages) ----
const sidebarConfig = [
  {
    label: "Dashboard",
    path: "/",
    icon: <DashboardIcon />,
    badge: null,
    color: "#1976d2",
  },
  {
    label: "Users",
    path: "/users",
    icon: <PeopleIcon />,
    badge: null,
    color: "#2e7d32",
  },
  {
    label: "Files",
    path: "/files",
    icon: <InsertDriveFileIcon />,
    badge: null,
    color: "#ed6c02",
  },
  {
    label: "Pricing & Plans",
    path: "/pricing",
    icon: <MonetizationOnIcon />,
    badge: null,
    color: "#9c27b0",
  },
  {
    label: "Payments",
    path: "/payment",
    icon: <PaymentIcon />,
    badge: null,
    color: "#d32f2f",
  },
  {
    label: "Support",
    path: "/support",
    icon: <SupportAgentIcon />,
    badge: null,
    color: "#0288d1",
  },
];

// ---- Sidebar Item Component ----
function SidebarItem({ label, path, icon, badge, color }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isActive = location.pathname === path;

  return (
    <ListItemButton
      onClick={() => navigate(path)}
      sx={{
        borderRadius: "12px",
        mb: 0.5,
        mx: 1,
        minHeight: 48,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        transform: "translateX(0)",
        bgcolor: isActive ? alpha(color, 0.12) : "transparent",
        color: isActive ? color : "text.primary",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 4,
          bgcolor: color,
          transform: isActive ? "scaleY(1)" : "scaleY(0)",
          transformOrigin: "center",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          borderRadius: "0 2px 2px 0",
        },
        "&:hover": {
          bgcolor: isActive ? alpha(color, 0.16) : alpha(color, 0.04),
          transform: "translateX(4px)",
          "& .MuiListItemIcon-root": {
            color: color,
          },
        },
        "&:active": {
          transform: "translateX(2px) scale(0.98)",
        },
      }}
    >
      <ListItemIcon
        sx={{
          color: isActive ? color : "text.secondary",
          minWidth: 44,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "& .MuiSvgIcon-root": {
            fontSize: "1.4rem",
          },
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        primaryTypographyProps={{
          fontWeight: isActive ? 600 : 500,
          fontSize: "0.95rem",
          transition: "font-weight 0.3s ease",
        }}
      />
      {badge && (
        <Chip
          label={badge}
          size="small"
          sx={{
            height: 20,
            fontSize: "0.75rem",
            fontWeight: 600,
            bgcolor: isActive ? alpha(theme.palette.common.white, 0.9) : color,
            color: isActive ? color : theme.palette.common.white,
            minWidth: badge.length > 2 ? "auto" : 20,
            "& .MuiChip-label": {
              px: badge.length > 2 ? 1 : 0.5,
            },
            transition: "all 0.3s ease",
            transform: "scale(1)",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
      )}
    </ListItemButton>
  );
}

// ---- Main Sidebar Component ----
export default function Sidebar({ mobileOpen, onDrawerToggle, isMobile }) {
  const theme = useTheme();

  const drawerContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.mode === "dark" ? "grey.900" : "#fafafa",
      }}
    >
      {/* Header */}
      <Toolbar
        sx={{
          px: 3,
          py: 2,
          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "white",
          borderBottom: `1px solid ${theme.palette.divider}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: "12px",
              bgcolor: alpha(theme.palette.primary.main, 0.1),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Link href="/">
              <CreditCardIcon
                sx={{
                  color: "primary.main",
                  fontSize: "1.8rem",
                }}
              />
            </Link>
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.25rem",
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                lineHeight: 1.2,
              }}
            >
              Admin Panel
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                fontSize: "0.75rem",
                fontWeight: 500,
              }}
            >
              Management Dashboard
            </Typography>
          </Box>
        </Box>
      </Toolbar>

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          overflow: "auto",
          py: 1,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: alpha(theme.palette.primary.main, 0.3),
            borderRadius: 3,
            "&:hover": {
              bgcolor: alpha(theme.palette.primary.main, 0.5),
            },
          },
        }}
      >
        <List sx={{ px: 0 }}>
          {sidebarConfig.map((item, idx) => (
            <SidebarItem key={idx} {...item} />
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.mode === "dark" ? "grey.800" : "white",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: "text.secondary",
            textAlign: "center",
            display: "block",
            fontSize: "0.75rem",
          }}
        >
          © 2024 Admin Panel v2.1.0
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: "none",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        /* Desktop Permanent Drawer */
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              border: "none",
              boxShadow: "0 0 20px rgba(0,0,0,0.08)",
              zIndex: theme.zIndex.drawer,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      )}
    </>
  );
}
