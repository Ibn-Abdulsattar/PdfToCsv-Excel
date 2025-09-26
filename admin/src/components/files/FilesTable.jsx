import React, { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Typography,
  TableContainer,
} from "@mui/material";
import axios from "axios";

export default function FilesTable() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/allconversion", { withCredentials: true })
      .then((res) => {
        setFiles(res.data.conversions || []);
      })
      .catch((err) => {
        console.error("Error fetching files:", err);
      });
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 0 }}>
      <Typography variant="h6" gutterBottom>
        Converted Files
      </Typography>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Converted At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Pages</TableCell>
              <TableCell>Used Under</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((file) => (
              <TableRow key={file._id}>
                <TableCell>{file.fileName}</TableCell>
                <TableCell>{file.user?.username || "Unknown User"}</TableCell>
                <TableCell>
                  {new Date(file.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={file.status}
                    color={
                      file.status === "success"
                        ? "success"
                        : file.status === "pending"
                        ? "warning"
                        : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>{file.pagesConverted}</TableCell>
                <TableCell>
                  <Chip
                    label={file.usedUnder}
                    color={file.usedUnder === "free_trial" ? "info" : "primary"}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
