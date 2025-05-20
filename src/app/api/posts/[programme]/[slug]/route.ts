// app/api/posts/[programme]/[slug]/route.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(decodeURIComponent(req.url))
  const pathname = url.pathname // e.g. /api/posts/foo/bar
  const parts = pathname.split("/")

  const programme = parts[parts.length - 2]
  const slug = parts[parts.length - 1]

  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    programme,
    `${slug}.md`
  )

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Chapitre non trouvé" }, { status: 404 })
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return NextResponse.json({
    programme,
    slug,
    metadata: data,
    content,
  })
}
