import React from "react";
import { Box, Container } from "@mui/material";
import FilesTable from "./FilesTable";
import { files } from "./mockData";

export default function Files() {
  const handleDownload = (id) => {
    console.log("Download file with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete file with ID:", id);
  };

  const handleReprocess = (id) => {
    console.log("Reprocess file with ID:", id);
  };

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 4 }}>
      <Box>
        <FilesTable
          files={files}
          onDownload={handleDownload}
          onDelete={handleDelete}
          onReprocess={handleReprocess}
        />
      </Box>
    </Container>
  );
}
