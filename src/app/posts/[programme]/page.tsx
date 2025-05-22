// app/posts/[programme]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Box, Typography, Card, CardMedia, Container } from "@mui/material"
import Link from "next/link"
import { Programme } from "@/components/Posts"

const PageProgramme = () => {
  const { programme } = useParams() as { programme: string }
  const [programmes, setProgrammes] = useState<Programme[]>([])

  useEffect(() => {
    if (!programme) return
    fetch(`/api/posts`)
      .then((res) => res.json())
      .then(setProgrammes)
  }, [programme])

  const programmeTarget = programmes.find((p) => p.programme === programme)

  if (!programmeTarget) return null

  return (
    <Container maxWidth="md">
      <Box mt={10}>
        <Card raised sx={{ marginBottom: 4, borderRadius: 2 }}>
          <CardMedia
            sx={{ height: 380, width: "100%", objectFit: "cover" }}
            image={`/assets/images/programs/${decodeURIComponent(
              programmeTarget.programme
            )}.webp`}
            title={programmeTarget.posts[0]?.metadata.programName}
          />
          <Typography variant="h5" sx={{ padding: 2 }}>
            {programmeTarget.posts[0]?.metadata.programName ?? null}
          </Typography>

          <ul>
            {programmeTarget.posts.map(({ slug, metadata }) => (
              <li key={metadata.index}>
                <Link
                  href={`/posts/${decodeURIComponent(
                    programmeTarget.programme
                  )}/${decodeURIComponent(slug)}`}
                >
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
      </Box>
    </Container>
  )
}

export default PageProgramme
