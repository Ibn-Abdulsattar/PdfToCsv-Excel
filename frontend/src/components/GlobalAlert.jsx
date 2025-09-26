import { Alert, Slide } from "@mui/material";
import { useAuth } from "./AuthContext";

export default function GlobalAlert() {
  const { alert } = useAuth();

  if (!alert) return null;

  return (
    <Slide direction="down" in={!!alert}>
      <Alert
        severity={alert.type}
        sx={{
          position: "fixed",
          top: 70,
          left: "40%",
          transform: "translateX(-50%)",
          zIndex: 2000,
          minWidth: 300,
          borderRadius: 2,
        }}
      >
        {alert.message}
      </Alert>
    </Slide>
  );
}
