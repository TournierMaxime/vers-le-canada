// app/page.tsx
"use client"

import { Container, Typography, Box } from "@mui/material"
import { useEffect, useState } from "react"
import Link from "next/link"

type Programme = {
  programme: string
  posts: {
    slug: string
    metadata: {
      title: string
      date: string
      tags?: string[]
    }
  }[]
}

export function Posts() {
  const [programmes, setProgrammes] = useState<Programme[]>([])

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then(setProgrammes)
  }, [])

  console.log("programmes", programmes)

  return (
    <Box mt={4}>
      {programmes.map(({ programme, posts }) => (
        <Box key={programme} mb={4}>
          <Typography variant="h5" gutterBottom textTransform="capitalize">
            {programme.replace("-", " ")}
          </Typography>
          <ul>
            {posts.map(({ slug, metadata }) => (
              <li key={slug}>
                <Link href={`/posts/${programme}/${slug}`}>
                  {metadata.title}
                </Link>
                <br />
                <Typography variant="caption" color="text.secondary">
                  {metadata.date}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      ))}
    </Box>
  )
}

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography variant="h2" color="primary">
          Vers le Canada 🇨🇦
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Mon blog pour vous aider à comprendre comment immigrer au Canada via
          les différents programmes possible.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>
          Derniers articles
        </Typography>
        <Posts />
      </Box>

      <Box mt={8} textAlign="center">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Maxime Tournier — Tous droits réservés
        </Typography>
      </Box>
    </Container>
  )
}
