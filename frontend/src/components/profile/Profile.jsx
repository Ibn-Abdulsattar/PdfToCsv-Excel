import {
  Container,
  Box,
  Typography,
  Avatar,
  Paper,
  Grid,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useAuth } from "../AuthContext.jsx";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Typography>Loading profile...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xxl" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Banner */}
        <Box
          sx={{
            height: 150,
            background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: "secondary.main",
              position: "absolute",
              bottom: -50,
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: 36,
              border: "4px solid white",
            }}
          >
            {user?.username?.charAt(0)}
          </Avatar>
        </Box>

        {/* User Info */}
        <Box sx={{ mt: 7, textAlign: "center", px: 3, pb: 4 }}>
          <Typography variant="h5" fontWeight={700}>
            {user.username}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {user.email}
          </Typography>

          <Button
            variant="contained"
            size="small"
            startIcon={<EditIcon />}
            sx={{ borderRadius: 2, textTransform: "none" }}
          >
            Edit Profile
          </Button>

          {/* Details Grid */}
          <Grid container spacing={2} sx={{ mt: 4, textAlign: "left" }}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Role
              </Typography>
              <Typography variant="body1">{user.role}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Status
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: user.status === "approved" ? "green" : "orange" }}
              >
                {user.status}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="text.secondary">
                Member Since
              </Typography>
              <Typography variant="body1">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
