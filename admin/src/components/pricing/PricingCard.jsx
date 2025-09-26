import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
  Stack,
} from "@mui/material";

export default function PricingCard({ plan, onEdit, onDelete }) {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        textAlign: "center",
        p: 2,
        transition: "0.3s",
        "&:hover": { boxShadow: 6, transform: "translateY(-4px)" },
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          {plan.title}
        </Typography>
        <Typography variant="h4" color="primary" gutterBottom>
          ${plan.price}
          <Typography component="span" variant="body2" color="text.secondary">
            /mo
          </Typography>
        </Typography>

        <Divider sx={{ my: 2 }} />

        <Box mb={2}>
          <Typography variant="body1" color="text.secondary">
            {plan.pages} pages
          </Typography>
        </Box>

        {/* Admin Controls */}
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button size="small" variant="outlined" onClick={() => onEdit(plan)}>
            Edit
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(plan._id)}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
