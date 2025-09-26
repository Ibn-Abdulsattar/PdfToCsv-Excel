import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import PricingCard from "./PricingCard";
import PlanForm from "./PlanForm";
import { useEffect } from "react";
import axios from "axios";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");

  const [plans, setPlans] = useState({
    monthly: [],
    yearly: [],
  });

  const fetchPlans = async () => {
    try {
      const res = await axios.get("http://localhost:8080/pricing/allpackages", {
        withCredentials: true,
      });
      setPlans({
        monthly: res.data.monthlyPackages || [],
        yearly: res.data.yearlyPackages || [],
      });
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };

  // ✅ load once when component mounts
  useEffect(() => {
    fetchPlans();
  }, []);

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleAdd = () => {
    setEditData(null);
    setOpen(true);
  };

  const handleEdit = (plan) => {
    setEditData(plan);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/pricing/deletepackage/${id}`, {
        withCredentials: true,
      });

      setPlans((prev) => ({
        ...prev,
        [billing]: prev[billing].filter((p) => p._id !== id),
      }));
      fetchPlans();
    } catch (err) {
      console.error("Error deleting plan:", err);
    }
  };

  const handleSave = async (plan) => {
    try {
      if (editData) {
        // UPDATE
        const res = await axios.put(
          `http://localhost:8080/pricing/updatepackage/${editData._id}`,
          plan,
          { withCredentials: true }
        );

        setPlans((prev) => ({
          ...prev,
          [billing]: prev[billing].map((p) =>
            p._id === editData._id ? res.data.data : p
          ),
        }));
      } else {
        // CREATE
        const res = await axios.post(
          "http://localhost:8080/pricing/newpackage",
          { ...plan, category: billing },
          { withCredentials: true }
        );

        setPlans((prev) => ({
          ...prev,
          [billing]: [...prev[billing], res.data.data],
        }));
      }
      fetchPlans();
    } catch (err) {
      console.error("Error saving plan:", err);
    }
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 9 }}>
      {/* Header + Toggle */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
        py={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="h4" fontWeight={700}>
          Pricing & Plans
        </Typography>

        <ToggleButtonGroup
          value={billing}
          exclusive
          onChange={(e, val) => val && setBilling(val)}
          aria-label="billing period"
          size="small"
        >
          <ToggleButton value="monthly">Monthly</ToggleButton>
          <ToggleButton value="yearly">Annual</ToggleButton>
        </ToggleButtonGroup>

        <Button variant="contained" onClick={handleAdd}>
          Add New Plan
        </Button>
      </Box>

      {/* Pricing Cards */}
      <Grid container spacing={4}>
        {plans[billing].map((plan) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan._id}>
            <PricingCard
              plan={plan}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      {/* Add/Edit Form */}
      <PlanForm
        open={open}
        handleClose={() => setOpen(false)}
        initialData={editData}
        onSave={handleSave}
      />
    </Container>
  );
}
