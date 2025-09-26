import React from "react";
import { Box, TextField, MenuItem } from "@mui/material";

export default function PaymentFilters({ filters, setFilters }) {
  return (
    <Box display="flex" gap={2} mb={3} flexWrap="wrap">
      {/* Search by user */}
      <TextField
        label="Search User"
        size="small"
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />

      {/* Filter by status */}
      <TextField
        select
        label="Status"
        size="small"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Paid">Paid</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="Failed">Failed</MenuItem>
      </TextField>
    </Box>
  );
}
