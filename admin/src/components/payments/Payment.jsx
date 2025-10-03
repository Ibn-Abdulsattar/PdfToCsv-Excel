import React, { useState } from "react";
import { Container, Box } from "@mui/material";
import PaymentFilters from "./PaymentFilters";
import PaymentsTable from "./PaymentsTable";
import { useEffect } from "react";
import axios from "axios";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "" });

  const fetchpayments = () => {
    axios
      .get("http://localhost:8080/api/allpayments", { withCredentials: true })
      .then((res) => {
        setPayments(res.data.payments);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchpayments();
  }, []);

  // Filtering logic
  const filteredPayments = payments.filter((p) => {
    const searchTerm = filters.search.toLowerCase();
    const username = (p.user?.username || "").toLowerCase();
    const email = (p.user?.email || "").toLowerCase();

    return (
      (username.includes(searchTerm) || email.includes(searchTerm)) &&
      (filters.status ? p.status === filters.status : true)
    );
  });

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
