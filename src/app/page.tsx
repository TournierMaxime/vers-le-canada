// app/page.tsx
"use client"

import { Container, Typography, Box, Card } from "@mui/material"
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

  return (
    <Box mt={4}>
      {programmes.map(({ programme, posts }) => {
        return (
          <Card
            raised
            key={programme}
            sx={{ marginBottom: 4, padding: 4, borderRadius: 2 }}
          >
            <Typography variant="h5" gutterBottom textTransform="capitalize">
              {programme.replaceAll("-", " ")}
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
          </Card>
        )
      })}
    </Box>
  )
}

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}></Box>

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
