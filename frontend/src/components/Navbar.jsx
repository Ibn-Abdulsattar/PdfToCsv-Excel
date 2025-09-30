import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import Register from "./register/Register";
import { Link } from "@mui/material";

// 👇 import AuthContext
import { useAuth } from "./AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuth(); // ✅ get from context

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [authOpen, setAuthOpen] = React.useState(false);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleNavigate = (url) => {
    handleCloseNavMenu();
    if (url === "") {
      setAuthOpen(true); // open register modal
    } else {
      navigate(url);
    }
  };

  const handleLogout = async () => {
    await logout(); // ✅ context logout
    handleCloseUserMenu();
  };

  const pages = [
    { pg: "Pricing", url: "/pricing" },
    { pg: "Contact", url: "/contact" },
  ];

  return (
    <>
      <AppBar
        sx={{ background: "#fff", borderBottom: "1px solid #e0e0e0" }}
        position="sticky"
      >
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            {/* Left Logo */}
            <Link sx={{ textDecoration: "none" }} href="/">
              <CreditCardIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  color: "primary.main",
                  fontSize: 32,
                }}
              />
            </Link>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                display: "flex",
                fontWeight: 600,
                letterSpacing: "0.05em",
                color: "black",
                textDecoration: "none",
              }}
            >
              BANK STATEMENT CONVERTER
            </Typography>

            {/* Mobile Menu */}
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                onClick={handleOpenNavMenu}
                color="black"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.pg}
                    onClick={() => handleNavigate(page.url)}
                  >
                    <Typography textAlign="center">{page.pg}</Typography>
                  </MenuItem>
                ))}

                {!user && (
                  <MenuItem onClick={() => handleNavigate("")}>
                    <Typography textAlign="center">Register</Typography>
                  </MenuItem>
                )}

                {user && (
                  <MenuItem onClick={handleOpenUserMenu}>My Account</MenuItem>
                )}
              </Menu>
            </Box>

            {/* Desktop Menu */}
            <Box sx={{ display: { xs: "none", md: "flex" }, ml: "auto" }}>
              {pages.map((page) => (
                <Button
                  key={page.pg}
                  onClick={() => handleNavigate(page.url)}
                  sx={{
                    margin: 1,
                    color: "black",
                    display: "block",
                    "&:hover": { background: "#f5f5f5" },
                  }}
                >
                  {page.pg}
                </Button>
              ))}

              {!user && (
                <Button
                  onClick={() => setAuthOpen(true)}
                  sx={{ margin: 1, color: "black" }}
                >
                  Register
                </Button>
              )}

              {user && (
                <>
                  <Button
                    sx={{
                      margin: 1,
                      color: "black",
                      display: "block",
                      "&:hover": { background: "#f5f5f5" },
                    }}
                    onClick={handleOpenUserMenu}
                  >
                    My Account
                  </Button>
                  <Menu
                    anchorEl={anchorElUser}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate("/profile");
                        handleCloseUserMenu();
                      }}
                    >
                      Profile
                    </MenuItem>

                    <MenuItem onClick={handleCloseUserMenu}>Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Register Modal */}
      <Register
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        // ✅ login success → update context
        onLoginSuccess={(userData) => setUser(userData)}
      />
    </>
  );
}

export default Navbar;
