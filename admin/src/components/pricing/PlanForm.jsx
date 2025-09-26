import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function PlanForm({ open, handleClose, initialData, onSave }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    pages: "",
    category: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setErrors({});
      setServerError("");
    } else {
      setForm({ title: "", price: "", pages: "", category: "" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      // remove error when user starts typing
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required";
    } else if (form.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long";
    } else if (form.title.length > 20) {
      newErrors.title = "Title cannot exceed 20 characters";
    }

    if (!form.price) {
      newErrors.price = "Price is required";
    } else if (form.price < 1) {
      newErrors.price = "Price must be at least 1";
    } else if (form.price > 100000) {
      newErrors.price = "Price cannot exceed 100,000";
    }

    if (!form.category) {
      newErrors.category = "Category is required";
    } else if (!["monthly", "yearly"].includes(form.category)) {
      newErrors.category = "Category must be either monthly or yearly";
    }

    if (!form.pages) {
      newErrors.pages = "Pages are required";
    } else if (form.pages < 1) {
      newErrors.pages = "Pages must be at least 1";
    } else if (form.pages > 5000) {
      newErrors.pages = "Pages cannot exceed 5000";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const endpoint = initialData
        ? `http://localhost:8080/pricing/updatepackage/${initialData._id}`
        : "http://localhost:8080/pricing/newpackage";

      const method = initialData ? "put" : "post";

      const res = await axios({
        method,
        url: endpoint,
        data: form,
        withCredentials: true,
      });

      onSave(res.data); // send saved plan back
      handleClose();
      setForm({ title: "", price: "", pages: "", category: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setServerError(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-center fw-bold">
        {initialData ? "Edit Plan" : "Add Plan"}
      </DialogTitle>
      <DialogContent className="d-flex flex-column gap-3 mt-2">
        {/* Show server errors */}
        {serverError && (
          <div className="alert alert-danger py-2">{serverError}</div>
        )}

        {/* Title */}
        <div>
          <input
            type="text"
            name="title"
            placeholder="Plan Name"
            value={form.title}
            onChange={handleChange}
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>

        {/* Price */}
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
          />
          {errors.price && (
            <div className="invalid-feedback">{errors.price}</div>
          )}
        </div>

        {/* Category */}
        <div>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          >
            <option value="">Select Category</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          {errors.category && (
            <div className="invalid-feedback">{errors.category}</div>
          )}
        </div>

        {/* Pages */}
        <div>
          <input
            type="number"
            name="pages"
            placeholder="Pages"
            value={form.pages}
            onChange={handleChange}
            className={`form-control ${errors.pages ? "is-invalid" : ""}`}
          />
          {errors.pages && (
            <div className="invalid-feedback">{errors.pages}</div>
          )}
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={18} /> : null}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
