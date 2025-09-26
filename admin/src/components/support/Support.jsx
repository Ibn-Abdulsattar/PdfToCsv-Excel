import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  AdminPanelSettings,
  Visibility,
  Reply,
  FilterList,
  Search,
  Refresh,
} from "@mui/icons-material";
import axios from "axios";

const statusColors = {
  Open: "error",
  "In Progress": "warning",
  Resolved: "success",
  Closed: "default",
};

// const priorityColors = {
//   High: "error",
//   Medium: "warning",
//   Low: "info",
// };

export default function Support() {
  const [queries, setQueries] = useState([]); // 🔹 initially empty, DB se fill hoga
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyMessage, setReplyMessage] = useState("");

  const handleViewQuery = (query) => {
    setSelectedQuery(query);
    setOpenDialog(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/support/getalltickets", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("API response:", res.data);
        if (res.data && Array.isArray(res.data.allTicket)) {
          setQueries(res.data.allTicket); // ✅ allTicket ke andar array hai
        }
      })
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  const handleStatusChange = (queryId, newStatus) => {
    setQueries(
      queries.map((query) =>
        query._id === queryId ? { ...query, status: newStatus } : query
      )
    );
    if (selectedQuery && selectedQuery._id === queryId) {
      setSelectedQuery({ ...selectedQuery, status: newStatus });
    }
  };

  const handleSendReply = () => {
    console.log("Sending reply:", replyMessage);
    setReplyMessage("");
    handleStatusChange(selectedQuery._id, "In Progress");
    setOpenDialog(false);
  };

  const filteredQueries = queries.filter((query) => {
    const matchesStatus =
      filterStatus === "All" || query.status === filterStatus;

    const matchesSearch =
      query.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const getStatusCounts = () => {
    return {
      open: queries.filter((q) => q.status === "Open").length,
      inProgress: queries.filter((q) => q.status === "In Progress").length,
      resolved: queries.filter((q) => q.status === "Resolved").length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <Container maxWidth="xxl" sx={{ py: 3 }}>
      {/* Header */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={4}
      >
        <Box display="flex" alignItems="center">
          <AdminPanelSettings
            sx={{ fontSize: 40, color: "primary.main", mr: 2 }}
          />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              Admin Support Panel
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Manage user queries and support requests
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} mb={4}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="error.main" fontWeight="bold">
                {statusCounts.open}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Open Tickets
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="warning.main" fontWeight="bold">
                {statusCounts.inProgress}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                In Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="success.main" fontWeight="bold">
                {statusCounts.resolved}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Resolved
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card>
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h4" color="primary.main" fontWeight="bold">
                {queries.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Queries
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid size={{ xs: 12, md: 3 }}>
              <TextField
                fullWidth
                placeholder="Search queries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Search sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 3 }}>
              <FormControl fullWidth>
                <InputLabel>Filter by Status</InputLabel>
                <Select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  label="Filter by Status"
                  startAdornment={<FilterList sx={{ mr: 1 }} />}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Open">Open</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                  <MenuItem value="Closed">Closed</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Queries Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            User Queries ({filteredQueries.length})
          </Typography>
          <TableContainer component={Paper} elevation={0}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredQueries.map((query) => (
                  <TableRow key={query._id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar sx={{ width: 32, height: 32, mr: 2 }}>
                          {query.name
                            ? query.name.charAt(0).toUpperCase()
                            : "?"}
                        </Avatar>

                        <Box>
                          <Typography variant="body2" fontWeight="bold">
                            {query.name || "Unknown"}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {query.email || "No email"}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight="bold">
                        {query.subject}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(query.createdAt).toLocaleString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Tooltip title="View Details">
                        <IconButton
                          color="primary"
                          onClick={() => handleViewQuery(query)}
                        >
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Query Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedQuery && (
          <>
            <DialogTitle>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">Query Details</Typography>
                <Chip
                  label={selectedQuery.status}
                  color={statusColors[selectedQuery.status] || "default"}
                  size="small"
                />
              </Box>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    User Name
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedQuery.name}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedQuery.email}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedQuery.subject}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Message
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedQuery.message}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Reply to User
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Type your reply here..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSendReply}
                disabled={!replyMessage.trim()}
                startIcon={<Reply />}
              >
                Send Reply
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
