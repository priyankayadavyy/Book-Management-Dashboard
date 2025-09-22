import React from "react";
import { Pagination as MuiPagination, Stack } from "@mui/material";

export default function Pagination({ page, total, limit, onChange }) {
  const totalPages = Math.ceil(total / limit);

  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 3 }}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(e, val) => onChange(val)}
        color="primary"
      />
    </Stack>
  );
}
