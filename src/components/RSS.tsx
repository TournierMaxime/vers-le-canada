"use client"

import { Container, Typography, Card, CardActions, Button } from "@mui/material"
import moment from "moment"
import Link from "next/link"
import { useEffect, useState } from "react"
import Parser from "rss-parser"

interface Item {
  title?: string
  link?: string
  pubDate?: string
}

const RSS = () => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchRSS = async () => {
      const parser: Parser<Item> = new Parser()
      const feed = await parser.parseURL(
        "https://api.io.canada.ca/io-server/gc/news/fr/v2?dept=departmentofcitizenshipandimmigration&sort=publishedDate&orderBy=desc&publishedDate%3E=2021-07-23&pick=50&format=atom&atomtitle=Immigration,%20R%C3%A9fugi%C3%A9s%20et%20Citoyennet%C3%A9%20Canada"
      )
      setItems(feed.items)
    }

    fetchRSS()
  }, [])

  return (
    <Container sx={{ display: "flex", flexDirection: "column", mt: 4 }}>
      {items.slice(0, 10).map((item, index) => (
        <Card
          key={index}
          raised
          sx={{ marginBottom: 4, padding: 2, borderRadius: 2 }}
        >
          <Typography textAlign={"justify"}>
            {item.title ?? "Sans titre"}
          </Typography>
          <CardActions sx={{ marginY: 2 }}>
            <Link
              href={item.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button sx={{ marginLeft: -1 }} variant="outlined">
                Consulter
              </Button>
            </Link>
          </CardActions>
          <time>{moment(item.pubDate).format("MMMM Do YYYY, HH:MM")}</time>
        </Card>
      ))}
    </Container>
  )
}

export default RSS
