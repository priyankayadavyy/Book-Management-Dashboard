import React, { useState } from "react";
import { useBooks } from "./hooks/useBooks";
import { useAddBook, useEditBook, useDeleteBook } from "./hooks/useMutations";
import BookTable from "./components/BookTable";
import BookForm from "./components/BookForm";
import Pagination from "./components/Pagination";
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  TextField,
  MenuItem,
} from "@mui/material";
import { toast } from "react-toastify";

const genres = ["Fiction", "Self-help", "History", "Finance", "Programming"];
const statuses = ["Available", "Issued"];

function App() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, isError } = useBooks({
    page,
    limit,
    search,
    genre,
    status,
  });
  const addBook = useAddBook();
  const editBook = useEditBook();
  const deleteBook = useDeleteBook();

  const [formOpen, setFormOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Add or Update
  const handleSaveBook = (book) => {
    if (editingBook) {
      editBook.mutate(
        { id: editingBook.id, ...book },
        {
          onSuccess: () => {
            toast.success("Book updated!");
            setFormOpen(false);
            setEditingBook(null);
          },
          onError: () => toast.error("Failed to update book"),
        }
      );
    } else {
      addBook.mutate(book, {
        onSuccess: () => {
          toast.success("Book added!");
          setFormOpen(false);
        },
        onError: () => toast.error("Failed to add book"),
      });
    }
  };

  // Delete
  const handleDeleteBook = (book) => {
    if (window.confirm(`Delete "${book.title}"?`)) {
      deleteBook.mutate(book.id, {
        onSuccess: () => toast.success("Book deleted!"),
        onError: () => toast.error("Failed to delete book"),
      });
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong!</p>;

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        minHeight: "100vh",
        background: "linear-gradient(135deg,#f9f9f9,#e8f0ff)",
      }}
    >
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, bgcolor: "white" }}>
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: "bold", color: "#1976d2", mb: 3 }}
        >
          📚 Book Management Dashboard
        </Typography>

        {/* 🔎 Search + Filters */}
        <Box
          display="flex"
          gap={2}
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            background: "#f1f5ff",
            p: 2,
            borderRadius: 2,
            mb: 3,
            boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
          }}
        >
          <TextField
            label="Search (title/author)"
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <TextField
            select
            label="Genre"
            size="small"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((g) => (
              <MenuItem key={g} value={g}>
                {g}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            size="small"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All</MenuItem>
            {statuses.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setFormOpen(true);
              setEditingBook(null);
            }}
          >
            ➕ Add Book
          </Button>
        </Box>

        {/* 📋 Book Table */}
        <BookTable
          books={data?.data || []}
          onEdit={(book) => {
            setEditingBook(book);
            setFormOpen(true);
          }}
          onDelete={handleDeleteBook}
        />

        {/* 📄 Pagination */}
        <Pagination
          page={page}
          total={data?.total || 0}
          limit={limit}
          onChange={(val) => setPage(val)}
        />

        {/* ✏️ Add/Edit Modal */}
        <BookForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleSaveBook}
          initialValues={editingBook || {}}
        />
      </Paper>
    </Container>
  );
}

export default App;
