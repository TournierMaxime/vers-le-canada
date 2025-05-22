// app/page.tsx
"use client"

import { Container, Typography, Box } from "@mui/material"
import RSS from "@/components/RSS"
import Posts from "@/components/Posts"

export default function HomePage() {
  return (
    <Container sx={{ py: 6 }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Posts />
        <RSS />
      </Box>

      <Box mt={8} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Vers le Canada — Tous droits réservés
        </Typography>
      </Box>
    </Container>
  )
}
