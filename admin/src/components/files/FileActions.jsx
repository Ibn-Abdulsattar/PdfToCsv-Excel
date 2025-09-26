import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteIcon from "@mui/icons-material/Delete";

export default function FileActions({
  file,
  onDownload,
  onDelete,
  onReprocess,
}) {
  return (
    <>
      {file.status === "Completed" && (
        <Tooltip title="Download CSV">
          <IconButton onClick={() => onDownload(file.id)} color="primary">
            <DownloadIcon />
          </IconButton>
        </Tooltip>
      )}

      {file.status === "Failed" && (
        <Tooltip title="Reprocess File">
          <IconButton onClick={() => onReprocess(file.id)} color="warning">
            <ReplayIcon />
          </IconButton>
        </Tooltip>
      )}

      <Tooltip title="Delete File">
        <IconButton onClick={() => onDelete(file.id)} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
