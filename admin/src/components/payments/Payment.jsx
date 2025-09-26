import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import PaymentFilters from "./PaymentFilters";
import PaymentsTable from "./PaymentsTable";
import { payments } from "./mockPayments";

export default function Payment() {
  const [filters, setFilters] = useState({ search: "", status: "" });

  // Filtering logic
  const filteredPayments = payments.filter(
    (p) =>
      p.user.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.status ? p.status === filters.status : true)
  );

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        {/* Filters */}
        <PaymentFilters filters={filters} setFilters={setFilters} />

        {/* Payments Table */}
        <PaymentsTable payments={filteredPayments} />
      </Box>
    </Container>
  );
}
