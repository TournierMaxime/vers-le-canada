// app/posts/[programme]/[slug]/page.tsx
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"
import { notFound } from "next/navigation"
import { Box, Button, Card, Container, Typography } from "@mui/material"
import Link from "next/link"
import moment from "moment"

type Params = Promise<{ programme: string; slug: string }>

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

const PostPage = async ({ params }: { params: Params }) => {
  const { programme, slug } = await params
  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    programme,
    `${slug}.md`
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
            "& em": {
              fontStyle: "italic",
            },
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Container
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {data.previous ? (
            <Link
              href={`/posts/${decodeURIComponent(programme)}/${data.previous}`}
            >
              <Button size="medium">Vers le chapitre précédent</Button>
            </Link>
          ) : null}
          {data.next ? (
            <Link href={`/posts/${decodeURIComponent(programme)}/${data.next}`}>
              <Button size="medium">Vers le chapitre suivant</Button>
            </Link>
          ) : null}
        </Container>

        <Typography
          sx={{ fontSize: 16, px: 4, pb: 2, textAlign: "right", mt: 4 }}
        >
          {moment(data.date).format("DD/MM/YYYY")}
        </Typography>
      </Card>
    </Box>
  )
}

export default PostPage
