import React from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
} from "@mui/material";

export default function PaymentsTable({ payments }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Payment History
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell>Plan</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.user}</TableCell>
              <TableCell>{payment.plan}</TableCell>
              <TableCell>{payment.amount}</TableCell>
              <TableCell>{payment.date}</TableCell>
              <TableCell>{payment.method}</TableCell>
              <TableCell>
                <Chip
                  label={payment.status}
                  color={
                    payment.status === "Paid"
                      ? "success"
                      : payment.status === "Pending"
                      ? "warning"
                      : "error"
                  }
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
