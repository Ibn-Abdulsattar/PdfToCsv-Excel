import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { useAuth } from "../AuthContext.jsx";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography>Loading profile...</Typography>
      </Container>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6, mb: 8 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {/* Modern Gradient Banner */}
        <Box
          sx={{
            height: 200,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            position: "relative",
          }}
        />

        {/* Avatar Section */}
        <Box sx={{ px: 4, pb: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: -8,
            }}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                bgcolor: "primary.main",
                fontSize: 48,
                fontWeight: 600,
                border: "5px solid white",
                boxShadow: 3,
              }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="h4"
              fontWeight={600}
              sx={{ mt: 2, mb: 0.5 }}
            >
              {user.username}
            </Typography>

            <Chip
              label={user.status.toUpperCase()}
              color={getStatusColor(user.status)}
              size="small"
              sx={{ fontWeight: 600, fontSize: "0.75rem" }}
            />
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Information Grid */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <EmailIcon sx={{ color: "text.secondary", mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                  >
                    Email Address
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {user.email}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <BadgeIcon sx={{ color: "text.secondary", mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                  >
                    Role
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {user.role}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <CalendarMonthIcon sx={{ color: "text.secondary", mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                  >
                    Member Since
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "N/A"}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <PersonIcon sx={{ color: "text.secondary", mt: 0.5 }} />
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ textTransform: "uppercase", fontWeight: 600 }}
                  >
                    Account Type
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 0.5 }}>
                    {user.role === "admin" ? "Administrator" : "Standard User"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}