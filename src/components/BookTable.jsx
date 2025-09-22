import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BookTable({ books, onEdit, onDelete }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <Table>
        {/* ===== Table Header ===== */}
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Title
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Author
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Genre
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Year
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Status
            </TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        {/* ===== Table Body ===== */}
        <TableBody>
          {books.map((b, i) => (
            <TableRow
              key={b.id}
              hover
              sx={{
                backgroundColor: i % 2 === 0 ? "#fafafa" : "white",
                "&:hover": { backgroundColor: "#e3f2fd" },
                transition: "background 0.2s ease-in-out",
              }}
            >
              <TableCell sx={{ fontWeight: 500 }}>{b.title}</TableCell>
              <TableCell>{b.author}</TableCell>
              <TableCell>{b.genre}</TableCell>
              <TableCell>{b.year}</TableCell>
              <TableCell>
                <Chip
                  label={b.status}
                  color={b.status === "Available" ? "success" : "warning"}
                  variant="filled"
                  sx={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    px: 1,
                  }}
                />
              </TableCell>
              <TableCell>
                <Tooltip title="Edit Book">
                  <IconButton color="primary" onClick={() => onEdit(b)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Book">
                  <IconButton
                    color="error"
                    onClick={() => onDelete(b)}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(255,0,0,0.1)" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
