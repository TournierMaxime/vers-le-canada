// app/posts/[programme]/[slug]/page.tsx
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import { notFound } from "next/navigation"
import { Box, Card, Typography } from "@mui/material"

export async function generateStaticParams() {
  const root = path.join(process.cwd(), "src", "posts")
  const programmes = fs.readdirSync(root)

  const allSlugs = programmes.flatMap((programme) => {
    const files = fs.readdirSync(path.join(root, programme))
    return files.map((filename) => ({
      programme,
      slug: filename.replace(".md", ""),
    }))
  })

  return allSlugs
}

export default async function PostPage({
  params,
}: {
  params: { programme: string; slug: string }
}) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    params.programme,
    `${params.slug}.md`
  )

  if (!fs.existsSync(filePath)) return notFound()

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)
  const html = marked(content)

  return (
    <Box
      maxWidth={1024}
      sx={{
        display: "flex",
        justifyContent: "center",
        mx: "auto",
        mt: 10,
      }}
    >
      <Card sx={{ borderRadius: 2 }} raised>
        <Box
          sx={{
            fontSize: 20,
            textAlign: "justify",
            fontFamily: "Roboto",
            px: 4,
            pt: 0,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <Typography sx={{ color: "#999", px: 4, pb: 2 }}>
          {data.date}
        </Typography>
      </Card>
    </Box>
  )
}
