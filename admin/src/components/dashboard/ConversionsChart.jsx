import React, { useState, useEffect } from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";

export default function ConversionsChart() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const fetchData = async () => {
    try {
      let url = `http://localhost:8080/api/conversions`;
      if (startDate && endDate) {
        url += `?startDate=${new Date(
          startDate
        ).toISOString()}&endDate=${new Date(endDate).toISOString()}`;
      }

      const res = await axios.get(url, { withCredentials: true });

      const formatted = res.data.map((d) => {
        const safeDay = d.day && d.day !== 0 ? d.day : 1;
        const dateObj = new Date(d.year, d.month - 1, safeDay);

        return {
          realDate: dateObj,
          date: dateObj.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
          free: d.usedUnder === "free_trial" ? d.total : 0,
          paid: d.usedUnder === "subscription" ? d.total : 0,
          users: d.users || [],
          pages: d.pages || 0,
        };
      });

      const merged = Object.values(
        formatted.reduce((acc, curr) => {
          if (!acc[curr.date])
            acc[curr.date] = {
              realDate: curr.realDate,
              date: curr.date,
              free: 0,
              paid: 0,
              users: [],
              pages: 0,
            };

          acc[curr.date].free += curr.free;
          acc[curr.date].paid += curr.paid;
          acc[curr.date].pages += curr.pages;
          acc[curr.date].users = [
            ...new Set([...acc[curr.date].users, ...curr.users]),
          ];

          return acc;
        }, {})
      );

      merged.sort((a, b) => a.realDate - b.realDate);
      setData(merged);
    } catch (err) {
      console.error("❌ Error fetching data:", err);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <Paper sx={{ p: 1 }}>
          <Typography variant="subtitle2">Date: {label}</Typography>
          <Typography color="primary">Free: {d.free}</Typography>
          <Typography color="green">Paid: {d.paid}</Typography>
          <Typography>Pages: {d.pages}</Typography>
          <Typography>User: {d.users.join(", ")}</Typography>
        </Paper>
      );
    }
    return null;
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  return (
    <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
          />
        </LocalizationProvider>

        <Button variant="outlined" onClick={fetchData}>
          Apply
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Conversion Trends
      </Typography>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="free"
            stroke="#1976d2"
            strokeWidth={3}
            name="Free Conversions"
          />
          <Line
            type="monotone"
            dataKey="paid"
            stroke="#2e7d32"
            strokeWidth={3}
            name="Paid Conversions"
          />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
