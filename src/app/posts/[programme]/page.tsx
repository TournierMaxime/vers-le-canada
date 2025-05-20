// app/posts/[programme]/page.tsx
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Box, Typography, Card } from "@mui/material"
import Link from "next/link"
import { Programme } from "@/app/page"

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
    <Box mt={10}>
      <Card raised sx={{ marginBottom: 4, padding: 4, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom textTransform="capitalize">
          {programmeTarget.programme.replaceAll("-", " ")}
        </Typography>
        <ul>
          {programmeTarget.posts.map(({ slug, metadata }) => (
            <li key={slug}>
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
  )
}

export default PageProgramme
