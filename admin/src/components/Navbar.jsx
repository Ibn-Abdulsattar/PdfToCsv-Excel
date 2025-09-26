import * as React from "react";
import { styled, alpha, keyframes } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./register/Register";

// Gradient animation
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Pulse animation for notifications
const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

// Enhanced AppBar with gradient and glass effect
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(-45deg, 
    ${theme.palette.primary.main}, 
    ${theme.palette.secondary.main}, 
    ${theme.palette.primary.dark}, 
    ${theme.palette.secondary.dark})`,
  backgroundSize: "400% 400%",
  animation: `${gradientAnimation} 15s ease infinite`,
  backdropFilter: "blur(20px)",
  borderBottom: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.3)}`,
  "& .MuiToolbar-root": {
    backdropFilter: "blur(10px)",
  },
}));

// Enhanced Search component with glass morphism
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(3),
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  backdropFilter: "blur(20px)",
  border: `1px solid ${alpha(theme.palette.common.white, 0.2)}`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transform: "translateY(-2px)",
    boxShadow: `0 8px 25px ${alpha(theme.palette.common.black, 0.15)}`,
  },
  "&:focus-within": {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
    transform: "translateY(-2px)",
    boxShadow: `0 12px 35px ${alpha(theme.palette.primary.main, 0.3)}`,
    border: `1px solid ${alpha(theme.palette.common.white, 0.4)}`,
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(2),
    width: "auto",
    minWidth: "300px",
  },
}));

// Enhanced SearchIcon wrapper with animation
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.white, 0.8),
  transition: "color 0.3s ease",
}));

// Enhanced Input with better styling
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  fontWeight: 500,
  "& .MuiInputBase-input": {
    padding: theme.spacing(1.5, 1.5, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create(["width", "background-color"]),
    fontSize: "1rem",
    fontWeight: 500,
    "&::placeholder": {
      color: alpha(theme.palette.common.white, 0.7),
      fontWeight: 400,
    },
    [theme.breakpoints.up("sm")]: {
      width: "15ch",
      "&:focus": {
        width: "25ch",
      },
    },
  },
}));

// Enhanced IconButton with hover effects
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  borderRadius: theme.spacing(2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: "scale(1.05)",
    boxShadow: `0 4px 15px ${alpha(theme.palette.common.black, 0.2)}`,
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

// Notification button with pulse animation
const NotificationButton = styled(IconButton)(({ theme }) => ({
  color: "inherit",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  borderRadius: theme.spacing(2),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    transform: "scale(1.05)",
  },
  "& .MuiBadge-badge": {
    animation: `${pulseAnimation} 2s infinite`,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: "0.75rem",
    fontWeight: "bold",
  },
}));

// Enhanced Typography with gradient text
const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  background: `linear-gradient(45deg, 
    ${alpha(theme.palette.common.white, 0.95)}, 
    ${alpha(theme.palette.common.white, 0.7)})`,
  backgroundClip: "text",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  textShadow: `0 2px 4px ${alpha(theme.palette.common.black, 0.3)}`,
  letterSpacing: "0.5px",
}));

// Status chip
const StatusChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.success.main, 0.2),
  color: theme.palette.success.light,
  border: `1px solid ${alpha(theme.palette.success.main, 0.3)}`,
  backdropFilter: "blur(10px)",
  fontWeight: 600,
  fontSize: "0.75rem",
  height: "24px",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

export default function SearchAppBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [authOpen, setAuthOpen] = React.useState(false); // ✅ modal state
  const [user, setUser] = React.useState(null); // optional if you want user data
  const navigate = useNavigate();

  // API call
  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    try {
      const { data } = await axios.get(
        `http://localhost:8080/search?keyword=${searchValue}`,
        { withCredentials: true }
      );

      if (data.users?.length > 0) {
        navigate("/users");
      } else if (data.pricing?.length > 0) {
        navigate("/pricing");
      } else if (data.subscriptions?.length > 0) {
        navigate("/subscriptions");
      } else if (data.conversions?.length > 0) {
        navigate("/conversions");
      } else if (data.supports?.length > 0) {
        navigate("/supports");
      } else {
        alert("No results found");
      }
    } catch (err) {
      console.error("Search Error:", err);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <StyledAppBar position="static" elevation={0}>
          <Toolbar sx={{ minHeight: 70 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                ml: { md: "18rem" },
              }}
            >
              <StyledTypography variant="h6" noWrap component="div">
                Admin Panel
              </StyledTypography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search anything..."
                  inputProps={{ "aria-label": "search" }}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()} // enter key search
                />
              </Search>

              <IconButton onClick={handleSearch} sx={{ color: "white" }}>
                <SearchIcon />
              </IconButton>

              <NotificationButton size="large" aria-label="show notifications">
                {/* <Badge badgeContent={0} color="error">
                  <NotificationsIcon />
                </Badge> */}
              </NotificationButton>

              {/* Avatar → open modal */}
              <StyledIconButton
                size="large"
                edge="end"
                aria-label="account"
                onClick={() => setAuthOpen(true)} // ✅ open modal
              >
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </StyledIconButton>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </Box>

      {/* Modal */}
      <Register
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoginSuccess={(userData) => setUser(userData)} // ✅ save user after login
      />
    </>
  );
}
