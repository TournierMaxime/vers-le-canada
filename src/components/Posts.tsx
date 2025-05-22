"use client"

import {
  Typography,
  Box,
  Card,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material"
import { Fragment, useEffect, useState } from "react"
import Link from "next/link"

export type Programme = {
  programme: string
  posts: {
    slug: string
    metadata: {
      title: string
      date: string
      tags?: string[]
      description: string
      programName: string
      index: number
      previous: string
      next: string
    }
  }[]
}

const Posts = () => {
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
            key={programme}
            raised
            sx={{ marginBottom: 4, borderRadius: 2 }}
          >
            {posts.map((post, index) => {
              return (
                <Fragment key={index}>
                  {post.metadata.index === 0 ? (
                    <CardMedia
                      sx={{ height: 380, width: "100%", objectFit: "cover" }}
                      image={`/assets/images/programs/${programme}.webp`}
                      title={post.metadata.title}
                    />
                  ) : null}
                  {post.metadata.programName ? (
                    <Typography variant="h5" sx={{ padding: 2 }}>
                      {post.metadata.programName}
                    </Typography>
                  ) : null}

                  <Typography sx={{ paddingX: 2 }}>
                    {post.metadata.description}
                  </Typography>
                </Fragment>
              )
            })}
            <CardActions>
              <Link
                href={`/posts/${decodeURIComponent(programme)}`}
                key={programme}
              >
                <Button variant="outlined" size="medium">
                  Consulter
                </Button>
              </Link>
            </CardActions>
          </Card>
        )
      })}
    </Box>
  )
}

export default Posts
