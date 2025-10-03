import { Box, Typography, Button, Paper } from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
    >
      <Paper sx={{ p: 4, textAlign: "center", borderRadius: 3 }}>
        <Cancel sx={{ fontSize: 80, color: "red", mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Payment Cancelled
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Your payment was not completed. You can try again anytime.
        </Typography>
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          color="primary"
          size="large"
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
};

export default CancelPage;
